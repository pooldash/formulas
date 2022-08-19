import { EffectiveTargetRanges } from '~/formulas/models/misc/Values';
import { m_acid } from '~/formulas/treatments/m_acid';
import { getPool } from '../helpers/testHelpers';

describe('Muriatic Acid treatment function', () => {
    it('Returns null when there is no pH delta', () => {
        // Arrange
        const pool = getPool();
        const targetLevels: EffectiveTargetRanges = { ph: { min: 7, max: 7.4 } };

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
        // ph_delta, expected_m_acid
        [0.000, null],
        [-0.100, 0.000],
        [-0.200, 0.000],
        [-0.300, 0.000],
        [-0.400, 18.000],
        [-0.500, 22.500],
        [-0.600, 27.000],
        [-0.700, 30.450],
        [-0.800, 34.800],
        [-0.900, 37.800],
        [-1.000, 42.000],
        [-1.100, 44.550],
        [-1.200, 48.600],
        [-1.300, 52.650],
        [-1.400, 56.700],
        [-1.500, 60.750],
        [-1.600, 64.800],
        [-1.700, 68.850],
        [-1.800, 72.900],
        [-1.900, 75.000],
        [-2.000, 75.000]
    ];

    test.each(testCases)('deltas: { ph: %f }, should return %f ounces', (ph_delta: number, expected_m_acid: number | null) => {
        // Act
        const res = m_acid.function({
            pool,
            deltas: {
                ta: ph_delta,
            },
            extra: {
                readings: {},
                targets: targetLevels
            }
        });

        // Assert
        if (expected_m_acid === null) {
            expect(res).toBeNull();
        } else {
            expect(res?.amount).toBeCloseTo(expected_m_acid);
        }
    });
});
