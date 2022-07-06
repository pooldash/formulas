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
        const res = lsi.function({
            pool,
            deltas: {},
            extra: {
                readings,
                targets: {}
            }
        });

        // Assert
        expect(res?.amount).toBeCloseTo(-0.21686, 3);
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
        const res = lsi.function({
            pool,
            deltas: {},
            extra: {
                readings,
                targets: {}
            }
        });

        // Assert
        expect(res?.amount).toBeCloseTo(0.18313, 3);
    });

    it('correctly calculates LSI when it\'s nearly 0', () => {
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
        const res = lsi.function({
            pool,
            deltas: {},
            extra: {
                readings,
                targets: {}
            }
        });

        // Assert
        expect(res?.amount).toBeCloseTo(-0.00165, 3);
    });

    it('returns null instead of NaN', () => {
        // Arrange
        const pool = getPool();
        const readings: ReadingValues = {
            ta: 0,
            ch: 0,
            ph: 0,
            tds: 0,
            temp_f: 75
        };

        // Act
        const res = lsi.function({
            pool,
            deltas: {},
            extra: {
                readings,
                targets: {}
            }
        });

        // Assert
        expect(res).toBeNull();
    });

    it('returns null instead of Infinity', () => {
        // Arrange
        const pool = getPool();
        const readings: ReadingValues = {
            ta: 1,
            ch: 0,
            ph: 1,
            tds: 1,
            temp_f: 75
        };

        // Act
        const res = lsi.function({
            pool,
            deltas: {},
            extra: {
                readings,
                targets: {}
            }
        });

        // Assert
        expect(res).toBeNull();
    });

    it('returns null when required readings are missing', () => {
        // Arrange
        const pool = getPool();
        const readings = {};

        // Act
        const res = lsi.function({
            pool,
            deltas: {},
            extra: {
                readings,
                targets: {}
            }
        });

        // Assert
        expect(res).toBe(null);
    });
});
