import type { Meta, StoryObj } from "@storybook/react-vite";
import { Icon } from "./Icon";
import { ICON_NAMES } from "./types";

const meta = {
  title: "Components/Icon",
  parameters: {
    layout: "fullscreen",
  },
  component: Icon,
  tags: ["autodocs"],
} satisfies Meta<typeof Icon>;

export default meta;
type Story = StoryObj<typeof meta>;

const oneLiner = `<Icon name="check" size="md" variant="success" />`;
export const AllIcons: Story = {
  args: { name: "arrow-right" },

  render: () => (
    <div className="space-y-8 bg-background p-8">
      <div className="space-y-4">
        <div>
          <h2 className="mb-2 text-2xl font-semibold text-foreground">Icons</h2>
          <code className="text-sm text-foreground">{oneLiner}</code>
        </div>
        <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-12">
          {ICON_NAMES.map((name) => (
            <div
              key={name}
              className="flex flex-col items-center justify-center gap-2 rounded-md border border-border bg-background p-4 text-center text-foreground"
            >
              <Icon name={name} size="lg" variant="current" />
              <span className="mt-1 text-xs">{name}</span>
            </div>
          ))}
        </div>
      </div>
      <div className="space-y-4">
        <div>
          <h2 className="mb-2 text-2xl font-semibold text-foreground">Colored Icons</h2>
        </div>
        <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-12">
          <div className="flex flex-col items-center justify-center gap-2 rounded-md border border-border bg-background p-4 text-center text-foreground">
            <Icon name="check" size="xl" variant="primary" className="stroke-4" />
            <span className="mt-1 text-xs">check</span>
          </div>
          <div className="flex flex-col items-center justify-center gap-2 rounded-md border border-border bg-background p-4 text-center text-foreground">
            <Icon name="check" size="xl" variant="secondary" className="stroke-4" />
            <span className="mt-1 text-xs">check</span>
          </div>
          <div className="flex flex-col items-center justify-center gap-2 rounded-md border border-border bg-background p-4 text-center text-foreground">
            <Icon name="check" size="xl" variant="success" className="stroke-4" />
            <span className="mt-1 text-xs">check</span>
          </div>
          <div className="flex flex-col items-center justify-center gap-2 rounded-md border border-border bg-background p-4 text-center text-foreground">
            <Icon name="check" size="xl" variant="info" className="stroke-4" />
            <span className="mt-1 text-xs">check</span>
          </div>
          <div className="flex flex-col items-center justify-center gap-2 rounded-md border border-border bg-background p-4 text-center text-foreground">
            <Icon name="check" size="xl" variant="warning" className="stroke-4" />
            <span className="mt-1 text-xs">check</span>
          </div>
          <div className="flex flex-col items-center justify-center gap-2 rounded-md border border-border bg-background p-4 text-center text-foreground">
            <Icon name="check" size="xl" variant="danger" className="stroke-4" />
            <span className="mt-1 text-xs">check</span>
          </div>
          <div className="flex flex-col items-center justify-center gap-2 rounded-md border border-border bg-background p-4 text-center text-foreground">
            <Icon name="check" size="xl" variant="muted" className="stroke-4" />
            <span className="mt-1 text-xs">check</span>
          </div>
        </div>
      </div>
      <div className="space-y-4">
        <div>
          <h2 className="mb-2 text-2xl font-semibold text-foreground">Animated Icons</h2>
        </div>
        <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-12">
          <div className="flex flex-col items-center justify-center gap-2 rounded-md border border-border bg-background p-4 text-center text-foreground">
            <Icon name="loader" size="xl" variant="success" className="animate-spin stroke-4" />
            <span className="mt-1 text-xs">loader</span>
          </div>
        </div>
      </div>
    </div>
  ),
};
