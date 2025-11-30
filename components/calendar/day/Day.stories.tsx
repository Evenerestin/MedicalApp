import type { Meta, StoryObj } from "@storybook/react-native";
import { View } from "react-native";
import { fn } from "storybook/test";
import { Day } from "./Day";

const meta = {
  title: "Components/Calendar/Day",
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

export const Default: Story = {
  args: {
    date: new Date(2025, 10, 15),
    isInCurrentMonth: true,
  },
};

export const Today: Story = {
  args: {
    date: new Date(),
    isToday: true,
    isInCurrentMonth: true,
  },
};

export const Selected: Story = {
  args: {
    date: new Date(2025, 10, 15),
    isSelected: true,
    isInCurrentMonth: true,
  },
};

export const TodaySelected: Story = {
  args: {
    date: new Date(),
    isToday: true,
    isSelected: true,
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

export const SelectedWithEvents: Story = {
  args: {
    date: new Date(2025, 10, 15),
    isSelected: true,
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

export const Disabled: Story = {
  args: {
    date: new Date(2025, 10, 15),
    isDisabled: true,
    isInCurrentMonth: true,
  },
};

export const DisabledWithEvents: Story = {
  args: {
    date: new Date(2025, 10, 15),
    isDisabled: true,
    hasEvents: true,
    isInCurrentMonth: true,
  },
};

export const AllStates: Story = {
  decorators: [],
  render: (args) => (
    <View style={{ padding: 16, backgroundColor: "#f5f5f5" }}>
      <View style={{ flexDirection: "row", flexWrap: "wrap", gap: 8 }}>
        <View style={{ width: 50, height: 50 }}>
          <Day {...args} date={new Date(2025, 10, 1)} isInCurrentMonth={true} />
        </View>
        <View style={{ width: 50, height: 50 }}>
          <Day
            {...args}
            date={new Date()}
            isToday={true}
            isInCurrentMonth={true}
          />
        </View>
        <View style={{ width: 50, height: 50 }}>
          <Day
            {...args}
            date={new Date(2025, 10, 15)}
            isSelected={true}
            isInCurrentMonth={true}
          />
        </View>
        <View style={{ width: 50, height: 50 }}>
          <Day
            {...args}
            date={new Date(2025, 10, 20)}
            hasEvents={true}
            isInCurrentMonth={true}
          />
        </View>
        <View style={{ width: 50, height: 50 }}>
          <Day
            {...args}
            date={new Date(2025, 9, 30)}
            isInCurrentMonth={false}
          />
        </View>
        <View style={{ width: 50, height: 50 }}>
          <Day
            {...args}
            date={new Date(2025, 10, 25)}
            isDisabled={true}
            isInCurrentMonth={true}
          />
        </View>
      </View>
    </View>
  ),
};
