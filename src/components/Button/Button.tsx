import type { ComponentProps } from "react";
import { cn } from "../../shared/utils/cn";
import { buttonVariants, type ButtonVariantProps } from "./Button.styles";

export type ButtonProps = ComponentProps<"button"> & ButtonVariantProps;

export function Button({ className, variant, size, type = "button", ...props }: ButtonProps) {
  return (
    <button type={type} className={cn(buttonVariants({ variant, size }), className)} {...props} />
  );
}
