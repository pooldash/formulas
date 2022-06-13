import { calculate } from './formulas/calculator';
import { chlorineFormula } from './formulas/formulas/chlorine';
import { ReadingValue } from './formulas/models/misc/Values';
import { Pool } from './formulas/models/pool/Pool';
import { EffectiveTargetRange } from './formulas/models/TargetRange';

const formula = chlorineFormula;

const pool: Pool = {
    gallons: 20000,
    liters: 20000 * 3.78541,        // TODO: make this 1 or the other?
    wallType: 'plaster',
    waterType: 'chlorine',
};

const readings: ReadingValue[] = [      // TODO: have typescript enforce array is readings supported by formula
    {
        var: 'fc',
        value: 0
    }, {
        var: 'ph',
        value: 6.0
    }
];

const targetLevels: EffectiveTargetRange[] = [];

const results = calculate({
    formula,
    pool,
    readings,
    targetLevels,
});

console.log('Results:');

results.forEach(t => {
    const effectiveValue = t.value ?? 0;
    if (effectiveValue > 0) {
        console.log(`Add ${effectiveValue} ounces of ${t.var}`);        // TODO: add treatment name here
    } 
});

if (results.length === 0) {
    console.log('Your pool is perfect! 🎉');
}
