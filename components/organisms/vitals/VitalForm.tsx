import { Ionicons } from "@expo/vector-icons";
import React, { useState } from "react";
import {
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { VitalType } from "../../types";
import { styles } from "./Vitals.styles";

export interface VitalFormData {
  type: VitalType;
  value: number;
  secondaryValue?: number;
  tertiaryValue?: number;
  unit: string;
  notes?: string;
  measuredAt: string;
}

export interface VitalFormProps {
  onSave?: (data: VitalFormData) => void;
  onCancel?: () => void;
  isLoading?: boolean;
}

const vitalTypes: {
  type: VitalType;
  label: string;
  icon: string;
  unit: string;
  hasSecondary?: boolean;
  secondaryLabel?: string;
  hasTertiary?: boolean;
  tertiaryLabel?: string;
}[] = [
  {
    type: "blood_pressure",
    label: "Blood Pressure & Heart Rate",
    icon: "heart",
    unit: "mmHg / bpm",
    hasSecondary: true,
    secondaryLabel: "Diastolic",
    hasTertiary: true,
    tertiaryLabel: "Heart Rate",
  },
  { type: "weight", label: "Weight", icon: "scale", unit: "kg" },
  {
    type: "glucose",
    label: "Glucose",
    icon: "water",
    unit: "mg/dL",
  },
];

export const VitalForm = ({
  onSave,
  onCancel,
  isLoading = false,
}: VitalFormProps) => {
  const [selectedType, setSelectedType] = useState<VitalType>("blood_pressure");
  const [value, setValue] = useState("");
  const [secondaryValue, setSecondaryValue] = useState("");
  const [tertiaryValue, setTertiaryValue] = useState("");
  const [notes, setNotes] = useState("");
  const [focusedField, setFocusedField] = useState<string | null>(null);

  const currentTypeConfig = vitalTypes.find((t) => t.type === selectedType);
  const isValid =
    value.trim() !== "" &&
    (!currentTypeConfig?.hasSecondary || secondaryValue.trim() !== "") &&
    (!currentTypeConfig?.hasTertiary || tertiaryValue.trim() !== "");

  const handleSave = () => {
    if (isValid && !isLoading) {
      onSave?.({
        type: selectedType,
        value: parseFloat(value),
        secondaryValue: secondaryValue ? parseFloat(secondaryValue) : undefined,
        tertiaryValue: tertiaryValue ? parseFloat(tertiaryValue) : undefined,
        unit: currentTypeConfig?.unit || "",
        notes: notes.trim() || undefined,
        measuredAt: new Date().toISOString(),
      });
    }
  };

  return (
    <View style={styles.formContainer}>
      <View style={styles.formHeader}>
        <TouchableOpacity style={styles.backButton} onPress={onCancel}>
          <Ionicons name="arrow-back" size={24} color="#152b4f" />
        </TouchableOpacity>
        <Text style={styles.formTitle}>Add Measurement</Text>
      </View>

      <ScrollView style={styles.formScrollContent}>
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Measurement Type</Text>

          <View style={styles.typeSelector}>
            {vitalTypes.map((type) => (
              <TouchableOpacity
                key={type.type}
                style={[
                  styles.typeOption,
                  selectedType === type.type && styles.typeOptionSelected,
                ]}
                onPress={() => {
                  setSelectedType(type.type);
                  setValue("");
                  setSecondaryValue("");
                  setTertiaryValue("");
                }}
                disabled={isLoading}
              >
                <Ionicons
                  name={type.icon as keyof typeof Ionicons.glyphMap}
                  size={20}
                  color={selectedType === type.type ? "#152b4f" : "#666666"}
                  style={styles.typeOptionIcon}
                />
                <Text
                  style={[
                    styles.typeOptionText,
                    selectedType === type.type && styles.typeOptionTextSelected,
                  ]}
                >
                  {type.label}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Value</Text>

          <View style={styles.row}>
            <View style={[styles.inputContainer, styles.halfInput]}>
              <Text style={styles.label}>
                {currentTypeConfig?.hasSecondary ? "Systolic" : "Value"} *
              </Text>
              <TextInput
                style={[
                  styles.input,
                  focusedField === "value" && styles.inputFocused,
                ]}
                value={value}
                onChangeText={setValue}
                placeholder={`Enter ${
                  currentTypeConfig?.hasSecondary ? "systolic" : "value"
                }`}
                placeholderTextColor="#999999"
                keyboardType="numeric"
                onFocus={() => setFocusedField("value")}
                onBlur={() => setFocusedField(null)}
                editable={!isLoading}
              />
            </View>

            {currentTypeConfig?.hasSecondary && (
              <View style={[styles.inputContainer, styles.halfInput]}>
                <Text style={styles.label}>
                  {currentTypeConfig.secondaryLabel} *
                </Text>
                <TextInput
                  style={[
                    styles.input,
                    focusedField === "secondaryValue" && styles.inputFocused,
                  ]}
                  value={secondaryValue}
                  onChangeText={setSecondaryValue}
                  placeholder={`Enter ${currentTypeConfig.secondaryLabel?.toLowerCase()}`}
                  placeholderTextColor="#999999"
                  keyboardType="numeric"
                  onFocus={() => setFocusedField("secondaryValue")}
                  onBlur={() => setFocusedField(null)}
                  editable={!isLoading}
                />
              </View>
            )}
          </View>

          {currentTypeConfig?.hasTertiary && (
            <View style={styles.row}>
              <View style={[styles.inputContainer, styles.halfInput]}>
                <Text style={styles.label}>
                  {currentTypeConfig.tertiaryLabel} *
                </Text>
                <TextInput
                  style={[
                    styles.input,
                    focusedField === "tertiaryValue" && styles.inputFocused,
                  ]}
                  value={tertiaryValue}
                  onChangeText={setTertiaryValue}
                  placeholder={`Enter ${currentTypeConfig.tertiaryLabel?.toLowerCase()}`}
                  placeholderTextColor="#999999"
                  keyboardType="numeric"
                  onFocus={() => setFocusedField("tertiaryValue")}
                  onBlur={() => setFocusedField(null)}
                  editable={!isLoading}
                />
              </View>
            </View>
          )}

          <View style={styles.inputContainer}>
            <Text style={styles.label}>Unit</Text>
            <TextInput
              style={[styles.input, { backgroundColor: "#f0f0f0" }]}
              value={currentTypeConfig?.unit}
              editable={false}
            />
          </View>

          <View style={styles.inputContainer}>
            <Text style={styles.label}>Notes</Text>
            <TextInput
              style={[
                styles.input,
                focusedField === "notes" && styles.inputFocused,
              ]}
              value={notes}
              onChangeText={setNotes}
              placeholder="Additional notes (optional)"
              placeholderTextColor="#999999"
              onFocus={() => setFocusedField("notes")}
              onBlur={() => setFocusedField(null)}
              editable={!isLoading}
            />
          </View>
        </View>

        <TouchableOpacity
          style={[
            styles.submitButton,
            (!isValid || isLoading) && styles.submitButtonDisabled,
          ]}
          onPress={handleSave}
          disabled={!isValid || isLoading}
        >
          <Text style={styles.submitButtonText}>
            {isLoading ? "Saving..." : "Save Measurement"}
          </Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
};
