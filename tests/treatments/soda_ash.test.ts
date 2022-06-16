import { EffectiveTargetRanges } from '~/formulas/models/misc/Values';
import { soda_ash } from '~/formulas/treatments/soda_ash';
import { getPool } from '../helpers/testHelpers';

describe('Soda Ash treatment function', () => {
    // Arrange
    const pool = getPool();
    const targetLevels: EffectiveTargetRanges = { ph: { min: 7.2, max: 7.6 } };

    // [ph, expected_soda_ash]
    const testCases: any[] = [
        [0, 48.000],
        [4.9, 48.000],
        [5.0, 48.000],
        [5.1, 48.000],
        [5.2, 47.740],
        [5.3, 46.305],
        [5.4, 44.800],
        [5.5, 43.225],
        [5.6, 41.580],
        [5.7, 39.865],
        [5.8, 38.080],
        [5.9, 36.225],
        [6.0, 34.300],
        [6.1, 32.305],
        [6.2, 30.240],
        [6.3, 28.105],
        [6.4, 25.900],
        [6.5, 23.625],
        [6.6, 21.280],
        [6.7, 18.865],
        [6.8, 16.380],
        [6.9, 13.825],
        [7.0, 11.200],
        [7.1, 8.505],
        [7.19999999, 5.740],        // To clarify the boundary-condition
        [7.2, null],
        [7.3, null],
        [7.4, null]
    ];       

    test.each(testCases)('ph of %f should return %f', (ph: number, expected: number | null) => {
        // Act
        const res = soda_ash.function(pool, { ph }, {}, targetLevels);

        // Assert
        if (expected === null) {
            expect(res).toBeNull();
        } else {
            expect(res).toBeCloseTo(expected);
        }
    });
});