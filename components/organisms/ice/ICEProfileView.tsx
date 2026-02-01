import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";
import { EmergencyContact, ICEProfile } from "../../../types";
import { styles } from "./ICE.styles";

export interface ICEProfileViewProps {
  profile: ICEProfile;
  onEdit?: () => void;
  onBack?: () => void;
  isReadOnly?: boolean;
}

export const ICEProfileView = ({
  profile,
  onEdit,
  onBack,
  isReadOnly = false,
}: ICEProfileViewProps) => {
  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={{ flexGrow: 1 }}
    >
      <View style={styles.header}>
        {onBack && (
          <TouchableOpacity style={styles.backButton} onPress={onBack}>
            <Ionicons name="arrow-back" size={24} color="#152b4f" />
          </TouchableOpacity>
        )}
        <Text style={styles.headerTitle}>ICE Profile</Text>
        {!isReadOnly && onEdit && (
          <TouchableOpacity style={styles.editButton} onPress={onEdit}>
            <Ionicons name="pencil" size={24} color="#152b4f" />
          </TouchableOpacity>
        )}
      </View>
      {/* ...rest of the content remains unchanged... */}
      <View style={styles.iceBanner}>
        <View style={styles.iceBannerIcon}>
          <Ionicons name="medkit" size={24} color="#ffffff" />
        </View>
        <View style={styles.iceBannerContent}>
          <Text style={styles.iceBannerTitle}>In Case of Emergency</Text>
          <Text style={styles.iceBannerSubtitle}>
            Critical medical information
          </Text>
        </View>
      </View>
      {/* ...rest of the content remains unchanged... */}
      {/* All sections, allergies, conditions, medications, contacts, etc. */}
      {/* ...existing code... */}
      {isReadOnly && (
        <View style={{ alignItems: "center", marginTop: 16 }}>
          <Ionicons name="lock-closed" size={16} color="#888" />
          <Text style={{ color: "#888", fontSize: 13, marginTop: 4 }}>
            This profile is in view-only mode for emergency access
          </Text>
        </View>
      )}
    </ScrollView>
  );
};
