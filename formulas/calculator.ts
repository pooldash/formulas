/// This runs a formula and returns some results!

import { Formula } from './models/Formula';
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

export const calculate = (req: FormulaRunRequest): CalculationResult[] => {

    const formula = req.formula;
    const targets: EffectiveTargetRange[] = formula.readings.map(r => ({
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

    req.targetLevels.forEach(overrideTargetLevel => {
        const i = targets.findIndex(rt => rt.var === overrideTargetLevel.var);
        if (i >= 0) {
            targets[i] = overrideTargetLevel;
        } else {
            targets.push(overrideTargetLevel);
        }
    });


    const effectiveTargetRanges = targets.reduce((res, t) => {
        res[t.var] = { ...t.range };
        return res;
    }, {});

    const outputs: Record<string, number> = {};
    const readings: Record<string, number> = {};
    const skipped: Record<string, boolean> = {};
    formula.readings.forEach(r => {
        const entry = req.readings.find(x => x.var === r.var);
        if (entry) {
            readings[r.var] = entry.value;
        } else {
            readings[r.var] = r.defaultValue;
            skipped[r.var] = true;
        }
    });

    formula.treatments.forEach(t => {
        const result = t.function(
            req.pool,
            readings,
            outputs,
            effectiveTargetRanges,
            skipped,
        );
        outputs[ t.var ] = result ?? 0;     // TODO: better nullability
    });
    
    return Object.keys(outputs).map(k => ({
        var: k, value: outputs[k]
    }));
};