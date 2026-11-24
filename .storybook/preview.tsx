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
        icon: "paintbrush",
        dynamicTitle: true,
        items: [
          { value: "default", title: "Default Brand" },
          { value: "xbrand", title: "X Brand" },
        ],
      },
    },
    mode: {
      description: "Açık / koyu",
      toolbar: {
        title: "Tema",
        icon: "moon",
        dynamicTitle: true,
        items: [
          { value: "light", title: "Açık" },
          { value: "dark", title: "Koyu" },
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
