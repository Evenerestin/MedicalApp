import type { Meta, StoryObj } from "@storybook/react-native";
import { IconBell } from "@tabler/icons-react-native";
import React from "react";
import { View } from "react-native";
import { ActionIcon } from "./ActionIcon";

const meta: Meta<typeof ActionIcon> = {
  title: "Atoms/Buttons/ActionIcon/Sizes",
  component: ActionIcon,
  parameters: { docs: { autodocs: true } },
  argTypes: {
    icon: {
      control: false,
      table: { disable: true },
    },
  },
};
export default meta;

export const Small: StoryObj<typeof ActionIcon> = {
  args: {
    size: "sm",
  },
  render: (args) => (
    <ActionIcon size={args.size}  icon={<IconBell />} />
  ),
};

export const Medium: StoryObj<typeof ActionIcon> = {
  args: {
    size: "md",
  },
  render: (args) => (
    <ActionIcon size={args.size} icon={<IconBell />} />
  ),
};

export const Large: StoryObj<typeof ActionIcon> = {
  args: {
    size: "lg",
  },
  render: (args) => (
    <ActionIcon size={args.size}  icon={<IconBell />} />
  ),
};

