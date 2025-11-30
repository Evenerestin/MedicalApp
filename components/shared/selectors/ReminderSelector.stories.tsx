import type { Meta, StoryObj } from "@storybook/react-native";
import { View } from "react-native";
import { fn } from "storybook/test";
import { ReminderSelector } from "./ReminderSelector";

const meta = {
  title: "Components/Shared/Selectors/ReminderSelector",
  component: ReminderSelector,
  args: {
    onChange: fn(),
  },
  decorators: [
    (Story) => (
      <View style={{ padding: 16, backgroundColor: "#f5f5f5" }}>
        <Story />
      </View>
    ),
  ],
} satisfies Meta<typeof ReminderSelector>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
};

export const WithOneSelected: Story = {
  args: {
    value: ["day"],
  },
};

export const WithMultipleSelected: Story = {
  args: {
    value: ["day", "week"],
  },
};

export const AllSelected: Story = {
  args: {
    value: ["day", "week", "month"],
  },
};

export const Disabled: Story = {
  args: {
    value: ["day", "week"],
    disabled: true,
  },
};
