import colors from "@theme/colors";
import React from "react";
import { View } from "react-native";
import { Button } from "./Button";

export default {
  title: "Atoms/Buttons/Button/Variants",
  component: Button,
};

export const Filled = () => <Button label="Filled" variant="filled" />;

export const Light = () => <Button label="Light" variant="light" />;

export const Outline = () => <Button label="Outline" variant="outline" />;

export const Transparent = () => (
  <Button label="Transparent" variant="transparent" />
);

export const CustomColor = () => (
  <View style={{ gap: 12 }}>
    <Button label="Custom Primary" variant="filled" color={colors.primary} />
    <Button label="Custom Secondary" variant="light" color={colors.secondary} />
    <Button label="Custom Error" variant="outline" color={colors.error} />
    <Button label="Custom Info" variant="transparent" color={colors.info} />
  </View>
);
