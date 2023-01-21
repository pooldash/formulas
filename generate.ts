import fs from 'fs';
import { Util } from '~/formulas/util';

/// This generates ./formulas/readings/generated.ts and ./formulas/treatments/generated.ts
const exportedFileName = 'generated.ts';

// Pragma readings

// Assume that all the filenames are identical to the reading ids:
const readingIds = fs
    .readdirSync('./formulas/readings')
    .filter(filename => filename !== exportedFileName)
    .map(filename => Util.removeSuffixIfPresent('.ts', filename));


let topReadingString = '';
let bottomReadingString = '';

readingIds.forEach((id) => {
    topReadingString += `import { ${id} } from './${id}';\n`;
    bottomReadingString += `    ${id},\n`;
});

const readingFile = `/// DO NOT EDIT, just change the readings & run "npm run generate"
import { ReadingMap } from '../models/misc/FormulaMap';
${topReadingString}
export const readingMap: ReadingMap = {
${bottomReadingString}};
`;

fs.writeFileSync(`./formulas/readings/${exportedFileName}`, readingFile);

// ===============================
// Pragma treatments
// ===============================

// Assume that all the filenames are identical to the reading ids:
const treatmentIds = fs
    .readdirSync('./formulas/treatments')
    .filter(filename => filename !== exportedFileName)
    .map(filename => Util.removeSuffixIfPresent('.ts', filename));


let topTreatmentString = '';
let bottomTreatmentString = '';

treatmentIds.forEach((id) => {
    topTreatmentString += `import { ${id} } from './${id}';\n`;
    bottomTreatmentString += `    ${id},\n`;
});

const treatmentFile = `/// DO NOT EDIT, just change the treatments & run "npm run generate"
import { TreatmentMap } from '../models/misc/FormulaMap';
${topTreatmentString}
export const treatmentMap: TreatmentMap = {
${bottomTreatmentString}};
`;

fs.writeFileSync(`./formulas/treatments/${exportedFileName}`, treatmentFile);
