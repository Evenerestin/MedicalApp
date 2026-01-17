import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
  },

  base: {
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 8,
    flexDirection: "row",
  },

  autoWidth: {
    alignSelf: "flex-start",
  },
  fullWidth: {
    width: "100%",
    flex: 1,
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

  filled: {
    backgroundColor: "#1976d2",
  },
  light: {
    backgroundColor: "rgba(25, 118, 210, 0.15)",
    borderWidth: 2,
    borderColor: "#1976d2",
  },
  outline: {
    backgroundColor: "transparent",
    borderWidth: 2,
    borderColor: "#1976d2",
  },
  transparent: {
    backgroundColor: "transparent",
  },

  text: {
    fontWeight: "500",
    textAlign: "center",
    paddingBottom: 2,
  },

  textSm: {
    fontSize: 14,
  },
  textMd: {
    fontSize: 16,
  },
  textLg: {
    fontSize: 18,
  },

  textFilled: {
    color: "#fff",
  },
  textLight: {
    color: "#1976d2",
  },
  textOutline: {
    color: "#1976d2",
  },
  textTransparent: {
    color: "#1976d2",
  },

  disabled: {
    opacity: 0.5,
  },
  disabledText: {
    color: "#999",
  },
  rounded: {
    borderRadius: 9999,
  },

  loading: {
    opacity: 0.7,
  },
});
