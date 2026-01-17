import type { Meta, StoryObj } from "@storybook/react-native";
import React, { useState } from "react";
import { Checkbox } from "../Checkbox";

const meta: Meta<typeof Checkbox> = {
  title: "Atoms/Inputs/Checkbox/Light",
  component: Checkbox,
  parameters: { docs: { autodocs: true } },
};
export default meta;

const Template = (args: any) => {
  const [checked, setChecked] = useState(false);
  return <Checkbox {...args} checked={checked} onChange={setChecked} />;
};

export const Small: StoryObj<typeof Checkbox> = {
  render: (args) => <Template {...args} size="sm" variant="light" />,
};
export const Medium: StoryObj<typeof Checkbox> = {
  render: (args) => <Template {...args} size="md" variant="light" />,
};
export const Large: StoryObj<typeof Checkbox> = {
  render: (args) => <Template {...args} size="lg" variant="light" />,
};
export const Disabled: StoryObj<typeof Checkbox> = {
  render: (args) => <Template {...args} size="md" variant="light" disabled />,
};

export const Rounded: StoryObj<typeof Checkbox> = {
  render: (args) => <Template {...args} size="md" variant="light" rounded />,
};
