import { useRouter } from "expo-router";
import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { useAppDispatch, useUser } from "../../../context/AppContext";
import { DatabaseService } from "../../../lib/database";
import { User } from "../../../types";

export default function EditProfilePage() {
  const router = useRouter();
  const user = useUser();
  const dispatch = useAppDispatch();

  if (!user) {
    return (
      <View style={styles.container}>
        <Text style={styles.text}>Please log in to edit your profile</Text>
      </View>
    );
  }

  const handleSave = async (data: Partial<User>) => {
    try {
      const updatedUser = await DatabaseService.updateUserProfile(
        user.id,
        data,
      );
      if (updatedUser) {
        dispatch({ type: "SET_USER", payload: updatedUser });
      }
      router.back();
    } catch (error) {
      console.error("Failed to update profile:", error);
    }
  };

  const handleBack = () => {
    router.back();
  };

  const handleLogout = () => {
    dispatch({ type: "LOGOUT" });
    router.replace("/(pages)" as any);
  };

  return <></>;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f8f9fa",
  },
  text: {
    fontSize: 16,
    color: "#666666",
  },
});
