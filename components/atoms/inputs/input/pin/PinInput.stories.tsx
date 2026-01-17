import type { Meta, StoryObj } from "@storybook/react-native";
import React, { useState } from "react";
import { View } from "react-native";
import { Input } from "../Input";

const meta: Meta<typeof Input> = {
  title: "Atoms/Inputs/Input/Pin",
  component: Input,
  parameters: { docs: { autodocs: true } },
};
export default meta;

const PinTemplate = (args: any) => {
  const [value, setValue] = useState("");
  const length = args.length || 4;
  return (
    <View style={{ flexDirection: "row", gap: 8 }}>
      {Array.from({ length }).map((_, i) => (
        <Input
          key={i}
          value={value[i] || ""}
          onChangeText={(text) => {
            const arr = value.split("");
            arr[i] = text;
            setValue(arr.join(""));
          }}
          maxLength={1}
          size={args.size || "md"}
          style={{ width: 40 }}
        />
      ))}
    </View>
  );
};

export const Small: StoryObj<typeof Input> = {
  render: (args) => <PinTemplate {...args} size="sm" length={4} />,
};
export const Medium: StoryObj<typeof Input> = {
  render: (args) => <PinTemplate {...args} size="md" length={4} />,
};
export const Large: StoryObj<typeof Input> = {
  render: (args) => <PinTemplate {...args} size="lg" length={4} />,
};
export const Disabled: StoryObj<typeof Input> = {
  render: (args) => <PinTemplate {...args} size="md" length={4} disabled />,
};
export const Loading: StoryObj<typeof Input> = {
  render: (args) => <PinTemplate {...args} size="md" length={4} loading />,
};
