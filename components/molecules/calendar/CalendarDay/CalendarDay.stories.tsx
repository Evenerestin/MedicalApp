import React from "react";
import { CalendarDay } from "./CalendarDay";

export default {
  title: "Molecules/Calendar/CalendarDay",
  component: CalendarDay,
};

export const Default = () => (
  <CalendarDay
    date={new Date(2026, 0, 16)}
    isCurrentMonth={true}
    isSelected={true}
    isToday={true}
    onPress={() => {}}
  />
);

export const OutsideMonth = () => (
  <CalendarDay
    date={new Date(2026, 0, 1)}
    isCurrentMonth={false}
    isSelected={false}
    isToday={false}
    onPress={() => {}}
  />
);
