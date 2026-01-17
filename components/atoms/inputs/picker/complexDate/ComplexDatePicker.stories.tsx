import React, { useState } from "react";
import { View } from "react-native";
import { ComplexDatePicker } from "./ComplexDatePicker";

export default {
  title: "Atoms/Inputs/Picker/ComplexDate",
  component: ComplexDatePicker,
};

export const Basic = () => {
  const [date, setDate] = useState<Date | undefined>();
  return (
    <View style={{ padding: 24 }}>
      <ComplexDatePicker value={date} onChange={setDate} label="Complex Date" />
    </View>
  );
};

export const Disabled = () => (
  <View style={{ padding: 24 }}>
    <ComplexDatePicker disabled label="Disabled" />
  </View>
);
