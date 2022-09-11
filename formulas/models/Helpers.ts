import { DeltaTreatment } from './misc/DeltaTreatment';
import { Treatment } from './Treatment';

/// Syntactic sugar to construct a DeltaTreatment with less code:
export const DT = (reading_id: string, up: Treatment | null, down: Treatment | null): DeltaTreatment => {
    return {
        reading_id,
        up,
        down
    };
};