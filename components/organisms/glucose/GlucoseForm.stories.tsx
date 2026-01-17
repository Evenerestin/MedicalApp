import type { Meta, StoryObj } from "@storybook/react";
import { GlucoseForm } from "./GlucoseForm";

const meta: Meta<typeof GlucoseForm> = {
  title: "Glucose/GlucoseForm",
  component: GlucoseForm,
  parameters: {
    layout: "fullscreen",
  },
  argTypes: {
    onSave: { action: "save" },
    onCancel: { action: "cancel" },
  },
};

export default meta;

type Story = StoryObj<typeof GlucoseForm>;

export const Default: Story = {};

export const MmolUnit: Story = {
  args: {
    defaultUnit: "mmol/L",
  },
};

export const Loading: Story = {
  args: {
    isLoading: true,
  },
};
