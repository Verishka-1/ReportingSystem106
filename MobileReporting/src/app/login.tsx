import React, { useState } from "react";
import {
  ActivityIndicator,
  Alert,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { router } from "expo-router";

import { COLORS, Spacing } from "../constants/theme";
import { login } from "../services/api";

export default function LoginScreen() {
  const [loginValue, setLoginValue] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = async () => {
    const trimmedLogin = loginValue.trim();

    if (!trimmedLogin || !password) {
      Alert.alert("Missing information", "Please enter your email or username and password.");
      return;
    }

    try {
      setIsLoading(true);

      // Sends credentials to your Laravel API and saves the returned token.
      const user = await login(trimmedLogin, password);

      if (user?.role === "admin") {
        router.replace("/admin-dashboard" as any);
      } else if (user?.role === "student" || user?.role === "teacher") {
        router.replace("/user-dashboard" as any);
      } else {
        Alert.alert(
          "Account role not recognized",
          "Your account was signed in, but its role does not have a matching destination. Please contact the system administrator."
        );
      }
    } catch (error) {
      const message =
        error instanceof Error
          ? error.message
          : "Unable to sign in. Please try again.";

      Alert.alert("Login failed", message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleRegister = () => {
    router.push("/register" as any);
  };

  return (
    <KeyboardAvoidingView
      style={styles.keyboardView}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
    >
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        keyboardShouldPersistTaps="handled"
      >
        <View style={styles.container}>
          <View style={styles.logoCircle}>
            <Text style={styles.logoText}>SP</Text>
          </View>

          <Text style={styles.title}>School Property</Text>
          <Text style={styles.title}>Reporting System</Text>
          <Text style={styles.subtitle}>
            University of Mindanao
          </Text>

          <View style={styles.form}>
            <Text style={styles.label}>Email or Username</Text>
            <TextInput
              style={styles.input}
              value={loginValue}
              onChangeText={setLoginValue}
              placeholder="Enter your email or username"
              placeholderTextColor="#999"
              autoCapitalize="none"
              autoCorrect={false}
              keyboardType="default"
              textContentType="username"
              editable={!isLoading}
              returnKeyType="next"
            />

            <Text style={styles.label}>Password</Text>
            <View style={styles.passwordContainer}>
              <TextInput
                style={styles.passwordInput}
                value={password}
                onChangeText={setPassword}
                placeholder="Enter your password"
                placeholderTextColor="#999"
                secureTextEntry={!showPassword}
                autoCapitalize="none"
                autoCorrect={false}
                textContentType="password"
                editable={!isLoading}
                returnKeyType="go"
                onSubmitEditing={handleLogin}
              />

              <TouchableOpacity
                style={styles.showPasswordButton}
                onPress={() => setShowPassword((current) => !current)}
                disabled={isLoading}
                accessibilityRole="button"
                accessibilityLabel={showPassword ? "Hide password" : "Show password"}
              >
                <Text style={styles.showPasswordText}>
                  {showPassword ? "Hide" : "Show"}
                </Text>
              </TouchableOpacity>
            </View>

            <TouchableOpacity
              style={[
                styles.loginButton,
                isLoading && styles.loginButtonDisabled,
              ]}
              onPress={handleLogin}
              disabled={isLoading}
              activeOpacity={0.85}
            >
              {isLoading ? (
                <ActivityIndicator color="#FFFFFF" />
              ) : (
                <Text style={styles.loginButtonText}>Login</Text>
              )}
            </TouchableOpacity>

            <View style={styles.registerRow}>
              <Text style={styles.registerPrompt}>
                Don’t have an account?
              </Text>
              <TouchableOpacity
                onPress={handleRegister}
                disabled={isLoading}
              >
                <Text style={styles.registerLink}> Register</Text>
              </TouchableOpacity>
            </View>
          </View>

          <Text style={styles.footerText}>
            Report and monitor school property concerns.
          </Text>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  keyboardView: {
    flex: 1,
    backgroundColor: "#F8F7F7",
  },
  scrollContent: {
    flexGrow: 1,
    justifyContent: "center",
  },
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: Spacing?.lg ?? 24,
    paddingVertical: 40,
  },
  logoCircle: {
    width: 84,
    height: 84,
    borderRadius: 42,
    backgroundColor: "#800000",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 22,
  },
  logoText: {
    color: "#FFFFFF",
    fontSize: 28,
    fontWeight: "bold",
    letterSpacing: 1,
  },
  title: {
    color: COLORS.text ?? "#222222",
    fontSize: 23,
    fontWeight: "bold",
    textAlign: "center",
  },
  subtitle: {
    color: "#777777",
    fontSize: 14,
    marginTop: 8,
    marginBottom: 30,
    textAlign: "center",
  },
  form: {
    width: "100%",
    maxWidth: 440,
  },
  label: {
    color: COLORS.text ?? "#222222",
    fontSize: 14,
    fontWeight: "600",
    marginBottom: 8,
    marginTop: 14,
  },
  input: {
    width: "100%",
    minHeight: 52,
    borderWidth: 1,
    borderColor: "#D8D2D2",
    borderRadius: 10,
    backgroundColor: "#FFFFFF",
    paddingHorizontal: 15,
    fontSize: 15,
    color: "#222222",
  },
  passwordContainer: {
    width: "100%",
    minHeight: 52,
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#D8D2D2",
    borderRadius: 10,
    backgroundColor: "#FFFFFF",
  },
  passwordInput: {
    flex: 1,
    minHeight: 50,
    paddingHorizontal: 15,
    fontSize: 15,
    color: "#222222",
  },
  showPasswordButton: {
    paddingHorizontal: 14,
    paddingVertical: 10,
  },
  showPasswordText: {
    color: COLORS.maroon,
    fontSize: 13,
    fontWeight: "600",
  },
  loginButton: {
    width: "100%",
    minHeight: 52,
    backgroundColor: COLORS.maroon,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 26,
  },
  loginButtonDisabled: {
    opacity: 0.65,
  },
  loginButtonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "bold",
  },
  registerRow: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
  },
  registerPrompt: {
    color: "#777777",
    fontSize: 14,
  },
  registerLink: {
    color: COLORS.maroon,
    fontSize: 14,
    fontWeight: "bold",
  },
  footerText: {
    color: "#888888",
    fontSize: 12,
    textAlign: "center",
    marginTop: 34,
  },
});