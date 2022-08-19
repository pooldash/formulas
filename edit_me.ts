import { calculate } from './formulas/calculator';
import { saltFormula } from './formulas/formulas/salt';
import { ReadingValues } from './formulas/models/misc/Values';
import { Pool } from './formulas/models/pool/Pool';
import { EffectiveTargetRange } from './formulas/models/TargetRange';

const formula = saltFormula;

const pool: Pool = {
    gallons: 12000,
    liters: 12000 * 3.78541,        // TODO: make this 1 or the other?
    wallType: 'plaster',
    waterType: 'salt_water',
};

const readings: ReadingValues = {
    ph: 8.1,
    ta: 133,
};

const targetLevels: EffectiveTargetRange[] = [];

const res = calculate({
    formula,
    pool,
    readings,
    targetLevels,
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
