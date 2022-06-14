import { ReadingValues } from '~/formulas/models/misc/Values';
import { Pool } from '~/formulas/models/pool/Pool';
import { lsi } from '~/formulas/treatments/lsi';

describe('LSI Treatment', () => {

    const getPool = (): Pool => {
        const bentleysPool: Omit<Pool, 'liters'> = {
            gallons: 10000,
            wallType: 'plaster',
            waterType: 'chlorine',
        };
        return {
            ...bentleysPool,
            liters: bentleysPool.gallons * 3.785411784,
        };
    };

    const getReadings = (): ReadingValues => {
        return {
            fc: 3.0
        };
    };

    it('Correctly calculates LSI when all params are present', () => {
        
    });
    it('Returns null when all params are not present', () => {
        // Arrange
        const pool = getPool();
        const readings = getReadings();
        const skipped = {
            'ph': true
        };

        // Act
        const res = lsi.function(pool, readings, {}, {}, skipped);

        // Assert
        expect(res).toBe(null);
    });
});
