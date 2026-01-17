import type { Meta, StoryObj } from "@storybook/react";
import { GlucoseMeasurementCard } from "./GlucoseMeasurementCard";

const meta: Meta<typeof GlucoseMeasurementCard> = {
  title: "Glucose/GlucoseMeasurementCard",
  component: GlucoseMeasurementCard,
  argTypes: {
    onPress: { action: "pressed" },
  },
};

export default meta;

type Story = StoryObj<typeof GlucoseMeasurementCard>;

export const Normal: Story = {
  args: {
    measurement: {
      id: "1",
      userId: "user1",
      value: 95,
      unit: "mg/dL",
      tag: "fasting",
      measuredAt: new Date().toISOString(),
      createdAt: new Date().toISOString(),
    },
  },
};

export const High: Story = {
  args: {
    measurement: {
      id: "2",
      userId: "user1",
      value: 180,
      unit: "mg/dL",
      tag: "after_meal",
      measuredAt: new Date().toISOString(),
      notes: "After large meal",
      createdAt: new Date().toISOString(),
    },
  },
};

export const Low: Story = {
  args: {
    measurement: {
      id: "3",
      userId: "user1",
      value: 55,
      unit: "mg/dL",
      tag: "before_meal",
      measuredAt: new Date().toISOString(),
      createdAt: new Date().toISOString(),
    },
  },
};

export const WithInsulin: Story = {
  args: {
    measurement: {
      id: "4",
      userId: "user1",
      value: 120,
      unit: "mg/dL",
      tag: "before_meal",
      insulinDose: 4,
      insulinType: "rapid",
      measuredAt: new Date().toISOString(),
      createdAt: new Date().toISOString(),
    },
  },
};

export const MmolL: Story = {
  args: {
    measurement: {
      id: "5",
      userId: "user1",
      value: 5.5,
      unit: "mmol/L",
      tag: "fasting",
      measuredAt: new Date().toISOString(),
      createdAt: new Date().toISOString(),
    },
  },
};
