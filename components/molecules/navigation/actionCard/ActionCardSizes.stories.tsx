import { Meta, StoryObj } from "@storybook/react";
import React from "react";
import { View } from "react-native";
import ActionCard, { ActionCardProps } from "./ActionCard";

const meta: Meta<ActionCardProps & { iconName?: string }> = {
  title: "Molecules/Navigation/ActionCard/Sizes",
  component: ActionCard,
  parameters: { docs: { autodocs: true } },
  argTypes: {
    icon: {
      control: false,
      table: { disable: true },
    },
  },
};

export default meta;

export const Small: StoryObj<typeof ActionCard> = {
  args: {
    size: "sm",
  },
  render: (args) => <ActionCard {...args} />,
};

export const Medium: StoryObj<typeof ActionCard> = {
  args: {
    size: "md",
  },
  render: (args) => <ActionCard {...args} />,
};

export const Large: StoryObj<typeof ActionCard> = {
  args: {
    size: "lg",
  },
  render: (args) => <ActionCard {...args} />,
};
