import { Pool } from '~/formulas/models/pool/Pool';

export const getPool = (): Pool => {
    const bentleysPool: Omit<Pool, 'liters'> = {
        gallons: 20000,
        wallType: 'plaster',
        waterType: 'chlorine',
    };
    return {
        ...bentleysPool,
        liters: bentleysPool.gallons * 3.785411784,
    };
};
