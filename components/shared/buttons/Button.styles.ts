import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    alignSelf: "flex-start",
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
  },
  content: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  container_small: {
    paddingHorizontal: 16,
    paddingVertical: 6,
  },
  container_medium: {
    paddingHorizontal: 24,
    paddingVertical: 10,
  },
  container_large: {
    paddingHorizontal: 32,
    paddingVertical: 14,
  },
  container_primary: {
    backgroundColor: "#152b4f",
  },
  container_secondary: {
    backgroundColor: "transparent",
    borderWidth: 2,
    borderColor: "#152b4f",
  },
  container_tertiary: {
    backgroundColor: "transparent",
  },
  container_disabled: {
    backgroundColor: "#e0e0e0",
    borderColor: "#e0e0e0",
  },
  container_fullWidth: {
    alignSelf: "stretch",
    width: "100%",
  },
  text: {
    fontWeight: "600",
  },
  text_small: {
    fontSize: 14,
  },
  text_medium: {
    fontSize: 16,
  },
  text_large: {
    fontSize: 18,
  },
  text_primary: {
    color: "#ffffff",
  },
  text_secondary: {
    color: "#152b4f",
  },
  text_tertiary: {
    color: "#152b4f",
  },
  text_disabled: {
    color: "#999999",
  },
  iconLeft: {
    marginRight: 8,
  },
  iconRight: {
    marginLeft: 8,
  },
});
