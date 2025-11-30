import type { Meta, StoryObj } from "@storybook/react-native";
import React, { useState } from "react";
import { View } from "react-native";
import { fn } from "storybook/test";
import { Calendar } from "./Calendar";

const meta = {
  title: "Components/Calendar/Calendar",
  component: Calendar,
  args: {
    onDayPress: fn(),
  },
  argTypes: {
    showDropdowns: {
      control: { type: "boolean" },
      description: "Show dropdowns for month and year selection",
    },
  },
  decorators: [
    (Story) => (
      <View style={{ padding: 16, backgroundColor: "#ffffff" }}>
        <Story />
      </View>
    ),
  ],
} satisfies Meta<typeof Calendar>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Basic: Story = {
  args: {
    showDropdowns: false,
  },
};

export const WithDropdowns: Story = {
  args: {
    showDropdowns: true,
  },
};

export const WithSelectedDate: Story = {
  args: {
    selectedDate: new Date(),
    showDropdowns: false,
  },
};

export const WithEvents: Story = {
  args: {
    hasEvents: (date: Date) => {
      // Mock events on 5th, 12th, 20th, and 28th of current month
      const day = date.getDate();
      return day === 5 || day === 12 || day === 20 || day === 28;
    },
    showDropdowns: false,
  },
};

export const WithDisabledDates: Story = {
  args: {
    isDisabled: (date: Date) => {
      // Disable past dates
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      return date < today;
    },
    showDropdowns: false,
  },
};

export const FullFeatured: Story = {
  render: (args) => {
    const [selected, setSelected] = useState<Date | undefined>(new Date());

    return (
      <Calendar
        {...args}
        selectedDate={selected}
        onDayPress={setSelected}
        hasEvents={(date: Date) => {
          const day = date.getDate();
          return day === 5 || day === 12 || day === 20 || day === 28;
        }}
        showDropdowns={true}
      />
    );
  },
};
