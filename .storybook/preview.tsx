import type { Preview } from "@storybook/react-vite";
import "./preview.css";

const preview: Preview = {
  parameters: {
    controls: { matchers: { color: /(background|color)$/i, date: /Date$/i } },
    a11y: { test: "error" },
  },
  globalTypes: {
    brand: {
      description: "Marka Seçimi",
      toolbar: {
        title: "Marka",
        icon: "flag",
        dynamicTitle: true,
        items: [
          { value: "default", title: "Default Brand" },
          { value: "xbrand", title: "X Brand" },
        ],
      },
    },
    mode: {
      description: "Light / Dark",
      toolbar: {
        title: "Tema",
        icon: "sun",
        dynamicTitle: true,
        items: [
          { value: "light", icon: "sun", title: "Light" },
          { value: "dark", icon: "moon", title: "Dark" },
        ],
      },
    },
  },
  initialGlobals: { brand: "default", mode: "light" },
  decorators: [
    (Story, context) => {
      const root = document.documentElement;
      root.dataset.brand = context.globals.brand;
      root.dataset.theme = context.globals.mode;
      return Story();
    },
  ],
};

export default preview;
