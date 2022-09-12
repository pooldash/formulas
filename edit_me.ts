import { calculate } from './formulas/calculator';
// import { chlorineFormula } from './formulas/formulas/chlorine';
import { saltFormula } from './formulas/formulas/salt';
import { TreatmentSubs } from './formulas/models/misc/DeltaTreatment';
import { ReadingValues } from './formulas/models/misc/Values';
import { Pool } from './formulas/models/pool/Pool';
import { EffectiveTargetRange } from './formulas/models/TargetRange';
import { calc_hypo } from './formulas/treatments/calc_hypo';

const formula = saltFormula;

const pool: Pool = {
    gallons: 20000,
    liters: 20000 * 3.78541,        // TODO: make this 1 or the other?
    wallType: 'plaster',
    waterType: 'chlorine',
};

const readings: ReadingValues = {
    fc: 0,
    ph: 6.0,
    salt: 0,
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
    console.log(`Add ${ t.value } ounces of ${ t.id }`);
});

if (results.length === 0) {
    console.log('Your pool is perfect! 🎉');
}
