import type { Meta, StoryObj } from "@storybook/react-native";
import React, { useState } from "react";
import { Checkbox } from "./Checkbox";

const meta: Meta<typeof Checkbox> = {
  title: "Atoms/Inputs/Checkbox/Base",
  component: Checkbox,
  parameters: { docs: { autodocs: true } },
};
export default meta;

const Template = (args: any) => {
  const [checked, setChecked] = useState(false);
  return <Checkbox {...args} checked={checked} onChange={setChecked} />;
};

export const Base: StoryObj<typeof Checkbox> = {
  render: (args) => <Template {...args} />,
};
export const Checked: StoryObj<typeof Checkbox> = {
  render: (args) => <Template {...args} checked={true} />,
};
export const Disabled: StoryObj<typeof Checkbox> = {
  render: (args) => <Template {...args} disabled />,
};
