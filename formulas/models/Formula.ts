import { TargetRange } from './TargetRange';
import { Reading } from './Reading';
import { Treatment } from './Treatment';
import { FormulaID } from './FormulaID';
import { GetUpdatedReadingsAndDeltas } from './misc/UpdatedTargets';
import { DeltaTreatment } from './misc/DeltaTreatment';

/**
 * Attempts to codify the instructions for a specific type of pool maintenance.
 *
 * If you want to skip to the good stuff, check out the treatment functions in Treatment.ts
 */
export interface Formula {
    // The user-visible name of the  (ideally, should be unique)
    name: string;

    // The id of the formula (all lowercase, just letters, numbers, and underscores)
    id: FormulaID;

    // User-visible text that attempts to enlighten the user in a few sentences (good luck!)
    description: string;

    // The readings to take
    readings: Reading[];

    // Defines both the ordering of which deltas are treated, and the default treatments associated with each effect.
    // The treatments for each effect can be overridden via substitutes.
    balanceOrder: DeltaTreatment[];

    // The possible treatments to apply (each of these includes a formula)
    alwaysCheck: Treatment[];

    // Any overrides to the default target ranges. These can still be overridden again by the end-user.
    targets: TargetRange[];

    // Any logic to adjust the readings & deltas based on a combination of factors
    // For example, if the fc is only slightly low, but we need breakpoint chlorination to balance the cc.
    adjusters: GetUpdatedReadingsAndDeltas[];
}
