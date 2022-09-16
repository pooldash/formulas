import { Formula } from '~/formulas/models/Formula';
import { ch } from '~/formulas/readings/ch';
import { cya as cya_reading } from '~/formulas/readings/cya';
import { fc } from '~/formulas/readings/fc';
import { ph } from '~/formulas/readings/ph';
import { ta } from '~/formulas/readings/ta';
import { tc } from '~/formulas/readings/tc';
import { tds } from '~/formulas/readings/tds';
import { temp_c } from '~/formulas/readings/temp_c';
import { temp_f } from '~/formulas/readings/temp_f';
import { baking_soda } from '~/formulas/treatments/baking_soda';

import { cal_chlor } from '~/formulas/treatments/cal_chlor';
import { lsi } from '~/formulas/treatments/lsi';
import { soda_ash } from '~/formulas/treatments/soda_ash';
import { cya as cya_treatment } from '~/formulas/treatments/cya';
import { breakpointFCAdjuster } from '../adjusters/breakpoint';
import { ccTarget } from '../targets/ccTarget';
import { phosphate } from '../readings/phosphate';
import { phosphate_rem } from '../treatments/phosphate_rem';
import { na_clo } from '../treatments/na_clo';
import { m_acid } from '../treatments/m_acid';
import { DT } from '../models/Helpers';

/// This is the default formula for pools with a chlorinator:
export const australianFormula: Formula = {
    name: 'Australian',
    description: 'Uses sodium hypochlorite & Hydrochloric Acid',
    id: 'australian',
    readings: [
        fc,
        tc,
        ph,
        ta,
        ch,
        cya_reading,
        temp_f,
        temp_c,
        tds,
        phosphate
    ],
    targets: [
        ccTarget
    ],
    adjusters: [
        breakpointFCAdjuster
    ],
    balanceOrder: [
        DT('fc', na_clo, null),
        DT('ph', soda_ash, m_acid),
        DT('ta', baking_soda, m_acid),
        DT('ch', cal_chlor, null),
        DT('cya', cya_treatment, null),
        DT('phosphate', null, phosphate_rem),
    ],
    alwaysCheck: [
        lsi,
    ],
};
