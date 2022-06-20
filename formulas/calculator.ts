/// This runs a formula and returns some results!

import { Formula } from './models/Formula';
import { avg, isIn } from './models/misc/Range';
import { EffectiveTargetRanges, EffectValues, ReadingValues, TreatmentValues } from './models/misc/Values';
import { Pool } from './models/pool/Pool';
import { EffectiveTargetRange } from './models/TargetRange';


export interface FormulaRunRequest {
    formula: Formula;
    readings: ReadingValues;
    targetLevels: EffectiveTargetRange[];   // TODO: reconsider this!
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

        // Then, if it's stompable, by all means give it a stomp:
        const customTarget = formula.targets.find(t => t.id === id);
        if (customTarget) {
            const updated = customTarget.stomper({ readings, deltas, targets });

            readings = updated.readings;
            deltas = updated.deltas;
            targets = updated.targets;
        }
    });

    console.log('******************************************');
    console.log('Starting Deltas:');
    console.dir(deltas);
    const outputs: TreatmentValues = {};
    formula.treatments.forEach(t => {
        const result = t.function({
            pool,
            deltas,
            extra: {
                readings,
                targets
            }
        });

        if (result !== null) {
            console.log(`adding ${result.amount} ounces of ${t.name}`);
            outputs[ t.id ] = result.amount;
            
            Object.keys(result.effects).forEach(e_id => {
                let prevDelta = 0;
                if (deltas[e_id] !== undefined) {
                    prevDelta = deltas[e_id];
                }
                deltas[e_id] = prevDelta - result.effects[e_id];
            });
        }
    });
    
    console.log('Remaining Deltas:');
    console.dir(deltas);
    console.log('******************************************');
    return outputs;
};
