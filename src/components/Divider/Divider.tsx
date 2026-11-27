import type { DividerProps } from "./Divider.types";
import { cn } from "@/shared/utils";
import { dividerVariants } from "./Divider.styles";

export const Divider = ({
  variant = "solid",
  orientation = "horizontal",
  align = "center",
  label,
  className,
  ...props
}: DividerProps) => {
  return (
    <div
      className={cn(
        dividerVariants({ variant, orientation, align, hasLabel: Boolean(label) }),
        className,
      )}
      {...props}
      role="separator"
      aria-orientation={orientation}
    >
      {label && <span className="shrink-0">{label}</span>}
    </div>
  );
};
