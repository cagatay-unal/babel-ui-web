import { cva } from "class-variance-authority";

export const skeletonVariants = cva(
  ["d-block w-full h-4 overflow-hidden", "bg-skeleton-background animate-pulse"],
  {
    variants: {
      shape: {
        true: "rounded-full",
        false: "rounded-lg",
      },
      size: {
        12: "size-12",
        16: "size-16",
        20: "size-20",
        24: "size-24",
        32: "size-32",
        40: "size-40",
        48: "size-48",
        56: "size-56",
        64: "size-64",
      },
    },
    defaultVariants: {
      shape: false,
    },
  },
);
