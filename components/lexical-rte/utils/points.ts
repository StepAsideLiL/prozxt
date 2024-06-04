import { PointType } from "lexical";

/**
 * Checks if two points are the same meaning if there is a selection or not.
 * @param points [PointType, PointType] | null | undefined
 * @returns boolean
 */
export function isSamePoint(points: [PointType, PointType] | null | undefined) {
  if (points === null || points === undefined) {
    return false;
  }

  const pointOne = points[0];
  const pointTwo = points[1];

  console.log("pointOne.key => ", pointOne.key);
  console.log("pointTwo.key => ", pointTwo.key);
  console.log("pointOne.offset => ", pointOne.offset);
  console.log("pointTwo.offset => ", pointTwo.offset);

  return pointOne.key === pointTwo.key && pointOne.offset === pointTwo.offset;
}
