import { Formula } from '~/formulas/models/Formula';
import { ch } from '~/formulas/readings/ch';
import { ph } from '~/formulas/readings/ph';
import { ta } from '~/formulas/readings/ta';
import { baking_soda } from '~/formulas/treatments/baking_soda';

import { cal_chlor } from '~/formulas/treatments/cal_chlor';
import { lsi } from '~/formulas/treatments/lsi';
import { m_acid } from '~/formulas/treatments/m_acid';
import { soda_ash } from '~/formulas/treatments/soda_ash';
import { copper } from '../readings/copper';
import { phosphate } from '../readings/phosphate';
import { disox } from '../readings/disox';
import { phosphate_rem } from '../treatments/phosphate_rem';
import { ionizer } from '../treatments/ionizer';
import { oxidizer } from '../treatments/oxidizer';
import { DT } from '../models/Helpers';
import { temp_f } from '../readings/temp_f';


/// This is the default formula for pools with a chlorinator:
export const ecoSmarteFormula: Formula = {
    name: 'ECOsmarte',
    description: 'This recipe is for pools using the ECOsmarte copper / oxidation system. For the dissolved oxygen reading, it assumes the pool\'s elevation is approximately 1300 ft.',
    id: 'ecosmarte',
    readings: [
        ph,
        copper,
        ch,
        phosphate,
        temp_f,
        ta,
        disox,
    ],
    targets: [],
    adjusters: [],
    balanceOrder: [
        DT('ph', soda_ash, m_acid),
        DT('ta', baking_soda, m_acid),
        DT('ch', cal_chlor, null),
        DT('phosphate', null, phosphate_rem),
        DT('copper', ionizer, null),
        DT('disox', oxidizer, null),
    ],
    alwaysCheck: [
        lsi,
    ],
};
