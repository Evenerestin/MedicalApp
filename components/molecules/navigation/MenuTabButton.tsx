import type { IconProps } from "@tabler/icons-react-native";
import colors from "@theme/colors";
import React from "react";
import { Pressable, Text, View } from "react-native";
import { styles } from "./MenuTabButton.styles";

export interface MenuTabButtonProps {
  icon: React.ComponentType<IconProps>;
  alt: string;
  active: boolean;
  onPress: () => void;
}

export const MenuTabButton: React.FC<MenuTabButtonProps> = ({
  icon: Icon,
  alt,
  active,
  onPress,
}) => {
  return (
    <Pressable
      onPress={onPress}
      accessibilityLabel={alt}
      style={({ pressed }) => [styles.container, pressed && styles.pressed]}
    >
      <View
        style={[styles.iconContainer, active && styles.iconContainerActive]}
      >
        <Icon
          size={24}
          color={active ? colors.primary : colors.light}
          strokeWidth={active ? 2 : 1}
        />
      </View>
    </Pressable>
  );
};
