import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { styles } from "./ICE.styles";

export interface ICEEmptyStateProps {
  onCreateProfile?: () => void;
  onBack?: () => void;
}

export const ICEEmptyState = ({
  onCreateProfile,
  onBack,
}: ICEEmptyStateProps) => {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        {onBack && (
          <TouchableOpacity style={styles.backButton} onPress={onBack}>
            <Ionicons name="arrow-back" size={24} color="#152b4f" />
          </TouchableOpacity>
        )}
        <Text style={styles.headerTitle}>ICE Profile</Text>
        <View style={{ width: 40 }} />
      </View>

      <View style={styles.emptyState}>
        <Ionicons
          name="medkit-outline"
          size={80}
          color="#c62828"
          style={styles.emptyStateIcon}
        />
        <Text style={styles.emptyStateText}>No ICE Profile Created</Text>
        <Text style={styles.emptyStateSubtext}>
          Create an In Case of Emergency (ICE) profile to store critical medical
          information that can be accessed quickly in emergencies.
        </Text>

        <TouchableOpacity style={styles.createButton} onPress={onCreateProfile}>
          <Ionicons name="add-circle-outline" size={24} color="#ffffff" />
          <Text style={styles.createButtonText}>Create ICE Profile</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};
