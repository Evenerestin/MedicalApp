import type { Meta, StoryObj } from "@storybook/react";
import { ICEEmptyState } from "./ICEEmptyState";

const meta: Meta<typeof ICEEmptyState> = {
  title: "ICE/ICEEmptyState",
  component: ICEEmptyState,
  parameters: {
    layout: "fullscreen",
  },
  argTypes: {
    onCreateProfile: { action: "createProfile" },
    onBack: { action: "back" },
  },
};

export default meta;

type Story = StoryObj<typeof ICEEmptyState>;

export const Default: Story = {};
