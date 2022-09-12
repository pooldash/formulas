import { Formula } from '~/formulas/models/Formula';
import { Pool } from '~/formulas/models/pool/Pool';
import { Reading } from '~/formulas/models/Reading';
import { Treatment } from '~/formulas/models/Treatment';

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

export const getDummyTreatment = (): Treatment => {
    return {
        id: 'dummy',
        name: 'Dummy Treatment',
        type: 'dryChemical',
        concentration: 100,
        function: () => ({
            amount: 1,
            effects: {}
        }),
    };
};

export const getDummyReading = (): Reading => {
    return {
        id: 'dummy',
        name: 'Dummy Treatment',
        decimalPlaces: 1,
        defaultValue: 3,
        isDefaultOn: true,
        offsetReadingId: null,
        sliderRange: {
            min: 0,
            max: 10,
        },
        targetRange: {
            min: 3,
            max: 5,
        },
        type: 'number',
        units: 'ppm',
    };
};


export const getDummyFormula = (): Formula => {
    return {
        id: 'chlorine_cal_hypo',    // Has to technically be valid
        name: 'Test Formula',
        description: 'test',
        adjusters: [],
        targets: [],
        readings: [
            {
                ...getDummyReading(),
                id: 'a',
            }, {
                ...getDummyReading(),
                id: 'b',
            }, {
                ...getDummyReading(),
                id: 'c',
            }
        ],
        balanceOrder: [
            {
                reading_id: 'a',
                up: { ...getDummyTreatment(), id: 'x' },
                down: null,
            },
            {
                reading_id: 'b',
                up: { ...getDummyTreatment(), id: 'y' },
                down: null,
            }
        ],
        alwaysCheck: [
            {
                ...getDummyTreatment(),
                id: 'z',
            }
        ]
    };
};