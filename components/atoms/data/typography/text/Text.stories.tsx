import React from "react";
import { View } from "react-native";
import { Text } from "./Text";

export default {
  title: "Atoms/Data/Typography/Text",
  component: Text,
};

export const Variants = () => (
  <View style={{ gap: 8 }}>
    <Text variant="body">Body text</Text>
    <Text variant="caption">Caption text</Text>
    <Text variant="subtitle">Subtitle text</Text>
    <Text variant="button">Button text</Text>
  </View>
);

export const Styles = () => (
  <View style={{ gap: 8 }}>
    <Text variant="body" underline>
      Underline Body
    </Text>
    <Text variant="caption" italic>
      Italic Caption
    </Text>
    <Text variant="subtitle" center>
      Centered Subtitle
    </Text>
    <Text variant="button" color="#1976d2">
      Primary Button
    </Text>
    <Text variant="body" letterSpacing={2}>
      Spaced Body
    </Text>
  </View>
);
