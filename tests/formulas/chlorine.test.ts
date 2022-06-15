import { calculate } from '~/formulas/calculator';
import { chlorineFormula } from '~/formulas/formulas/chlorine';
import { ReadingValues } from '~/formulas/models/misc/Values';
import { EffectiveTargetRange } from '~/formulas/models/TargetRange';
import { getPool } from '../helpers/testHelpers';

/*  This should be the formula under test  */
const formula = chlorineFormula;

// TODO: rethink these formula tests.

// include tests for correct readings & treatments?
// include test for target levels & overrides?
// do a tiny number of full-blown integration tests?

describe('Chlorine Formula integration test', () => {
    it('returns granular chlorine & soda ash when fc and ph are low', () => {     
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
