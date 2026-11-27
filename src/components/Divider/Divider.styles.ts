import { cva } from "class-variance-authority";

export const dividerVariants = cva(
  [
    "relative flex items-center",
    "before:content-[''] before:block before:shrink-0",
    "after:content-[''] after:block after:shrink-0",
    "before:border-border after:border-border",
    "text-foreground",
  ],
  {
    variants: {
      variant: {
        solid: "",
        dotted: "",
        dashed: "",
      },

      orientation: {
        horizontal: [
          "w-full min-h-px flex-row",
          "before:flex-1 before:border-t",
          "after:flex-1 after:border-t",
        ],
        vertical: [
          "h-full min-w-px flex-col",
          "before:flex-1 before:border-l",
          "after:flex-1 after:border-l",
        ],
      },

      align: {
        left: "",
        center: "",
        right: "",
      },

      hasLabel: {
        true: "gap-2",
        false: "",
      },
    },

    compoundVariants: [
      {
        variant: "dotted",
        className: "before:border-dotted after:border-dotted",
      },
      {
        variant: "dashed",
        className: "before:border-dashed after:border-dashed",
      },
      {
        orientation: "horizontal",
        align: "left",
        hasLabel: true,
        className: "before:flex-none before:w-4 after:flex-1",
      },
      {
        orientation: "horizontal",
        align: "center",
        hasLabel: true,
        className: "before:flex-1 after:flex-1",
      },
      {
        orientation: "horizontal",
        align: "right",
        hasLabel: true,
        className: "before:flex-1 after:flex-none after:w-4",
      },
    ],

    defaultVariants: {
      variant: "solid",
      orientation: "horizontal",
      align: "center",
      hasLabel: false,
    },
  },
);
