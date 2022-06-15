import { calculate } from '~/formulas/calculator';
import { chlorineFormula } from '~/formulas/formulas/chlorine';
import { ReadingValues } from '~/formulas/models/misc/Values';
import { EffectiveTargetRange } from '~/formulas/models/TargetRange';
import { getPool } from '../helpers/testHelpers';

/*  This should be the formula under test  */
const formula = chlorineFormula;

describe('Chlorine Formula integration test', () => {
    it('Random happy test path.', () => {     
        // Arrange   
        const pool = getPool();
        const targetLevels: EffectiveTargetRange[] = [];
        const readings: ReadingValues = {
            fc: 0,
            ph: 6.0,
        };

        // Act
        const res = calculate({
            formula,
            pool,
            readings,
            targetLevels,
        });
        
        // Assert
        expect(res.calc_hypo).toBeCloseTo(10.4);
        expect(res.soda_ash).toBeCloseTo(68.6);
    });        
});
