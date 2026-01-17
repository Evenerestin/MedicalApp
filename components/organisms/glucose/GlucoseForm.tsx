import { Ionicons } from "@expo/vector-icons";
import React, { useState } from "react";
import {
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { GlucoseTag, GlucoseUnit, InsulinType } from "../../../types";
import { styles } from "./Glucose.styles";

export interface GlucoseFormData {
  value: number;
  unit: GlucoseUnit;
  tag: GlucoseTag;
  insulinDose?: number;
  insulinType?: InsulinType;
  notes?: string;
  measuredAt: string;
}

export interface GlucoseFormProps {
  onSave?: (data: GlucoseFormData) => void;
  onCancel?: () => void;
  isLoading?: boolean;
  defaultUnit?: GlucoseUnit;
}

const tagOptions: { value: GlucoseTag; label: string }[] = [
  { value: "fasting", label: "Fasting" },
  { value: "before_meal", label: "Before meal" },
  { value: "after_meal", label: "After meal" },
  { value: "before_sleep", label: "Before sleep" },
  { value: "night", label: "Night" },
  { value: "other", label: "Other" },
];

const insulinTypes: { value: InsulinType; label: string }[] = [
  { value: "rapid", label: "Rapid" },
  { value: "short", label: "Short" },
  { value: "intermediate", label: "Intermediate" },
  { value: "long", label: "Long" },
  { value: "mixed", label: "Mixed" },
];

export const GlucoseForm = ({
  onSave,
  onCancel,
  isLoading = false,
  defaultUnit = "mg/dL",
}: GlucoseFormProps) => {
  const [value, setValue] = useState("");
  const [unit, setUnit] = useState<GlucoseUnit>(defaultUnit);
  const [tag, setTag] = useState<GlucoseTag>("fasting");
  const [insulinDose, setInsulinDose] = useState("");
  const [insulinType, setInsulinType] = useState<InsulinType | undefined>();
  const [notes, setNotes] = useState("");
  const [focusedField, setFocusedField] = useState<string | null>(null);

  const isValid = value.trim() !== "" && parseFloat(value) > 0;

  const handleSave = () => {
    if (isValid && !isLoading) {
      onSave?.({
        value: parseFloat(value),
        unit,
        tag,
        insulinDose: insulinDose ? parseFloat(insulinDose) : undefined,
        insulinType: insulinDose ? insulinType : undefined,
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
        <Text style={styles.formTitle}>Add Glucose Reading</Text>
      </View>

      <ScrollView style={styles.formScrollContent}>
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Glucose Level</Text>

          <View style={styles.inputContainer}>
            <Text style={styles.label}>Value *</Text>
            <TextInput
              style={[
                styles.input,
                styles.inputLarge,
                focusedField === "value" && styles.inputFocused,
              ]}
              value={value}
              onChangeText={setValue}
              placeholder="0"
              placeholderTextColor="#cccccc"
              keyboardType="numeric"
              onFocus={() => setFocusedField("value")}
              onBlur={() => setFocusedField(null)}
              editable={!isLoading}
            />
          </View>

          <View style={styles.inputContainer}>
            <Text style={styles.label}>Unit</Text>
            <View style={styles.tagSelector}>
              <TouchableOpacity
                style={[
                  styles.tagOption,
                  unit === "mg/dL" && styles.tagOptionSelected,
                ]}
                onPress={() => setUnit("mg/dL")}
                disabled={isLoading}
              >
                <Text
                  style={[
                    styles.tagOptionText,
                    unit === "mg/dL" && styles.tagOptionTextSelected,
                  ]}
                >
                  mg/dL
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[
                  styles.tagOption,
                  unit === "mmol/L" && styles.tagOptionSelected,
                ]}
                onPress={() => setUnit("mmol/L")}
                disabled={isLoading}
              >
                <Text
                  style={[
                    styles.tagOptionText,
                    unit === "mmol/L" && styles.tagOptionTextSelected,
                  ]}
                >
                  mmol/L
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Context Tag</Text>

          <View style={styles.tagSelector}>
            {tagOptions.map((option) => (
              <TouchableOpacity
                key={option.value}
                style={[
                  styles.tagOption,
                  tag === option.value && styles.tagOptionSelected,
                ]}
                onPress={() => setTag(option.value)}
                disabled={isLoading}
              >
                <Text
                  style={[
                    styles.tagOptionText,
                    tag === option.value && styles.tagOptionTextSelected,
                  ]}
                >
                  {option.label}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Insulin (Optional)</Text>

          <View style={styles.inputContainer}>
            <Text style={styles.label}>Dose (units)</Text>
            <TextInput
              style={[
                styles.input,
                focusedField === "insulin" && styles.inputFocused,
              ]}
              value={insulinDose}
              onChangeText={setInsulinDose}
              placeholder="Enter insulin dose"
              placeholderTextColor="#999999"
              keyboardType="numeric"
              onFocus={() => setFocusedField("insulin")}
              onBlur={() => setFocusedField(null)}
              editable={!isLoading}
            />
          </View>

          {insulinDose && (
            <View style={styles.inputContainer}>
              <Text style={styles.label}>Insulin Type</Text>
              <View style={styles.insulinTypeSelector}>
                {insulinTypes.map((type) => (
                  <TouchableOpacity
                    key={type.value}
                    style={[
                      styles.insulinTypeOption,
                      insulinType === type.value &&
                        styles.insulinTypeOptionSelected,
                    ]}
                    onPress={() => setInsulinType(type.value)}
                    disabled={isLoading}
                  >
                    <Text
                      style={[
                        styles.insulinTypeOptionText,
                        insulinType === type.value &&
                          styles.insulinTypeOptionTextSelected,
                      ]}
                    >
                      {type.label}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>
          )}
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Notes</Text>

          <View style={styles.inputContainer}>
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
            {isLoading ? "Saving..." : "Save Reading"}
          </Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
};
