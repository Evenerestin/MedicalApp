import { Ionicons } from "@expo/vector-icons";
import type { Meta, StoryObj } from "@storybook/react-native";
import React from "react";
import { Alert, View } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { Menu } from "./Menu";

const defaultTabs = [
  {
    key: "vitals",
    icon: "heart" as keyof typeof Ionicons.glyphMap,
    label: "Vitals",
  },
  {
    key: "search",
    icon: "search" as keyof typeof Ionicons.glyphMap,
    label: "Search",
  },
  {
    key: "calendar",
    icon: "calendar" as keyof typeof Ionicons.glyphMap,
    label: "Calendar",
  },
  {
    key: "profile",
    icon: "person" as keyof typeof Ionicons.glyphMap,
    label: "Profile",
  },
];

const MenuMeta: Meta<typeof Menu> = {
  title: "Components/Navigation/Menu",
  component: Menu,
  decorators: [
    (Story) => (
      <SafeAreaProvider>
        <View
          style={{
            flex: 1,
            backgroundColor: "#f0f0f0",
            justifyContent: "flex-end",
          }}
        >
          <Story />
        </View>
      </SafeAreaProvider>
    ),
  ],
  argTypes: {
    initialActiveTabKey: {
      control: { type: "select" },
      options: ["home", ...defaultTabs.map((item) => item.key)],
      description: "The key of the tab that should be active initially.",
    },
    onTabPress: {
      action: "tabPressed",
      description: "Function called when a tab is pressed.",
    },
    tabs: {
      control: { type: "object" },
      description: "Array of menu items (key, icon, label).",
    },
    showCutout: {
      control: { type: "boolean" },
      description: "Show the center cutout in the menu bar.",
    },
  },
  args: {
    tabs: defaultTabs,
    initialActiveTabKey: "home",
    showCutout: true,
    onTabPress: (key: string) => Alert.alert("Tab Pressed", `Pressed: ${key}`),
  },
};

export default MenuMeta;

export const Default: StoryObj<typeof Menu> = {
  args: {
    initialActiveTabKey: "home",
    showCutout: true,
  },
};

export const VitalsActive: StoryObj<typeof Menu> = {
  args: {
    initialActiveTabKey: "vitals",
    showCutout: true,
  },
};

export const SearchActive: StoryObj<typeof Menu> = {
  args: {
    initialActiveTabKey: "search",
    showCutout: true,
  },
};

export const CalendarActive: StoryObj<typeof Menu> = {
  args: {
    initialActiveTabKey: "calendar",
    showCutout: true,
  },
};

export const ProfileActive: StoryObj<typeof Menu> = {
  args: {
    initialActiveTabKey: "profile",
    showCutout: true,
  },
};
