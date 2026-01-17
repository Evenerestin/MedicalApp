import React, { useState } from "react";
import { View } from "react-native";
import { ButtonSelect, SelectOption } from "./ButtonSelect";

const options: SelectOption[] = [
  { label: "Apple", value: "apple" },
  { label: "Banana", value: "banana" },
  { label: "Cherry", value: "cherry" },
  { label: "Date", value: "date" },
];

export default {
  title: "Atoms/Inputs/Select/Button",
  component: ButtonSelect,
};

export const Base = () => {
  const [value, setValue] = useState<string | undefined>(undefined);
  return (
    <View style={{ padding: 24 }}>
      <ButtonSelect
        data={options}
        value={value}
        onChange={setValue}
        placeholder="Choose a fruit"
      />
    </View>
  );
};

export const Transparent = () => {
  const [value, setValue] = useState<string | undefined>(undefined);
  return (
    <View style={{ padding: 24 }}>
      <ButtonSelect
        data={options}
        value={value}
        onChange={setValue}
        placeholder="Choose a fruit"
        variant="transparent"
      />
    </View>
  );
};

export const Disabled = () => {
  const [value, setValue] = useState<string | undefined>(undefined);
  return (
    <View style={{ padding: 24 }}>
      <ButtonSelect
        data={options}
        value={value}
        onChange={setValue}
        placeholder="Choose a fruit"
        disabled
      />
    </View>
  );
};

export const FullWidth = () => {
  const [value, setValue] = useState<string | undefined>(undefined);
  return (
    <View style={{ padding: 24 }}>
      <ButtonSelect
        data={options}
        value={value}
        onChange={setValue}
        placeholder="Choose a fruit"
        fullWidth
      />
    </View>
  );
};
