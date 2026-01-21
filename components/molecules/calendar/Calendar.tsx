import React, { useState } from "react";
import { Modal, View } from "react-native";
import { CalendarMonthPickerModal } from "../../atoms/inputs/picker/calendarMonth/CalendarMonthPickerModal";
import { CalendarYearPickerModal } from "../../atoms/inputs/picker/calendarYear/CalendarYearPickerModal";
import { styles } from "./Calendar.styles";
import { CalendarGrid } from "./CalendarGrid/CalendarGrid";
import { CalendarHeader } from "./CalendarHeader/CalendarHeader";

const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

export interface CalendarProps {
  selectedDate?: Date;
  onDayPress?: (date: Date) => void;
  hasEvents?: (date: Date) => boolean;
}

export const Calendar: React.FC<CalendarProps> = ({
  selectedDate: controlledDate,
  onDayPress,
  hasEvents,
}) => {
  const today = new Date();
  const initialDate = controlledDate || today;
  const [month, setMonth] = useState(initialDate.getMonth());
  const [year, setYear] = useState(initialDate.getFullYear());
  const [selectedDate, setSelectedDate] = useState(initialDate);
  const [monthPickerOpen, setMonthPickerOpen] = useState(false);
  const [yearPickerOpen, setYearPickerOpen] = useState(false);

  const effectiveSelectedDate = controlledDate ?? selectedDate;

  const firstDayOfMonth = new Date(year, month, 1);
  const startDay = firstDayOfMonth.getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const days: Array<{
    date: Date;
    isCurrentMonth: boolean;
    isSelected: boolean;
    isToday: boolean;
  }> = [];
  for (let i = 0; i < 42; i++) {
    const date = new Date(year, month, i - startDay + 1);
    days.push({
      date,
      isCurrentMonth: date.getMonth() === month,
      isSelected: date.toDateString() === effectiveSelectedDate.toDateString(),
      isToday: date.toDateString() === today.toDateString(),
    });
  }

  return (
    <View style={styles.container}>
      <CalendarHeader
        month={months[month]}
        year={year}
        onPrev={() => {
          if (month === 0) {
            setMonth(11);
            setYear((y) => y - 1);
          } else {
            setMonth((m) => m - 1);
          }
        }}
        onNext={() => {
          if (month === 11) {
            setMonth(0);
            setYear((y) => y + 1);
          } else {
            setMonth((m) => m + 1);
          }
        }}
        onMonthPress={() => setMonthPickerOpen(true)}
        onYearPress={() => setYearPickerOpen(true)}
      />
      <CalendarGrid
        days={days}
        onDayPress={(date) => {
          if (onDayPress) {
            onDayPress(date);
          } else {
            setSelectedDate(date);
          }
        }}
      />
      <CalendarMonthPickerModal
        value={month}
        visible={monthPickerOpen}
        onChange={(m) => setMonth(m)}
        onClose={() => setMonthPickerOpen(false)}
      />
      <CalendarYearPickerModal
        value={year}
        visible={yearPickerOpen}
        onChange={(y) => setYear(y)}
        onClose={() => setYearPickerOpen(false)}
        minYear={1900}
        maxYear={2100}
      />
    </View>
  );
};
