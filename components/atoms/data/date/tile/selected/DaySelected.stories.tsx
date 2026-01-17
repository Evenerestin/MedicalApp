import type { Meta, StoryObj } from "@storybook/react-native";
import { View } from "react-native";
import { fn } from "storybook/test";
import { Day } from "../Day";

const meta = {
  title: "Atoms/Calendar/Day/Selected",
  component: Day,
  args: {
    date: new Date(2025, 10, 15),
    onPress: fn(),
    isInCurrentMonth: true,
  },
  argTypes: {
    isSelected: {
      control: { type: "boolean" },
      description: "Indicates if the day is selected",
    },
    hasEvents: {
      control: { type: "boolean" },
      description: "Indicates if the day has events",
    },
    isDisabled: {
      control: { type: "boolean" },
      description: "Indicates if the day is disabled",
    },
  },
  decorators: [
    (Story) => (
      <View
        style={{
          padding: 16,
          backgroundColor: "#f5f5f5",
          alignItems: "flex-start",
        }}
      >
        <View style={{ width: 50, height: 50 }}>
          <Story />
        </View>
      </View>
    ),
  ],
} satisfies Meta<typeof Day>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Selected: Story = {
  args: {
    date: new Date(2025, 10, 15),
    isSelected: true,
    isInCurrentMonth: true,
  },
};

export const SelectedWithEvents: Story = {
  args: {
    date: new Date(2025, 10, 15),
    isSelected: true,
    hasEvents: true,
    isInCurrentMonth: true,
  },
};
