import { StyleSheet } from "react-native";

export const badgeStyles = StyleSheet.create({
  base: {
    borderRadius: 999,
    alignSelf: "flex-start",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    minWidth: 20,
    minHeight: 20,
  },
  text: {
    fontWeight: "600",
    textAlign: "center",
  },
});
