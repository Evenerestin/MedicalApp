import { IconBell } from "@tabler/icons-react-native";
import colors from "@theme/colors";
import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { ActionIcon } from "../../../buttons/actionicon/ActionIcon";
import { styles } from "./NotificationButton.styles";

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
        onPress={onPress}
        variant="transparent"
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
