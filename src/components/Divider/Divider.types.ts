import type { HTMLAttributes } from "react";

export interface DividerProps extends HTMLAttributes<HTMLDivElement> {
  variant?: "solid" | "dotted" | "dashed";
  orientation?: "horizontal" | "vertical";
  align?: "left" | "center" | "right";
  label?: string;
}
