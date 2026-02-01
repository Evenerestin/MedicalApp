import colors from "@theme/colors";
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    position: "relative",
    width: 44,
    height: 44,
    justifyContent: "center",
    backgroundColor: colors.white,
    boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.1)",
    alignItems: "center",
    borderRadius: 22,
  },
  badge: {
    position: "absolute",
    top: 0,
    right: 0,
    minWidth: 18,
    height: 18,
    borderRadius: 9,
    backgroundColor: colors.primary,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 3,
  },
  badgeText: {
    color: "#fff",
    fontSize: 10,
    fontWeight: "bold",
  },
});
