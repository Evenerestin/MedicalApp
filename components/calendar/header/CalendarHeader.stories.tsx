import type { Meta, StoryObj } from "@storybook/react-native";
import React, { useState } from "react";
import { View } from "react-native";
import { CalendarHeader } from "./CalendarHeader";

const meta = {
  title: "Components/Calendar/Header",
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

export const Basic: Story = {
  render: () => {
    const [date, setDate] = useState(new Date());

    const handlePrevious = () => {
      const newDate = new Date(date);
      newDate.setMonth(newDate.getMonth() - 1);
      setDate(newDate);
    };

    const handleNext = () => {
      const newDate = new Date(date);
      newDate.setMonth(newDate.getMonth() + 1);
      setDate(newDate);
    };

    return (
      <CalendarHeader
        year={date.getFullYear()}
        month={date.getMonth()}
        onPreviousMonth={handlePrevious}
        onNextMonth={handleNext}
      />
    );
  },
};

export const Dropdown: Story = {
  render: () => {
    const [date, setDate] = useState(new Date());

    const handlePrevious = () => {
      const newDate = new Date(date);
      newDate.setMonth(newDate.getMonth() - 1);
      setDate(newDate);
    };

    const handleNext = () => {
      const newDate = new Date(date);
      newDate.setMonth(newDate.getMonth() + 1);
      setDate(newDate);
    };

    const handleMonthChange = (month: number) => {
      const newDate = new Date(date);
      newDate.setMonth(month);
      setDate(newDate);
    };

    const handleYearChange = (year: number) => {
      const newDate = new Date(date);
      newDate.setFullYear(year);
      setDate(newDate);
    };

    return (
      <CalendarHeader
        year={date.getFullYear()}
        month={date.getMonth()}
        onPreviousMonth={handlePrevious}
        onNextMonth={handleNext}
        onMonthChange={handleMonthChange}
        onYearChange={handleYearChange}
        showDropdowns={true}
      />
    );
  },
};
