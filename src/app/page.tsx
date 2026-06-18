import { Suspense } from "react";
import { PageTransitionProvider } from "@/lib/page-transition/context";
import { CursorSystem } from "@/components/interactions/cursor/CursorSystem";
import { GlowFollower } from "@/components/interactions/glow/GlowFollower";
import { LenisProvider } from "@/providers/LenisProvider";
import { FloatingNavbar } from "@/components/navigation/navbar/FloatingNavbar";
import { SceneContainer } from "@/components/transitions/scene/SceneContainer";
import { SharedGlow } from "@/components/transitions/scene/SharedGlow";
import { ScrollProgress } from "@/components/transitions/scene/ScrollProgress";
import { RouteTransition } from "@/components/transitions/page/route/RouteTransition";

import { HeroSection } from "@/components/hero/HeroSection";
import { ServicesGalaxy } from "@/components/services3d/ServicesGalaxy";
import { ResultsUniverse } from "@/components/results3d/ResultsUniverse";
import { AISection } from "@/components/ai-core/AISection";
import { ProcessJourney } from "@/components/process/ProcessJourney";
import { TestimonialUniverse } from "@/components/testimonials/TestimonialUniverse";
import { FinalOrbCTA } from "@/components/home/cta/FinalOrbCTA";

export default function Home() {
  return (
    <Suspense fallback={null}>
      <PageTransitionProvider>
        <CursorSystem />
        <GlowFollower />
        <LenisProvider>
          <FloatingNavbar />
          <SceneContainer>
            <SharedGlow color="cyan" position="top" intensity="low" />
            <ScrollProgress />
            <RouteTransition>
              <HeroSection />
              <ServicesGalaxy />
              <ResultsUniverse />
              <AISection />
              <ProcessJourney />
              <TestimonialUniverse />
              <FinalOrbCTA />
            </RouteTransition>
          </SceneContainer>
        </LenisProvider>
      </PageTransitionProvider>
    </Suspense>
  );
}
