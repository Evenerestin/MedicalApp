import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    gap: 12,
  },
  option: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderWidth: 1,
    borderColor: "#e0e0e0",
    borderRadius: 8,
    backgroundColor: "#ffffff",
  },
  optionSelected: {
    borderColor: "#152b4f",
    backgroundColor: "#f0f4f8",
  },
  optionDisabled: {
    opacity: 0.6,
  },
  checkbox: {
    width: 24,
    height: 24,
    borderWidth: 2,
    borderColor: "#e0e0e0",
    borderRadius: 6,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
  },
  checkboxSelected: {
    backgroundColor: "#152b4f",
    borderColor: "#152b4f",
  },
  checkboxDisabled: {
    backgroundColor: "#f5f5f5",
  },
  label: {
    fontSize: 16,
    color: "#333333",
    flex: 1,
  },
  labelSelected: {
    color: "#152b4f",
    fontWeight: "600",
  },
  labelDisabled: {
    color: "#999999",
  },
});
