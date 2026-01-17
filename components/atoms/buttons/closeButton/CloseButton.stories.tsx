import type { Meta, StoryObj } from "@storybook/react-native";
import React from "react";
import { CloseButton } from "./CloseButton";

const meta: Meta<typeof CloseButton> = {
  title: "Atoms/Buttons/CloseButton/Base",
  component: CloseButton,
  parameters: { docs: { autodocs: true } },
};
export default meta;

export const Base: StoryObj<typeof CloseButton> = {
  args: {
    size: "md",
    variant: "filled",
  },
};

export const Loading: StoryObj<typeof CloseButton> = {
  args: {
    size: "md",
    variant: "filled",
    disabled: true,
    loading: true,
  },
};

export const LoadingRounded: StoryObj<typeof CloseButton> = {
  args: {
    size: "md",
    variant: "filled",
    disabled: true,
    loading: true,
    style: { borderRadius: 50 },
  },
};
