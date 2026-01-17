import type { Meta, StoryObj } from "@storybook/react-native";
import React, { useState } from "react";
import { View } from "react-native";
import { DayCard } from "./DayCard";

const meta: Meta<typeof DayCard> = {
  title: "Atoms/Data/Day/Card",
  component: DayCard,
  parameters: { docs: { autodocs: true } },
};
export default meta;

type Story = StoryObj<typeof meta>;

export const Base: Story = {
  render: (args) => (
    <View style={{ maxWidth: 120 }}>
      <DayCard {...args} date={new Date(2025, 10, 15)} />
    </View>
  ),
};

export const Selected: Story = {
  render: (args) => (
    <View style={{ maxWidth: 120 }}>
      <DayCard {...args} date={new Date(2025, 10, 15)} isSelected />
    </View>
  ),
};
