import React from "react";
import { View } from "react-native";
import IceCard from "./IceCard";

export default {
  title: "Molecules/Navigation/IceCard",
  component: IceCard,
};

export const Default = () => (
  <View style={{ padding: 16, backgroundColor: "#f8f9fa", flex: 1 }}>
    <IceCard hasICEProfile={false} onPress={() => {}} />
  </View>
);

export const WithProfile = () => (
  <View style={{ padding: 16, backgroundColor: "#f8f9fa", flex: 1 }}>
    <IceCard hasICEProfile={true} onPress={() => {}} />
  </View>
);
