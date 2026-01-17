import type { Meta, StoryObj } from "@storybook/react";
import { LoginForm } from "./LoginForm";

const meta: Meta<typeof LoginForm> = {
  title: "Auth/LoginForm",
  component: LoginForm,
  parameters: {
    layout: "fullscreen",
  },
  argTypes: {
    onSubmit: { action: "submitted" },
    onForgotPassword: { action: "forgotPassword" },
    onSwitchToRegister: { action: "switchToRegister" },
  },
};

export default meta;

type Story = StoryObj<typeof LoginForm>;

export const Default: Story = {};

export const Loading: Story = {
  args: {
    isLoading: true,
  },
};

export const WithError: Story = {
  args: {
    error: "Invalid email or password. Please try again.",
  },
};
