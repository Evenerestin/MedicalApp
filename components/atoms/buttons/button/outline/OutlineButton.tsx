import React from "react";
import { StyleSheet, TextStyle, ViewStyle } from "react-native";
import { Button, ButtonProps } from "../Button";

export type OutlineButtonProps = Omit<ButtonProps, "variant">;

export const OutlineButton: React.FC<OutlineButtonProps> = (props) => {
  return <Button {...props} variant="outline" />;
};
