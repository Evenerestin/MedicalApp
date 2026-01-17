import {
  IconCalendarEvent,
  IconHeartbeat,
  IconHomeFilled,
  IconPill,
  IconUser,
} from "@tabler/icons-react-native";
import React, { useState } from "react";
import { StyleSheet, View } from "react-native";
import { MenuTabs } from "./MenuTabs";

import type { IconProps } from "@tabler/icons-react-native";

export interface MenuProps {
  initialActiveTabKey?: string;
  onTabPress: (key: string) => void;
}

export const Menu: React.FC<MenuProps> = ({
  initialActiveTabKey = "home",
  onTabPress,
}) => {
  const [activeKey, setActiveKey] = useState(initialActiveTabKey);

  const menuTabs = [
    {
      key: "home",
      icon: IconHomeFilled,
      label: "Home",
    },
    {
      key: "vitals",
      icon: IconHeartbeat,
      label: "Vitals",
    },
    {
      key: "medications",
      icon: IconPill,
      label: "Medications",
    },
    {
      key: "calendar",
      icon: IconCalendarEvent,
      label: "Calendar",
    },
    {
      key: "profile",
      icon: IconUser,
      label: "Profile",
    },
  ];

  const handleTabPress = (key: string) => {
    setActiveKey(key);
    onTabPress(key);
  };

  return (
    <View style={styles.menuContainer}>
      <MenuTabs
        tabs={menuTabs}
        activeKey={activeKey}
        onTabPress={handleTabPress}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  menuContainer: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: "#fff",
    borderTopWidth: 1,
    borderTopColor: "#e0e0e0",
    paddingVertical: 8,
    paddingBottom: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 8,
  },
});
