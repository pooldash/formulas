import { Reading } from '~/formulas/models/Reading';

/// I *almost* called this 'nacl', but 'salt' is just so easy.
export const salt: Reading = {
    name: 'Salt Level',
    id: 'salt',
    defaultValue: 3200,
    targetRange: {
        min: 2800,
        max: 3500,
    },
    decimalPlaces: -2,
    sliderRange: {
        min: 0,
        max: 5000,
    },
    offsetReadingId: null,
    type: 'number',
    units: 'ppm',
    isDefaultOn: false,
};
