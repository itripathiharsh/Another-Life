// Deterministic seeded RNG (p6 §27.1, p4 §77,80).
// Same seed + same call order = same sequence. All simulation randomness
// flows through these functions — never Math.random().

export type Rng = () => number;

/** Mulberry32 — small, fast, deterministic. Seed is any 32-bit integer. */
export function createRng(seed: number): Rng {
  let a = seed >>> 0;
  return () => {
    const { value, next } = mulberry32Step(a);
    a = next;
    return value;
  };
}

/** One mulberry32 step exposed for serializable sessions (save/load). */
export function mulberry32Step(a: number): { value: number; next: number } {
  let t = (a + 0x6d2b79f5) | 0;
  let u = Math.imul(t ^ (t >>> 15), 1 | t);
  u = (u + Math.imul(u ^ (u >>> 7), 61 | u)) ^ u;
  const value = ((u ^ (u >>> 14)) >>> 0) / 4294967296;
  return { value, next: t };
}

export interface SerializableRng {
  next: () => number;
  getState: () => number;
  setState: (state: number) => void;
}

/** RNG with gettable/settable state so sessions survive save/load. */
export function createSerializableRng(seed: number): SerializableRng {
  let a = seed >>> 0;
  return {
    next: () => {
      const { value, next } = mulberry32Step(a);
      a = next;
      return value;
    },
    getState: () => a,
    setState: (state: number) => {
      a = state >>> 0;
    },
  };
}

/** Hash an arbitrary string seed to a 32-bit integer. */
export function hashSeed(input: string): number {
  let h = 2166136261;
  for (let i = 0; i < input.length; i++) {
    h ^= input.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return h >>> 0;
}

/** Integer in [min, max] inclusive, drawn from rng. */
export function randomInt(rng: Rng, min: number, max: number): number {
  return min + Math.floor(rng() * (max - min + 1));
}

/** Pick one element deterministically. Returns undefined for empty arrays. */
export function pick<T>(rng: Rng, items: readonly T[]): T | undefined {
  if (items.length === 0) return undefined;
  return items[Math.floor(rng() * items.length)];
}
