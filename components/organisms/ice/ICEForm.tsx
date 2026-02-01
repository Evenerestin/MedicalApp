import { Ionicons } from "@expo/vector-icons";
import { IconAddressBook } from "@tabler/icons-react-native";
import colors from "@theme/colors";
import React, { useState } from "react";
import {
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import type { BloodType, EmergencyContact } from "../../../types";
import { ActionIcon } from "../../atoms/buttons/actionicon/ActionIcon";
import { Button } from "../../atoms/buttons/button/Button";
import { Chip } from "../../atoms/inputs/chip/Chip";
import { Input } from "../../atoms/inputs/input/Input";
import { Toggle } from "../../atoms/inputs/toggle/Toggle";
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

const bloodSymbols = ["A", "B", "AB", "O"] as const;
const rhFactors = ["+", "-"] as const;
type BloodSymbol = (typeof bloodSymbols)[number];
type RhFactor = (typeof rhFactors)[number];

export const ICEForm = ({
  mode,
  initialData = {},
  onSave,
  onCancel,
  isLoading = false,
}: ICEFormProps) => {
  const parseBloodType = (
    bt?: string,
  ): [BloodSymbol | undefined, RhFactor | undefined] => {
    if (!bt || bt === "unknown") return [undefined, undefined];
    if (bt.startsWith("AB")) return ["AB", bt.slice(2) as RhFactor];
    if (bt.startsWith("A")) return ["A", bt.slice(1) as RhFactor];
    if (bt.startsWith("B")) return ["B", bt.slice(1) as RhFactor];
    if (bt.startsWith("O")) return ["O", bt.slice(1) as RhFactor];
    return [undefined, undefined];
  };
  const [bloodSymbol, setBloodSymbol] = useState<BloodSymbol | undefined>(
    parseBloodType(initialData.bloodType)[0],
  );
  const [rhFactor, setRhFactor] = useState<RhFactor | undefined>(
    parseBloodType(initialData.bloodType)[1],
  );
  const bloodType =
    bloodSymbol && rhFactor
      ? ((bloodSymbol + rhFactor) as BloodType)
      : undefined;
  const [allergies, setAllergies] = useState<string[]>(
    initialData.allergies || [],
  );
  const [medications, setMedications] = useState<string[]>(
    initialData.medications || [],
  );
  const [medicalConditions, setMedicalConditions] = useState<string[]>(
    initialData.medicalConditions || [],
  );
  const [emergencyContacts, setEmergencyContacts] = useState<
    EmergencyContact[]
  >(initialData.emergencyContacts || []);
  const [organDonor, setOrganDonor] = useState<boolean | undefined>(
    initialData.organDonor,
  );
  const [specialInstructions, setSpecialInstructions] = useState(
    initialData.specialInstructions || "",
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
    value: string | boolean,
  ) => {
    setEmergencyContacts(
      emergencyContacts.map((contact) =>
        contact.id === id ? { ...contact, [field]: value } : contact,
      ),
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
      })),
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
    placeholder: string,
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
        <Input
          value={newItem}
          onChangeText={setNewItem}
          placeholder={placeholder}
          onSubmitEditing={onAdd}
          editable={!isLoading}
          style={{ flex: 1 }}
        />
        <ActionIcon preset="add" size="sm" rounded onPress={onAdd} />
      </View>
    </>
  );

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={styles.formContainer}>
        <View style={styles.formHeader}>
          <TouchableOpacity style={styles.backButton} onPress={onCancel}>
            <Ionicons name="arrow-back" size={24} color="#152b4f" />
          </TouchableOpacity>
          <Text style={styles.formTitle}>
            {mode === "create" ? "Create ICE Profile" : "Edit ICE Profile"}
          </Text>
        </View>

        <ScrollView
          style={styles.formScrollContent}
          contentContainerStyle={{ paddingBottom: 80 }}
        >
          <View style={styles.formSection}>
            <Text style={styles.formSectionTitle}>Blood Type</Text>
            <View style={styles.rhSegmentedControl}>
              {bloodSymbols.map((symbol) => (
                <TouchableOpacity
                  key={symbol}
                  style={[
                    styles.rhSegment,
                    bloodSymbol === symbol && styles.rhSegmentSelected,
                  ]}
                  onPress={() => {
                    setBloodSymbol(symbol);
                  }}
                  disabled={isLoading}
                >
                  <Text
                    style={[
                      styles.rhSegmentText,
                      bloodSymbol === symbol && styles.rhSegmentTextSelected,
                    ]}
                  >
                    {symbol}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
            {bloodSymbol && (
              <View style={styles.rhSegmentedControl}>
                {rhFactors.map((rh) => (
                  <TouchableOpacity
                    key={rh}
                    style={[
                      styles.rhSegment,
                      rhFactor === rh && styles.rhSegmentSelected,
                    ]}
                    onPress={() => setRhFactor(rh)}
                    disabled={isLoading}
                  >
                    <Text
                      style={[
                        styles.rhSegmentText,
                        rhFactor === rh && styles.rhSegmentTextSelected,
                      ]}
                    >
                      {rh}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            )}
          </View>

          <View style={styles.cardContainer}>
            <Text style={styles.formSectionTitle}>Medication Allergies</Text>
            {renderTagInput(
              allergies,
              newAllergy,
              setNewAllergy,
              handleAddAllergy,
              handleRemoveAllergy,
              "Add allergy...",
            )}
          </View>

          <View style={styles.cardContainer}>
            <Text style={styles.formSectionTitle}>Medical Conditions</Text>
            {renderTagInput(
              medicalConditions,
              newCondition,
              setNewCondition,
              handleAddCondition,
              handleRemoveCondition,
              "Add condition...",
            )}
          </View>

          <View style={styles.cardContainer}>
            <Text style={styles.formSectionTitle}>Relevant Medications</Text>
            {renderTagInput(
              medications,
              newMedication,
              setNewMedication,
              handleAddMedication,
              handleRemoveMedication,
              "Add medication...",
            )}
          </View>

          <View style={styles.formSection}>
            <Text style={styles.formSectionTitle}>Emergency Contacts</Text>

            {emergencyContacts.map((contact, index) => (
              <View key={contact.id} style={styles.contactFormCard}>
                <View style={styles.contactFormHeader}>
                  <Text style={styles.contactFormTitle}>
                    Contact {index + 1}
                  </Text>
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
                  <Toggle
                    checked={contact.isPrimary}
                    onChange={() => handleSetPrimaryContact(contact.id)}
                    disabled={isLoading}
                  />
                </View>
              </View>
            ))}

            <Button
              label="Add Contact"
              fullWidth
              variant="light"
              size="md"
              onPress={handleAddContact}
              leftSection={<IconAddressBook size={16} color={colors.primary} />}
              style={{ alignSelf: "flex-start", marginTop: 8 }}
            />
          </View>

          <View style={styles.cardContainer}>
            <Text style={styles.formSectionTitle}>Additional Information</Text>

            <View style={styles.switchRow}>
              <Text style={styles.switchLabel}>Organ Donor</Text>
              <Toggle
                checked={organDonor ?? false}
                onChange={setOrganDonor}
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

          <View style={styles.footer}>
            <View style={styles.footerButtons}>
              {onCancel && (
                <Button
                  label="Cancel"
                  variant="outline"
                  size="md"
                  fullWidth
                  onPress={onCancel}
                  disabled={isLoading}
                  style={styles.cancelButton}
                  textStyle={styles.cancelButtonText}
                />
              )}
              <Button
                label={mode === "edit" ? "Save Changes" : "Create ICE Profile"}
                variant="light"
                size="md"
                fullWidth
                onPress={handleSave}
                disabled={isLoading}
              />
            </View>
          </View>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};
