import { Property } from "./Property";

export interface PropertyValue<T> {
  getProperty: () => Property<T>;
  getValue: () => T;
}

export const createPropertyValue = <T>(
  property: Property<T>,
  value: T
): PropertyValue<T> => {
  return {
    getProperty: () => property,
    getValue: () => value
  };
};
