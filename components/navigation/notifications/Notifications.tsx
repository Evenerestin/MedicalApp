import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { Styles } from "./Notification.style";

interface NotificationsProps {
  onPress?: () => void;
  notificationCount?: number;
}

export const Notifications = ({
  onPress,
  notificationCount = 0,
}: NotificationsProps) => {
  return (
    <TouchableOpacity style={Styles.container} onPress={onPress}>
      <Ionicons name="notifications" size={25} color="#666666" />
      {notificationCount > 0 && (
        <View style={Styles.badge}>
          <Text style={Styles.badgeText}>
            {notificationCount > 9 ? "9+" : notificationCount}
          </Text>
        </View>
      )}
    </TouchableOpacity>
  );
};
