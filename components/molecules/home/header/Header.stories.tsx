import React from "react";
import { StyleSheet } from "react-native";
import { Header } from "./Header";

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 16,
  },
  headerLeft: {},
  greeting: { fontSize: 18, fontWeight: "600", color: "#333" },
  userName: { fontSize: 16, color: "#1976d2", fontWeight: "bold" },
  headerRight: { flexDirection: "row", alignItems: "center" },
  notificationButton: { marginRight: 12 },
  notificationBadge: {
    position: "absolute",
    top: -4,
    right: -4,
    backgroundColor: "#e53935",
    borderRadius: 8,
    paddingHorizontal: 4,
    paddingVertical: 2,
  },
  notificationBadgeText: { color: "#fff", fontSize: 10, fontWeight: "bold" },
  avatar: {
    backgroundColor: "#1976d2",
    borderRadius: 16,
    width: 32,
    height: 32,
    alignItems: "center",
    justifyContent: "center",
  },
  avatarText: { color: "#fff", fontWeight: "bold" },
});

const getGreeting = () => "Good morning";
const getInitials = (name: string) =>
  name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase();

export default {
  title: "Molecules/Home/Header",
  component: Header,
};

export const Default = () => (
  <Header
    userName="Username Surname"
    notificationCount={3}
    onNotificationsPress={() => alert("Notifications pressed")}
    onProfilePress={() => alert("Profile pressed")}
    getGreeting={getGreeting}
    getInitials={getInitials}
    styles={styles}
  />
);

export const NoNotifications = () => (
  <Header
    userName="Username Surname"
    notificationCount={0}
    onNotificationsPress={() => alert("Notifications pressed")}
    onProfilePress={() => alert("Profile pressed")}
    getGreeting={getGreeting}
    getInitials={getInitials}
    styles={styles}
  />
);
