import colors from "@theme/colors";
import React from "react";
import { View } from "react-native";
import { Button } from "./Button";

export default {
  title: "Atoms/Buttons/Button/Sizes",
  component: Button,
};

export const Small = () => <Button label="Small" size="sm" />;

export const Medium = () => <Button label="Medium" size="md" />;

export const Large = () => <Button label="Large" size="lg"  />;