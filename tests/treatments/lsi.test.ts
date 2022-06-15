import { ReadingValues } from '~/formulas/models/misc/Values';
import { lsi } from '~/formulas/treatments/lsi';
import { getPool } from '../helpers/testHelpers';

describe('LSI Calculation', () => {
    it('correctly calculates LSI when it\'s slightly negative', () => {
        // Arrange
        const pool = getPool();
        const readings: ReadingValues = {
            ta: 80,
            ch: 300,
            ph: 7.4,
            tds: 750,
            temp_f: 75
        };

        // Act
        const res = lsi.function(pool, readings, {}, {});

        // Assert
        expect(res).toBeCloseTo(-0.21686, 3);
    });

    it('correctly calculates LSI when it\'s slightly positive', () => {
        // Arrange
        const pool = getPool();
        const readings: ReadingValues = {
            ta: 80,
            ch: 300,
            ph: 7.8,
            tds: 750,
            temp_f: 75
        };

        // Act
        const res = lsi.function(pool, readings, {}, {});

        // Assert
        expect(res).toBeCloseTo(0.18313, 3);
    });

    it('correctly calculates LSI when it\'s a perfect (0)', () => {
        // Arrange
        const pool = getPool();
        const readings: ReadingValues = {
            ta: 160,
            ch: 319,
            ph: 7.3,
            tds: 1000,
            temp_f: 75
        };

        // Act
        const res = lsi.function(pool, readings, {}, {});

        // Assert
        expect(res).toBeCloseTo(0.18313, 3);
    });

    it('returns null when required readings are missing', () => {
        // Arrange
        const pool = getPool();
        const readings = {};

        // Act
        const res = lsi.function(pool, readings, {}, {});

        // Assert
        expect(res).toBe(null);
    });
});
