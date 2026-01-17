import type { Meta, StoryObj } from "@storybook/react";
import { CycleForm } from "./CycleForm";

const meta: Meta<typeof CycleForm> = {
  title: "Menstrual/CycleForm",
  component: CycleForm,
  parameters: {
    layout: "fullscreen",
  },
  argTypes: {
    onSave: { action: "save" },
    onCancel: { action: "cancel" },
  },
};

export default meta;

type Story = StoryObj<typeof CycleForm>;

export const StartMode: Story = {
  args: {
    mode: "start",
  },
};

export const EndMode: Story = {
  args: {
    mode: "end",
    initialData: {
      startDate: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000)
        .toISOString()
        .split("T")[0],
    },
  },
};

export const WithSymptoms: Story = {
  args: {
    mode: "start",
    initialData: {
      symptoms: ["cramps", "headache", "fatigue"],
    },
  },
};

export const Loading: Story = {
  args: {
    mode: "start",
    isLoading: true,
  },
};
