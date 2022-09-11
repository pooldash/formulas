import { Formula } from '~/formulas/models/Formula';
import { ch } from '~/formulas/readings/ch';
import { cya as cya_reading } from '~/formulas/readings/cya';
import { cya as cya_treatment } from '../treatments/cya';
import { fc } from '~/formulas/readings/fc';
import { ph } from '~/formulas/readings/ph';
import { ta } from '~/formulas/readings/ta';
import { tc } from '~/formulas/readings/tc';
import { phosphate } from '~/formulas/readings/phosphate';
import { temp_c } from '~/formulas/readings/temp_c';
import { temp_f } from '~/formulas/readings/temp_f';
import { baking_soda } from '~/formulas/treatments/baking_soda';

import { cal_chlor } from '~/formulas/treatments/cal_chlor';
import { lsi } from '~/formulas/treatments/lsi';
import { m_acid } from '~/formulas/treatments/m_acid';
import { soda_ash } from '~/formulas/treatments/soda_ash';
import { swg_up } from '~/formulas/treatments/swg_up';
import { swg_down } from '~/formulas/treatments/swg_down';
import { phosphate_rem } from '~/formulas/treatments/phosphate_rem';
import { dichlor } from '../treatments/dichlor';
import { ccTarget } from '../targets/ccTarget';
import { breakpointFCAdjuster } from '../adjusters/breakpoint';
import { salt as salt_reading } from '../readings/salt';
import { salt as salt_treatment } from '../treatments/salt';
import { DT } from '../models/Helpers';


/// This is the default formula for salt-water pools:
export const saltFormula: Formula = {
    name: 'Salt',
    description: 'This is for salt-water pools that use calcium hypochlorite for shock.',
    id: 'salt_calc_hypo',
    readings: [
        fc,
        tc,
        ph,
        ta,
        ch,
        cya_reading,
        salt_reading,
        temp_f,
        temp_c,
        phosphate,
    ],
    targets: [
        ccTarget
    ],
    adjusters: [
        breakpointFCAdjuster
    ],
    balanceOrder: [
        DT('fc', dichlor, null),
        DT('ph', soda_ash, m_acid),
        DT('ta', baking_soda, m_acid),
        DT('ch', cal_chlor, null),
        DT('cya', cya_treatment, null),
        DT('salt', salt_treatment, null),
        DT('phosphate', null, phosphate_rem),
    ],
    alwaysCheck: [
        lsi,
        swg_up,
        swg_down,
    ],
};
