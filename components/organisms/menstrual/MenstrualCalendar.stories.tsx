import type { Meta, StoryObj } from "@storybook/react";
import { MenstrualCycle, MenstrualPrediction } from "../../../types";
import { MenstrualCalendar } from "./MenstrualCalendar";

const today = new Date();
const mockCycles: MenstrualCycle[] = [
  {
    id: "1",
    userId: "user1",
    startDate: new Date(today.getFullYear(), today.getMonth(), 5).toISOString(),
    endDate: new Date(today.getFullYear(), today.getMonth(), 10).toISOString(),
    cycleLength: 28,
    periodLength: 5,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
];

const mockPrediction: MenstrualPrediction = {
  nextPeriodStart: new Date(
    today.getFullYear(),
    today.getMonth() + 1,
    2
  ).toISOString(),
  nextPeriodEnd: new Date(
    today.getFullYear(),
    today.getMonth() + 1,
    7
  ).toISOString(),
  fertileWindowStart: new Date(
    today.getFullYear(),
    today.getMonth(),
    17
  ).toISOString(),
  fertileWindowEnd: new Date(
    today.getFullYear(),
    today.getMonth(),
    22
  ).toISOString(),
  ovulationDate: new Date(
    today.getFullYear(),
    today.getMonth(),
    19
  ).toISOString(),
  averageCycleLength: 28,
  averagePeriodLength: 5,
};

const meta: Meta<typeof MenstrualCalendar> = {
  title: "Menstrual/MenstrualCalendar",
  component: MenstrualCalendar,
  parameters: {
    layout: "fullscreen",
  },
  argTypes: {
    onDateSelect: { action: "dateSelected" },
    onLogPeriod: { action: "logPeriod" },
    onSettings: { action: "settings" },
    onBack: { action: "back" },
    onToggleVisibility: { action: "toggleVisibility" },
  },
};

export default meta;

type Story = StoryObj<typeof MenstrualCalendar>;

export const Default: Story = {
  args: {
    cycles: mockCycles,
    prediction: mockPrediction,
  },
};

export const WithVisibilityToggle: Story = {
  args: {
    cycles: mockCycles,
    prediction: mockPrediction,
    isVisible: true,
  },
};

export const Empty: Story = {
  args: {
    cycles: [],
  },
};

export const NoPrediction: Story = {
  args: {
    cycles: mockCycles,
  },
};
