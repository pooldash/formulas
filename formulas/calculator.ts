/// This runs a formula and returns some results!

import { Formula } from './models/Formula';
import { TreatmentSubs } from './models/misc/DeltaTreatment';
import { avg, isIn } from './models/misc/Range';
import { EffectiveTargetRanges, EffectValues, ReadingValues, TreatmentValues } from './models/misc/Values';
import { Pool } from './models/pool/Pool';
import { EffectiveTargetRange } from './models/TargetRange';
import { Treatment } from './models/Treatment';


export interface FormulaRunRequest {
    formula: Formula;
    readings: ReadingValues;
    targetLevels: EffectiveTargetRange[];   // TODO: reconsider this!
    substitutions: TreatmentSubs;
    pool: Pool;
}

const getTargets = (formula: Formula, customTargets: EffectiveTargetRange[]): EffectiveTargetRanges => {
    const targets = formula.readings.map(r => ({
        id: r.id,
        range: r.targetRange
    }));

    formula.targets.forEach(ft => {
        const i = targets.findIndex(rt => rt.id === ft.id);
        if (i >= 0) {
            targets[i] = ft;
        } else {
            targets.push(ft);
        }
    });

    customTargets.forEach(overrideTargetLevel => {
        const i = targets.findIndex(rt => rt.id === overrideTargetLevel.id);
        if (i >= 0) {
            targets[i] = overrideTargetLevel;
        } else {
            targets.push(overrideTargetLevel);
        }
    });

    return targets.reduce((res, t) => {
        res[t.id] = { ...t.range };
        return res;
    }, {});
};

export const calculate = (req: FormulaRunRequest): TreatmentValues => {
    let { formula, readings, pool } = req;
    let targets = getTargets(formula, req.targetLevels);

    let deltas: EffectValues = {};
    Object.keys(targets).forEach(id => {
        // Start with the value from the reading (if it's present)
        const value = readings[id];
        if (value !== undefined && value !== null) {
            if (!isIn(value, targets[id])) {
                deltas[id] = avg(targets[id]) - value;
            }
        }

        // Then, run any adjusters:
        formula.adjusters.forEach(adj => {
            const adjusted = adj({ readings, deltas, targets });
            readings = adjusted.readings;
            deltas = adjusted.deltas;
            targets = adjusted.targets;
        });
    });

    const outputs: TreatmentValues = {};

    // This is a helper-function we'll call a few times:
    const executeTreatmentFunction = (t: Treatment) => {
        const result = t.function({
            pool,
            deltas,
            extra: {
                readings,
                targets
            }
        });

        if (result !== null) {
            outputs[t.id] = result.amount;

            Object.keys(result.effects).forEach(e_id => {
                let prevDelta = 0;
                if (deltas[e_id] !== undefined) {
                    prevDelta = deltas[e_id];
                }
                deltas[e_id] = prevDelta - result.effects[e_id];
            });
        }
    };

    // First, balance in order:
    formula.balanceOrder.forEach(dt => {
        const delta = deltas[dt.reading_id];
        if (!delta) { return; }

        let t: Treatment | null;
        if (delta > 0) {
            t = req.substitutions[dt.reading_id]?.up ?? dt.up;
        } else {
            t = req.substitutions[dt.reading_id]?.down ?? dt.down;
        }

        if (!!t) {
            executeTreatmentFunction(t);
        }
    });

    // Next, run the "alwaysCheck" treatments:
    formula.alwaysCheck.forEach(
        executeTreatmentFunction
    );

    return outputs;
};
