import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

export default function HealthPage() {
  const router = useRouter();

  const healthModules = [
    {
      id: "vitals",
      title: "Vital Signs",
      description: "Blood pressure, heart rate, weight & more",
      icon: "heart",
      color: "#e53935",
      route: "/(pages)/health/vitals",
    },
    {
      id: "glucose",
      title: "Glucose Journal",
      description: "Track blood sugar levels",
      icon: "water",
      color: "#f57c00",
      route: "/(pages)/health/glucose",
    },
    {
      id: "menstrual",
      title: "Menstrual Calendar",
      description: "Track periods and cycles",
      icon: "calendar",
      color: "#ec407a",
      route: "/(pages)/health/menstrual",
    },
  ];

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Health</Text>
      </View>

      <View style={styles.content}>
        {healthModules.map((module) => (
          <TouchableOpacity
            key={module.id}
            style={styles.moduleCard}
            onPress={() => router.push(module.route as any)}
          >
            <View
              style={[
                styles.moduleIcon,
                { backgroundColor: `${module.color}15` },
              ]}
            >
              <Ionicons
                name={module.icon as any}
                size={28}
                color={module.color}
              />
            </View>
            <View style={styles.moduleInfo}>
              <Text style={styles.moduleTitle}>{module.title}</Text>
              <Text style={styles.moduleDescription}>{module.description}</Text>
            </View>
            <Ionicons name="chevron-forward" size={24} color="#999999" />
          </TouchableOpacity>
        ))}
      </View>
    </View>
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
    backgroundColor: "#152b4f",
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
  moduleCard: {
    flexDirection: "row",
    alignItems: "center",
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
  moduleIcon: {
    width: 56,
    height: 56,
    borderRadius: 28,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 16,
  },
  moduleInfo: {
    flex: 1,
  },
  moduleTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#333333",
  },
  moduleDescription: {
    fontSize: 14,
    color: "#666666",
    marginTop: 4,
  },
});
