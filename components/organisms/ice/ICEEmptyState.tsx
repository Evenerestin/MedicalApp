import { Ionicons } from "@expo/vector-icons";
import colors from "@theme/colors";
import React from "react";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";
import { Button } from "../../atoms/buttons/button/Button";
import { styles } from "./ICE.styles";

export interface ICEEmptyStateProps {
  onCreateProfile?: () => void;
  onBack?: () => void;
  isReadOnly?: boolean;
}

export const ICEEmptyState = ({
  onCreateProfile,
  onBack,
  isReadOnly = false,
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
      <ScrollView
        style={{ flex: 1 }}
        contentContainerStyle={{ flexGrow: 1, justifyContent: "center" }}
      >
        <View style={styles.emptyState}>
          <Ionicons
            name="medkit-outline"
            size={48}
            color={colors.primary}
            style={styles.emptyStateIcon}
          />
          <Text style={styles.emptyStateText}>No ICE Profile Created</Text>
          <Text style={styles.emptyStateSubtext}>
            {isReadOnly
              ? "No emergency information is available. Please log in to create an ICE profile."
              : "Create an In Case of Emergency (ICE) profile to store critical medical information that can be accessed quickly in emergencies."}
          </Text>
          {!isReadOnly && (
            <Button
              label="Create ICE Profile"
              variant="filled"
              rounded
              onPress={onCreateProfile}
            />
          )}
        </View>
      </ScrollView>
    </View>
  );
};
