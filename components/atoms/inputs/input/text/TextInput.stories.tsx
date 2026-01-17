import type { Meta, StoryObj } from "@storybook/react-native";
import { IconX, IconZoom } from "@tabler/icons-react-native";
import React, { useState } from "react";
import { Input } from "../Input";

const meta: Meta<typeof Input> = {
  title: "Atoms/Inputs/Input/Text",
  component: Input,
  parameters: { docs: { autodocs: true } },
};
export default meta;

const Template = (args: any) => {
  const [value, setValue] = useState("");
  return <Input {...args} value={value} onChangeText={setValue} />;
};

export const Small: StoryObj<typeof Input> = {
  render: (args) => (
    <Template {...args} size="sm" label="Text input" placeholder="Small..." />
  ),
};
export const Medium: StoryObj<typeof Input> = {
  render: (args) => (
    <Template {...args} size="md" label="Text input" placeholder="Medium..." />
  ),
};
export const Large: StoryObj<typeof Input> = {
  render: (args) => (
    <Template {...args} size="lg" label="Text input" placeholder="Large..." />
  ),
};
export const WithLeftIcon: StoryObj<typeof Input> = {
  render: (args) => (
    <Template
      {...args}
      label="Text input"
      leftSection={<IconZoom size={20} />}
      placeholder="With left icon..."
    />
  ),
};
export const Clearable: StoryObj<typeof Input> = {
  render: (args) => (
    <Template
      {...args}
      label="Text input"
      clearable
      placeholder="With clearable input..."
    />
  ),
};
