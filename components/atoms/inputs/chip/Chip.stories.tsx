import type { Meta, StoryObj } from "@storybook/react-native";
import { IconCheck, IconX } from "@tabler/icons-react-native";
import React, { useState } from "react";
import { View } from "react-native";
import { Chip } from "./Chip";

const meta: Meta<typeof Chip> = {
  title: "Atoms/Inputs/Chip/Base",
  component: Chip,
  parameters: { docs: { autodocs: true } },
};
export default meta;

export const Base: StoryObj<typeof Chip> = {
  render: () => {
    const [selected, setSelected] = useState(false);
    return (
      <View style={{ gap: 12, padding: 24 }}>
        <Chip
          label="Click to toggle"
          selected={selected}
          onChange={setSelected}
        />
      </View>
    );
  },
};

export const Disabled: StoryObj<typeof Chip> = {
  render: () => (
    <View style={{ gap: 12, padding: 24 }}>
      <Chip
        label="Disabled Unselected"
        selected={false}
        disabled
        onChange={() => {}}
      />
      <Chip
        label="Disabled Selected"
        selected={true}
        disabled
        onChange={() => {}}
      />
    </View>
  ),
};

export const MultiSelect: StoryObj<typeof Chip> = {
  render: () => {
    const [filters, setFilters] = useState({
      urgent: false,
      routine: true,
      followUp: false,
    });
    return (
      <View
        style={{ gap: 12, padding: 24, flexDirection: "row", flexWrap: "wrap" }}
      >
        <Chip
          label="Urgent"
          selected={filters.urgent}
          onChange={(val) => setFilters({ ...filters, urgent: val })}
        />
        <Chip
          label="Routine"
          selected={filters.routine}
          onChange={(val) => setFilters({ ...filters, routine: val })}
        />
        <Chip
          label="Follow-up"
          selected={filters.followUp}
          onChange={(val) => setFilters({ ...filters, followUp: val })}
        />
      </View>
    );
  },
};
