import React, { useState } from "react";
import {
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

export default function LoginScreen() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = () => {
    if (!email.trim() || !password.trim()) {
      Alert.alert("Missing Information", "Please enter your email and password.");
      return;
    }

    // Demo admin account
    if (
      email.trim().toLowerCase() === "admin@example.com" &&
      password === "admin123"
    ) {
      router.replace("/admin-dashboard" as any);
      return;
    }

    // Demo regular user
    router.replace("/user-dashboard" as any);
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
    >
      <ScrollView
        contentContainerStyle={styles.scroll}
        keyboardShouldPersistTaps="handled"
      >
        <View style={styles.logoContainer}>
          <View style={styles.logoCircle}>
            <Text style={styles.logoText}>SP</Text>
          </View>

          <Text style={styles.title}>School Property</Text>
          <Text style={styles.title}>Reporting System</Text>

          <Text style={styles.subtitle}>
            Report and monitor school property damage
          </Text>
        </View>

        <View style={styles.card}>
          <Text style={styles.cardTitle}>Welcome Back</Text>
          <Text style={styles.cardSubtitle}>
            Sign in to continue
          </Text>

          <Text style={styles.label}>Email</Text>

          <TextInput
            style={styles.input}
            placeholder="Enter your email"
            placeholderTextColor={COLORS.gray}
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
          />

          <Text style={styles.label}>Password</Text>

          <TextInput
            style={styles.input}
            placeholder="Enter your password"
            placeholderTextColor={COLORS.gray}
            value={password}
            onChangeText={setPassword}
            secureTextEntry
          />

          <TouchableOpacity
            style={styles.loginButton}
            onPress={handleLogin}
            activeOpacity={0.8}
          >
            <Text style={styles.loginButtonText}>LOGIN</Text>
          </TouchableOpacity>

          <View style={styles.registerRow}>
            <Text style={styles.registerText}>
              Don't have an account?
            </Text>

            <TouchableOpacity onPress={() => router.push("/register" as any)}>
              <Text style={styles.registerLink}> Register</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.demoBox}>
            <Text style={styles.demoTitle}>Demo Admin Account</Text>
            <Text style={styles.demoText}>
              Email: admin@example.com
            </Text>
            <Text style={styles.demoText}>
              Password: admin123
            </Text>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.lighterMaroon,
  },

  scroll: {
    flexGrow: 1,
    justifyContent: "center",
    padding: Spacing.xl,
  },

  logoContainer: {
    alignItems: "center",
    marginBottom: Spacing.xl,
  },

  logoCircle: {
    width: 78,
    height: 78,
    borderRadius: 39,
    backgroundColor: COLORS.maroon,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: Spacing.md,
  },

  logoText: {
    color: COLORS.white,
    fontSize: 25,
    fontWeight: "800",
  },

  title: {
    color: COLORS.maroon,
    fontSize: 24,
    fontWeight: "800",
    textAlign: "center",
  },

  subtitle: {
    color: COLORS.textSecondary,
    fontSize: 13,
    textAlign: "center",
    marginTop: Spacing.sm,
  },

  card: {
    backgroundColor: COLORS.white,
    borderRadius: 18,
    padding: Spacing.xl,
    borderWidth: 1,
    borderColor: COLORS.border,
  },

  cardTitle: {
    color: COLORS.text,
    fontSize: 21,
    fontWeight: "700",
  },

  cardSubtitle: {
    color: COLORS.textSecondary,
    fontSize: 13,
    marginTop: 4,
    marginBottom: Spacing.xl,
  },

  label: {
    color: COLORS.text,
    fontSize: 13,
    fontWeight: "600",
    marginBottom: 6,
  },

  input: {
    height: 48,
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: 10,
    paddingHorizontal: 14,
    color: COLORS.text,
    backgroundColor: COLORS.white,
    marginBottom: Spacing.md,
  },

  loginButton: {
    height: 50,
    backgroundColor: COLORS.maroon,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    marginTop: Spacing.sm,
  },

  loginButtonText: {
    color: COLORS.white,
    fontSize: 14,
    fontWeight: "800",
  },

  registerRow: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: Spacing.lg,
  },

  registerText: {
    color: COLORS.textSecondary,
    fontSize: 13,
  },

  registerLink: {
    color: COLORS.maroon,
    fontSize: 13,
    fontWeight: "700",
  },

  demoBox: {
    backgroundColor: COLORS.lightMaroon,
    borderRadius: 10,
    padding: Spacing.md,
    marginTop: Spacing.xl,
  },

  demoTitle: {
    color: COLORS.maroon,
    fontSize: 12,
    fontWeight: "700",
    marginBottom: 4,
  },

  demoText: {
    color: COLORS.textSecondary,
    fontSize: 11,
  },
});