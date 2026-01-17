import { Ionicons } from "@expo/vector-icons";
import React, { useState } from "react";
import {
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { User } from "../../../types";
import { styles } from "./Profile.styles";

export interface ProfileFormData {
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  dateOfBirth?: string;
}

export interface ProfileEditProps {
  user: User;
  onSave?: (data: ProfileFormData) => void;
  onLogout?: () => void;
  onDeleteAccount?: () => void;
  onBack?: () => void;
  isLoading?: boolean;
}

export const ProfileEdit = ({
  user,
  onSave,
  onLogout,
  onDeleteAccount,
  onBack,
  isLoading = false,
}: ProfileEditProps) => {
  const [firstName, setFirstName] = useState(user.firstName);
  const [lastName, setLastName] = useState(user.lastName);
  const [email, setEmail] = useState(user.email);
  const [phone, setPhone] = useState(user.phone || "");
  const [dateOfBirth, setDateOfBirth] = useState(user.dateOfBirth || "");
  const [focusedField, setFocusedField] = useState<string | null>(null);

  const hasChanges =
    firstName !== user.firstName ||
    lastName !== user.lastName ||
    email !== user.email ||
    phone !== (user.phone || "") ||
    dateOfBirth !== (user.dateOfBirth || "");

  const isValid =
    firstName.trim() !== "" && lastName.trim() !== "" && email.trim() !== "";

  const handleSave = () => {
    if (isValid && hasChanges && !isLoading) {
      onSave?.({
        firstName: firstName.trim(),
        lastName: lastName.trim(),
        email: email.trim(),
        phone: phone.trim() || undefined,
        dateOfBirth: dateOfBirth.trim() || undefined,
      });
    }
  };

  const getInitials = () => {
    return `${firstName.charAt(0)}${lastName.charAt(0)}`.toUpperCase();
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={onBack}>
          <Ionicons name="arrow-back" size={24} color="#152b4f" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Edit Profile</Text>
      </View>

      <ScrollView style={styles.scrollContent}>
        <View style={styles.avatarSection}>
          <View style={styles.avatarContainer}>
            <Text style={styles.avatarText}>{getInitials()}</Text>
          </View>
          <TouchableOpacity style={styles.changeAvatarButton}>
            <Text style={styles.changeAvatarText}>Change Photo</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Personal Information</Text>

          <View style={styles.row}>
            <View style={[styles.inputContainer, styles.halfInput]}>
              <Text style={styles.label}>First Name</Text>
              <TextInput
                style={[
                  styles.input,
                  focusedField === "firstName" && styles.inputFocused,
                ]}
                value={firstName}
                onChangeText={setFirstName}
                placeholder="First name"
                placeholderTextColor="#999999"
                autoCapitalize="words"
                onFocus={() => setFocusedField("firstName")}
                onBlur={() => setFocusedField(null)}
                editable={!isLoading}
              />
            </View>

            <View style={[styles.inputContainer, styles.halfInput]}>
              <Text style={styles.label}>Last Name</Text>
              <TextInput
                style={[
                  styles.input,
                  focusedField === "lastName" && styles.inputFocused,
                ]}
                value={lastName}
                onChangeText={setLastName}
                placeholder="Last name"
                placeholderTextColor="#999999"
                autoCapitalize="words"
                onFocus={() => setFocusedField("lastName")}
                onBlur={() => setFocusedField(null)}
                editable={!isLoading}
              />
            </View>
          </View>

          <View style={styles.inputContainer}>
            <Text style={styles.label}>Email</Text>
            <TextInput
              style={[
                styles.input,
                focusedField === "email" && styles.inputFocused,
              ]}
              value={email}
              onChangeText={setEmail}
              placeholder="Email address"
              placeholderTextColor="#999999"
              keyboardType="email-address"
              autoCapitalize="none"
              onFocus={() => setFocusedField("email")}
              onBlur={() => setFocusedField(null)}
              editable={!isLoading}
            />
          </View>

          <View style={styles.inputContainer}>
            <Text style={styles.label}>Phone Number</Text>
            <TextInput
              style={[
                styles.input,
                focusedField === "phone" && styles.inputFocused,
              ]}
              value={phone}
              onChangeText={setPhone}
              placeholder="Phone number (optional)"
              placeholderTextColor="#999999"
              keyboardType="phone-pad"
              onFocus={() => setFocusedField("phone")}
              onBlur={() => setFocusedField(null)}
              editable={!isLoading}
            />
          </View>

          <View style={styles.inputContainer}>
            <Text style={styles.label}>Date of Birth</Text>
            <TextInput
              style={[
                styles.input,
                focusedField === "dateOfBirth" && styles.inputFocused,
              ]}
              value={dateOfBirth}
              onChangeText={setDateOfBirth}
              placeholder="DD/MM/YYYY (optional)"
              placeholderTextColor="#999999"
              onFocus={() => setFocusedField("dateOfBirth")}
              onBlur={() => setFocusedField(null)}
              editable={!isLoading}
            />
          </View>

          <TouchableOpacity
            style={[
              styles.saveButton,
              (!isValid || !hasChanges || isLoading) &&
                styles.saveButtonDisabled,
            ]}
            onPress={handleSave}
            disabled={!isValid || !hasChanges || isLoading}
          >
            <Text style={styles.saveButtonText}>
              {isLoading ? "Saving..." : "Save Changes"}
            </Text>
          </TouchableOpacity>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Account</Text>

          <TouchableOpacity style={styles.logoutButton} onPress={onLogout}>
            <Ionicons name="log-out-outline" size={20} color="#e53935" />
            <Text style={styles.logoutButtonText}>Log Out</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.deleteAccountButton}
            onPress={onDeleteAccount}
          >
            <Text style={styles.deleteAccountText}>Delete Account</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
};
