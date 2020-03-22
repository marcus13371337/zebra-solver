import { Property } from "../Property";
import { PropertyGrid } from "../PropertyGrid";

export interface Constraint {
  isBroken: (grid: PropertyGrid<any>) => boolean;
  getProperties: () => Property<any>[];
}
