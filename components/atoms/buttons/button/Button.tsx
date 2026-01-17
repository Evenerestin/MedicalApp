import React from "react";
import {
  ActivityIndicator,
  StyleSheet,
  Text,
  TextStyle,
  TouchableOpacity,
  View,
  ViewStyle,
} from "react-native";
import { styles } from "./Button.styles";

export type ButtonProps = {
  label: string;
  size?: "sm" | "md" | "lg";
  variant?: "filled" | "light" | "outline" | "transparent";
  fullWidth?: boolean;
  disabled?: boolean;
  rounded?: boolean;
  loading?: boolean;
  onPress?: () => void;
  style?: ViewStyle;
  textStyle?: TextStyle;
  testID?: string;
  accessibilityLabel?: string;
  leftSection?: React.ReactElement;
  rightSection?: React.ReactElement;
};

export const Button: React.FC<ButtonProps> = ({
  label = "Button",
  size = "md",
  variant = "filled",
  fullWidth = false,
  disabled = false,
  rounded = false,
  loading = false,
  onPress,
  style,
  textStyle,
  testID,
  accessibilityLabel,
  leftSection,
  rightSection,
}) => {
  const textVariantStyle = {
    filled: styles.textFilled,
    light: styles.textLight,
    outline: styles.textOutline,
    transparent: styles.textTransparent,
  }[variant];

  const textSizeStyle = {
    sm: styles.textSm,
    md: styles.textMd,
    lg: styles.textLg,
  }[size];

  const textDisabledStyle = {};

  const handlePress = () => {
    if (!disabled && !loading && onPress) {
      onPress();
    }
  };

  const accessibilityLabelText = accessibilityLabel || label;

  return (
    <View style={[styles.container, fullWidth && styles.fullWidth]}>
      <TouchableOpacity
        style={[
          styles.base,
          styles[variant],
          styles[size],
          fullWidth ? styles.fullWidth : styles.autoWidth,
          disabled && styles.disabled,
          rounded && styles.rounded,
          loading && styles.loading,
          style,
        ]}
        disabled={disabled || loading}
        onPress={handlePress}
        accessibilityRole="button"
        accessibilityLabel={accessibilityLabelText}
        accessibilityState={{ disabled: disabled || loading }}
        activeOpacity={0.8}
        testID={testID}
      >
        {loading ? (
          <ActivityIndicator
            size="small"
            color={variant === "filled" ? "#fff" : "#1976d2"}
          />
        ) : (
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            {leftSection ? (
              <View style={{ marginRight: 6 }}>{leftSection}</View>
            ) : null}
            <Text
              style={[
                styles.text,
                textVariantStyle,
                textSizeStyle,
                textDisabledStyle,
                textStyle,
              ]}
              numberOfLines={1}
              ellipsizeMode="tail"
            >
              {label}
            </Text>
            {rightSection ? (
              <View style={{ marginLeft: 6 }}>{rightSection}</View>
            ) : null}
          </View>
        )}
      </TouchableOpacity>
    </View>
  );
};
