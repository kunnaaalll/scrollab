import * as THREE from 'three';

export interface TestimonialData {
  id: string;
  quote: string;
  author: string;
  role: string;
  position: THREE.Vector3;
  delay: number;
}

export const TESTIMONIALS_3D: TestimonialData[] = [
  { 
    id: "t1",
    quote: "Scrollab engineered a revenue machine that outperformed our previous agency by 300% in 60 days.", 
    author: "Sarah Jenkins", 
    role: "CMO, TechFlow", 
    position: new THREE.Vector3(-150, 50, 50),
    delay: 0,
  },
  { 
    id: "t2",
    quote: "It feels like we finally have a true growth partner. Their AI systems are lightyears ahead.", 
    author: "David Chen", 
    role: "Founder, ScaleAI", 
    position: new THREE.Vector3(120, 80, -50),
    delay: 1.2,
  },
  { 
    id: "t3",
    quote: "The transparency and the results are unmatched. Our CAC dropped 40% in quarter one.", 
    author: "Elena Rossi", 
    role: "VP Marketing, Nova", 
    position: new THREE.Vector3(-80, -60, 120),
    delay: 2.4,
  },
  { 
    id: "t4",
    quote: "Not just another agency. They operate like an elite in-house engineering and growth team.", 
    author: "Marcus Thorne", 
    role: "CEO, BuildCore", 
    position: new THREE.Vector3(180, -40, 20),
    delay: 3.6,
  },
  { 
    id: "t5",
    quote: "Flawless execution. We scaled from $1M to $5M ARR completely through their funnels.", 
    author: "Alicia Kemp", 
    role: "Head of Growth, Vertex", 
    position: new THREE.Vector3(40, -100, -100),
    delay: 4.8,
  },
];
