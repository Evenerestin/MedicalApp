import React from "react";
import { StyleSheet, TextStyle, ViewStyle } from "react-native";
import { Button, ButtonProps } from "../Button";

export type TransparentButtonProps = Omit<ButtonProps, "variant">;

export const TransparentButton: React.FC<TransparentButtonProps> = (props) => {
  return <Button {...props} variant="transparent" />;
};
