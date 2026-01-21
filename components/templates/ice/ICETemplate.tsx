import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { ICEProfile } from "../../../types";
import { ICEProfileView } from "../../organisms/ice/ICEProfileView";

export interface ICETemplateProps {
  profile?: ICEProfile;
  onEdit?: () => void;
  onBack?: () => void;
}

const mockProfile: ICEProfile = {
  id: "1",
  userId: "user1",
  bloodType: "O+",
  allergies: ["Penicillin", "Peanuts"],
  medications: ["Aspirin 500mg", "Metformin 850mg"],
  medicalConditions: ["Type 2 Diabetes", "Hypertension"],
  emergencyContacts: [
    {
      id: "1",
      name: "Jane Doe",
      relationship: "Spouse",
      phone: "+1 (555) 123-4567",
      isPrimary: true,
    },
    {
      id: "2",
      name: "John Smith",
      relationship: "Brother",
      phone: "+1 (555) 987-6543",
      isPrimary: false,
    },
  ],
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString(),
};

export const ICETemplate: React.FC<ICETemplateProps> = ({
  profile,
  onEdit,
  onBack,
}) => {
  return (
    <SafeAreaView style={styles.container}>
      {profile ? (
        <ICEProfileView profile={profile} onEdit={onEdit} onBack={onBack} />
      ) : (
        <View style={styles.emptyState}>
          <Text style={styles.emptyText}>No ICE profile found</Text>
          <Text style={styles.emptySubtext}>
            Create your In Case of Emergency profile
          </Text>
        </View>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f8f9fa",
    paddingBottom: 96,
  },
  emptyState: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  emptyText: {
    fontSize: 20,
    fontWeight: "600",
    color: "#333",
    marginBottom: 8,
  },
  emptySubtext: {
    fontSize: 14,
    color: "#666",
  },
});

export { mockProfile };
