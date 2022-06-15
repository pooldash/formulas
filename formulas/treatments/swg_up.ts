import { Treatment } from '~/formulas/models/Treatment';

export const swg_up: Treatment = {
    name: 'Increase Salt Generator',
    var: 'swg_up',
    type: 'task',
    function: (p, r, t, c) => {
        if (r.NaCl === undefined) { return null; }

        if ( r.NaCl < c.NaCl.min) {
            return 1;
        }
        return null;
    }
};
