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
  variant?: VariantType;
  color?: string;
  style?: ViewStyle;
  fullWidth?: boolean;
  disabled?: boolean;
  rounded?: boolean;
  onPress?: () => void;
  textStyle?: TextStyle;
  testID?: string;
  accessibilityLabel?: string;
  leftSection?: React.ReactElement<any>;
  rightSection?: React.ReactElement<any>;
};

import colors from "@theme/colors";
import type { VariantType } from "@theme/variants";
import getVariantConfig from "@theme/variants";

export const Button: React.FC<ButtonProps> = ({
  label = "Button",
  size = "md",
  variant = "filled",
  color,
  fullWidth = false,
  disabled = false,
  rounded = false,
  onPress,
  style,
  testID,
  accessibilityLabel,
  leftSection,
  rightSection,
}) => {
  const accent = color || colors.primary;
  const variantStyles = getVariantConfig(variant as VariantType, accent);

  const handlePress = () => {
    if (!disabled && onPress) {
      onPress();
    }
  };

  return (
    <View style={[styles.container, fullWidth && styles.fullWidth]}>
      <TouchableOpacity
        style={[
          styles.base,
          {
            backgroundColor: variantStyles.background,
            borderColor: variantStyles.border,
          },
          rounded ? styles.rounded : null,
          disabled ? styles.disabled : null,
          styles[size],
          fullWidth ? styles.fullWidth : styles.autoWidth,
          style,
        ]}
        disabled={disabled}
        onPress={handlePress}
        accessibilityRole="button"
        accessibilityLabel={accessibilityLabel}
        accessibilityState={{ disabled: disabled }}
        activeOpacity={0.8}
        testID={testID}
      >
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          {leftSection ? (
            <View style={styles.leftSection}>{leftSection}</View>
          ) : null}
          <Text
            style={[{ color: variantStyles.text }]}
            numberOfLines={1}
            ellipsizeMode="tail"
          >
            {label}
          </Text>
          {rightSection ? (
            <View style={styles.rightSection}>{rightSection}</View>
          ) : null}
        </View>
      </TouchableOpacity>
    </View>
  );
};
