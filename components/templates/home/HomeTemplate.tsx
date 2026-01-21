import React from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Menu } from "../../organisms/navigation/Menu";

interface HomeTemplateProps {
  onTabPress: (key: string) => void;
}

const HomeTemplate: React.FC<HomeTemplateProps> = ({ onTabPress }) => {
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#f5f5f5" }}>
      <ScrollView style={{ flex: 1 }} contentContainerStyle={{ flexGrow: 1 }}>
        <View style={{ flex: 1 }}>
          <View
            style={{
              flex: 1,
              margin: 12,
              display: "flex",
              flexDirection: "column",
              gap: 12,
            }}
          ></View>
          <Menu onTabPress={onTabPress} />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default HomeTemplate;
