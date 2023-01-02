import { calculate } from '~/formulas/calculator';
import { ReadingValues } from '~/formulas/models/misc/Values';
import { EffectiveTargetRange } from '~/formulas/models/TargetRange';
import { getDummyFormula, getDummyTreatment, getPool } from '../helpers/testHelpers';

/*  This should be the formula under test  */
const formula = getDummyFormula();

// Note: a lot of these tests depend on getDummyFormula() having specific params,
// make sure you take a look at the "balanceOrder" & "alwaysCheck" properties there.
describe('Calculate', () => {
    it('uses formula-default treatments when no subs given', () => {
        // Arrange
        const pool = getPool();
        const targetLevels: EffectiveTargetRange[] = [];
        const readings: ReadingValues = {
            a: 0,
            b: 100,
        };

        // Act
        const res = calculate({
            formula,
            pool,
            readings,
            targetLevels,
            substitutions: {},
        });

        // Assert
        expect(Object.keys(res).length).toBe(2);
        expect(res.x).toBeCloseTo(1);
        expect(res.z).toBeCloseTo(1);
    });

    it('uses substitutes when provided for correct directions', () => {
        // Arrange
        const pool = getPool();
        const targetLevels: EffectiveTargetRange[] = [];
        const readings: ReadingValues = {
            a: 0,
            b: 100,
        };
        const v = {
            ...getDummyTreatment(),
            id: 'v',
        };
        const w = {
            ...getDummyTreatment(),
            id: 'w',
        };

        // Act
        const res = calculate({
            formula,
            pool,
            readings,
            targetLevels,
            substitutions: {
                a: { up: v },
                b: { down: w }
            },
        });

        // Assert
        expect(Object.keys(res).length).toBe(3);
        expect(res.v).toBeCloseTo(1);
        expect(res.w).toBeCloseTo(1);
        expect(res.z).toBeCloseTo(1);
    });

    it('ignores substitutes when readings are balanced', () => {
        // Arrange
        const pool = getPool();
        const targetLevels: EffectiveTargetRange[] = [];
        const readings: ReadingValues = {
            a: 4,
            b: 4,
        };
        const v = {
            ...getDummyTreatment(),
            id: 'v',
        };
        const w = {
            ...getDummyTreatment(),
            id: 'w',
        };

        // Act
        const res = calculate({
            formula,
            pool,
            readings,
            targetLevels,
            substitutions: {
                a: { up: v },
                b: { down: w }
            },
        });

        // Assert
        expect(Object.keys(res).length).toBe(1);
        expect(res.z).toBeCloseTo(1);
    });

    it('does not explode when no wallType or waterType is given', () => {
        // Arrange
        const fullPool = getPool();
        const pool = {
            ...fullPool,
            wallType: undefined,
            waterType: undefined,
        };
        const targetLevels: EffectiveTargetRange[] = [];
        const readings: ReadingValues = {
            a: 4,
            b: 4,
        };
        const v = {
            ...getDummyTreatment(),
            id: 'v',
        };
        const w = {
            ...getDummyTreatment(),
            id: 'w',
        };

        // Act
        const res = calculate({
            formula,
            pool,
            readings,
            targetLevels,
            substitutions: {
                a: { up: v },
                b: { down: w }
            },
        });

        // Assert
        expect(Object.keys(res).length).toBe(1);
        expect(res.z).toBeCloseTo(1);
    });
});
