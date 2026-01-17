import { Ionicons } from "@expo/vector-icons";
import React, { useState } from "react";
import {
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { MenstrualSymptom } from "../../../types";
import { styles } from "./Menstrual.styles";

export interface CycleFormData {
  startDate: string;
  endDate?: string;
  symptoms?: MenstrualSymptom[];
  notes?: string;
}

export interface CycleFormProps {
  mode: "start" | "end";
  initialData?: Partial<CycleFormData>;
  onSave?: (data: CycleFormData) => void;
  onCancel?: () => void;
  isLoading?: boolean;
}

const symptomOptions: { value: MenstrualSymptom; label: string }[] = [
  { value: "cramps", label: "Cramps" },
  { value: "headache", label: "Headache" },
  { value: "bloating", label: "Bloating" },
  { value: "fatigue", label: "Fatigue" },
  { value: "mood_swings", label: "Mood swings" },
  { value: "breast_tenderness", label: "Breast tenderness" },
  { value: "acne", label: "Acne" },
  { value: "back_pain", label: "Back pain" },
];

export const CycleForm = ({
  mode,
  initialData = {},
  onSave,
  onCancel,
  isLoading = false,
}: CycleFormProps) => {
  const today = new Date().toISOString().split("T")[0];

  const [startDate, setStartDate] = useState(initialData.startDate || today);
  const [endDate, setEndDate] = useState(initialData.endDate || "");
  const [symptoms, setSymptoms] = useState<MenstrualSymptom[]>(
    initialData.symptoms || []
  );
  const [notes, setNotes] = useState(initialData.notes || "");
  const [focusedField, setFocusedField] = useState<string | null>(null);

  const isValid = mode === "start" ? startDate !== "" : endDate !== "";

  const handleToggleSymptom = (symptom: MenstrualSymptom) => {
    setSymptoms((prev) =>
      prev.includes(symptom)
        ? prev.filter((s) => s !== symptom)
        : [...prev, symptom]
    );
  };

  const handleSave = () => {
    if (isValid && !isLoading) {
      onSave?.({
        startDate,
        endDate: endDate || undefined,
        symptoms: symptoms.length > 0 ? symptoms : undefined,
        notes: notes.trim() || undefined,
      });
    }
  };

  const formatDateForDisplay = (dateStr: string) => {
    if (!dateStr) return "";
    const date = new Date(dateStr);
    return date.toLocaleDateString("pl-PL", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  };

  return (
    <View style={styles.formContainer}>
      <View style={styles.formHeader}>
        <TouchableOpacity style={styles.backButton} onPress={onCancel}>
          <Ionicons name="arrow-back" size={24} color="#152b4f" />
        </TouchableOpacity>
        <Text style={styles.formTitle}>
          {mode === "start" ? "Log Period Start" : "Log Period End"}
        </Text>
      </View>

      <ScrollView style={styles.formScrollContent}>
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Date</Text>

          {mode === "start" ? (
            <View style={styles.inputContainer}>
              <Text style={styles.label}>Period Start Date *</Text>
              <TouchableOpacity style={styles.dateButton}>
                <Text
                  style={[
                    styles.dateButtonText,
                    !startDate && styles.dateButtonPlaceholder,
                  ]}
                >
                  {startDate ? formatDateForDisplay(startDate) : "Select date"}
                </Text>
                <Ionicons name="calendar-outline" size={20} color="#666666" />
              </TouchableOpacity>
            </View>
          ) : (
            <>
              <View style={styles.inputContainer}>
                <Text style={styles.label}>Period Start Date</Text>
                <TouchableOpacity
                  style={[styles.dateButton, { backgroundColor: "#f0f0f0" }]}
                >
                  <Text style={styles.dateButtonText}>
                    {formatDateForDisplay(startDate)}
                  </Text>
                  <Ionicons name="lock-closed" size={20} color="#999999" />
                </TouchableOpacity>
              </View>

              <View style={styles.inputContainer}>
                <Text style={styles.label}>Period End Date *</Text>
                <TouchableOpacity style={styles.dateButton}>
                  <Text
                    style={[
                      styles.dateButtonText,
                      !endDate && styles.dateButtonPlaceholder,
                    ]}
                  >
                    {endDate ? formatDateForDisplay(endDate) : "Select date"}
                  </Text>
                  <Ionicons name="calendar-outline" size={20} color="#666666" />
                </TouchableOpacity>
              </View>
            </>
          )}
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Symptoms (Optional)</Text>

          <View style={styles.symptomSelector}>
            {symptomOptions.map((option) => (
              <TouchableOpacity
                key={option.value}
                style={[
                  styles.symptomOption,
                  symptoms.includes(option.value) &&
                    styles.symptomOptionSelected,
                ]}
                onPress={() => handleToggleSymptom(option.value)}
                disabled={isLoading}
              >
                <Text
                  style={[
                    styles.symptomOptionText,
                    symptoms.includes(option.value) &&
                      styles.symptomOptionTextSelected,
                  ]}
                >
                  {option.label}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Notes</Text>

          <View style={styles.inputContainer}>
            <TextInput
              style={[
                styles.dateButton,
                focusedField === "notes" && { borderColor: "#152b4f" },
                { height: 80, textAlignVertical: "top", paddingTop: 12 },
              ]}
              value={notes}
              onChangeText={setNotes}
              placeholder="Additional notes (optional)"
              placeholderTextColor="#999999"
              multiline
              onFocus={() => setFocusedField("notes")}
              onBlur={() => setFocusedField(null)}
              editable={!isLoading}
            />
          </View>
        </View>

        <TouchableOpacity
          style={[
            styles.submitButton,
            { backgroundColor: "#c62828" },
            (!isValid || isLoading) && styles.submitButtonDisabled,
          ]}
          onPress={handleSave}
          disabled={!isValid || isLoading}
        >
          <Text style={styles.submitButtonText}>
            {isLoading
              ? "Saving..."
              : mode === "start"
              ? "Start Period"
              : "End Period"}
          </Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
};
