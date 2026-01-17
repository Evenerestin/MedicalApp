import {
  IconEye,
  IconEyeOff,
  IconLock,
  IconMail,
  IconUser,
} from "@tabler/icons-react-native";
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
import { authStyles } from "./Auth.styles";

export interface RegisterFormData {
  firstName: string;
  lastName: string;
  email: string;
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
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [passwordError, setPasswordError] = useState("");

  const isValid =
    firstName.trim() !== "" &&
    lastName.trim() !== "" &&
    email.trim() !== "" &&
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
        firstName: firstName.trim(),
        lastName: lastName.trim(),
        email: email.trim(),
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
          <Text style={authStyles.appName}>Zdrowie24</Text>
          <Text style={authStyles.appTagline}>Create your health account</Text>
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
            <Text style={authStyles.label}>First Name</Text>
            <View style={authStyles.passwordContainer}>
              <IconUser size={20} color="#1976d2" style={{ marginRight: 8 }} />
              <TextInput
                style={authStyles.passwordInput}
                value={firstName}
                onChangeText={setFirstName}
                placeholder="Enter your first name"
                placeholderTextColor="#999"
                editable={!isLoading}
              />
            </View>
          </View>

          <View style={authStyles.section}>
            <Text style={authStyles.label}>Last Name</Text>
            <View style={authStyles.passwordContainer}>
              <IconUser size={20} color="#1976d2" style={{ marginRight: 8 }} />
              <TextInput
                style={authStyles.passwordInput}
                value={lastName}
                onChangeText={setLastName}
                placeholder="Enter your last name"
                placeholderTextColor="#999"
                editable={!isLoading}
              />
            </View>
          </View>

          <View style={authStyles.section}>
            <Text style={authStyles.label}>Email Address</Text>
            <View style={authStyles.passwordContainer}>
              <IconMail size={20} color="#1976d2" style={{ marginRight: 8 }} />
              <TextInput
                style={authStyles.passwordInput}
                value={email}
                onChangeText={setEmail}
                placeholder="Enter your email"
                placeholderTextColor="#999"
                keyboardType="email-address"
                autoCapitalize="none"
                editable={!isLoading}
              />
            </View>
          </View>

          <View style={authStyles.section}>
            <Text style={authStyles.label}>Password</Text>
            <View style={authStyles.passwordContainer}>
              <IconLock size={20} color="#1976d2" style={{ marginRight: 8 }} />
              <TextInput
                style={authStyles.passwordInput}
                value={password}
                onChangeText={handlePasswordChange}
                placeholder="Enter your password"
                placeholderTextColor="#999"
                secureTextEntry={!showPassword}
                editable={!isLoading}
              />
              <TouchableOpacity
                style={authStyles.passwordToggle}
                onPress={() => setShowPassword(!showPassword)}
                disabled={isLoading}
              >
                {showPassword ? (
                  <IconEyeOff size={20} color="#666" />
                ) : (
                  <IconEye size={20} color="#666" />
                )}
              </TouchableOpacity>
            </View>
          </View>

          <View style={authStyles.section}>
            <Text style={authStyles.label}>Confirm Password</Text>
            <View
              style={[
                authStyles.passwordContainer,
                passwordError && authStyles.inputError,
              ]}
            >
              <IconLock size={20} color="#1976d2" style={{ marginRight: 8 }} />
              <TextInput
                style={authStyles.passwordInput}
                value={confirmPassword}
                onChangeText={handleConfirmPasswordChange}
                placeholder="Confirm your password"
                placeholderTextColor="#999"
                secureTextEntry={!showConfirmPassword}
                editable={!isLoading}
              />
              <TouchableOpacity
                style={authStyles.passwordToggle}
                onPress={() => setShowConfirmPassword(!showConfirmPassword)}
                disabled={isLoading}
              >
                {showConfirmPassword ? (
                  <IconEyeOff size={20} color="#666" />
                ) : (
                  <IconEye size={20} color="#666" />
                )}
              </TouchableOpacity>
            </View>
            {passwordError && (
              <Text style={authStyles.errorText}>{passwordError}</Text>
            )}
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
