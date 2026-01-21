import { IconBell } from "@tabler/icons-react-native";
import colors from "@theme/colors";
import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { ActionIcon } from "../../../buttons/actionicon/ActionIcon";

export interface NotificationProps {
  count: number;
  onPress?: () => void;
}

export const NotificationButton: React.FC<NotificationProps> = ({
  count,
  onPress,
}) => {
  const displayCount = count > 9 ? "9+" : count.toString();
  return (
    <View style={styles.container}>
      <ActionIcon
        icon={<IconBell size={24} />}
        variant="outline"
        onPress={onPress}
        color="#121212"
        rounded
      />
      {count > 0 && (
        <View style={styles.badge}>
          <Text style={styles.badgeText}>{displayCount}</Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: "relative",
    width: 44,
    height: 44,
    justifyContent: "center",
    alignItems: "center",
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
