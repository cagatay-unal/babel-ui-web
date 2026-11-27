import type { HTMLAttributes } from "react";

export interface SkeletonProps extends HTMLAttributes<HTMLDivElement> {
  shape?: "circle" | false;
  size?: 12 | 16 | 20 | 24 | 32 | 40 | 48 | 56 | 64;
  width?: string;
  height?: string;
  radius?: string;
}
