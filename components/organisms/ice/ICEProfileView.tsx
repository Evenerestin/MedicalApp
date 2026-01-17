import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";
import { EmergencyContact, ICEProfile } from "../../../types";
import { styles } from "./ICE.styles";

export interface ICEProfileViewProps {
  profile: ICEProfile;
  onEdit?: () => void;
  onBack?: () => void;
}

export const ICEProfileView = ({
  profile,
  onEdit,
  onBack,
}: ICEProfileViewProps) => {
  const renderContactCard = (contact: EmergencyContact) => (
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
      <Text style={styles.contactRelationship}>{contact.relationship}</Text>
      <Text style={styles.contactPhone}>{contact.phone}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        {onBack && (
          <TouchableOpacity style={styles.backButton} onPress={onBack}>
            <Ionicons name="arrow-back" size={24} color="#152b4f" />
          </TouchableOpacity>
        )}
        <Text style={styles.headerTitle}>ICE Profile</Text>
        {onEdit && (
          <TouchableOpacity style={styles.editButton} onPress={onEdit}>
            <Ionicons name="pencil" size={24} color="#152b4f" />
          </TouchableOpacity>
        )}
      </View>

      <ScrollView>
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

        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <View style={styles.sectionIcon}>
              <Ionicons name="water" size={18} color="#152b4f" />
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
              {profile.bloodType || "Not specified"}
            </Text>
          </View>
        </View>

        {profile.allergies.length > 0 && (
          <View style={styles.section}>
            <View style={styles.sectionHeader}>
              <View style={styles.sectionIcon}>
                <Ionicons name="warning" size={18} color="#152b4f" />
              </View>
              <Text style={styles.sectionTitle}>Allergies</Text>
            </View>
            <View style={styles.sectionContent}>
              {profile.allergies.map((allergy, index) => (
                <View key={index} style={styles.listItem}>
                  <View
                    style={[
                      styles.listItemBullet,
                      { backgroundColor: "#e53935" },
                    ]}
                  />
                  <Text style={styles.listItemText}>{allergy}</Text>
                </View>
              ))}
            </View>
          </View>
        )}

        {profile.medicalConditions.length > 0 && (
          <View style={styles.section}>
            <View style={styles.sectionHeader}>
              <View style={styles.sectionIcon}>
                <Ionicons name="heart" size={18} color="#152b4f" />
              </View>
              <Text style={styles.sectionTitle}>Medical Conditions</Text>
            </View>
            <View style={styles.sectionContent}>
              {profile.medicalConditions.map((condition, index) => (
                <View key={index} style={styles.listItem}>
                  <View style={styles.listItemBullet} />
                  <Text style={styles.listItemText}>{condition}</Text>
                </View>
              ))}
            </View>
          </View>
        )}

        {profile.medications.length > 0 && (
          <View style={styles.section}>
            <View style={styles.sectionHeader}>
              <View style={styles.sectionIcon}>
                <Ionicons name="medical" size={18} color="#152b4f" />
              </View>
              <Text style={styles.sectionTitle}>Current Medications</Text>
            </View>
            <View style={styles.sectionContent}>
              {profile.medications.map((medication, index) => (
                <View key={index} style={styles.listItem}>
                  <View style={styles.listItemBullet} />
                  <Text style={styles.listItemText}>{medication}</Text>
                </View>
              ))}
            </View>
          </View>
        )}

        {profile.emergencyContacts.length > 0 && (
          <View style={styles.section}>
            <View style={styles.sectionHeader}>
              <View style={styles.sectionIcon}>
                <Ionicons name="call" size={18} color="#152b4f" />
              </View>
              <Text style={styles.sectionTitle}>Emergency Contacts</Text>
            </View>
            <View style={styles.sectionContent}>
              {profile.emergencyContacts
                .sort((a, b) => (b.isPrimary ? 1 : 0) - (a.isPrimary ? 1 : 0))
                .map(renderContactCard)}
            </View>
          </View>
        )}

        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <View style={styles.sectionIcon}>
              <Ionicons name="information-circle" size={18} color="#152b4f" />
            </View>
            <Text style={styles.sectionTitle}>Additional Information</Text>
          </View>
          <View style={styles.sectionContent}>
            <View
              style={[
                styles.infoRow,
                !profile.specialInstructions && styles.infoRowLast,
              ]}
            >
              <Text style={styles.infoLabel}>Organ Donor</Text>
              <Text style={styles.infoValue}>
                {profile.organDonor === true
                  ? "Yes"
                  : profile.organDonor === false
                    ? "No"
                    : "Not specified"}
              </Text>
            </View>
            {profile.specialInstructions && (
              <View style={styles.infoRowLast}>
                <Text style={styles.infoLabel}>Special Instructions</Text>
                <Text style={[styles.infoValue, { marginTop: 4 }]}>
                  {profile.specialInstructions}
                </Text>
              </View>
            )}
          </View>
        </View>
      </ScrollView>
    </View>
  );
};
