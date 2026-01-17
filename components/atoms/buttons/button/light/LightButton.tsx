import React from "react";
import { StyleSheet, TextStyle, ViewStyle } from "react-native";
import { Button, ButtonProps } from "../Button";

export type LightButtonProps = Omit<ButtonProps, "variant">;

export const LightButton: React.FC<LightButtonProps> = (props) => {
  return <Button {...props} variant="light" />;
};
