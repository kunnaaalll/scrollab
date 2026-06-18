import React from 'react';
import { OrbitGroup } from '@/components/physics/orbits/OrbitGroup';
import { OrbitObject } from '@/components/physics/orbits/OrbitObject';
import { RevenueCard } from '../kpi/RevenueCard';
import { LeadsCard } from '../kpi/LeadsCard';
import { ConversionCard } from '../kpi/ConversionCard';
import { CACCard } from '../kpi/CACCard';

export const KPIOrbitSystem = ({ className = '' }: { className?: string }) => {
  return (
    <OrbitGroup className={`w-full h-full ${className}`} phaseOffset={Math.PI / 2}>
      {/* Revenue Card Orbit */}
      <OrbitObject radiusX={260} radiusY={140} duration={45} direction={1}>
        <RevenueCard />
      </OrbitObject>

      {/* Leads Card Orbit */}
      <OrbitObject radiusX={300} radiusY={160} duration={55} direction={-1} phase={Math.PI / 4}>
        <LeadsCard />
      </OrbitObject>

      {/* Conversion Rate Orbit */}
      <OrbitObject radiusX={220} radiusY={240} duration={50} direction={1} phase={Math.PI}>
        <ConversionCard />
      </OrbitObject>

      {/* CAC Orbit */}
      <OrbitObject radiusX={280} radiusY={200} duration={60} direction={-1} phase={Math.PI * 1.5}>
        <CACCard />
      </OrbitObject>
    </OrbitGroup>
  );
};
