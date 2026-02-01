import type { Meta, StoryObj } from "@storybook/react-native";
import { IconHome, IconUser } from "@tabler/icons-react-native";
import React from "react";
import { MenuTabButton } from "./MenuTabButton";

const meta: Meta<typeof MenuTabButton> = {
  title: "Molecules/Navigation/MenuTabButton",
  component: MenuTabButton,
  parameters: { docs: { autodocs: true } },
};
export default meta;

export const Default: StoryObj<typeof MenuTabButton> = {
  args: {
    icon: IconHome,
    active: false,
    onPress: () => {},
  },
};

export const Active: StoryObj<typeof MenuTabButton> = {
  args: {
    icon: IconUser,
    active: true,
    onPress: () => {},
  },
};
