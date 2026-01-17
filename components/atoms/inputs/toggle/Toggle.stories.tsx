import React, { useState } from "react";
import { View } from "react-native";
import { Toggle } from "./Toggle";

export default {
  title: "Atoms/Inputs/Toggle/Base",
  component: Toggle,
};

export const Default = () => {
  const [checked, setChecked] = useState(false);
  return (
    <View style={{ padding: 24 }}>
      <Toggle checked={checked} onChange={setChecked} />
    </View>
  );
};

export const WithLabel = () => {
  const [checked, setChecked] = useState(false);
  return (
    <View style={{ padding: 24 }}>
      <Toggle
        checked={checked}
        onChange={setChecked}
        label="Enable notifications"
      />
    </View>
  );
};

export const Disabled = () => {
  const [checked, setChecked] = useState(true);
  return (
    <View style={{ padding: 24 }}>
      <Toggle
        checked={checked}
        onChange={setChecked}
        label="Disabled"
        disabled
      />
    </View>
  );
};
