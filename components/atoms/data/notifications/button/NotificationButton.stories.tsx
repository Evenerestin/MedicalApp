import React from "react";
import { NotificationButton } from "./NotificationButton";

export default {
  title: "Atoms/Data/NotificationButton",
  component: NotificationButton,
};

export const Zero = () => (
  <NotificationButton
    count={0}
    onPress={() => {}}
  />
);

export const Default = () => (
  <NotificationButton
    count={3}
    onPress={() => {}}
  />
);

export const NinePlus = () => (
  <NotificationButton
    count={12}
    onPress={() => {}}
  />
);
