import { IconAlertTriangle } from "@tabler/icons-react-native";
import React, { useState } from "react";
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { Allergy } from "../../../types";
import { allergiesFormStyles } from "./AllergiesForm.styles";

export interface AllergyFormData {
  name: string;
  category: "food" | "medication" | "environmental" | "chemical";
  severity: "mild" | "moderate" | "severe";
  symptoms?: string[];
  notes?: string;
}

export interface AllergiesFormProps {
  mode: "add" | "edit";
  initialData?: Partial<AllergyFormData>;
  onSave?: (data: AllergyFormData) => void;
  onDelete?: () => void;
  onCancel?: () => void;
  isLoading?: boolean;
}

export const AllergiesForm: React.FC<AllergiesFormProps> = ({
  mode,
  initialData = {},
  onSave,
  onDelete,
  onCancel,
  isLoading = false,
}) => {
  const [name, setName] = useState(initialData.name || "");
  const [category, setCategory] = useState<
    "food" | "medication" | "environmental" | "chemical"
  >(initialData.category || "food");
  const [severity, setSeverity] = useState<"mild" | "moderate" | "severe">(
    initialData.severity || "mild"
  );
  const [symptoms, setSymptoms] = useState(
    initialData.symptoms?.join(", ") || ""
  );
  const [notes, setNotes] = useState(initialData.notes || "");

  const isValid = name.trim() !== "";

  const handleSave = () => {
    if (isValid && !isLoading) {
      onSave?.({
        name: name.trim(),
        category,
        severity,
        symptoms: symptoms
          .split(",")
          .map((s) => s.trim())
          .filter((s) => s.length > 0),
        notes: notes.trim() || undefined,
      });
    }
  };

  const categories = [
    { value: "food" as const, label: "Food" },
    { value: "medication" as const, label: "Medication" },
    { value: "environmental" as const, label: "Environmental" },
    { value: "chemical" as const, label: "Chemical" },
  ];

  const severities = [
    { value: "mild" as const, label: "Mild" },
    { value: "moderate" as const, label: "Moderate" },
    { value: "severe" as const, label: "Severe" },
  ];

  return (
    <KeyboardAvoidingView
      style={allergiesFormStyles.container}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <ScrollView
        style={allergiesFormStyles.scrollView}
        keyboardShouldPersistTaps="handled"
      >
        <View style={allergiesFormStyles.section}>
          <Text style={allergiesFormStyles.label}>Allergen Name *</Text>
          <TextInput
            style={allergiesFormStyles.input}
            value={name}
            onChangeText={setName}
            placeholder="Enter allergen name"
            placeholderTextColor="#999"
            editable={!isLoading}
          />
        </View>

        <View style={allergiesFormStyles.section}>
          <Text style={allergiesFormStyles.label}>Category *</Text>
          <View style={allergiesFormStyles.buttonGroup}>
            {categories.map((cat) => (
              <TouchableOpacity
                key={cat.value}
                style={[
                  allergiesFormStyles.categoryButton,
                  category === cat.value &&
                    allergiesFormStyles.categoryButtonActive,
                ]}
                onPress={() => setCategory(cat.value)}
                disabled={isLoading}
              >
                <Text
                  style={[
                    allergiesFormStyles.categoryButtonText,
                    category === cat.value &&
                      allergiesFormStyles.categoryButtonTextActive,
                  ]}
                >
                  {cat.label}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        <View style={allergiesFormStyles.section}>
          <Text style={allergiesFormStyles.label}>Severity *</Text>
          <View style={allergiesFormStyles.buttonGroup}>
            {severities.map((sev) => (
              <TouchableOpacity
                key={sev.value}
                style={[
                  allergiesFormStyles.severityButton,
                  severity === sev.value &&
                    allergiesFormStyles.severityButtonActive,
                  sev.value === "mild" && allergiesFormStyles.severityMild,
                  sev.value === "moderate" &&
                    allergiesFormStyles.severityModerate,
                  sev.value === "severe" && allergiesFormStyles.severitySevere,
                ]}
                onPress={() => setSeverity(sev.value)}
                disabled={isLoading}
              >
                <Text
                  style={[
                    allergiesFormStyles.severityButtonText,
                    severity === sev.value &&
                      allergiesFormStyles.severityButtonTextActive,
                  ]}
                >
                  {sev.label}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        <View style={allergiesFormStyles.section}>
          <Text style={allergiesFormStyles.label}>
            Symptoms (comma-separated)
          </Text>
          <TextInput
            style={[allergiesFormStyles.input, allergiesFormStyles.textArea]}
            value={symptoms}
            onChangeText={setSymptoms}
            placeholder="e.g., itching, swelling, difficulty breathing"
            placeholderTextColor="#999"
            multiline
            numberOfLines={3}
            editable={!isLoading}
          />
        </View>

        <View style={allergiesFormStyles.section}>
          <Text style={allergiesFormStyles.label}>Notes</Text>
          <TextInput
            style={[allergiesFormStyles.input, allergiesFormStyles.textArea]}
            value={notes}
            onChangeText={setNotes}
            placeholder="Additional notes about this allergy"
            placeholderTextColor="#999"
            multiline
            numberOfLines={3}
            editable={!isLoading}
          />
        </View>
      </ScrollView>

      <View style={allergiesFormStyles.footer}>
        <View style={allergiesFormStyles.footerButtons}>
          {onCancel && (
            <TouchableOpacity
              style={[
                allergiesFormStyles.button,
                allergiesFormStyles.cancelButton,
              ]}
              onPress={onCancel}
              disabled={isLoading}
            >
              <Text style={allergiesFormStyles.cancelButtonText}>Cancel</Text>
            </TouchableOpacity>
          )}

          <TouchableOpacity
            style={[
              allergiesFormStyles.button,
              allergiesFormStyles.saveButton,
              (!isValid || isLoading) && allergiesFormStyles.disabledButton,
            ]}
            onPress={handleSave}
            disabled={!isValid || isLoading}
          >
            <Text style={allergiesFormStyles.saveButtonText}>
              {mode === "edit" ? "Update" : "Add"} Allergy
            </Text>
          </TouchableOpacity>
        </View>

        {mode === "edit" && onDelete && (
          <TouchableOpacity
            style={[
              allergiesFormStyles.button,
              allergiesFormStyles.deleteButton,
            ]}
            onPress={onDelete}
            disabled={isLoading}
          >
            <Text style={allergiesFormStyles.deleteButtonText}>
              Delete Allergy
            </Text>
          </TouchableOpacity>
        )}
      </View>
    </KeyboardAvoidingView>
  );
};
