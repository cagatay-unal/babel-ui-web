import type { Meta, StoryObj } from "@storybook/react-vite";
import { Skeleton } from "./Skeleton";
import type { SkeletonProps } from "./Skeleton.types";

const meta = {
  title: "Components/Skeleton",
  parameters: {
    layout: "fullscreen",
  },
  component: Skeleton,
  tags: ["autodocs"],
} satisfies Meta<typeof Skeleton>;

export default meta;

type Story = StoryObj<typeof meta>;

const sizeList = [12, 16, 20, 24, 32, 40, 48, 56, 64] satisfies NonNullable<
  SkeletonProps["size"]
>[];

export const Default: Story = {
  args: {
    size: 32,
  },
};

export const Circle: Story = {
  render: () => (
    <div className="flex flex-wrap items-start gap-6 p-8">
      <Skeleton shape="circle" size={40} />
      <Skeleton shape="circle" size={32} />
      <Skeleton shape="circle" size={24} />
      <Skeleton shape="circle" size={20} />
      <Skeleton shape="circle" size={16} />
      <Skeleton shape="circle" size={12} />
    </div>
  ),
};

export const Square: Story = {
  render: () => (
    <div className="flex w-full flex-wrap items-start gap-6 p-8">
      {[...sizeList].reverse().map((size) => (
        <Skeleton key={size} size={size} />
      ))}
    </div>
  ),
};

export const Rectangle: Story = {
  render: () => (
    <div className="flex w-full flex-col items-start gap-6 p-8">
      <Skeleton />
      <Skeleton width="12rem" />
      <Skeleton width="7rem" />
      <Skeleton height="4rem" />
      <Skeleton width="12rem" height="4rem" />
    </div>
  ),
};

export const Rounded: Story = {
  render: () => (
    <div className="flex w-full flex-col items-start gap-6 p-8">
      <Skeleton radius="16px" />
      <Skeleton width="12rem" radius="16px" />
      <Skeleton width="7rem" radius="16px" />
      <Skeleton height="4rem" radius="16px" />
      <Skeleton width="12rem" height="4rem" radius="16px" />
    </div>
  ),
};

export const CardSkeleton: Story = {
  render: () => (
    <div className="grid grid-cols-1 gap-8 p-2 sm:grid-cols-2 xl:grid-cols-3">
      <div className="rounded-lg bg-background p-4 dark:bg-background/75">
        <Skeleton width="100%" height="10rem" />
        <div className="mt-4 flex items-start gap-3">
          <Skeleton shape="circle" size={12} />
          <div className="flex flex-1 flex-col gap-2">
            <Skeleton width="100%" radius="4px" />
            <Skeleton width="90%" radius="4px" />
          </div>
        </div>
      </div>
    </div>
  ),
};
