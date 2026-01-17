import type { Meta, StoryObj } from "@storybook/react";
import { RegisterForm } from "./RegisterForm";

const meta: Meta<typeof RegisterForm> = {
  title: "Auth/RegisterForm",
  component: RegisterForm,
  parameters: {
    layout: "fullscreen",
  },
  argTypes: {
    onSubmit: { action: "submitted" },
    onSwitchToLogin: { action: "switchToLogin" },
  },
};

export default meta;

type Story = StoryObj<typeof RegisterForm>;

export const Default: Story = {};

export const Loading: Story = {
  args: {
    isLoading: true,
  },
};

export const WithError: Story = {
  args: {
    error: "An account with this email already exists.",
  },
};
