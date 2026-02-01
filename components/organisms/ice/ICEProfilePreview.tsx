import { Ionicons } from "@expo/vector-icons";
import React from "react";
import {
  Linking,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { ICEProfile } from "../../../types";
import { styles } from "./ICE.styles";

interface ICEProfilePreviewProps {
  profile: ICEProfile;
  onClose?: () => void;
}

export const ICEProfilePreview: React.FC<ICEProfilePreviewProps> = ({
  profile,
  onClose,
}) => {
  const handleCallPress = (phone: string) => {
    Linking.openURL(`tel:${phone}`);
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        {onClose && (
          <TouchableOpacity style={styles.backButton} onPress={onClose}>
            <Ionicons name="close" size={24} color="#152b4f" />
          </TouchableOpacity>
        )}
        <Text style={styles.headerTitle}>ICE - Emergency Profile</Text>
        <View style={{ width: 40 }} />
      </View>

      <ScrollView style={styles.scrollContent}>
        <View style={styles.iceBanner}>
          <View style={styles.iceBannerIcon}>
            <Ionicons name="medkit" size={24} color="#c62828" />
          </View>
          <View style={styles.iceBannerContent}>
            <Text style={styles.iceBannerTitle}>In Case of Emergency</Text>
            <Text style={styles.iceBannerSubtitle}>
              Critical medical information
            </Text>
          </View>
        </View>

        {(profile.bloodType || profile.RhType) && (
          <View style={styles.section}>
            <View style={styles.sectionHeader}>
              <View style={styles.sectionIcon}>
                <Ionicons name="water" size={20} color="#c62828" />
              </View>
              <Text style={styles.sectionTitle}>Blood Type</Text>
            </View>
            <View style={styles.sectionContent}>
              <Text
                style={[
                  styles.infoValue,
                  styles.infoValueHighlight,
                  { fontSize: 24 },
                ]}
              >
                {profile.bloodType}
                {profile.RhType}
              </Text>
            </View>
          </View>
        )}

        {profile.organDonor !== undefined && (
          <View style={styles.section}>
            <View style={styles.sectionHeader}>
              <View style={styles.sectionIcon}>
                <Ionicons name="heart" size={20} color="#c62828" />
              </View>
              <Text style={styles.sectionTitle}>Organ Donor</Text>
            </View>
            <View style={styles.sectionContent}>
              <Text style={styles.infoValue}>
                {profile.organDonor ? "Yes" : "No"}
              </Text>
            </View>
          </View>
        )}

        {profile.medicalConditions && profile.medicalConditions.length > 0 && (
          <View style={styles.section}>
            <View style={styles.sectionHeader}>
              <View style={styles.sectionIcon}>
                <Ionicons name="medical" size={20} color="#152b4f" />
              </View>
              <Text style={styles.sectionTitle}>Medical Conditions</Text>
            </View>
            <View style={styles.sectionContent}>
              {profile.medicalConditions.map((condition, idx) => (
                <View key={idx} style={styles.listItem}>
                  <View style={styles.listItemBullet} />
                  <Text style={styles.listItemText}>{condition}</Text>
                </View>
              ))}
            </View>
          </View>
        )}

        {profile.allergies && profile.allergies.length > 0 && (
          <View style={styles.section}>
            <View style={styles.sectionHeader}>
              <View style={styles.sectionIcon}>
                <Ionicons name="warning" size={20} color="#ff9800" />
              </View>
              <Text style={styles.sectionTitle}>Allergies</Text>
            </View>
            <View style={styles.sectionContent}>
              {profile.allergies.map((allergy, idx) => (
                <View key={idx} style={styles.listItem}>
                  <View
                    style={[
                      styles.listItemBullet,
                      { backgroundColor: "#ff9800" },
                    ]}
                  />
                  <Text style={[styles.listItemText, { fontWeight: "600" }]}>
                    {allergy}
                  </Text>
                </View>
              ))}
            </View>
          </View>
        )}

        {profile.medications && profile.medications.length > 0 && (
          <View style={styles.section}>
            <View style={styles.sectionHeader}>
              <View style={styles.sectionIcon}>
                <Ionicons name="medkit-outline" size={20} color="#152b4f" />
              </View>
              <Text style={styles.sectionTitle}>Current Medications</Text>
            </View>
            <View style={styles.sectionContent}>
              {profile.medications.map((medication, idx) => (
                <View key={idx} style={styles.listItem}>
                  <View style={styles.listItemBullet} />
                  <Text style={styles.listItemText}>{medication}</Text>
                </View>
              ))}
            </View>
          </View>
        )}

        {profile.emergencyContacts && profile.emergencyContacts.length > 0 && (
          <View style={styles.section}>
            <View style={styles.sectionHeader}>
              <View style={styles.sectionIcon}>
                <Ionicons name="call" size={20} color="#152b4f" />
              </View>
              <Text style={styles.sectionTitle}>Emergency Contacts</Text>
            </View>
            <View style={styles.sectionContent}>
              {profile.emergencyContacts.map((contact) => (
                <View
                  key={contact.id}
                  style={[
                    styles.contactCard,
                    contact.isPrimary && styles.contactCardPrimary,
                  ]}
                >
                  <View style={styles.contactHeader}>
                    <Text style={styles.contactName}>{contact.name}</Text>
                    {contact.isPrimary && (
                      <View style={styles.primaryBadge}>
                        <Text style={styles.primaryBadgeText}>PRIMARY</Text>
                      </View>
                    )}
                  </View>
                  <Text style={styles.contactRelationship}>
                    {contact.relationship}
                  </Text>
                  <TouchableOpacity
                    onPress={() => handleCallPress(contact.phone)}
                  >
                    <Text style={styles.contactPhone}>📞 {contact.phone}</Text>
                  </TouchableOpacity>
                </View>
              ))}
            </View>
          </View>
        )}

        {profile.additionalInformation && (
          <View style={styles.section}>
            <View style={styles.sectionHeader}>
              <View style={styles.sectionIcon}>
                <Ionicons name="information-circle" size={20} color="#152b4f" />
              </View>
              <Text style={styles.sectionTitle}>Additional Information</Text>
            </View>
            <View style={styles.sectionContent}>
              <Text style={styles.listItemText}>
                {profile.additionalInformation}
              </Text>
            </View>
          </View>
        )}

        <View style={{ alignItems: "center", marginTop: 16, marginBottom: 32 }}>
          <Ionicons name="lock-closed" size={16} color="#888" />
          <Text
            style={{
              color: "#888",
              fontSize: 13,
              marginTop: 4,
              textAlign: "center",
            }}
          >
            This profile is in view-only mode for emergency access
          </Text>
        </View>
      </ScrollView>
    </View>
  );
};

export default ICEProfilePreview;
