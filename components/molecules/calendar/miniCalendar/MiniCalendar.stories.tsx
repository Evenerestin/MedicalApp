import React, { useState } from "react";
import { View } from "react-native";
import MiniCalendar from "./MiniCalendar";

const getDays = (start: Date) => {
  const days = [];
  for (let i = -2; i <= 6; i++) {
    const d = new Date(start);
    d.setDate(start.getDate() + i);
    days.push({ date: d });
  }
  return days;
};

export default {
  title: "Molecules/Calendar/MiniCalendar",
  component: MiniCalendar,
};

export const Base = () => {
  const today = React.useMemo(() => {
    const d = new Date();
    d.setHours(0, 0, 0, 0);
    return d;
  }, []);
  const days = React.useMemo(() => {
    const arr = [];
    for (let i = -2; i <= 4; i++) {
      const d = new Date(today);
      d.setDate(today.getDate() + i);
      d.setHours(0, 0, 0, 0);
      arr.push({
        date: d,
        selected: i === 0,
        disabled: false,
      });
    }
    return arr;
  }, [today]);
  const [selected, setSelected] = useState(new Date(today));
  const handleDayPress = (date: Date) => {
    setSelected(new Date(date));
  };
  return (
    <View style={{ padding: 24 }}>
      <MiniCalendar
        days={days.map((d) => ({
          ...d,
          selected: d.date.getTime() === selected.getTime(),
        }))}
        onDayPress={handleDayPress}
      />
    </View>
  );
};
