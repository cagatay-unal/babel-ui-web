import type { StorybookConfig } from "@storybook/react-vite";
import path from "node:path";
import { fileURLToPath } from "node:url";
import tailwindcss from "@tailwindcss/vite";

const dirname = path.dirname(fileURLToPath(import.meta.url));

const config: StorybookConfig = {
  stories: ["../src/**/*.mdx", "../src/**/*.stories.@(js|jsx|mjs|ts|tsx)"],
  addons: ["@storybook/addon-vitest", "@storybook/addon-a11y", "@storybook/addon-docs"],
  framework: "@storybook/react-vite",
  viteFinal: async (config) => {
    config.resolve ??= {};
    config.resolve.alias ??= {};

    const aliasRecord = config.resolve.alias as Record<string, string>;
    aliasRecord["@"] = path.resolve(dirname, "../src");
    config.plugins ??= [];
    config.plugins.push(tailwindcss());

    return config;
  },
};
export default config;
