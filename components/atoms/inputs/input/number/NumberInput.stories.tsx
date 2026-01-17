import type { Meta, StoryObj } from "@storybook/react-native";
import React, { useState } from "react";
import { Input } from "../Input";

const meta: Meta<typeof Input> = {
  title: "Atoms/Inputs/Input/Number",
  component: Input,
  parameters: { docs: { autodocs: true } },
};
export default meta;

const Template = (args: any) => {
  const [value, setValue] = useState("");
  const handleChange = (text: string) => {
    setValue(text.replace(/[^0-9]/g, ""));
  };
  return (
    <Input
      {...args}
      value={value}
      onChangeText={handleChange}
      keyboardType="numeric"
    />
  );
};

export const Small: StoryObj<typeof Input> = {
  render: (args) => (
    <Template {...args} size="sm" label="Number input" placeholder="Small..." />
  ),
};
export const Medium: StoryObj<typeof Input> = {
  render: (args) => (
    <Template
      {...args}
      size="md"
      label="Number input"
      placeholder="Medium..."
    />
  ),
};
export const Large: StoryObj<typeof Input> = {
  render: (args) => (
    <Template {...args} size="lg" label="Number input" placeholder="Large..." />
  ),
};
export const WithDescription: StoryObj<typeof Input> = {
  render: (args) => (
    <Template
      {...args}
      label="Number input"
      description="Description here"
      placeholder="With description..."
    />
  ),
};

export const Clearable: StoryObj<typeof Input> = {
  render: (args) => {
    const [value, setValue] = useState("");
    const handleChange = (text: string) => {
      setValue(text.replace(/[^0-9]/g, ""));
    };
    return (
      <Input
        {...args}
        value={value}
        onChangeText={handleChange}
        keyboardType="numeric"
        clearable
        label="Number input"
        placeholder="Clearable number..."
      />
    );
  },
};
