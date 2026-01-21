import type { Meta, StoryObj } from "@storybook/react-native";
import { IconBell } from "@tabler/icons-react-native";
import React from "react";
import { ActivityIndicator, View } from "react-native";
import { ActionIcon } from "./ActionIcon";

const meta: Meta<typeof ActionIcon> = {
  title: "Atoms/Buttons/ActionIcon",
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

export const Base: StoryObj<typeof ActionIcon> = {
  args: {
    size: "md",
    variant: "filled",
  },
  render: (args) => (
    <ActionIcon {...args} icon={<IconBell size={24} color="#fff" />} />
  ),
};

export const Rounded: StoryObj<typeof ActionIcon> = {
  args: {
    size: "md",
    variant: "filled",
    rounded: true,
  },
  render: (args) => (
    <ActionIcon {...args} icon={<IconBell size={24} color="#fff" />} />
  ),
};

export const Disabled: StoryObj<typeof ActionIcon> = {
  args: {
    size: "md",
    variant: "filled",
    disabled: true,
  },
  render: (args) => (
    <ActionIcon {...args} icon={<IconBell size={24} color="#fff" />} />
  ),
};
