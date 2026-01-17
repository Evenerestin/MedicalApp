import type { Meta, StoryObj } from "@storybook/react-native";
import React from "react";
import { ActivityIndicator } from "react-native";
import { Button } from "./Button";

const meta: Meta<typeof Button> = {
  title: "Atoms/Buttons/Button/Base",
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

export const Loading: StoryObj<typeof Button> = {
  args: {
    label: "Loading",
    variant: "filled",
    size: "md",
    disabled: true,
    loading: true,
  },
};

export const LoadingRounded: StoryObj<typeof Button> = {
  args: {
    label: "Loading Rounded",
    variant: "filled",
    size: "md",
    disabled: true,
    loading: true,
    style: { borderRadius: 50 },
  },
};
