import type { Meta, StoryObj } from "@storybook/react-native";
import colors from "@theme/colors";
import React from "react";
import { ActivityIndicator, View } from "react-native";
import { Button } from "./Button";

const meta: Meta<typeof Button> = {
  title: "Atoms/Buttons/Button",
  component: Button,
  parameters: { docs: { autodocs: true } },
};
export default meta;

export const Base: StoryObj<typeof Button> = {
  args: {
    label: "Base Button",
    variant: "filled",
    size: "md",
  },
};

export const Rounded: StoryObj<typeof Button> = {
  args: {
    label: "Rounded Button",
    variant: "filled",
    size: "md",
    rounded: true,
  },
};

export const Disabled: StoryObj<typeof Button> = {
  args: {
    label: "Disabled Button",
    variant: "filled",
    size: "md",
    disabled: true,
  },
};
