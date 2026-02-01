import {
  IconActivityHeartbeat,
  IconCalendar,
  IconCalendarWeek,
  IconChevronRight,
  IconHeart,
  IconHeartbeat,
  IconMedicalCross,
  IconVirus,
  IconProps as TablerIconProps,
} from "@tabler/icons-react-native";
import colors from "@theme/colors";
import getVariantConfig, { VariantType } from "@theme/variants";
import React from "react";
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ViewStyle,
} from "react-native";
import { styles } from "./ActionCard.styles";

export type ActionCardProps = {
  icon?: React.ReactElement;
  label?: string;
  preset?: "allergies" | "medications" | "vitals" | "cycle" | null;
  size?: "sm" | "md" | "lg";
  variant?: VariantType;
  color?: string;
  disabled?: boolean;
  rounded?: boolean;
  loading?: boolean;
  onPress?: () => void;
  style?: ViewStyle;
  accessibilityLabel?: string;
};

const presetConfig = {
  allergies: { label: "Allergies", color: colors.blue },
  medications: { label: "Medications", color: colors.blue },
  vitals: { label: "Vitals", color: colors.blue },
  cycle: { label: "Cycle", color: colors.blue },
};

const ActionCard: React.FC<ActionCardProps> = ({
  icon,
  label,
  preset = null,
  size = "md",
  variant = "filled",
  color,
  disabled = false,
  rounded = false,
  loading = false,
  onPress,
  accessibilityLabel,
}) => {
  const fallbackIcon = <IconHeartbeat size={24} color={colors.primary} />;
  const fallbackLabel = "Label";
  const presetLabel = preset ? presetConfig[preset]?.label : undefined;
  const presetColor = preset ? presetConfig[preset]?.color : undefined;
  const accent = presetColor || color || colors.primary;
  const displayLabel = presetLabel || label || fallbackLabel;
  const variantStyles = getVariantConfig(variant as VariantType, accent);

  const renderIcon = () => {
    const iconSize = size === "sm" ? 16 : size === "md" ? 24 : 32;
    const iconColor = variantStyles.icon;
    if (preset) {
      switch (preset) {
        case "allergies":
          return <IconVirus size={iconSize} color={iconColor} />;
        case "medications":
          return <IconMedicalCross size={iconSize} color={iconColor} />;
        case "vitals":
          return <IconHeartbeat size={iconSize} color={iconColor} />;
        case "cycle":
          return <IconCalendarWeek size={iconSize} color={iconColor} />;
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
    return <IconHeartbeat size={iconSize} color={iconColor} />;
  };

  return (
    <TouchableOpacity
      style={[
        styles.base,
        disabled && styles.disabled,
        rounded && styles.rounded,
        {
          backgroundColor: variantStyles.background,
          borderColor: variantStyles.border,
          borderWidth: 2,
        },
      ]}
      disabled={disabled}
      accessibilityLabel={accessibilityLabel}
      onPress={onPress}
    >
      <View style={styles.icon}>{renderIcon()}</View>
      <Text
        style={[styles.label, { color: variantStyles.text }]}
        numberOfLines={1}
        ellipsizeMode="tail"
        adjustsFontSizeToFit={false}
      >
        {displayLabel}
      </Text>
    </TouchableOpacity>
  );
};

export default ActionCard;
