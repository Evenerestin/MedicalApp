import type { Meta, StoryObj } from "@storybook/react";
import { Notifications } from "./Notifications";

const meta = {
  title: "Components/Navigation/Notifications",
  component: Notifications,
  parameters: {
    layout: "centered",
  },
} satisfies Meta<typeof Notifications>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    notificationCount: 0,
  },
};

export const WithNotifications: Story = {
  args: {
    notificationCount: 3,
  },
};

export const ManyNotifications: Story = {
  args: {
    notificationCount: 15,
  },
};
