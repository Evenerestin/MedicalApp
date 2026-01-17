import React from "react";
import {
  ColorValue,
  StyleProp,
  Text,
  TextProps,
  TextStyle,
} from "react-native";
import { titleStyles } from "./Title.styles";

export interface TitleProps extends Omit<TextProps, "style"> {
  level?: 1 | 2 | 3 | 4 | 5 | 6 | 7;
  style?: StyleProp<TextStyle>;
  color?: ColorValue;
  align?: TextStyle["textAlign"];
  underline?: boolean;
  italic?: boolean;
  variant?: "primary" | "danger";
  center?: boolean;
  letterSpacing?: number;
  numberOfLines?: number;
  lineClamp?: number;
  ellipsizeMode?: "head" | "middle" | "tail" | "clip";
  accessibilityLabel?: string;
  children: React.ReactNode;
}

export const Title: React.FC<TitleProps> = ({
  level = 1,
  style,
  color,
  align,
  underline,
  italic,
  variant,
  center,
  letterSpacing,
  numberOfLines,
  lineClamp,
  ellipsizeMode,
  accessibilityLabel,
  children,
  ...rest
}) => {
  const variantKey = `h${level}` as keyof typeof titleStyles;
  return (
    <Text
      style={[
        titleStyles[variantKey],
        underline && titleStyles.underline,
        italic && titleStyles.italic,
        variant && titleStyles[variant],
        center && titleStyles.center,
        color ? { color } : undefined,
        align ? { textAlign: align } : undefined,
        letterSpacing !== undefined ? { letterSpacing } : undefined,
        style,
      ]}
      numberOfLines={lineClamp ?? numberOfLines}
      ellipsizeMode={ellipsizeMode}
      accessibilityLabel={accessibilityLabel}
      {...rest}
    >
      {children}
    </Text>
  );
};
