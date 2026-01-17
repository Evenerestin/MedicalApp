import type { Meta, StoryObj } from "@storybook/react-native";
import { IconBell, IconChevronRight } from "@tabler/icons-react-native";
import React from "react";
import { Button } from "../Button";

const meta: Meta<typeof Button> = {
  title: "Atoms/Buttons/Button/Outline",
  component: Button,
  parameters: { docs: { autodocs: true } },
};
export default meta;

export const Small: StoryObj<typeof Button> = {
  args: { variant: "outline", size: "sm" },
};
export const Medium: StoryObj<typeof Button> = {
  args: { variant: "outline", size: "md" },
};
export const Large: StoryObj<typeof Button> = {
  args: { variant: "outline", size: "lg" },
};
export const FullWidth: StoryObj<typeof Button> = {
  args: { variant: "outline", fullWidth: true },
};
export const Disabled: StoryObj<typeof Button> = {
  args: { variant: "outline", disabled: true },
};
export const Rounded: StoryObj<typeof Button> = {
  args: { variant: "outline", rounded: true },
};
export const LeftIcon: StoryObj<typeof Button> = {
  args: { variant: "outline", size: "md" },
  render: (args) => (
    <Button {...args} leftSection={<IconBell size={16} color="#1976d2" />} />
  ),
};

export const RightIcon: StoryObj<typeof Button> = {
  args: { variant: "outline", size: "md" },
  render: (args) => (
    <Button
      {...args}
      rightSection={<IconChevronRight size={16} color="#1976d2" />}
    />
  ),
};
