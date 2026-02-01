import type { Meta, StoryObj } from "@storybook/react-native";
import { IconBell } from "@tabler/icons-react-native";
import React from "react";
import { View } from "react-native";
import { ActionIcon } from "./ActionIcon";

const meta: Meta<typeof ActionIcon> = {
  title: "Atoms/Buttons/ActionIcon/Variants",
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

export const Filled: StoryObj<typeof ActionIcon> = {
  render: (args) => (
    <ActionIcon {...args} variant="filled" icon={<IconBell />} />
  ),
};

export const Light: StoryObj<typeof ActionIcon> = {
  render: (args) => (
    <ActionIcon {...args} variant="light" icon={<IconBell />} />
  ),
};

export const Outline: StoryObj<typeof ActionIcon> = {
  render: (args) => (
    <ActionIcon {...args} variant="outline" icon={<IconBell />} />
  ),
};

export const Transparent: StoryObj<typeof ActionIcon> = {
  render: (args) => (
    <ActionIcon {...args} variant="transparent" icon={<IconBell />} />
  ),
};
