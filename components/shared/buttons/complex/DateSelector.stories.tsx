import type { Meta, StoryObj } from "@storybook/react-native";
import { View } from "react-native";
import { fn } from "storybook/test";
import { DateSelector } from "./DateSelector";

const meta = {
  title: "Components/Shared/Buttons/Complex/DateSelector",
  component: DateSelector,
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
} satisfies Meta<typeof DateSelector>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    placeholder: "Select date",
  },
};

export const WithValue: Story = {
  args: {
    value: new Date(2025, 10, 30),
  },
};

export const Disabled: Story = {
  args: {
    value: new Date(2025, 10, 30),
    disabled: true,
  },
};

export const CustomPlaceholder: Story = {
  args: {
    placeholder: "Choose appointment date",
  },
};
