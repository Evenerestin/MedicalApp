import { IconProps as TablerIconProps } from "@tabler/icons-react-native";
import React from "react";
import { StyleSheet, Text, View } from "react-native";

export type BadgeProps = {
  children: React.ReactNode;
  color?: string;
  backgroundColor?: string;
  size?: "sm" | "md" | "lg";
  style?: any;
  leftSection?: React.ReactNode;
  rightSection?: React.ReactNode;
  variant?: "filled" | "default";
};

const sizeMap = {
  sm: { height: 20, paddingHorizontal: 8, fontSize: 12 },
  md: { height: 26, paddingHorizontal: 12, fontSize: 14 },
  lg: { height: 32, paddingHorizontal: 16, fontSize: 16 },
};

const getLightColor = (color: string): string => {
  if (color.startsWith("#")) {
    const hex = color.replace("#", "");
    const r = parseInt(hex.substring(0, 2), 16);
    const g = parseInt(hex.substring(2, 4), 16);
    const b = parseInt(hex.substring(4, 6), 16);
    return `rgba(${r}, ${g}, ${b}, 0.1)`;
  }
  return color;
};

export const Badge: React.FC<BadgeProps> = ({
  children,
  color = "#1976d2",
  backgroundColor,
  size = "md",
  style,
  leftSection,
  rightSection,
  variant = "default",
}) => {
  const sizeStyle = sizeMap[size] || sizeMap.md;
  const isFilled = variant === "filled";

  const bg = isFilled
    ? backgroundColor || color
    : backgroundColor || getLightColor(color);
  const textColor = isFilled ? "#fff" : color;
  const getIconColor = () => textColor;
  const getIconSize = () => {
    switch (size) {
      case "sm":
        return 16;
      case "md":
        return 20;
      case "lg":
        return 24;
      default:
        return 20;
    }
  };
  const renderIcon = (icon: React.ReactNode) => {
    if (!icon) return null;
    if (React.isValidElement<TablerIconProps>(icon)) {
      const existingProps = icon.props || {};
      const shouldApplyColor = !existingProps.color;
      const shouldApplySize = !existingProps.size;
      if (shouldApplyColor || shouldApplySize) {
        const newProps: Partial<TablerIconProps> = { ...existingProps };
        if (shouldApplyColor) newProps.color = getIconColor();
        if (shouldApplySize) newProps.size = getIconSize();
        return React.cloneElement(icon, newProps);
      }
    }
    return icon;
  };
  return (
    <View
      style={[
        badgeStyles.base,
        {
          backgroundColor: bg,
          height: sizeStyle.height,
          paddingHorizontal: sizeStyle.paddingHorizontal,
        },
        style,
      ]}
    >
      {leftSection && (
        <View style={{ marginRight: 6 }}>{renderIcon(leftSection)}</View>
      )}
      <Text
        style={[
          badgeStyles.text,
          { color: textColor, fontSize: sizeStyle.fontSize },
        ]}
        numberOfLines={1}
        ellipsizeMode="tail"
      >
        {children}
      </Text>
      {rightSection && (
        <View style={{ marginLeft: 6 }}>{renderIcon(rightSection)}</View>
      )}
    </View>
  );
};

const badgeStyles = StyleSheet.create({
  base: {
    borderRadius: 999,
    alignSelf: "flex-start",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    minWidth: 20,
    minHeight: 20,
  },
  text: {
    fontWeight: "600",
    textAlign: "center",
  },
});
