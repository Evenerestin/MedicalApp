import type { Meta, StoryObj } from "@storybook/react-native";
import { View } from "react-native";
import { fn } from "storybook/test";
import { Button } from "../Button";

const meta = {
  title: "Components/Shared/Buttons/Tertiary",
  component: Button,
  args: {
    variant: "tertiary",
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
    text: "Cancel",
    size: "medium",
  },
};

export const Small: Story = {
  args: {
    text: "Skip",
    size: "small",
  },
};

export const Large: Story = {
  args: {
    text: "Learn More",
    size: "large",
  },
};

export const Disabled: Story = {
  args: {
    text: "Cancel",
    disabled: true,
  },
};

export const WithIcon: Story = {
  args: {
    text: "Delete",
    icon: "IconTrash",
    iconPosition: "left",
  },
};
