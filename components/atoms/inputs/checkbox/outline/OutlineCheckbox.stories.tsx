import type { Meta, StoryObj } from "@storybook/react-native";
import React, { useState } from "react";
import { Checkbox } from "../Checkbox";

const meta: Meta<typeof Checkbox> = {
  title: "Atoms/Inputs/Checkbox/Outline",
  component: Checkbox,
  parameters: { docs: { autodocs: true } },
};
export default meta;

const Template = (args: any) => {
  const [checked, setChecked] = useState(false);
  return <Checkbox {...args} checked={checked} onChange={setChecked} />;
};

export const Small: StoryObj<typeof Checkbox> = {
  render: (args) => <Template {...args} size="sm" variant="outline" />,
};
export const Medium: StoryObj<typeof Checkbox> = {
  render: (args) => <Template {...args} size="md" variant="outline" />,
};
export const Large: StoryObj<typeof Checkbox> = {
  render: (args) => <Template {...args} size="lg" variant="outline" />,
};
export const Disabled: StoryObj<typeof Checkbox> = {
  render: (args) => <Template {...args} size="md" variant="outline" disabled />,
};

export const Rounded: StoryObj<typeof Checkbox> = {
  render: (args) => <Template {...args} size="md" variant="outline" rounded />,
};
