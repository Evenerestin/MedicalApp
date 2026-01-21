import React, { useState } from "react";
import { View } from "react-native";
import { LoginForm } from "./LoginForm";
import { RegisterForm } from "./RegisterForm";

export default {
  title: "Molecules/Auth/Forms",
};

export const Login = () => {
  const [error, setError] = useState("");

  return (
    <View style={{ flex: 1 }}>
      <LoginForm
        error={error}
        onSubmit={(data) => {
          console.log("Login:", data);
          setError("");
        }}
        onForgotPassword={() => console.log("Forgot password")}
        onSwitchToRegister={() => console.log("Switch to register")}
      />
    </View>
  );
};

export const LoginWithError = () => {
  return (
    <View style={{ flex: 1 }}>
      <LoginForm
        error="Invalid email or password"
        onSubmit={(data) => console.log("Login:", data)}
        onForgotPassword={() => console.log("Forgot password")}
        onSwitchToRegister={() => console.log("Switch to register")}
      />
    </View>
  );
};

export const Register = () => {
  const [error, setError] = useState("");

  return (
    <View style={{ flex: 1 }}>
      <RegisterForm
        error={error}
        onSubmit={(data) => {
          console.log("Register:", data);
          setError("");
        }}
        onSwitchToLogin={() => console.log("Switch to login")}
      />
    </View>
  );
};

export const RegisterWithError = () => {
  return (
    <View style={{ flex: 1 }}>
      <RegisterForm
        error="Email already registered"
        onSubmit={(data) => console.log("Register:", data)}
        onSwitchToLogin={() => console.log("Switch to login")}
      />
    </View>
  );
};
