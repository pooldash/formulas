import { Treatment } from '../models/Treatment';

export const dichlor: Treatment = {
    name: 'Dichlor Shock',
    id: 'dichlor',
    type: 'dryChemical',
    concentration: 99,
    function: (p, r, t, c) => {
        if (r.fc === undefined) { return null; }

        // This target is initialized with a "let" because I might change it later.
        let fcTarget = (c.fc.min + c.fc.max) / 2.0;

        // If we need to shock, adjust the target to breakpoint chlorination:
        let combined = r.tc - r.fc;
        // If the user didn't actually take a TC reading, assume the CC == 0
        if (r.tc === undefined) { combined = 0; }

        if (combined > 0.11) {      // TODO: make the tolerated CC a configurable target range
            const breakpoint = combined * 10;
            // Check the insane case where the breakpoint chlorination level is 15 over the max configured range?
            fcTarget = Math.min(breakpoint, c.fc.max + 15);
            // Check the insane case where there is already a breakpoint amount of chlorine?
            if (r.fc > fcTarget) { return 0; }
        } else {
            // If we don't need to shock, we'll turn up the SWG cell if we need to touch up the levels at all:
            return 0;
        }

        // If we've made it this far, then we probably need to add some chlorine.
        // Let's figure out how much:
        const fcDelta = fcTarget - r.fc;

        // This number is more art than science. It's the approximate ounces of <chemical>
        // required to adjust the measurement by 1ppm in a 1 gallon pool.
        // The stronger a chemical is, the lower this number will be.
        const dichlorMultiplier = .000126;

        // We account for the pool's volume, the desired change, and the chemical's... potency?
        return p.gallons * fcDelta * dichlorMultiplier;
    },
};