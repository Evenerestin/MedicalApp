import type { Meta, StoryObj } from "@storybook/react-native";
import { IconHeartbeat, IconX, IconZoom } from "@tabler/icons-react-native";
import React, { useState } from "react";
import { View } from "react-native";
import { Input } from "./Input";

const meta: Meta<typeof Input> = {
  title: "Atoms/Inputs/Input/Base",
  component: Input,
  parameters: { docs: { autodocs: true } },
};
export default meta;

const Template = (args: any) => {
  const [value, setValue] = useState("");
  return <Input {...args} value={value} onChangeText={setValue} />;
};

export const Base: StoryObj<typeof Input> = {
  render: (args) => (
    <Template {...args} placeholder="No label or description..." />
  ),
};
export const Default: StoryObj<typeof Input> = {
  render: (args) => (
    <Template {...args} label="Label" placeholder="Type here..." />
  ),
};
export const Description: StoryObj<typeof Input> = {
  render: (args) => (
    <Template
      {...args}
      label="Label"
      description="Description only"
      placeholder="With description..."
    />
  ),
};
export const Required: StoryObj<typeof Input> = {
  render: (args) => (
    <Template
      {...args}
      label="Label"
      required
      description="Description"
      placeholder="Type here..."
    />
  ),
};
export const Error: StoryObj<typeof Input> = {
  render: (args) => (
    <Template
      {...args}
      label="Label"
      error="Error message"
      placeholder="Type here..."
    />
  ),
};
export const Disabled: StoryObj<typeof Input> = {
  render: (args) => (
    <Template {...args} label="Label" disabled placeholder="Type here..." />
  ),
};
export const Loading: StoryObj<typeof Input> = {
  render: (args) => (
    <Template
      {...args}
      label="Label"
      disabled
      loading
      placeholder="Type here..."
    />
  ),
};

export const Clearable: StoryObj<typeof Input> = {
  render: (args) => {
    const [value, setValue] = React.useState("");
    return (
      <Input
        {...args}
        label="Label"
        clearable
        value={value}
        onChangeText={setValue}
        placeholder="Clearable..."
      />
    );
  },
};
