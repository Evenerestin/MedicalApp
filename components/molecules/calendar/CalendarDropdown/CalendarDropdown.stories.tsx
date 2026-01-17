import React, { useState } from "react";
import { CalendarDropdown } from "./CalendarDropdown";

export default {
  title: "Molecules/Calendar/CalendarDropdown",
  component: CalendarDropdown,
};

export const Default = () => {
  const [value, setValue] = useState("January");
  return (
    <CalendarDropdown
      options={[
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
      ]}
      value={value}
      onChange={setValue}
    />
  );
};
