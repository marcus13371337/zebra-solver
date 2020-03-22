export const containsSameValue = <T>(array: T[]): boolean =>
  array.every(value => value === array[0]);
