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

export interface LoginFormData {
  password: string;
}

export interface LoginFormProps {
  onSubmit?: (data: LoginFormData) => void;
  onForgotPassword?: () => void;
  onSwitchToRegister?: () => void;
  isLoading?: boolean;
  error?: string;
  userName?: string;
}

export const LoginForm: React.FC<LoginFormProps> = ({
  onSubmit,
  onForgotPassword,
  onSwitchToRegister,
  isLoading = false,
  error,
  userName,
}) => {
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const isValid = password.trim() !== "";

  const handleSubmit = () => {
    if (isValid && !isLoading) {
      onSubmit?.({ password: password.trim() });
    }
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
          <Text style={authStyles.title}>Welcome Back</Text>
          {userName ? (
            <Text style={authStyles.subtitle}>{userName}</Text>
          ) : (
            <Text style={authStyles.subtitle}>Sign in to your account</Text>
          )}

          {error && (
            <View style={authStyles.section}>
              <Text style={authStyles.errorText}>{error}</Text>
            </View>
          )}

          <View style={authStyles.section}>
            <Input
              label="Password"
              value={password}
              onChangeText={setPassword}
              placeholder="Enter your password"
              secureTextEntry={!showPassword}
              autoCapitalize="none"
              disabled={isLoading}
              rightSection={
                <TouchableOpacity
                  onPress={() => setShowPassword((prev) => !prev)}
                >
                  {showPassword ? (
                    <IconEyeOff size={20} color="#1976d2" />
                  ) : (
                    <IconEye size={20} color="#1976d2" />
                  )}
                </TouchableOpacity>
              }
            />
          </View>

          <TouchableOpacity
            onPress={onForgotPassword}
            disabled={isLoading}
            style={authStyles.linkButton}
          >
            <Text style={authStyles.linkText}>Forgot password?</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[
              authStyles.button,
              (!isValid || isLoading) && authStyles.disabledButton,
            ]}
            onPress={handleSubmit}
            disabled={!isValid || isLoading}
          >
            <Text style={authStyles.buttonText}>
              {isLoading ? "Signing in..." : "Sign In"}
            </Text>
          </TouchableOpacity>

          <View style={authStyles.footerContainer}>
            <Text style={authStyles.footerText}>Don't have an account?</Text>
            <TouchableOpacity onPress={onSwitchToRegister} disabled={isLoading}>
              <Text style={authStyles.footerLink}>Sign up</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};
