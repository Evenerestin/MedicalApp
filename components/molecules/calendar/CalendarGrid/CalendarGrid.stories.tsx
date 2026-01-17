import React from "react";
import { CalendarGrid } from "./CalendarGrid";

const today = new Date(2026, 0, 16);
const days = Array.from({ length: 42 }, (_, i) => {
  const date = new Date(2026, 0, i - 5);
  return {
    date,
    isCurrentMonth: date.getMonth() === 0,
    isSelected: date.getDate() === 16,
    isToday: date.getDate() === 16,
  };
});

export default {
  title: "Molecules/Calendar/CalendarGrid",
  component: CalendarGrid,
};

export const Default = () => <CalendarGrid days={days} onDayPress={() => {}} />;
