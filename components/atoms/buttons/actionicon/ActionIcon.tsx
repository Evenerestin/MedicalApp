import {
  IconActivityHeartbeat,
  IconProps as TablerIconProps,
} from "@tabler/icons-react-native";
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
  size?: "sm" | "md" | "lg";
  variant?: "filled" | "light" | "outline" | "transparent";
  disabled?: boolean;
  rounded?: boolean;
  loading?: boolean;
  onPress?: () => void;
  style?: ViewStyle;
  testID?: string;
  backgroundColor?: string;
  accessibilityLabel?: string;
};

export const ActionIcon: React.FC<ActionIconProps> = ({
  icon,
  size = "md",
  variant = "filled",
  disabled = false,
  rounded = false,
  loading = false,
  onPress,
  style,
  testID,
  accessibilityLabel,
  backgroundColor,
}) => {
  const handlePress = () => {
    if (!disabled && !loading && onPress) {
      onPress();
    }
  };

  const getIconColor = () => {
    switch (variant) {
      case "filled":
        return "#fff";
      default:
        return "#1976d2";
    }
  };

  const getIconSize = () => {
    switch (size) {
      case "sm":
        return 20;
      case "md":
        return 24;
      case "lg":
        return 28;
      default:
        return 24;
    }
  };

  const renderIconContent = () => {
    if (loading) {
      return <ActivityIndicator size="small" color={getIconColor()} />;
    }
    if (icon) {
      const iconSize = getIconSize();
      const iconColor = getIconColor();
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
    const color = getIconColor();
    const sizeVal = getIconSize();
    return <IconActivityHeartbeat size={sizeVal} color={color} />;
  };

  const customBackgroundStyle = backgroundColor ? { backgroundColor } : {};

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={[
          styles.base,
          styles[variant],
          styles[size],
          disabled && styles.disabled,
          rounded && styles.rounded,
          loading && styles.loading,
          customBackgroundStyle,
          style,
        ]}
        disabled={disabled || loading}
        onPress={handlePress}
        accessibilityRole="button"
        accessibilityLabel={accessibilityLabel}
        accessibilityState={{ disabled: disabled || loading }}
        activeOpacity={0.7}
        testID={testID}
      >
        {renderIconContent()}
      </TouchableOpacity>
    </View>
  );
};
