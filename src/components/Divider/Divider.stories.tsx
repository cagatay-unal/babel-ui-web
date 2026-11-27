import type { Meta, StoryObj } from "@storybook/react-vite";
import { Divider } from "./Divider";

const meta = {
  title: "Components/Divider",
  parameters: {
    layout: "fullscreen",
  },
  component: Divider,
  tags: ["autodocs"],
} satisfies Meta<typeof Divider>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    variant: "solid",
    orientation: "horizontal",
    align: "center",
    label: "Divider",
  },
};

export const Dotted: Story = {
  args: {
    variant: "dotted",
    orientation: "horizontal",
    align: "center",
    label: "Divider",
  },
};

export const Dashed: Story = {
  args: {
    variant: "dashed",
    orientation: "horizontal",
    align: "center",
    label: "Divider",
  },
};

export const LabelLeft: Story = {
  args: {
    variant: "solid",
    orientation: "horizontal",
    align: "left",
    label: "Divider",
  },
};

export const LabelRight: Story = {
  args: {
    variant: "solid",
    orientation: "horizontal",
    align: "right",
    label: "Divider",
  },
};

export const Vertical: Story = {
  args: {
    variant: "dashed",
    orientation: "vertical",
  },
  render: (args) => (
    <div className="flex h-16 items-center justify-center gap-6">
      <div>
        <p className="text-sm text-gray-500">Users</p>
        <p className="text-xl font-semibold">1,240</p>
      </div>
      <Divider {...args} />
      <div>
        <p className="text-sm text-gray-500">Balance</p>
        <p className="text-xl font-semibold">$12,400</p>
      </div>
    </div>
  ),
};

export const CustomColor: Story = {
  args: {
    variant: "solid",
    orientation: "horizontal",
    align: "center",
    label: "Divider",
    className: "before:border-primary after:border-primary text-primary",
  },
};
