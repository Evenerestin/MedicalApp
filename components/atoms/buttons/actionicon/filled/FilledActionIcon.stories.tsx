import type { Meta, StoryObj } from "@storybook/react-native";
import React from "react";
import { ActionIcon } from "../ActionIcon";

const meta: Meta<typeof ActionIcon> = {
  title: "Atoms/Buttons/ActionIcon/Filled",
  component: ActionIcon,
  parameters: { docs: { autodocs: true } },
};
export default meta;

export const Small: StoryObj<typeof ActionIcon> = {
  args: { variant: "filled", size: "sm" },
};
export const Medium: StoryObj<typeof ActionIcon> = {
  args: { variant: "filled", size: "md" },
};
export const Large: StoryObj<typeof ActionIcon> = {
  args: { variant: "filled", size: "lg" },
};
export const Disabled: StoryObj<typeof ActionIcon> = {
  args: { variant: "filled", disabled: true },
};
export const Rounded: StoryObj<typeof ActionIcon> = {
  args: { variant: "filled", rounded: true },
};
