import { Ionicons } from "@expo/vector-icons";
import colors from "@theme/colors";
import { useRouter } from "expo-router";
import React from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Toggle } from "../../../components/atoms/inputs/toggle/Toggle";
import {
  useAppDispatch,
  useSettings,
  useUser,
} from "../../../context/AppContext";

export default function ProfilePage() {
  const router = useRouter();
  const user = useUser();
  const settings = useSettings();
  const dispatch = useAppDispatch();

  const getInitials = (name?: string) => {
    if (!name) return "G";
    const parts = name.trim().split(" ");
    if (parts.length === 1) return parts[0][0].toUpperCase();
    return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
  };

  const handleEditProfile = () => {
    router.push("/(pages)/profile/edit");
  };

  const handleICEProfile = () => {
    router.push("/(pages)/profile/ice" as any);
  };

  const handleLogout = () => {
    dispatch({ type: "LOGOUT" });
    router.replace("/(auth)");
  };

  const toggleMenstrualCalendar = () => {
    dispatch({
      type: "UPDATE_SETTINGS",
      payload: { showMenstrualCalendar: !settings.showMenstrualCalendar },
    });
  };

  const toggleNotifications = () => {
    dispatch({
      type: "UPDATE_SETTINGS",
      payload: { notificationsEnabled: !settings.notificationsEnabled },
    });
  };

  return (
    <SafeAreaView style={styles.container} edges={["bottom"]}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Profile</Text>
      </View>

      <ScrollView
        style={styles.content}
        contentContainerStyle={{ paddingBottom: 48 }}
      >
        {/* User Info Card */}
        <View style={styles.userCard}>
          <View style={styles.avatar}>
            <Text style={styles.avatarText}>{getInitials(user?.name)}</Text>
          </View>
          <View style={styles.userInfo}>
            <Text style={styles.userName}>{user?.name || "Guest User"}</Text>
            <Text style={styles.userEmail}>
              {user?.email || "Not logged in"}
            </Text>
          </View>
          {/* Removed edit icon next to avatar as requested */}
        </View>

        {/* ICE Profile Section */}
        <TouchableOpacity style={styles.iceCard} onPress={handleICEProfile}>
          <View style={styles.iceIcon}>
            <Ionicons name="medkit" size={24} color="#ffffff" />
          </View>
          <View style={styles.iceInfo}>
            <Text style={styles.iceTitle}>ICE Profile</Text>
            <Text style={styles.iceSubtitle}>
              Emergency medical information
            </Text>
          </View>
          <Ionicons name="chevron-forward" size={24} color="#ffffff" />
        </TouchableOpacity>

        {/* Settings Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Settings</Text>

          <View style={styles.settingItem}>
            <View style={styles.settingInfo}>
              <Ionicons
                name="notifications-outline"
                size={22}
                color={colors.primary}
              />
              <Text style={styles.settingLabel}>Notifications</Text>
            </View>
            <Toggle
              checked={settings.notificationsEnabled}
              onChange={toggleNotifications}
              label=""
            />
          </View>

          <View style={styles.settingItem}>
            <View style={styles.settingInfo}>
              <Ionicons
                name="calendar-outline"
                size={22}
                color={colors.primary}
              />
              <Text style={styles.settingLabel}>Menstrual Calendar</Text>
            </View>
            <Toggle
              checked={settings.showMenstrualCalendar}
              onChange={toggleMenstrualCalendar}
              label=""
            />
          </View>

          <TouchableOpacity style={styles.settingItem}>
            <View style={styles.settingInfo}>
              <Ionicons
                name="language-outline"
                size={22}
                color={colors.primary}
              />
              <Text style={styles.settingLabel}>Language</Text>
            </View>
            <View style={styles.settingValue}>
              <Text style={styles.settingValueText}>
                {settings.language === "pl" ? "Polski" : "English"}
              </Text>
              <Ionicons name="chevron-forward" size={20} color="#999999" />
            </View>
          </TouchableOpacity>
        </View>

        {/* About Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>About</Text>

          <TouchableOpacity style={styles.settingItem}>
            <View style={styles.settingInfo}>
              <Ionicons
                name="information-circle-outline"
                size={22}
                color={colors.primary}
              />
              <Text style={styles.settingLabel}>About App</Text>
            </View>
            <Ionicons name="chevron-forward" size={20} color="#999999" />
          </TouchableOpacity>

          <TouchableOpacity style={styles.settingItem}>
            <View style={styles.settingInfo}>
              <Ionicons
                name="document-text-outline"
                size={22}
                color={colors.primary}
              />
              <Text style={styles.settingLabel}>Privacy Policy</Text>
            </View>
            <Ionicons name="chevron-forward" size={20} color="#999999" />
          </TouchableOpacity>

          <TouchableOpacity style={styles.settingItem}>
            <View style={styles.settingInfo}>
              <Ionicons
                name="help-circle-outline"
                size={22}
                color={colors.primary}
              />
              <Text style={styles.settingLabel}>Help & Support</Text>
            </View>
            <Ionicons name="chevron-forward" size={20} color="#999999" />
          </TouchableOpacity>
        </View>

        {/* Logout Button */}
        <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
          <Ionicons name="log-out-outline" size={22} color="#e53935" />
          <Text style={styles.logoutText}>Log Out</Text>
        </TouchableOpacity>

        <Text style={styles.versionText}>Version 1.0.0</Text>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f8f9fa",
  },
  header: {
    paddingHorizontal: 20,
    paddingTop: 60,
    paddingBottom: 16,
    backgroundColor: colors.primary,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#ffffff",
  },
  content: {
    flex: 1,
    padding: 16,
  },
  userCard: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#ffffff",
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  avatar: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: colors.primary,
    justifyContent: "center",
    alignItems: "center",
  },
  avatarText: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#ffffff",
  },
  userInfo: {
    flex: 1,
    marginLeft: 16,
  },
  userName: {
    fontSize: 18,
    fontWeight: "600",
    color: "#333333",
  },
  userEmail: {
    fontSize: 14,
    color: "#666666",
    marginTop: 4,
  },
  editButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#f0f4f8",
    justifyContent: "center",
    alignItems: "center",
  },
  iceCard: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#c62828",
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
  },
  iceIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: "rgba(255,255,255,0.2)",
    justifyContent: "center",
    alignItems: "center",
  },
  iceInfo: {
    flex: 1,
    marginLeft: 12,
  },
  iceTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#ffffff",
  },
  iceSubtitle: {
    fontSize: 12,
    color: "rgba(255,255,255,0.8)",
    marginTop: 2,
  },
  section: {
    backgroundColor: "#ffffff",
    borderRadius: 12,
    marginBottom: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: "600",
    color: "#666666",
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 8,
  },
  settingItem: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 14,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#f0f0f0",
  },
  settingInfo: {
    flexDirection: "row",
    alignItems: "center",
  },
  settingLabel: {
    fontSize: 16,
    color: "#333333",
    marginLeft: 12,
  },
  settingValue: {
    flexDirection: "row",
    alignItems: "center",
  },
  settingValueText: {
    fontSize: 14,
    color: "#666666",
    marginRight: 4,
  },
  logoutButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#ffffff",
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  logoutText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#e53935",
    marginLeft: 8,
  },
  versionText: {
    fontSize: 12,
    color: "#999999",
    textAlign: "center",
    marginBottom: 32,
  },
});
