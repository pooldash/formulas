import { calculate } from './formulas/calculator';
import { sodiumBisulfateFormula } from './formulas/formulas/sbisulfate';
import { TreatmentSubs } from './formulas/models/misc/DeltaTreatment';
import { ReadingValues } from './formulas/models/misc/Values';
import { Pool } from './formulas/models/pool/Pool';
import { EffectiveTargetRange } from './formulas/models/TargetRange';
import { calc_hypo } from './formulas/treatments/calc_hypo';

const formula = sodiumBisulfateFormula;

const pool: Pool = {
    gallons: 10000,
    liters: 20000 * 3.78541,        // TODO: make this 1 or the other?
    wallType: 'vinyl',
    waterType: 'chlorine',
};

const readings: ReadingValues = {
    fc: 4,
    tc: 1,
    ph: 8.0,
    ta: 200,
    ch: 200,
    cya: 20,
};

const targetLevels: EffectiveTargetRange[] = [];

const substitutions: TreatmentSubs = {
    'fc': {
        up: calc_hypo,
    }
};

const res = calculate({
    formula,
    pool,
    readings,
    targetLevels,
    substitutions,
});

console.log('Results:');

const results = Object.keys(res).map(k => ({
    id: k, value: res[k]
}));

results.forEach(t => {
    // TODO: switch text based on treatment type
    // TODO: add treatment name
    console.log(`Add ${t.value} ounces of ${t.id}`);
});

if (results.length === 0) {
    console.log('Your pool is perfect! 🎉');
}
