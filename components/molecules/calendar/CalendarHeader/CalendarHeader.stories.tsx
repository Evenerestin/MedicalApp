import React from "react";
import { CalendarHeader } from "./CalendarHeader";

export default {
  title: "Molecules/Calendar/CalendarHeader",
  component: CalendarHeader,
};

export const Default = () => (
  <CalendarHeader
    month="January"
    year={2026}
    onPrev={() => {}}
    onNext={() => {}}
  />
);
