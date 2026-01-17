import type { Meta, StoryObj } from "@storybook/react-native";
import { IconBell } from "@tabler/icons-react-native";
import React from "react";
import { ActivityIndicator } from "react-native";
import { ActionIcon } from "./ActionIcon";

const meta: Meta<typeof ActionIcon> = {
  title: "Atoms/Buttons/ActionIcon/Base",
  component: ActionIcon,
  parameters: { docs: { autodocs: true } },
  argTypes: {
    icon: {
      control: false,
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

export const Loading: StoryObj<typeof ActionIcon> = {
  args: {
    size: "md",
    variant: "filled",
    disabled: true,
    loading: true,
  },
};

export const LoadingRounded: StoryObj<typeof ActionIcon> = {
  args: {
    size: "md",
    variant: "filled",
    disabled: true,
    loading: true,
    style: { borderRadius: 50 },
  },
};
