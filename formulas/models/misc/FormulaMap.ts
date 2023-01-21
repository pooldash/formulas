import { FormulaID } from '../FormulaID';
import { WaterTypeValue } from '../pool/WaterType';
import { Reading } from '../Reading';
import { Treatment } from '../Treatment';

export type FormulaMap = Record<WaterTypeValue, FormulaID>;
export type ReadingMap = Record<string, Reading>
export type TreatmentMap = Record<string, Treatment>
