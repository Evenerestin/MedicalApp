import type { Meta, StoryObj } from "@storybook/react-native";
import React, { useState } from "react";
import { View } from "react-native";
import { Month } from "./Month";

const meta = {
  title: "Components/Calendar/Month",
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

export const CurrentMonth: Story = {
  render: () => {
    const [selectedDate, setSelectedDate] = useState<Date | undefined>();
    const today = new Date();

    return (
      <Month
        year={today.getFullYear()}
        month={today.getMonth()}
        selectedDate={selectedDate}
        onDayPress={setSelectedDate}
      />
    );
  },
};

export const WithEvents: Story = {
  render: () => {
    const [selectedDate, setSelectedDate] = useState<Date | undefined>();
    const today = new Date();

    // Random events for demo
    const eventDates = [5, 12, 18, 25];
    const hasEvents = (date: Date) => {
      return (
        eventDates.includes(date.getDate()) &&
        date.getMonth() === today.getMonth()
      );
    };

    return (
      <Month
        year={today.getFullYear()}
        month={today.getMonth()}
        selectedDate={selectedDate}
        hasEvents={hasEvents}
        onDayPress={setSelectedDate}
      />
    );
  },
};

export const WithDisabledPastDates: Story = {
  render: () => {
    const [selectedDate, setSelectedDate] = useState<Date | undefined>();
    const today = new Date();

    const isDisabled = (date: Date) => {
      const todayTime = new Date(today);
      todayTime.setHours(0, 0, 0, 0);
      const dateTime = new Date(date);
      dateTime.setHours(0, 0, 0, 0);

      return dateTime < todayTime;
    };

    return (
      <Month
        year={today.getFullYear()}
        month={today.getMonth()}
        selectedDate={selectedDate}
        isDisabled={isDisabled}
        onDayPress={setSelectedDate}
      />
    );
  },
};

export const WithDisabledFutureDates: Story = {
  render: () => {
    const [selectedDate, setSelectedDate] = useState<Date | undefined>();
    const today = new Date();

    const isDisabled = (date: Date) => {
      const todayTime = new Date(today);
      todayTime.setHours(0, 0, 0, 0);
      const dateTime = new Date(date);
      dateTime.setHours(0, 0, 0, 0);

      return dateTime > todayTime;
    };

    return (
      <Month
        year={today.getFullYear()}
        month={today.getMonth()}
        selectedDate={selectedDate}
        isDisabled={isDisabled}
        onDayPress={setSelectedDate}
      />
    );
  },
};

export const WithDateRange: Story = {
  render: () => {
    const [selectedDate, setSelectedDate] = useState<Date | undefined>();
    const today = new Date();

    // Disable dates outside 30-day range
    const isDisabled = (date: Date) => {
      const todayTime = new Date(today);
      todayTime.setHours(0, 0, 0, 0);
      const dateTime = new Date(date);
      dateTime.setHours(0, 0, 0, 0);

      const futureLimit = new Date(today);
      futureLimit.setDate(futureLimit.getDate() + 30);

      return dateTime < todayTime || dateTime > futureLimit;
    };

    return (
      <Month
        year={today.getFullYear()}
        month={today.getMonth()}
        selectedDate={selectedDate}
        isDisabled={isDisabled}
        onDayPress={setSelectedDate}
      />
    );
  },
};

export const DifferentMonth: Story = {
  render: () => {
    const [selectedDate, setSelectedDate] = useState<Date | undefined>();

    return (
      <Month
        year={2025}
        month={0} // January
        selectedDate={selectedDate}
        onDayPress={setSelectedDate}
      />
    );
  },
};
