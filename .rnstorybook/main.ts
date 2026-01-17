import type { StorybookConfig } from "@storybook/react-native";

const main: StorybookConfig = {
  stories: [
    "../src/stories/**/*.mdx",
    "../src/stories/**/*.stories.@(js|jsx|ts|tsx)",
    "../components/**/*.stories.?(ts|tsx|js|jsx)",
    "../screens/**/*.stories.?(ts|tsx|js|jsx)",
  ],
  addons: [
    "@storybook/addon-ondevice-notes",
    "@storybook/addon-ondevice-controls",
    "@storybook/addon-ondevice-backgrounds",
    "@storybook/addon-ondevice-actions",
    "@storybook/addon-links",
    "@storybook/addon-essentials",
    "@storybook/addon-interactions",
    "@storybook/addon-a11y",
    "@storybook/addon-viewport",
  ],
  framework: "@storybook/react-native",
};

export default main;
