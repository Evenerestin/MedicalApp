import React, { useState } from "react";
import { View } from "react-native";
import { MonthPicker } from "./MonthPicker";

export default {
  title: "Atoms/Inputs/Picker/Month",
  component: MonthPicker,
};

export const Basic = () => {
  const [month, setMonth] = useState<number | undefined>();
  return (
    <View style={{ padding: 24 }}>
      <MonthPicker value={month} onChange={setMonth} label="Month" />
    </View>
  );
};

export const WithPlaceholder = () => {
  const [month, setMonth] = useState<number | undefined>();
  return (
    <View style={{ padding: 24 }}>
      <MonthPicker
        value={month}
        onChange={setMonth}
        label="Month with placeholder"
        placeholder="Pick a month"
      />
    </View>
  );
};

export const Disabled = () => (
  <View style={{ padding: 24 }}>
    <MonthPicker disabled label="Disabled" />
  </View>
);
