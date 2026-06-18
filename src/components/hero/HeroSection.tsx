'use client';

import React, { Suspense } from 'react';
import { BackgroundLayer } from '@/components/background/BackgroundLayer';
import { HeroLighting } from '@/components/lighting/HeroLighting';
import { ScrollIndicator } from './ScrollIndicator';
import { HeroTextBlock } from './text/HeroTextBlock';
import { CTAGroup } from './CTAGroup';

// The real 3D scene — lazy imported inside Suspense
const HeroExperience = React.lazy(() =>
  import('@/components/hero3d/HeroExperience').then((m) => ({
    default: m.HeroExperience,
  }))
);

/**
 * HeroSection — cinematic hero layout.
 *
 * Desktop layout (per spec PROMPT_01):
 * ┌──────────────────────────────────────────┐
 * │  LEFT (40%)          RIGHT (60%)         │
 * │  Headline            Large 3D Scene       │
 * │  Copy                (Revenue Engine)     │
 * │  CTA                                     │
 * └──────────────────────────────────────────┘
 *
 * Tablet: 50/50
 * Mobile: text top, scene below (scene reduced)
 *
 * The entire right column IS the 3D Canvas.
 * No CSS cards pretending to be 3D.
 * No pink circles.
 * No flat SaaS layout.
 */
export const HeroSection = () => {
  return (
    <section
      className="relative w-full overflow-hidden"
      style={{ minHeight: '100vh' }}
    >
      {/* ── Background atmosphere (z-0) ── */}
      <BackgroundLayer variant="hero" className="absolute inset-0 z-0 pointer-events-none" />

      {/* ── CSS lighting glows (z-1) ── */}
      <HeroLighting />

      {/* ── Main content grid ── */}
      <div
        className="relative z-10 w-full"
        style={{
          minHeight: '100vh',
          display: 'grid',
          gridTemplateColumns: '1fr',   // mobile: 1 col
          gridTemplateRows: 'auto',
        }}
      >
        {/*
         * Inner flex row on desktop.
         * Tailwind md: breakpoint for the two-column split.
         */}
        <div
          className="flex flex-col md:flex-row w-full"
          style={{ minHeight: '100vh' }}
        >
          {/* ── LEFT COLUMN — Text + CTA (40% desktop) ── */}
          <div
            className="
              flex flex-col justify-center
              px-8 md:px-12 lg:px-16
              pt-32 pb-16
              md:pt-0 md:pb-0
              w-full md:w-[40%]
              order-1 md:order-1
            "
          >
            <HeroTextBlock />
            <CTAGroup />
          </div>

          {/* ── RIGHT COLUMN — True 3D Scene (60% desktop) ── */}
          <div
            className="
              relative
              w-full md:w-[60%]
              order-2 md:order-2
              flex items-center justify-center
            "
            style={{
              minHeight: '460px',
              height: '100%',
            }}
          >
            {/*
             * The HeroExperience fills this container completely.
             * It is a React.lazy import so it doesn't block page load.
             * The Canvas sits at z-index: auto — on top of CSS background,
             * but below any foreground UI.
             */}
            <Suspense
              fallback={
                /* Static fallback while R3F loads */
                <div
                  className="w-full h-full flex items-center justify-center"
                  style={{ minHeight: '460px' }}
                >
                  <div
                    className="rounded-full"
                    style={{
                      width: 240,
                      height: 240,
                      background:
                        'radial-gradient(circle, rgba(6,182,212,0.3) 0%, rgba(6,182,212,0.05) 60%, transparent 100%)',
                      boxShadow: '0 0 80px rgba(6,182,212,0.2)',
                    }}
                  />
                </div>
              }
            >
              <div className="absolute inset-0">
                <HeroExperience />
              </div>
            </Suspense>
          </div>
        </div>
      </div>

      {/* ── Scroll Indicator ── */}
      <ScrollIndicator />
    </section>
  );
};

export default HeroSection;
