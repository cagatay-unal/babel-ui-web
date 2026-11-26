import type { Meta, StoryObj } from "@storybook/react-vite";

const meta = {
  title: "Design System/Tokens",
  parameters: {
    layout: "fullscreen",
  },
} satisfies Meta;

export default meta;

type Story = StoryObj<typeof meta>;

const colors = [
  {
    name: "Primary",
    variable: "--token-color-primary",
    className: "bg-primary",
  },
  {
    name: "Primary Light",
    variable: "--token-color-primary-light",
    className: "bg-primary-light",
  },
  {
    name: "Primary Dark",
    variable: "--token-color-primary-dark",
    className: "bg-primary-light",
  },
  {
    name: "Secondary",
    variable: "--token-color-secondary",
    className: "bg-secondary",
  },
  {
    name: "Secondary Light",
    variable: "--token-color-secondary-light",
    className: "bg-secondary-light",
  },
  {
    name: "Secondary Dark",
    variable: "--token-color-secondary-dark",
    className: "bg-secondary-dark",
  },
  {
    name: "Success",
    variable: "--token-color-success",
    className: "bg-success",
  },
  {
    name: "Success Light",
    variable: "--token-color-success-light",
    className: "bg-success-light",
  },
  {
    name: "Success Dark",
    variable: "--token-color-success-dark",
    className: "bg-success-dark",
  },
  {
    name: "Info",
    variable: "--token-color-info",
    className: "bg-info",
  },
  {
    name: "Info Light",
    variable: "--token-color-info-light",
    className: "bg-info-light",
  },
  {
    name: "Info Dark",
    variable: "--token-color-info-dark",
    className: "bg-info-dark",
  },
  {
    name: "Warning",
    variable: "--token-color-info",
    className: "bg-warning",
  },
  {
    name: "Warning Light",
    variable: "--token-color-warning-light",
    className: "bg-warning-light",
  },
  {
    name: "Warning Dark",
    variable: "--token-color-warning-dark",
    className: "bg-warning-dark",
  },
  {
    name: "Danger",
    variable: "--token-color-danger",
    className: "bg-danger",
  },
  {
    name: "Danger Light",
    variable: "--token-color-danger-light",
    className: "bg-danger-light",
  },
  {
    name: "Danger Dark",
    variable: "--token-color-danger-dark",
    className: "bg-danger-dark",
  },
  {
    name: "Background",
    variable: "--token-color-background",
    className: "bg-background",
  },
  {
    name: "Foreground",
    variable: "--token-color-foreground",
    className: "bg-foreground",
  },
  {
    name: "Border",
    variable: "--token-color-border",
    className: "bg-border",
  },
];

export const Colors: Story = {
  render: () => (
    <div className="space-y-8 p-8">
      <div>
        <h2 className="mb-2 text-2xl font-semibold">Colors</h2>
        <p className="text-foreground-muted">All color tokens</p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {colors.map((color) => (
          <div key={color.variable} className="mb-8 overflow-hidden rounded-lg shadow-lg">
            <div className={`h-36 ${color.className}`} />
            <div className="space-y-1 p-4">
              <p className="font-bold text-foreground">{color.name}</p>
              <code className="text-foreground-muted text-sm">{color.variable}</code>
            </div>
          </div>
        ))}
      </div>
    </div>
  ),
};
