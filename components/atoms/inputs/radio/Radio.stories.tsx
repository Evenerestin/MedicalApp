import React, { useState } from "react";
import { View } from "react-native";
import { Radio } from "./Radio";

export default {
  title: "Atoms/Inputs/Radio/Base",
  component: Radio,
};

export const Base = () => {
  const [checked, setChecked] = useState(false);
  return (
    <View style={{ padding: 24 }}>
      <Radio checked={checked} onChange={setChecked} />
    </View>
  );
};

export const Label = () => {
  const [checked, setChecked] = useState(false);
  return (
    <View style={{ padding: 24 }}>
      <Radio checked={checked} onChange={setChecked} label="Option 1" />
    </View>
  );
};

export const Filled = () => {
  const [checked, setChecked] = useState(false);
  return (
    <View style={{ padding: 24 }}>
      <Radio
        checked={checked}
        onChange={setChecked}
        label="Filled"
        variant="filled"
      />
    </View>
  );
};

export const Outline = () => {
  const [checked, setChecked] = useState(false);
  return (
    <View style={{ padding: 24 }}>
      <Radio
        checked={checked}
        onChange={setChecked}
        label="Outline"
        variant="outline"
      />
    </View>
  );
};

export const Disabled = () => {
  const [checked, setChecked] = useState(true);
  return (
    <View style={{ padding: 24 }}>
      <Radio
        checked={checked}
        onChange={setChecked}
        label="Disabled"
        disabled
      />
    </View>
  );
};
