import { Treatment } from '../Treatment';


/// For a given reading, how should we try to effect it?
export interface DeltaTreatment {
    /// The id of the reading to effect
    reading_id: string;
    /// The treatment to raise the reading.
    up: Treatment | null;
    /// The treatment to lower the reading.
    down: Treatment | null;
}


/// For convenience, we sometimes access these by reading_id
export type DeltaTreatmentMap = Record<string, DeltaTreatment>;
