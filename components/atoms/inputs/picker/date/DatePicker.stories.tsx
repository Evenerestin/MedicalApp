import React, { useState } from "react";
import { View } from "react-native";
import { DatePicker } from "./DatePicker";

export default {
  title: "Atoms/Inputs/Picker/Date",
  component: DatePicker,
};

export const Basic = () => {
  const [date, setDate] = useState<Date | undefined>();
  return (
    <View style={{ padding: 24 }}>
      <DatePicker value={date} onChange={setDate} label="Date" />
    </View>
  );
};

export const WithMinMax = () => {
  const [date, setDate] = useState<Date | undefined>();
  const minDate = new Date();
  const maxDate = new Date();
  maxDate.setDate(maxDate.getDate() + 10);
  return (
    <View style={{ padding: 24 }}>
      <DatePicker
        value={date}
        onChange={setDate}
        label="Date (min/max)"
        minDate={minDate}
        maxDate={maxDate}
      />
    </View>
  );
};

export const Disabled = () => (
  <View style={{ padding: 24 }}>
    <DatePicker disabled label="Disabled" />
  </View>
);
