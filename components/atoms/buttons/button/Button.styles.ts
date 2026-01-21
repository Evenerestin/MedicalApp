import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
  },
  base: {
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 8,
    borderWidth: 1,
    flexDirection: "row",
  },
  autoWidth: {
    alignSelf: "flex-start",
  },
  fullWidth: {
    width: "100%",
    flex: 1,
  },
  rounded: {
    borderRadius: 999,
  },
  disabled: {
    opacity: 0.4,
  },
  sm: {
    height: 36,
    paddingVertical: 6,
    paddingHorizontal: 16,
  },
  md: {
    height: 44,
    paddingVertical: 8,
    paddingHorizontal: 24,
  },
  lg: {
    height: 52,
    paddingVertical: 10,
    paddingHorizontal: 32,
  },
  leftSection: {
    marginRight: 6,
  },
  rightSection: {
    marginLeft: 6,
  },
});
