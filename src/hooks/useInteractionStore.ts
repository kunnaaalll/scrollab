import { create } from "zustand";

export type CursorVariant = "default" | "link" | "button" | "cta" | "card" | "text" | "hidden";

interface InteractionState {
  cursorVariant: CursorVariant;
  cursorLabel: string | null;
  isHovering: boolean;
  setCursorVariant: (variant: CursorVariant) => void;
  setCursorLabel: (label: string | null) => void;
  setIsHovering: (isHovering: boolean) => void;
  resetCursor: () => void;
}

export const useInteractionStore = create<InteractionState>((set) => ({
  cursorVariant: "default",
  cursorLabel: null,
  isHovering: false,
  setCursorVariant: (variant) => set({ cursorVariant: variant, isHovering: variant !== "default" }),
  setCursorLabel: (label) => set({ cursorLabel: label }),
  setIsHovering: (isHovering) => set({ isHovering }),
  resetCursor: () => set({ cursorVariant: "default", cursorLabel: null, isHovering: false }),
}));
