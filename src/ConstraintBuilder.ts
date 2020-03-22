import { PropertyValue } from "./PropertyValue";
import {
  Creators as PositionCreators,
  createCreators as createPositionCreators
} from "./constraints/PositionConstraint";
import {
  Creators as DistanceCreators,
  createCreators as createDistanceCreators
} from "./constraints/DistanceConstraint";
import {
  Creators as SequenceCreators,
  createCreators as createSequenceCreators
} from "./constraints/SequenceConstraint";
import { Constraint } from "./constraints/Constraint";
import { create as createOrConstraint } from "./constraints/OrConstraint";

interface ConstraintBuilder
  extends PositionCreators,
    DistanceCreators,
    SequenceCreators {}

export const place = (value: PropertyValue<any>): ConstraintBuilder => {
  return {
    ...createPositionCreators(value),
    ...createDistanceCreators(value),
    ...createSequenceCreators(value)
  };
};

export const any = (constraints: Constraint[]) => {
  return createOrConstraint(constraints);
};
