import type { Meta, StoryObj } from "@storybook/react-native";
import { View } from "react-native";
import { fn } from "storybook/test";
import { Day } from "./Day";

const meta = {
  title: "Atoms/Data/Day/Tile",
  component: Day,
  args: {
    date: new Date(2025, 10, 15),
    onPress: fn(),
  },
  argTypes: {
    isToday: {
      control: { type: "boolean" },
      description: "Indicates if the day is today",
    },
    isSelected: {
      control: { type: "boolean" },
      description: "Indicates if the day is selected",
    },
    isInCurrentMonth: {
      control: { type: "boolean" },
      description: "Indicates if the day belongs to the current month",
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

export const Base: Story = {
  args: {
    date: new Date(2025, 10, 15),
    isInCurrentMonth: true,
  },
};

export const WithEvents: Story = {
  args: {
    date: new Date(2025, 10, 15),
    hasEvents: true,
    isInCurrentMonth: true,
  },
};

export const OtherMonth: Story = {
  args: {
    date: new Date(2025, 9, 30),
    isInCurrentMonth: false,
  },
};
