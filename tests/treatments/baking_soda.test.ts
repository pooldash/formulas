import { EffectiveTargetRanges } from '~/formulas/models/misc/Values';
import { baking_soda } from '~/formulas/treatments/baking_soda';
import { getPool } from '../helpers/testHelpers';

describe('Baking Soda treatment function', () => {
    it('Returns null when there is no TA delta', () => {
        // Arrange
        const pool = getPool();
        const targetLevels: EffectiveTargetRanges = { ta: { min: 180, max: 220 } };

        // Act
        const res = baking_soda.function({
            pool,
            deltas: {},
            extra: {
                readings: {},
                targets: targetLevels,
            }
        });

        // Assert
        expect(res).toBeNull();
    });

    // Arrange
    const pool = getPool();
    const targetLevels: EffectiveTargetRanges = { ta: { min: 180, max: 220 } };

    const testCases: any[] = [
        // ta_delta, expected_baking_soda
        [0, null],
        [20, 44.800],
        [40, 89.600],
        [60, 134.400],
        [80, 179.200],
        [100, 224.000],
        [120, 268.800],
        [140, 313.600],
        [160, 358.400],
        [180, 403.200]
    ];

    test.each(testCases)('deltas: { ta: %f }, should return %f ounces', (ta_delta: number, expected_baking_soda: number | null) => {
        // Act
        const res = baking_soda.function({
            pool,
            deltas: {
                ta: ta_delta,
            },
            extra: {
                readings: {},
                targets: targetLevels
            }
        });

        // Assert
        if (expected_baking_soda === null) {
            expect(res).toBeNull();
        } else {
            expect(res?.amount).toBeCloseTo(expected_baking_soda);
        }
    });
});
