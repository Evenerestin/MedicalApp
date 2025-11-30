import type { Meta, StoryObj } from "@storybook/react-native";
import { View } from "react-native";
import { fn } from "storybook/test";
import { TimeInput } from "./TimeInput";

const meta = {
  title: "Components/Shared/Inputs/TimeInput",
  component: TimeInput,
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
} satisfies Meta<typeof TimeInput>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
};

export const WithValue: Story = {
  args: {
    value: "10:30",
  },
};

export const Disabled: Story = {
  args: {
    value: "14:00",
    disabled: true,
  },
};

export const CustomPlaceholder: Story = {
  args: {
    placeholder: "Enter time",
  },
};
