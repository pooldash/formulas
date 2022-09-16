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


/// We define substitutions by mapping reading_id: up | down.
export type TreatmentSubs = Record<string, Omit<Partial<DeltaTreatment>, 'reading_id'>>;
