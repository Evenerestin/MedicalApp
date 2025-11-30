import { Ionicons } from "@expo/vector-icons";
import React, { useState } from "react";
import { TouchableOpacity, View } from "react-native";
import { styles } from "./Menu.styles";
import { MenuBar } from "./MenuBar";

interface TabItem {
  key: string;
  icon: keyof typeof Ionicons.glyphMap;
  label: string;
}

export interface MenuProps {
  tabs?: TabItem[];
  initialActiveTabKey?: string;
  onTabPress: (key: string) => void;
  showCutout?: boolean;
}

export const Menu = ({
  tabs,
  initialActiveTabKey,
  onTabPress,
  showCutout = true,
}: MenuProps) => {
  const defaultTabs: TabItem[] = [
    {
      key: "vitals",
      icon: "heart",
      label: "Vitals",
    },
    {
      key: "search",
      icon: "search",
      label: "Search",
    },
    {
      key: "calendar",
      icon: "calendar",
      label: "Calendar",
    },
    {
      key: "profile",
      icon: "person",
      label: "Profile",
    },
  ];

  const menuTabs = tabs || defaultTabs;
  const [activeTab, setActiveTab] = useState(
    initialActiveTabKey || menuTabs[0]?.key
  );

  const handlePress = (key: string) => {
    setActiveTab(key);
    onTabPress(key);
  };

  const firstRowTabs = menuTabs.slice(0, 2);
  const secondRowTabs = menuTabs.slice(2, 4);

  return (
    <>
      <MenuBar showCutout={showCutout}>
        <View style={styles.tabsContainer}>
          <View style={[styles.rowContainer, styles.row]}>
            <View style={styles.row}>
              {firstRowTabs.map((tab) => {
                const isActive = tab.key === activeTab;

                return (
                  <TouchableOpacity
                    key={tab.key}
                    accessibilityRole="tab"
                    accessibilityState={{ selected: isActive }}
                    accessibilityLabel={tab.label}
                    onPress={() => handlePress(tab.key)}
                    style={[
                      styles.tabButton,
                      isActive
                        ? styles.activeTabButton
                        : styles.inactiveTabButton,
                    ]}
                  >
                    <View style={styles.iconWrapper}>
                      <Ionicons
                        name={tab.icon}
                        size={25}
                        color={isActive ? "#152b4f" : "#666666"}
                      />
                    </View>
                  </TouchableOpacity>
                );
              })}
            </View>

            <View style={styles.row}>
              {secondRowTabs.map((tab) => {
                const isActive = tab.key === activeTab;

                return (
                  <TouchableOpacity
                    key={tab.key}
                    accessibilityRole="tab"
                    accessibilityState={{ selected: isActive }}
                    accessibilityLabel={tab.label}
                    onPress={() => handlePress(tab.key)}
                    style={[
                      styles.tabButton,
                      isActive
                        ? styles.activeTabButton
                        : styles.inactiveTabButton,
                    ]}
                  >
                    <View style={styles.iconWrapper}>
                      <Ionicons
                        name={tab.icon}
                        size={25}
                        color={isActive ? "#152b4f" : "#666666"}
                      />
                    </View>
                  </TouchableOpacity>
                );
              })}
            </View>
          </View>
        </View>
      </MenuBar>
      <TouchableOpacity
        key={"home"}
        accessibilityRole="tab"
        accessibilityState={{ selected: "home" === activeTab }}
        accessibilityLabel={"Home"}
        onPress={() => handlePress("home")}
        style={[
          styles.centerTabButton,
          "home" === activeTab ? styles.activeTabButton : "",
        ]}
      >
        <View style={styles.iconWrapper}>
          <Ionicons
            name="home"
            size={40}
            color={"home" === activeTab ? "#152b4f" : "#666666"}
          />
        </View>
      </TouchableOpacity>
    </>
  );
};
