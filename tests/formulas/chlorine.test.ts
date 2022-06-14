import { calculate } from '~/formulas/calculator';
import { chlorineFormula } from '~/formulas/formulas/chlorine';
import { ReadingValue } from '~/formulas/models/misc/Values';
import { Pool } from '~/formulas/models/pool/Pool';
import { EffectiveTargetRange } from '~/formulas/models/TargetRange';


test('The darn thing works', () => {
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

    expect(results.length > 0);
    expect(results[0].value ?? 0 > 10);
});
