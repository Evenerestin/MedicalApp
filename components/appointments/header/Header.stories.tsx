import type { Meta, StoryObj } from "@storybook/react-native";
import { View } from "react-native";
import { fn } from "storybook/test";
import { Header } from "./Header";

const meta = {
  title: "Components/Appointments/Header",
  component: Header,
  args: {
    date: new Date(2025, 10, 30),
    onAddPress: fn(),
  },
  decorators: [
    (Story) => (
      <View style={{ padding: 16, backgroundColor: "#ffffff" }}>
        <Story />
      </View>
    ),
  ],
} satisfies Meta<typeof Header>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    date: new Date(2025, 10, 30),
  },
};

export const WithoutAddButton: Story = {
  args: {
    date: new Date(2025, 10, 30),
    onAddPress: undefined,
  },
};

export const DifferentDate: Story = {
  args: {
    date: new Date(2025, 11, 25),
  },
};
