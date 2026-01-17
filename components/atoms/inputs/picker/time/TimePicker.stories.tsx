import React, { useState } from "react";
import { View } from "react-native";
import { TimePicker } from "./TimePicker";

export default {
  title: "Atoms/Inputs/Picker/Time",
  component: TimePicker,
};

export const Base = () => {
  const [time, setTime] = useState<
    { hour: number; minute: number } | undefined
  >();
  return (
    <View style={{ padding: 24 }}>
      <TimePicker
        label="Appointment Time"
        value={time}
        onChange={setTime}
        placeholder="Select time"
      />
    </View>
  );
};

export const Disabled = () => {
  return (
    <View style={{ padding: 24 }}>
      <TimePicker label="Disabled" value={{ hour: 8, minute: 30 }} disabled />
    </View>
  );
};
