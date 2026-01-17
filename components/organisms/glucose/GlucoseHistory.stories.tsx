import type { Meta, StoryObj } from "@storybook/react";
import { GlucoseMeasurement } from "../../../types";
import { GlucoseHistory } from "./GlucoseHistory";

const mockMeasurements: GlucoseMeasurement[] = [
  {
    id: "1",
    userId: "user1",
    value: 95,
    unit: "mg/dL",
    tag: "fasting",
    measuredAt: new Date().toISOString(),
    createdAt: new Date().toISOString(),
  },
  {
    id: "2",
    userId: "user1",
    value: 145,
    unit: "mg/dL",
    tag: "after_meal",
    insulinDose: 4,
    insulinType: "rapid",
    measuredAt: new Date().toISOString(),
    notes: "Large lunch",
    createdAt: new Date().toISOString(),
  },
  {
    id: "3",
    userId: "user1",
    value: 88,
    unit: "mg/dL",
    tag: "before_sleep",
    measuredAt: new Date(Date.now() - 86400000).toISOString(),
    createdAt: new Date(Date.now() - 86400000).toISOString(),
  },
];

const meta: Meta<typeof GlucoseHistory> = {
  title: "Glucose/GlucoseHistory",
  component: GlucoseHistory,
  parameters: {
    layout: "fullscreen",
  },
  argTypes: {
    onAddPress: { action: "addPressed" },
    onMeasurementPress: { action: "measurementPressed" },
    onBack: { action: "back" },
  },
};

export default meta;

type Story = StoryObj<typeof GlucoseHistory>;

export const Default: Story = {
  args: {
    measurements: mockMeasurements,
  },
};

export const Empty: Story = {
  args: {
    measurements: [],
  },
};
