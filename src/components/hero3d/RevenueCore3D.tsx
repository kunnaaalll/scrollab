'use client';

import { EnergySphere } from './EnergySphere';
import { OuterRing } from './OuterRing';
import { InnerRing } from './InnerRing';

/**
 * RevenueCore3D — the central 3D object: rings + glass sphere.
 * Composed of real WebGL geometry only.
 */
export function RevenueCore3D() {
  return (
    <group>
      <EnergySphere />
      <OuterRing />
      <InnerRing />
    </group>
  );
}
