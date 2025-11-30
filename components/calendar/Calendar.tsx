import React, { useState } from "react";
import { View } from "react-native";
import { CalendarHeader } from "./header/CalendarHeader";
import { Month } from "./month/Month";

export interface CalendarProps {
  selectedDate?: Date;
  hasEvents?: (date: Date) => boolean;
  isDisabled?: (date: Date) => boolean;
  onDayPress?: (date: Date) => void;
  showDropdowns?: boolean;
  minYear?: number;
  maxYear?: number;
}

export const Calendar = ({
  selectedDate,
  hasEvents,
  isDisabled,
  onDayPress,
  showDropdowns = false,
  minYear,
  maxYear,
}: CalendarProps) => {
  const [currentDate, setCurrentDate] = useState(new Date());

  const handlePreviousMonth = () => {
    const newDate = new Date(currentDate);
    newDate.setMonth(newDate.getMonth() - 1);
    setCurrentDate(newDate);
  };

  const handleNextMonth = () => {
    const newDate = new Date(currentDate);
    newDate.setMonth(newDate.getMonth() + 1);
    setCurrentDate(newDate);
  };

  const handleMonthChange = (month: number) => {
    const newDate = new Date(currentDate);
    newDate.setMonth(month);
    setCurrentDate(newDate);
  };

  const handleYearChange = (year: number) => {
    const newDate = new Date(currentDate);
    newDate.setFullYear(year);
    setCurrentDate(newDate);
  };

  return (
    <View>
      <CalendarHeader
        year={currentDate.getFullYear()}
        month={currentDate.getMonth()}
        onPreviousMonth={handlePreviousMonth}
        onNextMonth={handleNextMonth}
        onMonthChange={handleMonthChange}
        onYearChange={handleYearChange}
        showDropdowns={showDropdowns}
        minYear={minYear}
        maxYear={maxYear}
      />
      <Month
        year={currentDate.getFullYear()}
        month={currentDate.getMonth()}
        selectedDate={selectedDate}
        hasEvents={hasEvents}
        isDisabled={isDisabled}
        onDayPress={onDayPress}
      />
    </View>
  );
};
