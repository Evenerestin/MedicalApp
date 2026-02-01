import React, { useEffect, useRef, useState } from "react";
import {
  Animated,
  LayoutChangeEvent,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { styles } from "./MedicationTabs.styles";

export interface MedicationTabsProps {
  tabs: string[];
  activeTab: string;
  onTabChange: (tab: string) => void;
}

export const MedicationTabs: React.FC<MedicationTabsProps> = ({
  tabs,
  activeTab,
  onTabChange,
}) => {
  const sliderAnim = useRef(
    new Animated.Value(tabs.indexOf(activeTab)),
  ).current;
  const tabWidth = useRef(0);
  const prevTab = useRef(activeTab);
  const [tabWidthState, setTabWidthState] = useState(0);

  useEffect(() => {
    const idx = tabs.indexOf(activeTab);
    Animated.timing(sliderAnim, {
      toValue: idx,
      duration: 250,
      useNativeDriver: false,
    }).start();
    prevTab.current = activeTab;
  }, [activeTab, tabs, sliderAnim]);

  const onLayout = (e: LayoutChangeEvent) => {
    const width = e.nativeEvent.layout.width / tabs.length;
    tabWidth.current = width;
    setTabWidthState(width);
    const idx = tabs.indexOf(activeTab);
    sliderAnim.setValue(idx);
  };

  return (
    <View style={styles.container} onLayout={onLayout}>
      <Animated.View
        style={[
          styles.slider,
          {
            width: tabWidthState > 0 ? tabWidthState : "100%",
            left: sliderAnim.interpolate({
              inputRange: tabs.map((_, i) => i),
              outputRange: tabs.map(
                (_, i) => i * (tabWidthState > 0 ? tabWidthState : 0),
              ),
            }),
            borderTopLeftRadius: sliderAnim.interpolate({
              inputRange: [0, tabs.length - 1],
              outputRange: [12, 0],
              extrapolate: "clamp",
            }),
            borderBottomLeftRadius: sliderAnim.interpolate({
              inputRange: [0, tabs.length - 1],
              outputRange: [12, 0],
              extrapolate: "clamp",
            }),
            borderTopRightRadius: sliderAnim.interpolate({
              inputRange: [0, tabs.length - 1],
              outputRange: [0, 12],
              extrapolate: "clamp",
            }),
            borderBottomRightRadius: sliderAnim.interpolate({
              inputRange: [0, tabs.length - 1],
              outputRange: [0, 12],
              extrapolate: "clamp",
            }),
          },
        ]}
      />
      {tabs.map((tab, idx) => {
        const isActive = tab === activeTab;
        return (
          <TouchableOpacity
            key={tab}
            style={styles.tab}
            onPress={() => onTabChange(tab)}
            accessibilityState={{ selected: isActive }}
            activeOpacity={0.8}
          >
            <Text style={[styles.tabLabel, isActive && styles.activeTabLabel]}>
              {tab}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
};
