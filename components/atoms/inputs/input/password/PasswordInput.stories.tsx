import type { Meta, StoryObj } from "@storybook/react-native";
import { IconEye, IconEyeOff } from "@tabler/icons-react-native";
import React, { useState } from "react";
import { Input } from "../Input";

const meta: Meta<typeof Input> = {
  title: "Atoms/Inputs/Input/Password",
  component: Input,
  parameters: { docs: { autodocs: true } },
};
export default meta;

const Template = (args: any) => {
  const [value, setValue] = useState("");
  const [show, setShow] = useState(false);
  return (
    <Input
      {...args}
      value={value}
      onChangeText={setValue}
      secureTextEntry={!show}
      rightSection={
        <span onClick={() => setShow((s) => !s)}>
          {show ? <IconEye size={20} /> : <IconEyeOff size={20} />}
        </span>
      }
    />
  );
};

export const Small: StoryObj<typeof Input> = {
  render: (args) => (
    <Template
      {...args}
      size="sm"
      label="Password"
      placeholder="Small password..."
    />
  ),
};
export const Medium: StoryObj<typeof Input> = {
  render: (args) => (
    <Template
      {...args}
      size="md"
      label="Password"
      placeholder="Medium password..."
    />
  ),
};
export const Large: StoryObj<typeof Input> = {
  render: (args) => (
    <Template
      {...args}
      size="lg"
      label="Password"
      placeholder="Large password..."
    />
  ),
};
export const Disabled: StoryObj<typeof Input> = {
  render: (args) => (
    <Template
      {...args}
      label="Password"
      disabled
      placeholder="Disabled password..."
    />
  ),
};
export const Loading: StoryObj<typeof Input> = {
  render: (args) => (
    <Template
      {...args}
      label="Password"
      disabled
      loading
      placeholder="Loading password..."
    />
  ),
};
