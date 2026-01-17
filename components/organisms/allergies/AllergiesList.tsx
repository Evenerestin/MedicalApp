import React, { useMemo } from "react";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";
import { Allergy, AllergyCategory } from "../../../types";
import { allergiesStyles } from "./Allergies.styles";

export interface AllergiesListProps {
  allergies: Allergy[];
  onAllergyPress?: (allergyId: string) => void;
  onAddNew?: () => void;
}

const getCategoryLabel = (category: AllergyCategory): string => {
  const labels: Record<AllergyCategory, string> = {
    food: "Food Allergies",
    medication: "Medication Allergies",
    environmental: "Environmental Allergies",
    chemical: "Chemical Allergies",
  };
  return labels[category];
};

const getSeverityColor = (severity: string): string => {
  switch (severity) {
    case "mild":
      return "#4CAF50";
    case "moderate":
      return "#FF9800";
    case "severe":
      return "#f44336";
    default:
      return "#999";
  }
};

const getSeverityBgColor = (severity: string): string => {
  switch (severity) {
    case "mild":
      return "#E8F5E9";
    case "moderate":
      return "#FFF3E0";
    case "severe":
      return "#FFEBEE";
    default:
      return "#F5F5F5";
  }
};

export const AllergiesList: React.FC<AllergiesListProps> = ({
  allergies,
  onAllergyPress,
  onAddNew,
}) => {
  const groupedAllergies = useMemo(() => {
    const grouped: Record<AllergyCategory, Allergy[]> = {
      food: [],
      medication: [],
      environmental: [],
      chemical: [],
    };

    allergies.forEach((allergy) => {
      grouped[allergy.category].push(allergy);
    });

    return grouped;
  }, [allergies]);

  if (allergies.length === 0) {
    return (
      <View style={allergiesStyles.emptyContainer}>
        <Text style={allergiesStyles.emptyText}>No Allergies Recorded</Text>
        <Text style={allergiesStyles.emptySubtext}>
          Add your allergies to keep them safe and accessible
        </Text>
        {onAddNew && (
          <TouchableOpacity
            style={allergiesStyles.emptyButton}
            onPress={onAddNew}
          >
            <Text style={allergiesStyles.emptyButtonText}>Add Allergy</Text>
          </TouchableOpacity>
        )}
      </View>
    );
  }

  return (
    <ScrollView
      style={allergiesStyles.container}
      contentContainerStyle={allergiesStyles.scrollView}
    >
      {(
        ["food", "medication", "environmental", "chemical"] as AllergyCategory[]
      ).map(
        (category) =>
          groupedAllergies[category].length > 0 && (
            <View key={category} style={allergiesStyles.section}>
              <View style={allergiesStyles.sectionHeader}>
                <Text style={allergiesStyles.sectionTitle}>
                  {getCategoryLabel(category)}
                </Text>
              </View>
              {groupedAllergies[category].map((allergy) => (
                <TouchableOpacity
                  key={allergy.id}
                  style={[
                    allergiesStyles.allergyCard,
                    allergy.severity === "mild" &&
                      allergiesStyles.allergyCardMild,
                    allergy.severity === "moderate" &&
                      allergiesStyles.allergyCardModerate,
                    allergy.severity === "severe" &&
                      allergiesStyles.allergyCardSevere,
                  ]}
                  onPress={() => onAllergyPress?.(allergy.id)}
                >
                  <View style={allergiesStyles.allergyContent}>
                    <Text style={allergiesStyles.allergyName}>
                      {allergy.name}
                    </Text>
                    <Text style={allergiesStyles.allergyCategory}>
                      {getCategoryLabel(allergy.category)}
                    </Text>
                    {allergy.symptoms && allergy.symptoms.length > 0 && (
                      <Text style={allergiesStyles.allergySymptoms}>
                        Symptoms: {allergy.symptoms.join(", ")}
                      </Text>
                    )}
                  </View>
                  <View
                    style={[
                      allergiesStyles.severityBadge,
                      {
                        backgroundColor: getSeverityBgColor(allergy.severity),
                      },
                    ]}
                  >
                    <Text
                      style={[
                        allergiesStyles.severityText,
                        { color: getSeverityColor(allergy.severity) },
                      ]}
                    >
                      {allergy.severity.charAt(0).toUpperCase() +
                        allergy.severity.slice(1)}
                    </Text>
                  </View>
                </TouchableOpacity>
              ))}
            </View>
          )
      )}
    </ScrollView>
  );
};
