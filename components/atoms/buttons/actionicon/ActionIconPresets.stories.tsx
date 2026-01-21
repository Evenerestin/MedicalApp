import type { Meta, StoryObj } from "@storybook/react-native";
import { IconBell } from "@tabler/icons-react-native";
import React from "react";
import { View } from "react-native";
import { ActionIcon } from "./ActionIcon";

const meta: Meta<typeof ActionIcon> = {
  title: "Atoms/Buttons/ActionIcon/Presets",
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

export const Close: StoryObj<typeof ActionIcon> = {
  render: (args) => (
    <View style={{ display: "flex", flexDirection: "row", gap: 10 }}>
      <ActionIcon size={args.size} preset="close" variant="filled" />
      <ActionIcon size={args.size} preset="close" variant="light" />
      <ActionIcon size={args.size} preset="close" variant="outline" />
      <ActionIcon size={args.size} preset="close" variant="transparent" />
    </View>
  ),
};

export const Add: StoryObj<typeof ActionIcon> = {
  render: (args) => (
    <View style={{ display: "flex", flexDirection: "row", gap: 10 }}>
      <ActionIcon size={args.size} preset="add" variant="filled" />
      <ActionIcon size={args.size} preset="add" variant="light" />
      <ActionIcon size={args.size} preset="add" variant="outline" />
      <ActionIcon size={args.size} preset="add" variant="transparent" />
    </View>
  ),
};

export const Edit: StoryObj<typeof ActionIcon> = {
  render: (args) => (
    <View style={{ display: "flex", flexDirection: "row", gap: 10 }}>
      <ActionIcon size={args.size} preset="edit" variant="filled" />
      <ActionIcon size={args.size} preset="edit" variant="light" />
      <ActionIcon size={args.size} preset="edit" variant="outline" />
      <ActionIcon size={args.size} preset="edit" variant="transparent" />
    </View>
  ),
};
