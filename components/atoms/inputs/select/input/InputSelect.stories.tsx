import React, { useState } from "react";
import { View } from "react-native";
import { InputSelect, SelectOption } from "./InputSelect";

const options: SelectOption[] = [
  { label: "Apple", value: "apple" },
  { label: "Banana", value: "banana" },
  { label: "Cherry", value: "cherry" },
  { label: "Date", value: "date" },
];

export default {
  title: "Atoms/Inputs/Select/Input",
  component: InputSelect,
};

export const Base = () => {
  const [value, setValue] = useState<string | undefined>(undefined);
  return (
    <View style={{ padding: 24 }}>
      <InputSelect
        data={options}
        value={value}
        onChange={setValue}
        placeholder="Choose a fruit"
      />
    </View>
  );
};

export const Label = () => {
  const [value, setValue] = useState<string | undefined>(undefined);
  return (
    <View style={{ padding: 24 }}>
      <InputSelect
        data={options}
        value={value}
        onChange={setValue}
        label="Fruit"
        placeholder="Choose a fruit"
      />
    </View>
  );
};

export const Description = () => {
  const [value, setValue] = useState<string | undefined>(undefined);
  return (
    <View style={{ padding: 24 }}>
      <InputSelect
        data={options}
        value={value}
        onChange={setValue}
        label="Fruit"
        description="Select your favorite fruit from the list."
        placeholder="Choose a fruit"
      />
    </View>
  );
};

export const Required = () => {
  const [value, setValue] = useState<string | undefined>(undefined);
  return (
    <View style={{ padding: 24 }}>
      <InputSelect
        data={options}
        value={value}
        onChange={setValue}
        label="Fruit"
        description="Select your favorite fruit from the list."
        required
        placeholder="Choose a fruit"
      />
    </View>
  );
};

export const Disabled = () => {
  const [value, setValue] = useState<string | undefined>(undefined);
  return (
    <View style={{ padding: 24 }}>
      <InputSelect
        data={options}
        value={value}
        onChange={setValue}
        placeholder="Choose a fruit"
        disabled
      />
    </View>
  );
};
