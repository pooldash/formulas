import { EffectiveTargetRanges } from '~/formulas/models/misc/Values';
import { m_acid } from '~/formulas/treatments/m_acid';
import { getPool } from '../helpers/testHelpers';

describe('Muriatic Acid treatment function', () => {
    it('Returns null when there is no pH delta', () => {
        // Arrange
        const pool = getPool();
        const targetLevels: EffectiveTargetRanges = { ph: { min: 7, max: 7.4 } };

        // Act
        const res = m_acid.function({
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
    const targetLevels: EffectiveTargetRanges = {};

    const testCases: any[] = [
        // ph_delta, expected_m_acid
        [0.0, null],
        [-0.1, 0.00],
        [-0.2, 9.00],
        [-0.3, 13.50],
        [-0.4, 17.40],
        [-0.5, 21.75],
        [-0.6, 26.10],
        [-0.7, 29.40],
        [-0.8, 32.40],
        [-0.9, 36.45],
        [-1.0, 40.50],
        [-1.1, 44.55],
        [-1.2, 48.60],
        [-1.3, 52.65],
        [-1.4, 56.70],
        [-1.5, 60.75],
        [-1.6, 64.80],
        [-1.7, 68.85],
        [-1.8, 72.90],
        [-1.9, 75.00],
        [-2.0, 75.00],
    ];

    test.each(testCases)('deltas: { ph: %f }, should return %f ounces', (ph_delta: number, expected_m_acid: number | null) => {
        // Act
        const res = m_acid.function({
            pool,
            deltas: {
                ph: ph_delta,
            },
            extra: {
                readings: { ph: 7.4 - ph_delta },
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
