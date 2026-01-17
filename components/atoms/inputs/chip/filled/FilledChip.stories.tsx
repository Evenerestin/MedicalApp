import type { Meta, StoryObj } from "@storybook/react-native";
import { IconCheck, IconX } from "@tabler/icons-react-native";
import React, { useState } from "react";
import { View } from "react-native";
import { Chip } from "../Chip";

const meta: Meta<typeof Chip> = {
  title: "Atoms/Inputs/Chip/Filled",
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
        variant="filled"
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
        variant="filled"
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
        variant="filled"
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
      variant="filled"
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
        variant="filled"
        leftSection={
          <IconCheck size={16} color={selected ? "#fff" : "#757575"} />
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
        variant="filled"
        rightSection={<IconX size={16} color={selected ? "#fff" : "#757575"} />}
        selected={selected}
        onChange={setSelected}
      />
    );
  },
};
