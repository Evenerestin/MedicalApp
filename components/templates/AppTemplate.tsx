import React from "react";
import { SafeAreaView, StyleSheet, View } from "react-native";
import { Menu } from "../organisms/navigation/Menu";

export interface AppTemplateProps {
  children: React.ReactNode;
  initialActiveTabKey?: string;
  onTabPress?: (key: string) => void;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f8f9fa",
    paddingBottom: 96,
  },
  content: {
    flex: 1,
    paddingBottom: 96,
  },
});

export const AppTemplate = ({
  children,
  initialActiveTabKey,
  onTabPress,
}: AppTemplateProps) => {
  return (
    <SafeAreaView style={styles.container}>
      <View style={{ height: 32 }} />
      <View style={styles.content}>{children}</View>
      <Menu
        initialActiveTabKey={initialActiveTabKey}
        onTabPress={onTabPress || (() => {})}
      />
    </SafeAreaView>
  );
};
