import { NotificationButton } from "@components/atoms/data/notifications/button/NotificationButton";
import React from "react";
import { Text, View } from "react-native";
import { styles } from "./Header.styles";

export interface HeaderProps {
  userName: string;
  notificationCount: number;
  onNotificationsPress: () => void;
  onProfilePress: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  userName,
  notificationCount,
  onNotificationsPress,
  onProfilePress,
}) => {
  return (
    <View style={styles.header}>
      <View>
        <Text style={styles.greeting}>Welcome back!</Text>
        <Text style={styles.userName}>{userName}</Text>
      </View>
      <View>
        <NotificationButton
          count={notificationCount}
          onPress={onNotificationsPress}
        />
      </View>
    </View>
  );
};
