export function random(start: number, end: number, fixed: number = 0): number {
  let differ = end - start;
  let random = Math.random();
  return Number((start + differ * random).toFixed(fixed));
}
