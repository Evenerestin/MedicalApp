import React from "react";
import { Header } from "./Header";

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
  />
);

export const NoNotifications = () => (
  <Header
    userName="Username Surname"
    notificationCount={0}
    onNotificationsPress={() => alert("Notifications pressed")}
    onProfilePress={() => alert("Profile pressed")}
  />
);
