"use client";

import { KPISlab3D } from "./KPISlab3D";

const KPI_DATA = [
  { metric: "+327% ROAS", explanation: "Average paid media performance improvement.", position: [-3, 1, 1], color: "#06B6D4", delay: 0 },
  { metric: "14.2K Leads", explanation: "Qualified leads generated per quarter.", position: [3, 2, -1], color: "#EC4899", delay: 1 },
  { metric: "6.4x ROI", explanation: "Return on investment across channels.", position: [-2.5, -1.5, -0.5], color: "#06B6D4", delay: 2 },
  { metric: "-31% CAC", explanation: "Reduction in Customer Acquisition Cost.", position: [3.5, -1, 1.5], color: "#10B981", delay: 3 },
  { metric: "+184% Revenue", explanation: "Year-over-year revenue growth.", position: [0, 3, -2], color: "#EC4899", delay: 4 },
  { metric: "92% Retention", explanation: "Client retention rate over 12 months.", position: [0, -3, 0.5], color: "#06B6D4", delay: 5 },
] as const;

export function FloatingKPIs() {
  return (
    <group>
      {KPI_DATA.map((kpi, idx) => (
        <KPISlab3D 
          key={idx}
          metric={kpi.metric}
          explanation={kpi.explanation}
          position={kpi.position as [number, number, number]}
          color={kpi.color}
          delay={kpi.delay}
        />
      ))}
    </group>
  );
}
