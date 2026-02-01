import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRouter } from "expo-router";
import * as SQLite from "expo-sqlite";
import React, { useEffect, useState } from "react";
import {
  Alert,
  Modal,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  LoginForm,
  LoginFormData,
  RegisterForm,
  RegisterFormData,
} from "../../components/molecules/auth";
import ICECard from "../../components/molecules/navigation/iceCard/IceCard";
import { useAppDispatch, useUser } from "../../context/AppContext";
import { DatabaseService } from "../../lib/database";
import { ICEProfile } from "../../types";

type AuthMode = "login" | "register";

export default function AuthPage() {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const user = useUser();
  const [mode, setMode] = useState<AuthMode>("login");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | undefined>();
  const [showResetModal, setShowResetModal] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [iceProfile, setIceProfile] = useState<ICEProfile | null>(null);

  useEffect(() => {
    const loadICEProfile = async () => {
      try {
        const profile = await DatabaseService.getICEProfile();
        setIceProfile(profile);
      } catch (error) {
        console.error("Failed to load ICE profile:", error);
      }
    };
    loadICEProfile();
  }, []);

  const handleLogin = async (data: LoginFormData) => {
    // setIsLoading(true);
    setError(undefined);

    try {
      const user = await DatabaseService.loginUser(data.password);

      if (user) {
        dispatch({ type: "SET_USER", payload: user });
        dispatch({ type: "SET_AUTHENTICATED", payload: true });
        router.replace("/(pages)");
      } else {
        setError("Invalid password");
      }
    } catch (err) {
      console.error("Login error:", err);
      setError("An error occurred during login");
    } finally {
      setIsLoading(false);
    }
  };

  const handleRegister = async (data: RegisterFormData) => {
    // setIsLoading(true);
    setError(undefined);

    try {
      const user = await DatabaseService.registerUser({
        password: data.password,
        name: data.name,
      });

      dispatch({ type: "SET_USER", payload: user });
      dispatch({ type: "SET_AUTHENTICATED", payload: true });
      router.replace("/(pages)");
    } catch (err: any) {
      console.error("Registration error:", err);
      setError("An error occurred during registration");
    } finally {
      // setIsLoading(false);
    }
  };

  const handleForgotPassword = () => {
    setShowResetModal(true);
  };

  const handleResetConfirm = async () => {
    setShowResetModal(false);
    // setIsLoading(true);
    try {
      const { dbManager } = await import("../../lib/database/DatabaseManager");
      await dbManager.resetDatabase();
      await AsyncStorage.clear();
      setMode("register");
      setError(undefined);
      setShowSuccessModal(true);
    } catch (e) {
      console.error("Reset error:", e);
      Alert.alert(
        "Error",
        "Failed to reset app data. Please try again or reinstall the app.",
      );
    } finally {
      // setIsLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        style={styles.content}
        contentContainerStyle={{ flexGrow: 1 }}
      >
        {mode === "login" ? (
          <LoginForm
            onSubmit={handleLogin}
            onForgotPassword={handleForgotPassword}
            onSwitchToRegister={() => {
              setMode("register");
              setError(undefined);
            }}
            // isLoading={isLoading}
            error={error}
            userName={user?.name}
          />
        ) : (
          <RegisterForm
            onSubmit={handleRegister}
            onSwitchToLogin={() => {
              setMode("login");
              setError(undefined);
            }}
            // isLoading={isLoading}
            error={error}
          />
        )}

        <Modal
          visible={showResetModal}
          transparent
          animationType="fade"
          onRequestClose={() => setShowResetModal(false)}
        >
          <View
            style={{
              flex: 1,
              justifyContent: "center",
              alignItems: "center",
              backgroundColor: "rgba(0,0,0,0.3)",
            }}
          >
            <View
              style={{
                backgroundColor: "#fff",
                padding: 24,
                borderRadius: 16,
                width: 320,
                alignItems: "center",
              }}
            >
              <Text
                style={{ fontSize: 18, fontWeight: "bold", marginBottom: 12 }}
              >
                Reset App Data?
              </Text>
              <Text
                style={{
                  fontSize: 16,
                  color: "#666",
                  marginBottom: 24,
                  textAlign: "center",
                }}
              >
                If you reset, all your data will be permanently deleted and you
                will need to register again. This cannot be undone.
              </Text>
              <View style={{ flexDirection: "row", gap: 12 }}>
                <TouchableOpacity
                  style={{
                    flex: 1,
                    marginRight: 8,
                    borderWidth: 1,
                    borderColor: "#1976d2",
                    borderRadius: 8,
                    paddingVertical: 10,
                    alignItems: "center",
                  }}
                  onPress={() => setShowResetModal(false)}
                  disabled={isLoading}
                >
                  <Text style={{ color: "#1976d2", fontWeight: "bold" }}>
                    Cancel
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={{
                    flex: 1,
                    backgroundColor: "#1976d2",
                    borderRadius: 8,
                    paddingVertical: 10,
                    alignItems: "center",
                  }}
                  onPress={handleResetConfirm}
                  disabled={isLoading}
                >
                  <Text style={{ color: "#fff", fontWeight: "bold" }}>
                    Confirm
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Modal>

        <Modal
          visible={showSuccessModal}
          transparent
          animationType="fade"
          onRequestClose={() => setShowSuccessModal(false)}
        >
          <View
            style={{
              flex: 1,
              justifyContent: "center",
              alignItems: "center",
              backgroundColor: "rgba(0,0,0,0.3)",
            }}
          >
            <View
              style={{
                backgroundColor: "#fff",
                padding: 24,
                borderRadius: 16,
                width: 320,
                alignItems: "center",
              }}
            >
              <Text
                style={{ fontSize: 18, fontWeight: "bold", marginBottom: 12 }}
              >
                Success
              </Text>
              <Text
                style={{
                  fontSize: 16,
                  color: "#666",
                  marginBottom: 24,
                  textAlign: "center",
                }}
              >
                App data has been reset. You can now register again.
              </Text>
              <TouchableOpacity
                style={{
                  backgroundColor: "#1976d2",
                  borderRadius: 8,
                  paddingVertical: 10,
                  paddingHorizontal: 32,
                  alignItems: "center",
                }}
                onPress={() => setShowSuccessModal(false)}
              >
                <Text style={{ color: "#fff", fontWeight: "bold" }}>OK</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>

        <View style={styles.iceContainer}>
          <ICECard
            hasICEProfile={!!iceProfile}
            onPress={() => router.push("/(auth)/ice-preview")}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f8f9fa",
  },
  content: {
    flex: 1,
  },
  iceContainer: {
    padding: 16,
    paddingBottom: 24,
  },
});
