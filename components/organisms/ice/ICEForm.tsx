import { Ionicons } from "@expo/vector-icons";
import React, { useState } from "react";
import {
  ScrollView,
  Switch,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { BloodType, EmergencyContact, ICEProfile } from "../../types";
import { styles } from "./ICE.styles";

export interface ICEFormData {
  bloodType?: BloodType;
  allergies: string[];
  medications: string[];
  medicalConditions: string[];
  emergencyContacts: EmergencyContact[];
  organDonor?: boolean;
  specialInstructions?: string;
}

export interface ICEFormProps {
  mode: "create" | "edit";
  initialData?: Partial<ICEFormData>;
  onSave?: (data: ICEFormData) => void;
  onCancel?: () => void;
  isLoading?: boolean;
}

const bloodTypes: BloodType[] = [
  "A+",
  "A-",
  "B+",
  "B-",
  "AB+",
  "AB-",
  "O+",
  "O-",
  "unknown",
];

export const ICEForm = ({
  mode,
  initialData = {},
  onSave,
  onCancel,
  isLoading = false,
}: ICEFormProps) => {
  const [bloodType, setBloodType] = useState<BloodType | undefined>(
    initialData.bloodType
  );
  const [allergies, setAllergies] = useState<string[]>(
    initialData.allergies || []
  );
  const [medications, setMedications] = useState<string[]>(
    initialData.medications || []
  );
  const [medicalConditions, setMedicalConditions] = useState<string[]>(
    initialData.medicalConditions || []
  );
  const [emergencyContacts, setEmergencyContacts] = useState<
    EmergencyContact[]
  >(initialData.emergencyContacts || []);
  const [organDonor, setOrganDonor] = useState<boolean | undefined>(
    initialData.organDonor
  );
  const [specialInstructions, setSpecialInstructions] = useState(
    initialData.specialInstructions || ""
  );

  const [newAllergy, setNewAllergy] = useState("");
  const [newMedication, setNewMedication] = useState("");
  const [newCondition, setNewCondition] = useState("");

  const [focusedField, setFocusedField] = useState<string | null>(null);

  const handleAddAllergy = () => {
    if (newAllergy.trim()) {
      setAllergies([...allergies, newAllergy.trim()]);
      setNewAllergy("");
    }
  };

  const handleRemoveAllergy = (index: number) => {
    setAllergies(allergies.filter((_, i) => i !== index));
  };

  const handleAddMedication = () => {
    if (newMedication.trim()) {
      setMedications([...medications, newMedication.trim()]);
      setNewMedication("");
    }
  };

  const handleRemoveMedication = (index: number) => {
    setMedications(medications.filter((_, i) => i !== index));
  };

  const handleAddCondition = () => {
    if (newCondition.trim()) {
      setMedicalConditions([...medicalConditions, newCondition.trim()]);
      setNewCondition("");
    }
  };

  const handleRemoveCondition = (index: number) => {
    setMedicalConditions(medicalConditions.filter((_, i) => i !== index));
  };

  const handleAddContact = () => {
    const newContact: EmergencyContact = {
      id: Date.now().toString(),
      name: "",
      relationship: "",
      phone: "",
      isPrimary: emergencyContacts.length === 0,
    };
    setEmergencyContacts([...emergencyContacts, newContact]);
  };

  const handleUpdateContact = (
    id: string,
    field: keyof EmergencyContact,
    value: string | boolean
  ) => {
    setEmergencyContacts(
      emergencyContacts.map((contact) =>
        contact.id === id ? { ...contact, [field]: value } : contact
      )
    );
  };

  const handleRemoveContact = (id: string) => {
    setEmergencyContacts(emergencyContacts.filter((c) => c.id !== id));
  };

  const handleSetPrimaryContact = (id: string) => {
    setEmergencyContacts(
      emergencyContacts.map((contact) => ({
        ...contact,
        isPrimary: contact.id === id,
      }))
    );
  };

  const handleSave = () => {
    if (!isLoading) {
      onSave?.({
        bloodType,
        allergies,
        medications,
        medicalConditions,
        emergencyContacts: emergencyContacts.filter((c) => c.name && c.phone),
        organDonor,
        specialInstructions: specialInstructions.trim() || undefined,
      });
    }
  };

  const renderTagInput = (
    items: string[],
    newItem: string,
    setNewItem: (value: string) => void,
    onAdd: () => void,
    onRemove: (index: number) => void,
    placeholder: string
  ) => (
    <>
      <View style={styles.tagContainer}>
        {items.map((item, index) => (
          <View key={index} style={styles.tag}>
            <Text style={styles.tagText}>{item}</Text>
            <TouchableOpacity onPress={() => onRemove(index)}>
              <Ionicons name="close" size={16} color="#152b4f" />
            </TouchableOpacity>
          </View>
        ))}
      </View>
      <View style={styles.row}>
        <TextInput
          style={[styles.input, styles.halfInput]}
          value={newItem}
          onChangeText={setNewItem}
          placeholder={placeholder}
          placeholderTextColor="#999999"
          onSubmitEditing={onAdd}
          editable={!isLoading}
        />
        <TouchableOpacity
          style={[styles.addTagButton, { flex: 0.3 }]}
          onPress={onAdd}
        >
          <Ionicons name="add" size={16} color="#152b4f" />
          <Text style={styles.addTagButtonText}>Add</Text>
        </TouchableOpacity>
      </View>
    </>
  );

  return (
    <View style={styles.formContainer}>
      <View style={styles.formHeader}>
        <TouchableOpacity style={styles.backButton} onPress={onCancel}>
          <Ionicons name="arrow-back" size={24} color="#152b4f" />
        </TouchableOpacity>
        <Text style={styles.formTitle}>
          {mode === "create" ? "Create ICE Profile" : "Edit ICE Profile"}
        </Text>
      </View>

      <ScrollView style={styles.formScrollContent}>
        {/* Blood Type Section */}
        <View style={styles.formSection}>
          <Text style={styles.formSectionTitle}>Blood Type</Text>
          <View style={styles.bloodTypeSelector}>
            {bloodTypes.map((type) => (
              <TouchableOpacity
                key={type}
                style={[
                  styles.bloodTypeOption,
                  bloodType === type && styles.bloodTypeOptionSelected,
                ]}
                onPress={() => setBloodType(type)}
                disabled={isLoading}
              >
                <Text
                  style={[
                    styles.bloodTypeOptionText,
                    bloodType === type && styles.bloodTypeOptionTextSelected,
                  ]}
                >
                  {type === "unknown" ? "?" : type}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Allergies Section */}
        <View style={styles.formSection}>
          <Text style={styles.formSectionTitle}>Allergies</Text>
          {renderTagInput(
            allergies,
            newAllergy,
            setNewAllergy,
            handleAddAllergy,
            handleRemoveAllergy,
            "Add allergy..."
          )}
        </View>

        {/* Medical Conditions Section */}
        <View style={styles.formSection}>
          <Text style={styles.formSectionTitle}>Medical Conditions</Text>
          {renderTagInput(
            medicalConditions,
            newCondition,
            setNewCondition,
            handleAddCondition,
            handleRemoveCondition,
            "Add condition..."
          )}
        </View>

        {/* Current Medications Section */}
        <View style={styles.formSection}>
          <Text style={styles.formSectionTitle}>Current Medications</Text>
          {renderTagInput(
            medications,
            newMedication,
            setNewMedication,
            handleAddMedication,
            handleRemoveMedication,
            "Add medication..."
          )}
        </View>

        {/* Emergency Contacts Section */}
        <View style={styles.formSection}>
          <Text style={styles.formSectionTitle}>Emergency Contacts</Text>

          {emergencyContacts.map((contact, index) => (
            <View key={contact.id} style={styles.contactFormCard}>
              <View style={styles.contactFormHeader}>
                <Text style={styles.contactFormTitle}>Contact {index + 1}</Text>
                <TouchableOpacity
                  style={styles.removeContactButton}
                  onPress={() => handleRemoveContact(contact.id)}
                >
                  <Ionicons name="trash-outline" size={20} color="#e53935" />
                </TouchableOpacity>
              </View>

              <View style={styles.inputContainer}>
                <Text style={styles.label}>Name</Text>
                <TextInput
                  style={styles.input}
                  value={contact.name}
                  onChangeText={(value) =>
                    handleUpdateContact(contact.id, "name", value)
                  }
                  placeholder="Full name"
                  placeholderTextColor="#999999"
                  editable={!isLoading}
                />
              </View>

              <View style={styles.inputContainer}>
                <Text style={styles.label}>Relationship</Text>
                <TextInput
                  style={styles.input}
                  value={contact.relationship}
                  onChangeText={(value) =>
                    handleUpdateContact(contact.id, "relationship", value)
                  }
                  placeholder="e.g., Spouse, Parent"
                  placeholderTextColor="#999999"
                  editable={!isLoading}
                />
              </View>

              <View style={styles.inputContainer}>
                <Text style={styles.label}>Phone</Text>
                <TextInput
                  style={styles.input}
                  value={contact.phone}
                  onChangeText={(value) =>
                    handleUpdateContact(contact.id, "phone", value)
                  }
                  placeholder="Phone number"
                  placeholderTextColor="#999999"
                  keyboardType="phone-pad"
                  editable={!isLoading}
                />
              </View>

              <View style={styles.switchRow}>
                <Text style={styles.switchLabel}>Primary Contact</Text>
                <Switch
                  value={contact.isPrimary}
                  onValueChange={() => handleSetPrimaryContact(contact.id)}
                  trackColor={{ false: "#e0e0e0", true: "#ffcdd2" }}
                  thumbColor={contact.isPrimary ? "#c62828" : "#f4f3f4"}
                  disabled={isLoading}
                />
              </View>
            </View>
          ))}

          <TouchableOpacity
            style={styles.addTagButton}
            onPress={handleAddContact}
          >
            <Ionicons name="add" size={16} color="#152b4f" />
            <Text style={styles.addTagButtonText}>Add Contact</Text>
          </TouchableOpacity>
        </View>

        {/* Additional Info Section */}
        <View style={styles.formSection}>
          <Text style={styles.formSectionTitle}>Additional Information</Text>

          <View style={styles.switchRow}>
            <Text style={styles.switchLabel}>Organ Donor</Text>
            <Switch
              value={organDonor}
              onValueChange={setOrganDonor}
              trackColor={{ false: "#e0e0e0", true: "#a5c4e8" }}
              thumbColor={organDonor ? "#152b4f" : "#f4f3f4"}
              disabled={isLoading}
            />
          </View>

          <View style={styles.inputContainer}>
            <Text style={styles.label}>Special Instructions</Text>
            <TextInput
              style={[
                styles.input,
                styles.textArea,
                focusedField === "instructions" && styles.inputFocused,
              ]}
              value={specialInstructions}
              onChangeText={setSpecialInstructions}
              placeholder="Any special medical instructions..."
              placeholderTextColor="#999999"
              multiline
              numberOfLines={4}
              onFocus={() => setFocusedField("instructions")}
              onBlur={() => setFocusedField(null)}
              editable={!isLoading}
            />
          </View>
        </View>

        <TouchableOpacity
          style={[
            styles.submitButton,
            isLoading && styles.submitButtonDisabled,
          ]}
          onPress={handleSave}
          disabled={isLoading}
        >
          <Text style={styles.submitButtonText}>
            {isLoading
              ? "Saving..."
              : mode === "create"
              ? "Create ICE Profile"
              : "Save Changes"}
          </Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
};
