import type { Meta, StoryObj } from "@storybook/react";
import { VitalMeasurement } from "../../../types";
import { VitalsHistory } from "./VitalsHistory";

const mockMeasurements: VitalMeasurement[] = [
  {
    id: "1",
    userId: "user1",
    type: "blood_pressure",
    value: 120,
    secondaryValue: 80,
    unit: "mmHg",
    measuredAt: new Date().toISOString(),
    createdAt: new Date().toISOString(),
  },
  {
    id: "2",
    userId: "user1",
    type: "heart_rate",
    value: 72,
    unit: "bpm",
    measuredAt: new Date().toISOString(),
    notes: "After morning walk",
    createdAt: new Date().toISOString(),
  },
  {
    id: "3",
    userId: "user1",
    type: "weight",
    value: 75.5,
    unit: "kg",
    measuredAt: new Date(Date.now() - 86400000).toISOString(),
    createdAt: new Date(Date.now() - 86400000).toISOString(),
  },
  {
    id: "4",
    userId: "user1",
    type: "blood_pressure",
    value: 118,
    secondaryValue: 78,
    unit: "mmHg",
    measuredAt: new Date(Date.now() - 86400000).toISOString(),
    createdAt: new Date(Date.now() - 86400000).toISOString(),
  },
];

const meta: Meta<typeof VitalsHistory> = {
  title: "Vitals/VitalsHistory",
  component: VitalsHistory,
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

type Story = StoryObj<typeof VitalsHistory>;

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
