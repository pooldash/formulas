import { Treatment } from "../models/Treatment";


export const sodium_bisulfate: Treatment = {
  name: 'Sodium Bisulfate',
  id: 'sb',
  type: 'dryChemical',
  concentration: 100,
  function: ({ pool, deltas }) => {
    if (deltas.ph === undefined || deltas.ph >= 0) {
      return null;
    }

    // Cap the total amount of acid, just in-case someone enters a pH of 100 somehow:
    const maxAmount = .016 * pool.gallons;

    // changed the multiplier to negative. deltas.ph is a neg #. I believe on app.pooldash
    // formula, ph is positive #. 
    const multiplier = -0.0081395;
    const amount = Math.min(maxAmount, pool.gallons * deltas.ph * multiplier);

    //no idea what this value does, copied this code form m_acid
    const effectOnPH = amount / (pool.gallons * multiplier);

    return {
      amount,
      effects: {
        ph: effectOnPH
      }
    }
  }
}