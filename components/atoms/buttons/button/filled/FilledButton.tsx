import React from "react";
import { StyleSheet, TextStyle, ViewStyle } from "react-native";
import { Button, ButtonProps } from "../Button";

export type FilledButtonProps = Omit<ButtonProps, "variant">;

export const FilledButton: React.FC<FilledButtonProps> = (props) => {
  return <Button {...props} variant="filled" />;
};
