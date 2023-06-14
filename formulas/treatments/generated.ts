/// DO NOT EDIT, just change the treatments & run "npm run generate"
import { TreatmentMap } from '../models/misc/FormulaMap';
import { baking_soda } from './baking_soda';
import { bromine } from './bromine';
import { cal_chlor } from './cal_chlor';
import { calc_hypo } from './calc_hypo';
import { cya } from './cya';
import { dichlor } from './dichlor';
import { ionizer } from './ionizer';
import { lsi } from './lsi';
import { m_acid } from './m_acid';
import { na_clo } from './na_clo';
import { oxidizer } from './oxidizer';
import { phosphate_rem } from './phosphate_rem';
import { salt } from './salt';
import { soda_ash } from './soda_ash';
import { sodium_bisulfate } from './sodium_bisulfate';
import { swg_down } from './swg_down';
import { swg_up } from './swg_up';

export const treatmentMap: TreatmentMap = {
    baking_soda,
    bromine,
    cal_chlor,
    calc_hypo,
    cya,
    dichlor,
    ionizer,
    lsi,
    m_acid,
    na_clo,
    oxidizer,
    phosphate_rem,
    salt,
    soda_ash,
    sodium_bisulfate,
    swg_down,
    swg_up,
};
