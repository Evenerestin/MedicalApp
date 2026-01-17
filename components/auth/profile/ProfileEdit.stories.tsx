import type { Meta, StoryObj } from "@storybook/react";
import { ProfileEdit } from "./ProfileEdit";

const mockUser = {
  id: "1",
  email: "jan.kowalski@example.com",
  firstName: "Jan",
  lastName: "Kowalski",
  phone: "+48 123 456 789",
  dateOfBirth: "15/03/1990",
  createdAt: "2024-01-01T00:00:00.000Z",
  updatedAt: "2024-01-01T00:00:00.000Z",
};

const meta: Meta<typeof ProfileEdit> = {
  title: "Auth/ProfileEdit",
  component: ProfileEdit,
  parameters: {
    layout: "fullscreen",
  },
  argTypes: {
    onSave: { action: "save" },
    onLogout: { action: "logout" },
    onDeleteAccount: { action: "deleteAccount" },
    onBack: { action: "back" },
  },
};

export default meta;

type Story = StoryObj<typeof ProfileEdit>;

export const Default: Story = {
  args: {
    user: mockUser,
  },
};

export const Loading: Story = {
  args: {
    user: mockUser,
    isLoading: true,
  },
};

export const NewUser: Story = {
  args: {
    user: {
      ...mockUser,
      phone: undefined,
      dateOfBirth: undefined,
    },
  },
};
