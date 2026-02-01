import colors from "@theme/colors";
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 2,
    gap: 0,
    width: "100%",
    marginBottom: 16,
  },
  greeting: { fontSize: 18, fontWeight: "600" },
  userName: { fontSize: 24, fontWeight: "700", color: colors.primary },
});
