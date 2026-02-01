import { Meta, StoryObj } from "@storybook/react";
import {
  IconCalendar,
  IconHeart,
  IconMedicalCross,
} from "@tabler/icons-react-native";
import React from "react";
import ActionCard, { ActionCardProps } from "./ActionCard";

const meta: Meta<ActionCardProps & { iconName?: string }> = {
  title: "Molecules/Navigation/ActionCard",
  component: ActionCard,
  parameters: { docs: { autodocs: true } },
  argTypes: {
    icon: {
      control: false,
      table: { disable: true },
    },
  },
};

export default meta;

export const Base: StoryObj<typeof ActionCard> = {
  args: {
    label: "Calendar",
  },
  render: (args) => <ActionCard {...args} icon={<IconCalendar />} />,
};

export const Rounded: StoryObj<typeof ActionCard> = {
  args: {
    label: "Calendar",
  },
  render: (args) => <ActionCard {...args} rounded icon={<IconCalendar />} />,
};

export const Disabled: StoryObj<typeof ActionCard> = {
  args: {
    label: "Calendar",
  },
  render: (args) => <ActionCard {...args} disabled icon={<IconCalendar />} />,
};
