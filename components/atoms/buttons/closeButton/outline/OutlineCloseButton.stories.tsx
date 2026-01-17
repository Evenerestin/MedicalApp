import type { Meta, StoryObj } from "@storybook/react-native";
import React from "react";
import { CloseButton } from "../CloseButton";

const meta: Meta<typeof CloseButton> = {
  title: "Atoms/Buttons/CloseButton/Outline",
  component: CloseButton,
  parameters: { docs: { autodocs: true } },
};
export default meta;

export const Small: StoryObj<typeof CloseButton> = {
  args: { variant: "outline", size: "sm" },
};
export const Medium: StoryObj<typeof CloseButton> = {
  args: { variant: "outline", size: "md" },
};
export const Large: StoryObj<typeof CloseButton> = {
  args: { variant: "outline", size: "lg" },
};
export const Disabled: StoryObj<typeof CloseButton> = {
  args: { variant: "outline", disabled: true },
};
export const Rounded: StoryObj<typeof CloseButton> = {
  args: { variant: "outline", rounded: true },
};
