import { Ionicons } from "@expo/vector-icons";
import React from "react";
import {
  StyleProp,
  Text,
  TouchableOpacity,
  View,
  ViewStyle,
} from "react-native";
import { styles } from "./IceCard.styles";

export interface ICECardProps {
  hasICEProfile: boolean;
  onPress?: () => void;
  style?: StyleProp<ViewStyle>;
}

export const ICECard: React.FC<ICECardProps> = ({ hasICEProfile, onPress }) => (
  <TouchableOpacity style={[styles.card]} onPress={onPress}>
    <View style={styles.icon}>
      <Ionicons name="medkit" size={24} color="#ffffff" />
    </View>
    <View style={styles.content}>
      <Text style={styles.title}>ICE Profile</Text>
      <Text style={styles.subtitle}>
        {hasICEProfile
          ? "View emergency information"
          : "Create your emergency profile"}
      </Text>
    </View>
    <View style={styles.arrow}>
      <Ionicons name="chevron-forward" size={24} color="#ffffff" />
    </View>
  </TouchableOpacity>
);

export default ICECard;
