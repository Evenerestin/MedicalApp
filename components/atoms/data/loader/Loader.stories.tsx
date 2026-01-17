import React from "react";
import { View } from "react-native";
import { Loader } from "./Loader";

export default {
  title: "Atoms/Data/Loader",
  component: Loader,
};

export const Sizes = () => (
  <View style={{ flexDirection: "row", gap: 16, padding: 24 }}>
    <Loader size="sm" />
    <Loader size="md" />
    <Loader size="lg" />
    <Loader size={40} />
  </View>
);

export const Colors = () => (
  <View style={{ flexDirection: "row", gap: 16, padding: 24 }}>
    <Loader color="#1976d2" />
    <Loader color="#e53935" />
    <Loader color="#43a047" />
    <Loader color="#fbc02d" />
  </View>
);
