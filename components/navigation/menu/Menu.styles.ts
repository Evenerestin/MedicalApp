import { Dimensions, StyleSheet } from "react-native";

const { width } = Dimensions.get("window");

export const styles = StyleSheet.create({
  menuBarContainer: {
    height: 80,
    position: "relative",
    backgroundColor: "transparent",
    overflow: "hidden",
  },
  menuBarBackground: {
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 0,
  },
  menuBarContent: {
    padding: 10,
    height: 80,
    width: "100%",
    position: "relative",
    zIndex: 1,
  },
  menuBar: {
    backgroundColor: "white",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 5,
    padding: 10,
    height: 80,
    borderRadius: 40,
    flexDirection: "row",
  },
  tabsContainer: {
    flex: 1,
    justifyContent: "space-between",
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    width: "100%",
    flex: 1,
  },
  rowContainer: {
    gap: 80,
    alignItems: "center",
    justifyContent: "space-between",
    flexDirection: "row",
    width: "100%",
    paddingHorizontal: 8,
  },
  sideRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
    gap: 8,
  },
  centerTabButton: {
    position: "absolute",
    width: 60,
    height: 60,
    borderRadius: 40,
    marginBottom: 40,
    shadowColor: "#000",
    backgroundColor: "#f5f5f5",
    shadowOpacity: 0.1,
    shadowRadius: 4,
    justifyContent: "center",
    alignItems: "center",
    elevation: 6,
    left: "50%",
    transform: [{ translateX: "-50%" }],
  },
  tabButton: {
    alignItems: "center",
    justifyContent: "center",
    width: 55,
    height: 55,
    borderRadius: 27.5,
  },
  activeTabButton: {
    backgroundColor: "#C1CFE7",
  },
  inactiveTabButton: {
    backgroundColor: "transparent",
  },
  iconWrapper: {
    alignItems: "center",
    justifyContent: "center",
  },
});
