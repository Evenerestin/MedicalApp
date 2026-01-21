import {
  IconActivityHeartbeat,
  IconDeviceFloppy,
  IconEdit,
  IconPlus,
  IconX,
  IconProps as TablerIconProps,
} from "@tabler/icons-react-native";
import type { VariantType } from "@theme/variants";
import getVariantConfig from "@theme/variants";
import React from "react";
import {
  ActivityIndicator,
  TouchableOpacity,
  View,
  ViewStyle,
} from "react-native";
import { styles } from "./ActionIcon.styles";

export type ActionIconProps = {
  icon?: React.ReactElement;
  preset?: "close" | "add" | "edit" | null;
  size?: "sm" | "md" | "lg";
  variant?: VariantType;
  color?: string;
  disabled?: boolean;
  rounded?: boolean;
  loading?: boolean;
  onPress?: () => void;
  style?: ViewStyle;
  testID?: string;
  accessibilityLabel?: string;
};

import colors from "@theme/colors";

export const ActionIcon: React.FC<ActionIconProps> = ({
  icon,
  preset = null,
  size = "md",
  variant = "filled",
  color,
  disabled = false,
  rounded = false,
  onPress,
  testID,
  accessibilityLabel,
}) => {
  let accent = color || colors.primary;
  const variantStyles = getVariantConfig(variant as VariantType, accent);

  const renderIcon = () => {
    const iconSize = size === "sm" ? 16 : size === "md" ? 24 : 32;
    const iconColor = variantStyles.icon;
    if (preset) {
      switch (preset) {
        case "close":
          return <IconX size={iconSize} color={iconColor} />;
        case "add":
          return <IconPlus size={iconSize} color={iconColor} />;
        case "edit":
          return <IconEdit size={iconSize} color={iconColor} />;
        default:
          break;
      }
    }
    if (icon) {
      if (React.isValidElement<TablerIconProps>(icon)) {
        const existingProps = icon.props || {};
        const shouldApplyColor = !existingProps.color;
        const shouldApplySize = !existingProps.size;
        if (shouldApplyColor || shouldApplySize) {
          const newProps: Partial<TablerIconProps> = { ...existingProps };
          if (shouldApplyColor) newProps.color = iconColor;
          if (shouldApplySize) newProps.size = iconSize;
          return React.cloneElement(icon, newProps);
        }
      }
      return icon;
    }
    return <IconActivityHeartbeat size={iconSize} color={iconColor} />;
  };

  const handlePress = () => {
    if (!disabled && onPress) {
      onPress();
    }
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={[
          styles.base,
          styles[size],
          disabled && styles.disabled,
          rounded && styles.rounded,
          {
            backgroundColor: variantStyles.background,
            borderColor: variantStyles.border,
          },
        ]}
        disabled={disabled}
        onPress={handlePress}
        accessibilityRole="button"
        accessibilityLabel={accessibilityLabel}
        accessibilityState={{ disabled }}
        activeOpacity={0.7}
        testID={testID}
      >
        {renderIcon()}
      </TouchableOpacity>
    </View>
  );
};
