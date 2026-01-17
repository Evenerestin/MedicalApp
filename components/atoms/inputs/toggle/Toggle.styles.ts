import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  root: {
    flexDirection: "row",
    alignItems: "center",
    minHeight: 32,
  },
  switchContainer: {
    width: 40,
    height: 22,
    justifyContent: "center",
    alignItems: "flex-start",
    marginRight: 12,
  },
  track: {
    width: 40,
    height: 22,
    borderRadius: 12,
    backgroundColor: "#d4d4de",
    position: "absolute",
    left: 0,
    top: 0,
  },
  thumb: {
    width: 18,
    height: 18,
    borderRadius: 9,
    position: "absolute",
    top: 2,
    left: 2,
    backgroundColor: "#fff",
    borderWidth: 2,
    borderColor: "#d4d4de",
    shadowColor: "#000",
    shadowOpacity: 0.08,
    shadowRadius: 2,
    shadowOffset: { width: 0, height: 1 },
    elevation: 1,
  },
  label: {
    color: "#222",
    fontSize: 14,
    fontWeight: "500",
    marginLeft: 0,
  },
  disabled: {
    opacity: 0.5,
  },
});
