import React, { useState } from "react";
import { View } from "react-native";
import { YearPicker } from "./YearPicker";

export default {
  title: "Atoms/Inputs/Picker/Year",
  component: YearPicker,
};

export const Basic = () => {
  const [year, setYear] = useState<number | undefined>();
  return (
    <View style={{ padding: 24 }}>
      <YearPicker value={year} onChange={setYear} label="Year" />
    </View>
  );
};

export const WithMinMax = () => {
  const [year, setYear] = useState<number | undefined>();
  return (
    <View style={{ padding: 24 }}>
      <YearPicker
        value={year}
        onChange={setYear}
        label="Year (min/max)"
        minYear={2000}
        maxYear={2030}
      />
    </View>
  );
};

export const Disabled = () => (
  <View style={{ padding: 24 }}>
    <YearPicker disabled label="Disabled" />
  </View>
);
