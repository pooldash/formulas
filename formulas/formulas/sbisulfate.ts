import { Formula } from '~/formulas/models/Formula';
import { DT } from '~/formulas/models/Helpers';
import { ch } from '~/formulas/readings/ch';
import { cya } from '~/formulas/readings/cya';
import { fc } from '~/formulas/readings/fc';
import { ph } from '~/formulas/readings/ph';
import { ta } from '~/formulas/readings/ta';
import { tc } from '~/formulas/readings/tc';
import { baking_soda } from '~/formulas/treatments/baking_soda';
import { cal_chlor } from '~/formulas/treatments/cal_chlor';
import { calc_hypo } from '~/formulas/treatments/calc_hypo';
import { m_acid } from '~/formulas/treatments/m_acid';
import { cya as cya_treatment } from '~/formulas/treatments/cya';
import { soda_ash } from '~/formulas/treatments/soda_ash';
import { sodium_bisulfate } from '~/formulas/treatments/sodium_bisulfate';
import { lsi } from '~/formulas/treatments/lsi';


export const sodiumBisulfateFormula: Formula = {
    name: 'Sodium Bisulfate',
    description: 'Targeted at salt & chlorine pools, this plan takes 6 readings & uses calcium hypochlorite as the sanitizer, with the added option of Sodium Bisulfate to lower pH.',
    id: 'sbisulfate',
    readings: [
        fc,
        tc,
        ph,
        ta,
        ch,
        cya,
    ],
    targets: [],
    adjusters: [],
    balanceOrder: [
        DT('fc', calc_hypo, null),
        DT('ph', soda_ash, sodium_bisulfate),
        DT('ta', baking_soda, m_acid),
        DT('ch', cal_chlor, null),
        DT('cya', cya_treatment, null),
    ],
    //put lsi here? 
    alwaysCheck: [lsi],
};
