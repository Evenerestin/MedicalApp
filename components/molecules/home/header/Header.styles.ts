import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 16,
  },
  greeting: { fontSize: 18, fontWeight: "600", color: "#333" },
  userName: { fontSize: 24, fontWeight: "700", color: "#000", marginTop: 4 },
});
