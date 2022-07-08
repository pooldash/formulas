import { calculate } from '~/formulas/calculator';
import { ecoSmarteFormula } from '~/formulas/formulas/ecosmarte';
import { ReadingValues } from '~/formulas/models/misc/Values';
import { EffectiveTargetRange } from '~/formulas/models/TargetRange';
import { getPool } from '../helpers/testHelpers';

/*  This should be the formula under test  */
const formula = ecoSmarteFormula;

describe('ECOsmarte Formula', () => {
    it('returns all the treatments to raise levels when they\'re low', () => {
        // Arrange
        const pool = getPool();
        const targetLevels: EffectiveTargetRange[] = [];
        const readings: ReadingValues = {
            ph: 0,
            ta: 0,
            ch: 0,
            cya: 0,
            tds: 0,
            phosphate: 0,
            copper: 0,
            disox: 0,
        };

        // Act
        const res = calculate({
            formula,
            pool,
            readings,
            targetLevels,
        });

        // Assert
        expect(Object.keys(res).length).toBe(5);
        expect(res.soda_ash).toBeCloseTo(48.0);
        expect(res.baking_soda).toBeCloseTo(147.2);
        expect(res.cal_chlor).toBeCloseTo(432);
        expect(res.oxidizer).toBeCloseTo(1);
        expect(res.ionizer).toBeCloseTo(1);
    });

    it('returns all the treatments to lower levels when they\'re high', () => {
        // Arrange
        const pool = getPool();
        const targetLevels: EffectiveTargetRange[] = [];
        const readings: ReadingValues = {
            ph: 8,
            ta: 300,
            cya: 200,
            temp_f: 200,
            tds: 10000,
            phosphate: 200,
        };

        // Act
        const res = calculate({
            formula,
            pool,
            readings,
            targetLevels,
        });

        // Assert
        expect(Object.keys(res).length).toBe(2);
        expect(res.m_acid).toBeCloseTo(17.4);
        expect(res.phosphate_rem).toBeCloseTo(6);
    });

    it('doesn\'t recommend anything when levels are balanced', () => {
        // Arrange
        const pool = getPool();
        const targetLevels: EffectiveTargetRange[] = [];
        const readings: ReadingValues = {
            ph: 7.2,
            ta: 200,
            ch: 300,
            cya: 40,
            temp_f: 80,
            tds: 500
        };

        // Act
        const res = calculate({
            formula,
            pool,
            readings,
            targetLevels,
        });

        // Assert
        expect(Object.keys(res).length).toBe(1);
        expect(res.lsi).toBeCloseTo(0.052);
    });
});
