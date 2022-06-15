/// This runs a formula and returns some results!

import { Formula } from './models/Formula';
import { EffectiveTargetRanges } from './models/misc/Values';
import { Pool } from './models/pool/Pool';
import { EffectiveTargetRange } from './models/TargetRange';


export interface FormulaRunRequest {
    formula: Formula;
    readings: ReadingEntry[];
    targetLevels: EffectiveTargetRange[];   // TODO: reconsider this!
    pool: Pool;
}

interface ReadingEntry {
    var: string;
    value: number;
}

interface CalculationResult {
    value: number | null;
    var: string;
}

const getTargets = (formula: Formula, customTargets: EffectiveTargetRange[]): EffectiveTargetRanges => {
    const targets = formula.readings.map(r => ({
        var: r.var,
        range: r.targetRange
    }));

    formula.targets.forEach(ft => {
        const i = targets.findIndex(rt => rt.var === ft.var);
        if (i >= 0) {
            targets[i] = ft;
        } else {
            targets.push(ft);
        }
    });

    customTargets.forEach(overrideTargetLevel => {
        const i = targets.findIndex(rt => rt.var === overrideTargetLevel.var);
        if (i >= 0) {
            targets[i] = overrideTargetLevel;
        } else {
            targets.push(overrideTargetLevel);
        }
    });

    return targets.reduce((res, t) => {
        res[t.var] = { ...t.range };
        return res;
    }, {});
};

export const calculate = (req: FormulaRunRequest): CalculationResult[] => {

    const formula = req.formula;
    const effectiveTargetRanges = getTargets(formula, req.targetLevels);

    const outputs: Record<string, number> = {};
    const readings: Record<string, number> = req.readings.reduce((prev, current) => {
        prev[current.var] = current.value;
        return prev;
    }, {});

    formula.treatments.forEach(t => {
        const result = t.function(
            req.pool,
            readings,
            outputs,
            effectiveTargetRanges,
        );
        outputs[ t.var ] = result ?? 0;     // TODO: better nullability
    });
    
    return Object.keys(outputs).map(k => ({
        var: k, value: outputs[k]
    }));
};
