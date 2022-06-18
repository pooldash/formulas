/// This runs a formula and returns some results!

import { Formula } from './models/Formula';
import { avg } from './models/misc/Range';
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
    const { formula, readings } = req;
    const targets = getTargets(formula, req.targetLevels);

    const desiredEffects: EffectValues = {};
    Object.keys(readings).forEach(readingVar => {
        desiredEffects[readingVar] = avg(targets[readingVar]) - readings[readingVar];
    });

    const outputs: TreatmentValues = {};

    formula.treatments.forEach(t => {
        const result = t.function(
            req.pool,
            readings,
            outputs,
            targets,
        );
        if (result !== null) {
            outputs[ t.id ] = result;
        }
    });
    
    return outputs;
};
