import type { Meta, StoryObj } from "@storybook/react-native";
import { View } from "react-native";
import { fn } from "storybook/test";
import { Button } from "../Button";

const meta = {
  title: "Components/Shared/Buttons/Primary",
  component: Button,
  args: {
    variant: "primary",
    onPress: fn(),
  },
  decorators: [
    (Story) => (
      <View style={{ padding: 16, backgroundColor: "#f5f5f5" }}>
        <Story />
      </View>
    ),
  ],
} satisfies Meta<typeof Button>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    text: "Save",
    size: "medium",
  },
};

export const Small: Story = {
  args: {
    text: "Save",
    size: "small",
  },
};

export const Large: Story = {
  args: {
    text: "Log Entry",
    size: "large",
  },
};

export const Disabled: Story = {
  args: {
    text: "Save",
    disabled: true,
  },
};

export const WithIconLeft: Story = {
  args: {
    text: "Add Event",
    icon: "IconPlus",
    iconPosition: "left",
  },
};

export const WithIconRight: Story = {
  args: {
    text: "Next",
    icon: "IconArrowRight",
    iconPosition: "right",
  },
};
