import type { Meta, StoryObj } from "@storybook/react-native";
import { IconCheck, IconX } from "@tabler/icons-react-native";
import React, { useState } from "react";
import { Chip } from "../Chip";

const meta: Meta<typeof Chip> = {
  title: "Atoms/Inputs/Chip/Outline",
  component: Chip,
  parameters: { docs: { autodocs: true } },
};
export default meta;

export const Small: StoryObj<typeof Chip> = {
  render: () => {
    const [selected, setSelected] = useState(false);
    return (
      <Chip
        label="Small"
        variant="outline"
        size="sm"
        selected={selected}
        onChange={setSelected}
      />
    );
  },
};
export const Medium: StoryObj<typeof Chip> = {
  render: () => {
    const [selected, setSelected] = useState(false);
    return (
      <Chip
        label="Medium"
        variant="outline"
        size="md"
        selected={selected}
        onChange={setSelected}
      />
    );
  },
};
export const Large: StoryObj<typeof Chip> = {
  render: () => {
    const [selected, setSelected] = useState(false);
    return (
      <Chip
        label="Large"
        variant="outline"
        size="lg"
        selected={selected}
        onChange={setSelected}
      />
    );
  },
};
export const Disabled: StoryObj<typeof Chip> = {
  render: () => (
    <Chip
      label="Disabled"
      variant="outline"
      disabled
      selected={false}
      onChange={() => {}}
    />
  ),
};
export const LeftSection: StoryObj<typeof Chip> = {
  render: () => {
    const [selected, setSelected] = useState(false);
    return (
      <Chip
        label="Left Icon"
        variant="outline"
        leftSection={
          <IconCheck size={16} color={selected ? "#1976d2" : "#757575"} />
        }
        selected={selected}
        onChange={setSelected}
      />
    );
  },
};
export const RightSection: StoryObj<typeof Chip> = {
  render: () => {
    const [selected, setSelected] = useState(false);
    return (
      <Chip
        label="Right Icon"
        variant="outline"
        rightSection={
          <IconX size={16} color={selected ? "#1976d2" : "#757575"} />
        }
        selected={selected}
        onChange={setSelected}
      />
    );
  },
};
