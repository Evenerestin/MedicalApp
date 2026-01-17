import {
  IconEye,
  IconEyeOff,
  IconLock,
  IconMail,
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

export interface LoginFormData {
  email: string;
  password: string;
}

export interface LoginFormProps {
  onSubmit?: (data: LoginFormData) => void;
  onForgotPassword?: () => void;
  onSwitchToRegister?: () => void;
  isLoading?: boolean;
  error?: string;
}

export const LoginForm: React.FC<LoginFormProps> = ({
  onSubmit,
  onForgotPassword,
  onSwitchToRegister,
  isLoading = false,
  error,
}) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [emailFocused, setEmailFocused] = useState(false);
  const [passwordFocused, setPasswordFocused] = useState(false);

  const isValid = email.trim() !== "" && password.trim() !== "";

  const handleSubmit = () => {
    if (isValid && !isLoading) {
      onSubmit?.({ email: email.trim(), password });
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
          <Text style={authStyles.appName}>Zdrowie24</Text>
          <Text style={authStyles.appTagline}>Your health companion</Text>
        </View>

        <View style={authStyles.formContainer}>
          <Text style={authStyles.title}>Welcome Back</Text>
          <Text style={authStyles.subtitle}>Sign in to your account</Text>

          {error && (
            <View style={authStyles.section}>
              <Text style={authStyles.errorText}>{error}</Text>
            </View>
          )}

          <View style={authStyles.section}>
            <Text style={authStyles.label}>Email Address</Text>
            <View
              style={[
                authStyles.passwordContainer,
                emailFocused && authStyles.inputFocused,
              ]}
            >
              <IconMail size={20} color="#1976d2" style={{ marginRight: 8 }} />
              <TextInput
                style={authStyles.passwordInput}
                value={email}
                onChangeText={setEmail}
                onFocus={() => setEmailFocused(true)}
                onBlur={() => setEmailFocused(false)}
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
            <View
              style={[
                authStyles.passwordContainer,
                passwordFocused && authStyles.inputFocused,
              ]}
            >
              <IconLock size={20} color="#1976d2" style={{ marginRight: 8 }} />
              <TextInput
                style={authStyles.passwordInput}
                value={password}
                onChangeText={setPassword}
                onFocus={() => setPasswordFocused(true)}
                onBlur={() => setPasswordFocused(false)}
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
