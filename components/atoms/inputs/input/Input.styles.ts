import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    width: "100%",
    display: "flex",
    flex: 1,
    marginTop: 6,
    marginBottom: 8,
  },
  label: {
    fontWeight: "600",
    fontSize: 14,
    marginBottom: 2,
    color: "#222326",
  },
  required: {
    color: "#e53935",
    fontWeight: "900",
  },
  description: {
    fontSize: 12,
    color: "#757575",
    marginBottom: 4,
    fontWeight: "400",
  },
  inputWrapper: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    marginBottom: 2,
    borderColor: "#e4e4ea",
    borderRadius: 8,
    backgroundColor: "#f3f3f6",
  },
  input: {
    borderRadius: 8,
    flex: 1,
    borderWidth: 0,
    fontSize: 16,
    paddingVertical: 10,
    color: "#757575",
    outlineWidth: 0,
    borderColor: "transparent",
    paddingHorizontal: 10,
  },
  leftSection: {
    marginRight: 8,
  },
  rightSection: {
    padding: 0,
    marginLeft: 8,
  },
  error: {
    color: "#e53935",
    fontSize: 14,
    marginTop: 2,
    fontWeight: "500",
  },
  errorInput: {
    borderColor: "#e53935",
  },
  disabledInput: {
    opacity: 0.6,
  },
});
