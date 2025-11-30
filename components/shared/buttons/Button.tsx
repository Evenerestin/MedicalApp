import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { styles } from "./Button.styles";

type ButtonVariant = "primary" | "secondary" | "tertiary";
type ButtonSize = "small" | "medium" | "large";

interface ButtonProps {
  onPress: () => void;
  text: string;
  variant?: ButtonVariant;
  size?: ButtonSize;
  disabled?: boolean;
  icon?: string;
  iconPosition?: "left" | "right";
  fullWidth?: boolean;
}

export const Button = ({
  onPress,
  text,
  variant = "primary",
  size = "medium",
  disabled = false,
  icon,
  iconPosition = "left",
  fullWidth = false,
}: ButtonProps) => {
  const containerStyle = [
    styles.container,
    styles[`container_${size}`],
    styles[`container_${variant}`],
    disabled && styles.container_disabled,
    fullWidth && styles.container_fullWidth,
  ];

  const textStyle = [
    styles.text,
    styles[`text_${size}`],
    styles[`text_${variant}`],
    disabled && styles.text_disabled,
  ];

  const iconSize = size === "small" ? 16 : size === "large" ? 24 : 20;
  const iconColor =
    variant === "primary" ? "#ffffff" : disabled ? "#cccccc" : "#152b4f";

  return (
    <TouchableOpacity
      style={containerStyle}
      onPress={onPress}
      disabled={disabled}
      activeOpacity={0.7}
    >
      <View style={styles.content}>
        {icon && iconPosition === "left" && (
          <Ionicons
            name={icon as keyof typeof Ionicons.glyphMap}
            size={iconSize}
            color={iconColor}
            style={styles.iconLeft}
          />
        )}
        <Text style={textStyle}>{text}</Text>
        {icon && iconPosition === "right" && (
          <Ionicons
            name={icon as keyof typeof Ionicons.glyphMap}
            size={iconSize}
            color={iconColor}
            style={styles.iconRight}
          />
        )}
      </View>
    </TouchableOpacity>
  );
};
