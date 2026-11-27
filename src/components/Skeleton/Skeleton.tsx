import type { SkeletonProps } from "./Skeleton.types";
import { skeletonVariants } from "./Skeleton.styles";
import { cn } from "@/shared/utils";

export const Skeleton = ({
  shape = false,
  size,
  width,
  height,
  radius,
  className,
  ...props
}: SkeletonProps) => {
  return (
    <div
      className={cn(skeletonVariants({ shape: shape === "circle", size }), className)}
      style={{ width, height, borderRadius: radius }}
      {...props}
    />
  );
};
