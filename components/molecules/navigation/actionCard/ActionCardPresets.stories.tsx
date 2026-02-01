import { Meta, StoryObj } from "@storybook/react";
import React from "react";
import { View } from "react-native";
import ActionCard, { ActionCardProps } from "./ActionCard";

const meta: Meta<ActionCardProps & { iconName?: string }> = {
  title: "Molecules/Navigation/ActionCard/Presets",
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

export const Allergies: StoryObj<typeof ActionCard> = {
  args: {
    preset: "allergies",
  },
  render: (args) => (
    <View style={{ display: "flex", flexDirection: "row", gap: 10 }}>
      <ActionCard {...args} variant="filled" />
      <ActionCard {...args} variant="light" />
      <ActionCard {...args} variant="outline" />
      <ActionCard {...args} variant="transparent" />
    </View>
  ),
};

export const Medicinations: StoryObj<typeof ActionCard> = {
  args: {
    preset: "medicinations",
  },
  render: (args) => (
    <View style={{ display: "flex", flexDirection: "row", gap: 10 }}>
      <ActionCard {...args} variant="filled" />
      <ActionCard {...args} variant="light" />
      <ActionCard {...args} variant="outline" />
      <ActionCard {...args} variant="transparent" />
    </View>
  ),
};

export const Vitals: StoryObj<typeof ActionCard> = {
  args: {
    preset: "vitals",
  },
  render: (args) => (
    <View style={{ display: "flex", flexDirection: "row", gap: 10 }}>
      <ActionCard {...args} variant="filled" />
      <ActionCard {...args} variant="light" />
      <ActionCard {...args} variant="outline" />
      <ActionCard {...args} variant="transparent" />
    </View>
  ),
};

export const Cycle: StoryObj<typeof ActionCard> = {
  args: {
    preset: "cycle",
  },
  render: (args) => (
    <View style={{ display: "flex", flexDirection: "row", gap: 10 }}>
      <ActionCard {...args} variant="filled" />
      <ActionCard {...args} variant="light" />
      <ActionCard {...args} variant="outline" />
      <ActionCard {...args} variant="transparent" />
    </View>
  ),
};
