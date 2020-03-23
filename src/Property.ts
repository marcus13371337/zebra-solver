import { create as createPropertyValue, PropertyValue } from "./PropertyValue";

export interface Property<T> {
  getId: () => string;
  get: (value: T) => PropertyValue<T>;
  getValues: () => T[];
  getLength: () => number;
  biggest: () => PropertyValue<T>;
  smallest: () => PropertyValue<T>;
}

export const create = <T>(id: string, values: T[]): Property<T> => {
  const sortedValues = values.concat().sort();

  const get = (value: T) => {
    if (!sortedValues.includes(value)) {
      throw new Error(
        `Trying to get non-existent value ${value} from property ${id}`
      );
    }
    return createPropertyValue(property, value);
  };

  const property: Property<T> = {
    get,
    getId: () => id,
    getValues: () => values,
    getLength: () => values.length,
    biggest: () => get(sortedValues[sortedValues.length - 1]),
    smallest: () => get(sortedValues[0])
  };

  return property;
};
