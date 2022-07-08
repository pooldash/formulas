import { breakpointFCAdjuster } from '~/formulas/adjusters/breakpoint';
import { EffectiveTargetRanges, EffectValues, ReadingValues } from '~/formulas/models/misc/Values';

describe('Breakpoint FC Adjuster', () => {
    it('should not adjust anything when cc is below max', () => {
        // Arrange
        const readings: ReadingValues = {
            fc: 0,
            tc: 0,
        };
        const targets: EffectiveTargetRanges = {
            cc: {
                min: 0,
                max: 0,
            },
        };
        const deltas: EffectValues = {
            fc: 3.0
        };

        // Act
        const res = breakpointFCAdjuster({ readings, targets, deltas });

        // Assert
        expect(res.deltas).toMatchObject(deltas);
        expect(res.targets).toMatchObject(targets);
        expect(res.readings).toMatchObject(readings);
    });

    it('should adjust fc to breakpoint chlorination when cc is above max', () => {
        // Arrange
        const readings: ReadingValues = {
            fc: 0,
            tc: 1.1,
        };
        const targets: EffectiveTargetRanges = {
            cc: {
                min: 0,
                max: 0,
            },
        };
        const deltas: EffectValues = {
            fc: 3.0
        };

        // Act
        const res = breakpointFCAdjuster({ readings, targets, deltas });

        // Assert
        expect(res.deltas).toMatchObject({
            fc: 11,
        });
        expect(res.targets).toMatchObject({
            fc: {
                min: 11,
                max: 11,
            }
        });
        expect(res.readings).toMatchObject({
            ...readings,
            cc: 1.1
        });
    });

    it('should adjust fc target to 20 when breakpoint level is higher than 20', () => {
        // Arrange
        const readings: ReadingValues = {
            fc: 0,
            tc: 3,
        };
        const targets: EffectiveTargetRanges = {
            cc: {
                min: 0,
                max: 0,
            },
        };
        const deltas: EffectValues = {
            fc: 3.0
        };

        // Act
        const res = breakpointFCAdjuster({ readings, targets, deltas });

        // Assert
        expect(res.deltas).toMatchObject({
            fc: 20,
        });
        expect(res.targets).toMatchObject({
            fc: {
                min: 20,
                max: 20,
            }
        });
        expect(res.readings).toMatchObject({
            ...readings,
            cc: 3
        });
    });
});