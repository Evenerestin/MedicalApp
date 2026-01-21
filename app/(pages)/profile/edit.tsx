import { useRouter } from "expo-router";
import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { useAppDispatch, useUser } from "../../../context/AppContext";
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

  const handleSave = (data: Partial<User>) => {
    const updatedUser: User = {
      ...user,
      ...data,
      updatedAt: new Date().toISOString(),
    };
    dispatch({ type: "SET_USER", payload: updatedUser });
    router.back();
  };

  const handleBack = () => {
    router.back();
  };

  const handleLogout = () => {
    dispatch({ type: "LOGOUT" });
    router.replace("/(pages)" as any);
  };

  return (
    <></>
    // <ProfileEdit
    //   user={user}
    //   onSave={handleSave}
    //   onBack={handleBack}
    //   onLogout={handleLogout}
    // />
  );
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
