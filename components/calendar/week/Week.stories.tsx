import type { Meta, StoryObj } from "@storybook/react-native";
import React, { useState } from "react";
import { View } from "react-native";
import { Week } from "./Week";

const meta = {
  title: "Components/Calendar/Week",
  decorators: [
    (Story) => (
      <View style={{ padding: 16, backgroundColor: "#ffffff" }}>
        <Story />
      </View>
    ),
  ],
} satisfies Meta;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => {
    const [selectedDate, setSelectedDate] = useState<Date | undefined>();
    const today = new Date();

    // Create a week starting from Sunday
    const startOfWeek = new Date(today);
    startOfWeek.setDate(today.getDate() - today.getDay());

    const weekDays = Array.from({ length: 7 }, (_, i) => {
      const date = new Date(startOfWeek);
      date.setDate(startOfWeek.getDate() + i);
      return date;
    });

    return (
      <Week
        days={weekDays}
        selectedDate={selectedDate}
        currentMonth={today.getMonth()}
        onDayPress={setSelectedDate}
      />
    );
  },
};

export const WithEvents: Story = {
  render: () => {
    const [selectedDate, setSelectedDate] = useState<Date | undefined>();
    const today = new Date();

    const startOfWeek = new Date(today);
    startOfWeek.setDate(today.getDate() - today.getDay());

    const weekDays = Array.from({ length: 7 }, (_, i) => {
      const date = new Date(startOfWeek);
      date.setDate(startOfWeek.getDate() + i);
      return date;
    });

    const hasEvents = (date: Date) => {
      // Mark Wednesday and Friday with events
      return date.getDay() === 3 || date.getDay() === 5;
    };

    return (
      <Week
        days={weekDays}
        selectedDate={selectedDate}
        currentMonth={today.getMonth()}
        hasEvents={hasEvents}
        onDayPress={setSelectedDate}
      />
    );
  },
};

export const WithDisabledDates: Story = {
  render: () => {
    const [selectedDate, setSelectedDate] = useState<Date | undefined>();
    const today = new Date();

    const startOfWeek = new Date(today);
    startOfWeek.setDate(today.getDate() - today.getDay());

    const weekDays = Array.from({ length: 7 }, (_, i) => {
      const date = new Date(startOfWeek);
      date.setDate(startOfWeek.getDate() + i);
      return date;
    });

    const isDisabled = (date: Date) => {
      // Disable weekends
      return date.getDay() === 0 || date.getDay() === 6;
    };

    return (
      <Week
        days={weekDays}
        selectedDate={selectedDate}
        currentMonth={today.getMonth()}
        isDisabled={isDisabled}
        onDayPress={setSelectedDate}
      />
    );
  },
};
