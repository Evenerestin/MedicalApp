import {
  IconEye,
  IconEyeOff,
  IconLock,
  IconMedicalCross,
} from "@tabler/icons-react-native";
import React, { useState } from "react";
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { Input } from "../../atoms/inputs/input/Input";
import { authStyles } from "./Auth.styles";

export interface RegisterFormData {
  name: string;
  password: string;
  confirmPassword: string;
}

export interface RegisterFormProps {
  onSubmit?: (data: RegisterFormData) => void;
  onSwitchToLogin?: () => void;
  isLoading?: boolean;
  error?: string;
}

export const RegisterForm: React.FC<RegisterFormProps> = ({
  onSubmit,
  onSwitchToLogin,
  isLoading = false,
  error,
}) => {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [passwordError, setPasswordError] = useState("");

  const isValid =
    name.trim() !== "" &&
    password.trim() !== "" &&
    confirmPassword.trim() !== "" &&
    password === confirmPassword;

  const handleSubmit = () => {
    if (password !== confirmPassword) {
      setPasswordError("Passwords do not match");
      return;
    }

    if (isValid && !isLoading) {
      onSubmit?.({
        name: name.trim(),
        password,
        confirmPassword,
      });
    }
  };

  const handlePasswordChange = (value: string) => {
    setPassword(value);
    if (passwordError) setPasswordError("");
  };

  const handleConfirmPasswordChange = (value: string) => {
    setConfirmPassword(value);
    if (passwordError) setPasswordError("");
  };

  return (
    <KeyboardAvoidingView
      style={authStyles.container}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <ScrollView
        contentContainerStyle={authStyles.scrollView}
        keyboardShouldPersistTaps="handled"
      >
        <View style={authStyles.headerContainer}>
          <View style={[authStyles.logoContainer, { alignItems: "center" }]}>
            <IconMedicalCross size={60} color="#1976d2" />
            <Text style={authStyles.appName}>{"Medical Tracker"}</Text>
          </View>
          {/* Removed Desc text as requested */}
        </View>

        <View style={authStyles.formContainer}>
          <Text style={authStyles.title}>Create Account</Text>
          <Text style={authStyles.subtitle}>Join us to manage your health</Text>

          {error && (
            <View style={authStyles.section}>
              <Text style={authStyles.errorText}>{error}</Text>
            </View>
          )}

          <View style={authStyles.section}>
            <Input
              label="Name"
              value={name}
              onChangeText={setName}
              placeholder="Enter your name"
              disabled={isLoading}
            />
          </View>

          <View style={authStyles.section}>
            <Input
              label="Password"
              value={password}
              onChangeText={handlePasswordChange}
              placeholder="Enter your password"
              secureTextEntry={!showPassword}
              autoCapitalize="none"
              disabled={isLoading}
            />
            <Input
              label="Confirm Password"
              value={confirmPassword}
              onChangeText={handleConfirmPasswordChange}
              placeholder="Confirm your password"
              secureTextEntry={!showConfirmPassword}
              autoCapitalize="none"
              disabled={isLoading}
              error={passwordError}
            />
          </View>

          <TouchableOpacity
            style={[
              authStyles.button,
              (!isValid || isLoading) && authStyles.disabledButton,
            ]}
            onPress={handleSubmit}
            disabled={!isValid || isLoading}
          >
            <Text style={authStyles.buttonText}>
              {isLoading ? "Creating account..." : "Create Account"}
            </Text>
          </TouchableOpacity>

          <View style={authStyles.footerContainer}>
            <Text style={authStyles.footerText}>Already have an account?</Text>
            <TouchableOpacity onPress={onSwitchToLogin} disabled={isLoading}>
              <Text style={authStyles.footerLink}>Sign in</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};
