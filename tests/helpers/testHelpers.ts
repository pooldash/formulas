import { Pool } from '~/formulas/models/pool/Pool';

export const getPool = (): Pool => {
    const testPool: Omit<Pool, 'liters'> = {
        gallons: 10000,
        wallType: 'plaster',
        waterType: 'chlorine',
    };
    return {
        ...testPool,
        liters: testPool.gallons * 3.785411784,
    };
};
