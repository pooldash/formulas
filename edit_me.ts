import { calculate } from './formulas/calculator';
import { chlorineFormula } from './formulas/formulas/chlorine';
import { ReadingValues } from './formulas/models/misc/Values';
import { Pool } from './formulas/models/pool/Pool';
import { EffectiveTargetRange } from './formulas/models/TargetRange';

const formula = chlorineFormula;

const pool: Pool = {
    gallons: 20000,
    liters: 20000 * 3.78541,        // TODO: make this 1 or the other?
    wallType: 'plaster',
    waterType: 'chlorine',
};

const readings: ReadingValues = {
    fc: 0,
    ph: 6.0,
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
    var: k, value: res[k]
}));

results.forEach(t => {
    // TODO: switch text based on treatment type
    // TODO: add treatment name
    console.log(`Add ${t.value} ounces of ${t.var}`);
});

if (results.length === 0) {
    console.log('Your pool is perfect! 🎉');
}
