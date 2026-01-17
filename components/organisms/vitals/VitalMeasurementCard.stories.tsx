import type { Meta, StoryObj } from "@storybook/react";
import { VitalMeasurementCard } from "./VitalMeasurementCard";

const meta: Meta<typeof VitalMeasurementCard> = {
  title: "Vitals/VitalMeasurementCard",
  component: VitalMeasurementCard,
  argTypes: {
    onPress: { action: "pressed" },
  },
};

export default meta;

type Story = StoryObj<typeof VitalMeasurementCard>;

export const BloodPressure: Story = {
  args: {
    measurement: {
      id: "1",
      userId: "user1",
      type: "blood_pressure",
      value: 120,
      secondaryValue: 80,
      unit: "mmHg",
      measuredAt: new Date().toISOString(),
      createdAt: new Date().toISOString(),
    },
  },
};

export const HeartRate: Story = {
  args: {
    measurement: {
      id: "2",
      userId: "user1",
      type: "heart_rate",
      value: 72,
      unit: "bpm",
      measuredAt: new Date().toISOString(),
      notes: "After morning walk",
      createdAt: new Date().toISOString(),
    },
  },
};

export const Temperature: Story = {
  args: {
    measurement: {
      id: "3",
      userId: "user1",
      type: "temperature",
      value: 36.6,
      unit: "°C",
      measuredAt: new Date().toISOString(),
      createdAt: new Date().toISOString(),
    },
  },
};

export const Weight: Story = {
  args: {
    measurement: {
      id: "4",
      userId: "user1",
      type: "weight",
      value: 75.5,
      unit: "kg",
      measuredAt: new Date().toISOString(),
      createdAt: new Date().toISOString(),
    },
  },
};

export const OxygenSaturation: Story = {
  args: {
    measurement: {
      id: "5",
      userId: "user1",
      type: "oxygen_saturation",
      value: 98,
      unit: "%",
      measuredAt: new Date().toISOString(),
      createdAt: new Date().toISOString(),
    },
  },
};
