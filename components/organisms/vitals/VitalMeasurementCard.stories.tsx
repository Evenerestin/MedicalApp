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

export const BloodPressureWithHeartRate: Story = {
  args: {
    measurement: {
      id: "1",
      userId: "user1",
      type: "blood_pressure",
      value: 120,
      secondaryValue: 80,
      tertiaryValue: 72,
      unit: "mmHg / bpm",
      measuredAt: new Date().toISOString(),
      notes: "After morning walk",
      createdAt: new Date().toISOString(),
    },
  },
};

export const Weight: Story = {
  args: {
    measurement: {
      id: "2",
      userId: "user1",
      type: "weight",
      value: 75.5,
      unit: "kg",
      measuredAt: new Date().toISOString(),
      createdAt: new Date().toISOString(),
    },
  },
};

export const Glucose: Story = {
  args: {
    measurement: {
      id: "3",
      userId: "user1",
      type: "glucose",
      value: 110,
      unit: "mg/dL",
      measuredAt: new Date().toISOString(),
      createdAt: new Date().toISOString(),
    },
  },
};
