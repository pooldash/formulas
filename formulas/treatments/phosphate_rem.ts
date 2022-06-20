import { Treatment } from '~/formulas/models/Treatment';

export const phosphate_rem: Treatment = {
    name: 'Phosphate Remover',
    id: 'phosphate_rem',
    type: 'dryChemical',
    concentration: 100,
    function: ({ pool, deltas }) => {
        if (deltas.phosp === undefined || deltas.phosp <= 0) {
            return null;
        }

        // TODO: verify this
        // 1oz per 10000 gal removed 250 ppb
        // 1/2 oz per 5000 gal remove 250 ppb
        //1250 gallons reduce by 250 ppb requires .125 oz

        const galMultiplier = pool.gallons / 1250;
        const doseage = 0.125;

        const amount = Math.round(galMultiplier * deltas.phosp * doseage * 100.0) / 100.0;
        return {
            amount,
            effects: {
                phosp: deltas.phosp,
            }
        };
    }
};
