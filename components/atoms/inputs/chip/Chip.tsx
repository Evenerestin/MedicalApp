import React from "react";
import {
  Text,
  TextStyle,
  TouchableOpacity,
  View,
  ViewStyle,
} from "react-native";
import { styles } from "./Chip.styles";

export interface ChipProps {
  label: string;
  size?: "sm" | "md" | "lg";
  variant?: "filled" | "outline" | "light";
  selected?: boolean;
  leftSection?: React.ReactElement;
  rightSection?: React.ReactElement;
  style?: ViewStyle;
  textStyle?: TextStyle;
  disabled?: boolean;
  onChange?: (selected: boolean) => void;
}

export const Chip: React.FC<ChipProps> = ({
  label,
  size = "md",
  variant = "light",
  selected = false,
  leftSection,
  rightSection,
  style,
  textStyle,
  disabled,
  onChange,
}) => {
  const handlePress = () => {
    if (!disabled && onChange) {
      onChange(!selected);
    }
  };

  const variantStyle = `${variant}${selected ? "Selected" : "Unselected"}`;
  const variantTextStyle = `${variant}${
    selected ? "Selected" : "Unselected"
  }Text`;

  const containerStyles: ViewStyle[] = [
    styles.base,
    styles[variantStyle as keyof typeof styles] as ViewStyle,
    styles[size],
    (disabled ? styles.disabled : undefined) as ViewStyle,
    style as ViewStyle,
  ].filter(Boolean);
  const textStyles: TextStyle[] = [
    styles.text,
    styles[variantTextStyle as keyof typeof styles] as TextStyle,
    styles[`${size}Text`],
    textStyle as TextStyle,
  ].filter(Boolean);

  return (
    <TouchableOpacity
      style={containerStyles}
      disabled={disabled}
      onPress={handlePress}
      activeOpacity={0.7}
    >
      {leftSection && <View style={styles.section}>{leftSection}</View>}
      <Text style={textStyles} numberOfLines={1} ellipsizeMode="tail">
        {label}
      </Text>
      {rightSection && <View style={styles.section}>{rightSection}</View>}
    </TouchableOpacity>
  );
};
