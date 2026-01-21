import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
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
  leftSection: {
    marginRight: 6,
  },
  rightSection: {
    marginLeft: 6,
  },
  sm: {
    height: 20,
    paddingHorizontal: 8,
    fontSize: 12,
  },
  md: {
    height: 26,
    paddingHorizontal: 12,
    fontSize: 14,
  },
  lg: {
    height: 32,
    paddingHorizontal: 16,
    fontSize: 16,
  },
});
