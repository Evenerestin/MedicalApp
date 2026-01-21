import { IconProps as TablerIconProps } from "@tabler/icons-react-native";
import colors from "@theme/colors";
import type { VariantType } from "@theme/variants";
import getVariantConfig from "@theme/variants";
import React from "react";
import { Text, View } from "react-native";
import { styles } from "./Badge.styles";

export type BadgeProps = {
  children: React.ReactNode;
  color?: string;
  backgroundColor?: string;
  size?: "sm" | "md" | "lg";
  style?: any;
  leftSection?: React.ReactNode;
  rightSection?: React.ReactNode;
  variant?: VariantType;
};

export const Badge: React.FC<BadgeProps> = ({
  children,
  color,
  size = "md",
  style,
  leftSection,
  rightSection,
  variant = "filled",
}) => {
  const accent = color || colors.primary;
  const variantStyles = getVariantConfig(variant as VariantType, accent);

  const renderIcon = (icon: React.ReactNode) => {
    if (!icon) return null;
    const iconSize = size === "sm" ? 16 : size === "md" ? 24 : 32;
    if (React.isValidElement<TablerIconProps>(icon)) {
      const existingProps = icon.props || {};
      const shouldApplyColor = !existingProps.color;
      const shouldApplySize = !existingProps.size;
      if (shouldApplyColor || shouldApplySize) {
        const newProps: Partial<TablerIconProps> = { ...existingProps };
        if (shouldApplyColor) newProps.color = variantStyles.icon;
        if (shouldApplySize) newProps.size = iconSize;
        return React.cloneElement(icon, newProps);
      }
    }
    return icon;
  };

  return (
    <View
      style={[
        styles.base,
        styles[size],
        {
          backgroundColor: variantStyles.background,
          borderColor: variantStyles.border,
        },
        style,
      ]}
    >
      {leftSection && (
        <View style={styles.leftSection}>{renderIcon(leftSection)}</View>
      )}
      <Text
        style={[
          styles.text,
          {
            color: variantStyles.text,
          },
        ]}
        numberOfLines={1}
        ellipsizeMode="tail"
      >
        {children}
      </Text>
      {rightSection && (
        <View style={styles.rightSection}>{renderIcon(rightSection)}</View>
      )}
    </View>
  );
};
