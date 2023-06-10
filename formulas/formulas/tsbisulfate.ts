import { Formula } from "../models/Formula";
import { DT } from "../models/Helpers";
import { ch } from "../readings/ch";
import { cya } from "../readings/cya";
import { fc } from "../readings/fc";
import { ph } from "../readings/ph";
import { ta } from "../readings/ta";
import { tc } from "../readings/tc";
import { baking_soda } from "../treatments/baking_soda";
import { cal_chlor } from "../treatments/cal_chlor";
import { calc_hypo } from "../treatments/calc_hypo";
import { m_acid } from "../treatments/m_acid";
import { cya as cya_treatment } from '~/formulas/treatments/cya';
import { soda_ash } from "../treatments/soda_ash";
import { sodium_bisulfate } from "../treatments/sodium_bisulfate";
import { lsi } from "../treatments/lsi";



export const testSodiumBisulfateFormula: Formula = {
  name: '(Test) Sodium Bisulfate',
  description: 'Testing Only (for now): Targeted at salt & chlorine pools, this plan takes 6 readings & uses calcium hypochlorite as the sanitizer, with the added option of Sodium Bisulfate to lower pH.',
  id: 'tsbisulfate',
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
}