import React from "react";
import {
  ColorValue,
  Text as RNText,
  TextProps as RNTextProps,
  StyleProp,
  TextStyle,
} from "react-native";
import { textStyles } from "./Text.styles";

export type TextVariant = "body" | "caption" | "subtitle" | "button";

export interface TextProps extends Omit<RNTextProps, "style"> {
  variant?: TextVariant;
  style?: StyleProp<TextStyle>;
  color?: ColorValue;
  align?: TextStyle["textAlign"];
  underline?: boolean;
  italic?: boolean;
  center?: boolean;
  letterSpacing?: number;
  numberOfLines?: number;
  ellipsizeMode?: "head" | "middle" | "tail" | "clip";
  accessibilityLabel?: string;
  children: React.ReactNode;
}

export const Text: React.FC<TextProps> = ({
  variant = "body",
  style,
  color,
  align,
  underline,
  italic,
  center,
  letterSpacing,
  numberOfLines,
  ellipsizeMode,
  accessibilityLabel,
  children,
  ...rest
}) => (
  <RNText
    style={[
      textStyles[variant],
      underline && textStyles.underline,
      italic && textStyles.italic,
      center && textStyles.center,
      color ? { color } : undefined,
      align ? { textAlign: align } : undefined,
      letterSpacing !== undefined ? { letterSpacing } : undefined,
      style,
    ]}
    numberOfLines={numberOfLines}
    ellipsizeMode={ellipsizeMode}
    accessibilityLabel={accessibilityLabel}
    {...rest}
  >
    {children}
  </RNText>
);
