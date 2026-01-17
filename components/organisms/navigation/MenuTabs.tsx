import type { IconProps } from "@tabler/icons-react-native";
import React from "react";
import { StyleSheet, View } from "react-native";
import { MenuTabButton } from "../../molecules/navigation/MenuTabButton";

export interface MenuTab {
  key: string;
  icon: React.ComponentType<IconProps>;
  label: string;
}

export interface MenuTabsProps {
  tabs: MenuTab[];
  activeKey: string;
  onTabPress: (key: string) => void;
}

export const MenuTabs: React.FC<MenuTabsProps> = ({
  tabs,
  activeKey,
  onTabPress,
}) => (
  <View style={styles.tabsRow}>
    {tabs.map((tab) => (
      <MenuTabButton
        key={tab.key}
        icon={tab.icon}
        label={tab.label}
        active={tab.key === activeKey}
        onPress={() => onTabPress(tab.key)}
      />
    ))}
  </View>
);

const styles = StyleSheet.create({
  tabsRow: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    width: "100%",
    paddingHorizontal: 8,
  },
});
