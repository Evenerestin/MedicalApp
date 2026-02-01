import colors from "@theme/colors";
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    backgroundColor: "#ffffff",
    borderRadius: 12,
    overflow: "hidden",
    marginVertical: 8,
    marginBottom: 18,
    // Box shadow for elevation
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 6,
    elevation: 2,
  },
  tab: {
    flex: 1,
    paddingVertical: 7,
    paddingHorizontal: 8,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "transparent",
    borderWidth: 0,
    zIndex: 1,
  },
  // Removed activeTab background, handled by slider only
  tabLabel: {
    color: colors.primary,
    fontWeight: "600",
    fontSize: 16,
  },
  activeTabLabel: {
    color: colors.primary,
    fontWeight: "700",
  },
  slider: {
    position: "absolute",
    top: 0,
    bottom: 0,
    backgroundColor: "#eaf4ff", // Mantine light variant
    borderRadius: 12,
    zIndex: 0,
    // The width and left are set dynamically in the component
  },
});
