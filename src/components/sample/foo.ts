export const sum = (...a: number[]): number =>
  a.reduce((acc: number, val: number) => acc + val, 0)

// ---------------------------------------------------------------------------

sum(2, 2)
