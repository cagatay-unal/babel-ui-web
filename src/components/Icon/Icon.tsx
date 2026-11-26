import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/shared/utils";
import { ICON_MAP } from "./icon-map";
import { ICON_SIZE_TOKENS, type IconSize } from "./tokens";
import type { IconName } from "./types";

const iconVariants = cva("icon inline-block shrink-0 align-middle", {
  variants: {
    variant: {
      current: "text-foreground",
      primary: "text-primary",
      secondary: "text-secondary",
      success: "text-success",
      info: "text-info",
      warning: "text-warning",
      danger: "text-danger",
      muted: "text-foreground-muted",
    },
  },
  defaultVariants: {
    variant: "current",
  },
});

type IconVariantProps = VariantProps<typeof iconVariants>;

export interface IconProps
  extends Omit<React.SVGProps<SVGSVGElement>, "name" | "size">, IconVariantProps {
  name: IconName;
  size?: IconSize | number;
  "aria-label"?: string;
}

function resolveSize(size: IconSize | number): number {
  return typeof size === "number" ? size : ICON_SIZE_TOKENS[size];
}

export const Icon = React.forwardRef<SVGSVGElement, IconProps>(
  (
    {
      name,
      size = "lg",
      variant,
      className,
      "aria-label": ariaLabel,
      "aria-hidden": ariaHiddenProp,
      role,
      ...props
    },
    ref,
  ) => {
    const glyph = ICON_MAP[name];

    if (!glyph) {
      if (process.env.NODE_ENV !== "production") {
        console.warn(
          `[Icon] Bilinmeyen simge adı: "${name}". Simge oluşturucuyu çalıştırdınız mı?`,
        );
      }
      return null;
    }

    const isDecorative = !ariaLabel;
    const pixelSize = resolveSize(size);

    return React.createElement(
      "svg",
      {
        ref,
        xmlns: "http://www.w3.org/2000/svg",
        width: pixelSize,
        height: pixelSize,
        viewBox: "0 0 24 24",
        fill: "none",
        stroke: "currentColor",
        strokeWidth: 2,
        strokeLinecap: "round",
        strokeLinejoin: "round",
        focusable: "false",
        role: role ?? (isDecorative ? undefined : "img"),
        "aria-hidden": ariaHiddenProp ?? (isDecorative ? "true" : undefined),
        "aria-label": ariaLabel,
        className: cn(iconVariants({ variant }), className),
        ...props,
      },
      glyph,
    );
  },
);

Icon.displayName = "Icon";
