import type { Meta, StoryObj } from "@storybook/react";
import { VitalForm } from "./VitalForm";

const meta: Meta<typeof VitalForm> = {
  title: "Vitals/VitalForm",
  component: VitalForm,
  parameters: {
    layout: "fullscreen",
  },
  argTypes: {
    onSave: { action: "save" },
    onCancel: { action: "cancel" },
  },
};

export default meta;

type Story = StoryObj<typeof VitalForm>;

export const Default: Story = {};

export const Loading: Story = {
  args: {
    isLoading: true,
  },
};
