"use client";

import React, { useEffect } from "react";
import { useInteractionStore, CursorVariant } from "@/hooks/useInteractionStore";

interface CursorLabelProps {
  children: React.ReactNode;
  label: string;
  variant?: CursorVariant;
  className?: string;
}

export function CursorLabel({
  children,
  label,
  variant = "cta",
  className,
}: CursorLabelProps) {
  const { setCursorVariant, setCursorLabel } = useInteractionStore();

  return (
    <div
      className={className}
      onMouseEnter={() => {
        setCursorVariant(variant);
        setCursorLabel(label);
      }}
      onMouseLeave={() => {
        setCursorVariant("default");
        setCursorLabel(null);
      }}
    >
      {children}
    </div>
  );
}
