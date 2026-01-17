import { StyleSheet } from "react-native";

export const textStyles = StyleSheet.create({
  body: { fontSize: 14, fontWeight: "400", lineHeight: 20 },
  caption: { fontSize: 12, fontWeight: "400", lineHeight: 16 },
  subtitle: { fontSize: 16, fontWeight: "500", lineHeight: 22 },
  button: {
    fontSize: 14,
    fontWeight: "600",
    lineHeight: 20,
    textTransform: "uppercase",
  },
  underline: { textDecorationLine: "underline" },
  italic: { fontStyle: "italic" },
  center: { textAlign: "center" },
});
