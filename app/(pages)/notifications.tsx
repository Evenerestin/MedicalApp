import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React from "react";
import {
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { useAppDispatch, useNotifications } from "../../context/AppContext";
import { AppNotification } from "../../types";

export default function NotificationsPage() {
  const router = useRouter();
  const notifications = useNotifications();
  const dispatch = useAppDispatch();

  const handleMarkAsRead = (id: string) => {
    dispatch({ type: "MARK_NOTIFICATION_READ", payload: id });
  };

  const handleMarkAllAsRead = () => {
    dispatch({ type: "MARK_ALL_NOTIFICATIONS_READ" });
  };

  const getNotificationIcon = (type: AppNotification["type"]) => {
    switch (type) {
      case "medication":
        return "medical";
      case "appointment":
        return "calendar";
      case "vital":
        return "heart";
      case "glucose":
        return "water";
      case "menstrual":
        return "flower";
      default:
        return "notifications";
    }
  };

  const getNotificationColor = (type: AppNotification["type"]) => {
    switch (type) {
      case "medication":
        return "#1976d2";
      case "appointment":
        return "#152b4f";
      case "vital":
        return "#e53935";
      case "glucose":
        return "#f57c00";
      case "menstrual":
        return "#ec407a";
      default:
        return "#666666";
    }
  };

  const renderNotification = ({ item }: { item: AppNotification }) => (
    <TouchableOpacity
      style={[
        styles.notificationCard,
        !item.isRead && styles.notificationCardUnread,
      ]}
      onPress={() => handleMarkAsRead(item.id)}
    >
      <View
        style={[
          styles.iconContainer,
          { backgroundColor: `${getNotificationColor(item.type)}15` },
        ]}
      >
        <Ionicons
          name={getNotificationIcon(item.type) as any}
          size={24}
          color={getNotificationColor(item.type)}
        />
      </View>
      <View style={styles.contentContainer}>
        <Text style={styles.notificationTitle}>{item.title}</Text>
        <Text style={styles.notificationMessage}>{item.message}</Text>
        <Text style={styles.notificationTime}>
          {new Date(item.createdAt).toLocaleString()}
        </Text>
      </View>
      {!item.isRead && <View style={styles.unreadDot} />}
    </TouchableOpacity>
  );

  const unreadCount = notifications.filter((n) => !n.isRead).length;

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => router.back()}
        >
          <Ionicons name="arrow-back" size={24} color="#ffffff" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Notifications</Text>
        {unreadCount > 0 && (
          <TouchableOpacity
            style={styles.markAllButton}
            onPress={handleMarkAllAsRead}
          >
            <Text style={styles.markAllText}>Mark all read</Text>
          </TouchableOpacity>
        )}
      </View>

      {notifications.length > 0 ? (
        <FlatList
          data={notifications.sort(
            (a, b) =>
              new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
          )}
          renderItem={renderNotification}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.listContent}
        />
      ) : (
        <View style={styles.emptyState}>
          <Ionicons
            name="notifications-off-outline"
            size={64}
            color="#cccccc"
          />
          <Text style={styles.emptyText}>No notifications</Text>
          <Text style={styles.emptySubtext}>
            You&apos;re all caught up! New notifications will appear here.
          </Text>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f8f9fa",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingTop: 60,
    paddingBottom: 16,
    backgroundColor: "#152b4f",
  },
  backButton: {
    width: 40,
    height: 40,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 8,
  },
  headerTitle: {
    flex: 1,
    fontSize: 20,
    fontWeight: "bold",
    color: "#ffffff",
  },
  markAllButton: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    backgroundColor: "rgba(255,255,255,0.2)",
    borderRadius: 16,
  },
  markAllText: {
    fontSize: 12,
    color: "#ffffff",
    fontWeight: "500",
  },
  listContent: {
    padding: 16,
  },
  notificationCard: {
    flexDirection: "row",
    alignItems: "flex-start",
    backgroundColor: "#ffffff",
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  notificationCardUnread: {
    backgroundColor: "#f0f7ff",
    borderLeftWidth: 3,
    borderLeftColor: "#152b4f",
  },
  iconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
  },
  contentContainer: {
    flex: 1,
  },
  notificationTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#333333",
    marginBottom: 4,
  },
  notificationMessage: {
    fontSize: 14,
    color: "#666666",
    marginBottom: 8,
  },
  notificationTime: {
    fontSize: 12,
    color: "#999999",
  },
  unreadDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: "#152b4f",
    marginLeft: 8,
  },
  emptyState: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 32,
  },
  emptyText: {
    fontSize: 18,
    fontWeight: "600",
    color: "#333333",
    marginTop: 16,
  },
  emptySubtext: {
    fontSize: 14,
    color: "#666666",
    textAlign: "center",
    marginTop: 8,
  },
});
