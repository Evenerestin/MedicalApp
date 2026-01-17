import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    width: "100%",
    marginBottom: 16,
  },
  label: {
    fontWeight: "600",
    fontSize: 16,
    marginBottom: 2,
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
    borderWidth: 1.5,
    borderRadius: 8,
    marginBottom: 2,
    backgroundColor: "#fafafd",
    borderColor: "#e4e4ea",
  },
  input: {
    flex: 1,
    fontSize: 16,
    backgroundColor: "transparent",
    color: "#757575",
    borderWidth: 0,
    borderColor: "transparent",
    outlineWidth: 0,
    paddingHorizontal: 10,
  },
  leftSection: {
    marginRight: 8,
  },
  rightSection: {
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
    borderWidth: 1,
  },
});
