import { calculate } from '~/formulas/calculator';
import { chlorineFormula } from '~/formulas/formulas/chlorine';
import { ReadingValue } from '~/formulas/models/misc/Values';
import { Pool } from '~/formulas/models/pool/Pool';
import { EffectiveTargetRange } from '~/formulas/models/TargetRange';

describe('Chlorine Formula integration test', () => {
    it('Random happy test path.', () => {
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
    
        const res = results.reduce((p, c) => {
            p[c.var] = c.value;
            return p;
        }, {});
        
        expect(res['calc_hypo']).toBeCloseTo(10.4);
        expect(res['soda_ash']).toBeCloseTo(68.6);
    });        
});
