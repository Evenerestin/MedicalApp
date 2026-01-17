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
import { Medication, MedicationFrequency, MedicationUnit } from "../../../types";
import { styles } from "./Medications.styles";

export interface MedicationFormData {
  name: string;
  dosage: string;
  unit: MedicationUnit;
  frequency: MedicationFrequency;
  times: string[];
  notes?: string;
  remindersEnabled: boolean;
}

export interface MedicationFormProps {
  mode: "add" | "edit";
  initialData?: Partial<MedicationFormData>;
  onSave?: (data: MedicationFormData) => void;
  onDelete?: () => void;
  onCancel?: () => void;
  isLoading?: boolean;
}

const unitOptions: { value: MedicationUnit; label: string }[] = [
  { value: "tablets", label: "Tablets" },
  { value: "mg", label: "mg" },
  { value: "ml", label: "ml" },
  { value: "g", label: "g" },
  { value: "drops", label: "Drops" },
  { value: "units", label: "Units" },
];

const frequencyOptions: { value: MedicationFrequency; label: string }[] = [
  { value: "once_daily", label: "Once daily" },
  { value: "twice_daily", label: "Twice daily" },
  { value: "three_times_daily", label: "Three times daily" },
  { value: "four_times_daily", label: "Four times daily" },
  { value: "weekly", label: "Weekly" },
  { value: "as_needed", label: "As needed" },
];

export const MedicationForm = ({
  mode,
  initialData = {},
  onSave,
  onDelete,
  onCancel,
  isLoading = false,
}: MedicationFormProps) => {
  const [name, setName] = useState(initialData.name || "");
  const [dosage, setDosage] = useState(initialData.dosage || "");
  const [unit, setUnit] = useState<MedicationUnit>(
    initialData.unit || "tablets",
  );
  const [frequency, setFrequency] = useState<MedicationFrequency>(
    initialData.frequency || "once_daily",
  );
  const [times, setTimes] = useState<string[]>(initialData.times || ["08:00"]);
  const [notes, setNotes] = useState(initialData.notes || "");
  const [remindersEnabled, setRemindersEnabled] = useState(
    initialData.remindersEnabled ?? true,
  );
  const [focusedField, setFocusedField] = useState<string | null>(null);

  const isValid = name.trim() !== "" && dosage.trim() !== "";

  const handleSave = () => {
    if (isValid && !isLoading) {
      onSave?.({
        name: name.trim(),
        dosage: dosage.trim(),
        unit,
        frequency,
        times,
        notes: notes.trim() || undefined,
        remindersEnabled,
      });
    }
  };

  const handleAddTime = () => {
    const newTime = `${String(8 + times.length).padStart(2, "0")}:00`;
    setTimes([...times, newTime]);
  };

  const handleRemoveTime = (index: number) => {
    setTimes(times.filter((_, i) => i !== index));
  };

  return (
    <View style={styles.formContainer}>
      <View style={styles.formHeader}>
        <TouchableOpacity style={styles.backButton} onPress={onCancel}>
          <Ionicons name="arrow-back" size={24} color="#152b4f" />
        </TouchableOpacity>
        <Text style={styles.formTitle}>
          {mode === "add" ? "Add Medication" : "Edit Medication"}
        </Text>
        {mode === "edit" && (
          <TouchableOpacity style={styles.deleteButton} onPress={onDelete}>
            <Ionicons name="trash-outline" size={24} color="#e53935" />
          </TouchableOpacity>
        )}
      </View>

      <ScrollView style={styles.formScrollContent}>
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Basic Information</Text>

          <View style={styles.inputContainer}>
            <Text style={styles.label}>Medication Name *</Text>
            <TextInput
              style={[
                styles.input,
                focusedField === "name" && styles.inputFocused,
              ]}
              value={name}
              onChangeText={setName}
              placeholder="e.g., Aspirin"
              placeholderTextColor="#999999"
              onFocus={() => setFocusedField("name")}
              onBlur={() => setFocusedField(null)}
              editable={!isLoading}
            />
          </View>

          <View style={styles.row}>
            <View style={[styles.inputContainer, styles.halfInput]}>
              <Text style={styles.label}>Dosage *</Text>
              <TextInput
                style={[
                  styles.input,
                  focusedField === "dosage" && styles.inputFocused,
                ]}
                value={dosage}
                onChangeText={setDosage}
                placeholder="e.g., 100"
                placeholderTextColor="#999999"
                keyboardType="numeric"
                onFocus={() => setFocusedField("dosage")}
                onBlur={() => setFocusedField(null)}
                editable={!isLoading}
              />
            </View>

            <View style={[styles.inputContainer, styles.halfInput]}>
              <Text style={styles.label}>Unit</Text>
              <View style={styles.unitSelector}>
                {unitOptions.slice(0, 3).map((option) => (
                  <TouchableOpacity
                    key={option.value}
                    style={[
                      styles.unitOption,
                      unit === option.value && styles.unitOptionSelected,
                    ]}
                    onPress={() => setUnit(option.value)}
                    disabled={isLoading}
                  >
                    <Text
                      style={[
                        styles.unitOptionText,
                        unit === option.value && styles.unitOptionTextSelected,
                      ]}
                    >
                      {option.label}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>
          </View>

          <View style={styles.inputContainer}>
            <Text style={styles.label}>Notes</Text>
            <TextInput
              style={[
                styles.input,
                styles.textArea,
                focusedField === "notes" && styles.inputFocused,
              ]}
              value={notes}
              onChangeText={setNotes}
              placeholder="Additional notes (optional)"
              placeholderTextColor="#999999"
              multiline
              numberOfLines={3}
              onFocus={() => setFocusedField("notes")}
              onBlur={() => setFocusedField(null)}
              editable={!isLoading}
            />
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Schedule</Text>

          <View style={styles.inputContainer}>
            <Text style={styles.label}>Frequency</Text>
            <View style={styles.frequencySelector}>
              {frequencyOptions.map((option) => (
                <TouchableOpacity
                  key={option.value}
                  style={[
                    styles.frequencyOption,
                    frequency === option.value &&
                      styles.frequencyOptionSelected,
                  ]}
                  onPress={() => setFrequency(option.value)}
                  disabled={isLoading}
                >
                  <Ionicons
                    name={
                      frequency === option.value
                        ? "radio-button-on"
                        : "radio-button-off"
                    }
                    size={20}
                    color={frequency === option.value ? "#152b4f" : "#999999"}
                  />
                  <Text
                    style={[
                      styles.frequencyOptionText,
                      frequency === option.value &&
                        styles.frequencyOptionTextSelected,
                    ]}
                  >
                    {option.label}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>

          <View style={styles.inputContainer}>
            <Text style={styles.label}>Times</Text>
            <View style={styles.timeSchedule}>
              {times.map((time, index) => (
                <View key={index} style={styles.timeChip}>
                  <Text style={styles.timeChipText}>{time}</Text>
                  <TouchableOpacity onPress={() => handleRemoveTime(index)}>
                    <Ionicons name="close" size={16} color="#152b4f" />
                  </TouchableOpacity>
                </View>
              ))}
              <TouchableOpacity
                style={styles.addTimeButton}
                onPress={handleAddTime}
              >
                <Ionicons name="add" size={16} color="#152b4f" />
                <Text style={styles.addTimeButtonText}>Add time</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Reminders</Text>

          <View style={styles.switchRow}>
            <View>
              <Text style={styles.switchLabel}>Enable Reminders</Text>
              <Text style={styles.switchDescription}>
                Get notified when it's time to take medication
              </Text>
            </View>
            <Switch
              value={remindersEnabled}
              onValueChange={setRemindersEnabled}
              trackColor={{ false: "#e0e0e0", true: "#a5c4e8" }}
              thumbColor={remindersEnabled ? "#152b4f" : "#f4f3f4"}
              disabled={isLoading}
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
            {isLoading
              ? "Saving..."
              : mode === "add"
                ? "Add Medication"
                : "Save Changes"}
          </Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
};
