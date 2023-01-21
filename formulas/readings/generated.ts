/// DO NOT EDIT, just change the readings & run "npm run generate"
import { ReadingMap } from '../models/misc/FormulaMap';
import { bro } from './bro';
import { cc } from './cc';
import { ch } from './ch';
import { copper } from './copper';
import { cya } from './cya';
import { disox } from './disox';
import { fc } from './fc';
import { ph } from './ph';
import { phosphate } from './phosphate';
import { salt } from './salt';
import { ta } from './ta';
import { tc } from './tc';
import { tds } from './tds';
import { temp_c } from './temp_c';
import { temp_f } from './temp_f';

export const readingMap: ReadingMap = {
    bro,
    cc,
    ch,
    copper,
    cya,
    disox,
    fc,
    ph,
    phosphate,
    salt,
    ta,
    tc,
    tds,
    temp_c,
    temp_f,
};
