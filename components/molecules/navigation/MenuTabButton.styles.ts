import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 8,
    paddingHorizontal: 12,
    minWidth: 64,
  },
  pressed: {
    opacity: 0.7,
  },
  iconContainer: {
    marginBottom: 4,
  },
  iconContainerActive: {},
  label: {
    fontSize: 12,
    color: "#8E8E93",
    textAlign: "center",
  },
  labelActive: {
    color: "#007AFF",
    fontWeight: "600",
  },
});
