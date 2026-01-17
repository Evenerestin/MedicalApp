import type { Meta, StoryObj } from "@storybook/react-native";
import React from "react";
import { CloseButton } from "../CloseButton";

const meta: Meta<typeof CloseButton> = {
  title: "Atoms/Buttons/CloseButton/Transparent",
  component: CloseButton,
  parameters: { docs: { autodocs: true } },
};
export default meta;

export const Small: StoryObj<typeof CloseButton> = {
  args: { variant: "transparent", size: "sm" },
};
export const Medium: StoryObj<typeof CloseButton> = {
  args: { variant: "transparent", size: "md" },
};
export const Large: StoryObj<typeof CloseButton> = {
  args: { variant: "transparent", size: "lg" },
};
export const Disabled: StoryObj<typeof CloseButton> = {
  args: { variant: "transparent", disabled: true },
};
export const Rounded: StoryObj<typeof CloseButton> = {
  args: { variant: "transparent", rounded: true },
};
