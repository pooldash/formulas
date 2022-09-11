import { Formula } from '~/formulas/models/Formula';
import { baking_soda } from '~/formulas/treatments/baking_soda';

import { cal_chlor } from '~/formulas/treatments/cal_chlor';
import { m_acid } from '~/formulas/treatments/m_acid';
import { soda_ash } from '~/formulas/treatments/soda_ash';
import { cya as cya_treatment } from '~/formulas/treatments/cya';
import { phosphate_rem } from '../treatments/phosphate_rem';
import { dichlor } from '../treatments/dichlor';
import { chlorineFormula } from './chlorine';
import { DT } from '../models/Helpers';


/// This is the default formula for pools with a chlorinator:
export const dichlorFormula: Formula = {
    name: 'Dichlor',
    description: 'This is for pools with a chlorinator that prefer Dichloro-S-Triazinetrione as the granule shock.',
    id: 'dichlor',
    readings: chlorineFormula.readings,
    targets: chlorineFormula.targets,
    adjusters: chlorineFormula.adjusters,
    balanceOrder: [
        DT('fc', dichlor, null),        // This is the only difference w/ chlorineFormula, we should rethink this formula system
        DT('ph', soda_ash, m_acid),
        DT('ta', baking_soda, m_acid),
        DT('ch', cal_chlor, null),
        DT('cya', cya_treatment, null),
        DT('phosphate', null, phosphate_rem),
    ],
    alwaysCheck: chlorineFormula.alwaysCheck,
};
