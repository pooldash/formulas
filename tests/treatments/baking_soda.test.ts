import { EffectiveTargetRanges } from '~/formulas/models/misc/Values';
import { baking_soda } from '~/formulas/treatments/baking_soda';
import { getPool } from '../helpers/testHelpers';

describe('Baking Soda treatment function', () => {
    it('Doesn\'t return NaN when t.soda_ash is undefined', () => {
        // Arrange
        const pool = getPool();
        const targetLevels: EffectiveTargetRanges = { ta: { min: 180, max: 220 } };

        // Act
        const res = baking_soda.function(pool, { ta: 100 }, {}, targetLevels);

        // Assert
        expect(res).not.toBeNaN();
    });
    
    it('Returns null when TA is undefined', () => {
        // Arrange
        const pool = getPool();
        const targetLevels: EffectiveTargetRanges = { ta: { min: 180, max: 220 } };

        // Act
        const res = baking_soda.function(pool, {}, {}, targetLevels);

        // Assert
        expect(res).toBeNull();
    });

    
    // Arrange
    const pool = getPool();
    const targetLevels: EffectiveTargetRanges = { ta: { min: 180, max: 220 } };

    const testCases: any[]  = [
        // ta, soda_ash, expected_baking_soda
        [0, 0, 448.000],
        [0, 50, 368.000],
        [0, 100, 288.000],
        [0, 150, 208.000],
        [0, 200, 128.000],
        [20, 0, 403.200],
        [20, 50, 323.200],
        [20, 100, 243.200],
        [20, 150, 163.200],
        [20, 200, 83.200],
        [40, 0, 358.400],
        [40, 50, 278.400],
        [40, 100, 198.400],
        [40, 150, 118.400],
        [40, 200, 38.400],
        [60, 0, 313.600],
        [60, 50, 233.600],
        [60, 100, 153.600],
        [60, 150, 73.600],
        [60, 200, null],
        [80, 0, 268.800],
        [80, 50, 188.800],
        [80, 100, 108.800],
        [80, 150, 28.800],
        [80, 200, null],
        [100, 0, 224.000],
        [100, 50, 144.000],
        [100, 100, 64.000],
        [100, 150, null],
        [100, 200, null],
        [120, 0, 179.200],
        [120, 50, 99.200],
        [120, 100, 19.200],
        [120, 150, null],
        [120, 200, null],
        [140, 0, 134.400],
        [140, 50, 54.400],
        [140, 100, null],
        [140, 150, null],
        [140, 200, null],
        [160, 0, 89.600],
        [160, 50, 9.600],
        [160, 100, null],
        [160, 150, null],
        [160, 200, null],
        [180, 0, null],
        [180, 50, null],
        [180, 100, null],
        [180, 150, null],
        [180, 200, null]
    ];

    test.each(testCases)('{ ta: %f }, { soda_ash: %f } should return %f ounces', (ta: number, soda_ash: number, expected_baking_soda: number | null) => {
        // Act
        const res = baking_soda.function(pool, { ta }, { soda_ash }, targetLevels);

        // Assert
        if (expected_baking_soda === null) {
            expect(res).toBeNull();
        } else {
            expect(res).toBeCloseTo(expected_baking_soda);
        }
    });
});
