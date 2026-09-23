import React from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { router } from "expo-router";

import { COLORS, Spacing } from "../constants/theme";

export default function UserDashboardScreen() {
  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <View>
          <Text style={styles.smallTitle}>SCHOOL PROPERTY</Text>
          <Text style={styles.title}>User Dashboard</Text>
        </View>

        <TouchableOpacity
          style={styles.logoutButton}
          onPress={() => router.replace("/")}
        >
          <Text style={styles.logoutText}>Logout</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.content}>
        <View style={styles.welcomeCard}>
          <Text style={styles.welcomeTitle}>Welcome!</Text>

          <Text style={styles.welcomeText}>
            Help maintain our school facilities by reporting damaged
            or malfunctioning property.
          </Text>
        </View>

        <Text style={styles.sectionTitle}>Quick Action</Text>

        <TouchableOpacity
          style={styles.reportButton}
          onPress={() => router.push("/report-damage" as any)}
          activeOpacity={0.8}
        >
          <Text style={styles.reportButtonTitle}>
            Report Property Damage
          </Text>

          <Text style={styles.reportButtonText}>
            Select a room and submit a damage report.
          </Text>
        </TouchableOpacity>

        <Text style={styles.sectionTitle}>How It Works</Text>

        <View style={styles.stepCard}>
          <Text style={styles.stepNumber}>01</Text>

          <View style={styles.stepContent}>
            <Text style={styles.stepTitle}>Select a Room</Text>
            <Text style={styles.stepText}>
              Choose the building and room where the damage occurred.
            </Text>
          </View>
        </View>

        <View style={styles.stepCard}>
          <Text style={styles.stepNumber}>02</Text>

          <View style={styles.stepContent}>
            <Text style={styles.stepTitle}>Describe the Damage</Text>
            <Text style={styles.stepText}>
              Provide the property and a description of the problem.
            </Text>
          </View>
        </View>

        <View style={styles.stepCard}>
          <Text style={styles.stepNumber}>03</Text>

          <View style={styles.stepContent}>
            <Text style={styles.stepTitle}>Submit Report</Text>
            <Text style={styles.stepText}>
              The administration can review and monitor your report.
            </Text>
          </View>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.lighterMaroon,
  },

  header: {
    backgroundColor: COLORS.maroon,
    paddingTop: 55,
    paddingHorizontal: Spacing.xl,
    paddingBottom: Spacing.xl,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-end",
  },

  smallTitle: {
    color: "#EED5DC",
    fontSize: 10,
    fontWeight: "700",
    letterSpacing: 1,
  },

  title: {
    color: COLORS.white,
    fontSize: 25,
    fontWeight: "800",
    marginTop: 3,
  },

  logoutButton: {
    borderWidth: 1,
    borderColor: "#FFFFFF",
    borderRadius: 8,
    paddingVertical: 7,
    paddingHorizontal: 12,
  },

  logoutText: {
    color: COLORS.white,
    fontSize: 12,
    fontWeight: "700",
  },

  content: {
    padding: Spacing.xl,
  },

  welcomeCard: {
    backgroundColor: COLORS.white,
    borderRadius: 14,
    padding: Spacing.lg,
    borderWidth: 1,
    borderColor: COLORS.border,
    marginBottom: Spacing.xl,
  },

  welcomeTitle: {
    color: COLORS.maroon,
    fontSize: 20,
    fontWeight: "800",
  },

  welcomeText: {
    color: COLORS.textSecondary,
    fontSize: 13,
    lineHeight: 20,
    marginTop: 6,
  },

  sectionTitle: {
    color: COLORS.text,
    fontSize: 17,
    fontWeight: "800",
    marginBottom: Spacing.md,
  },

  reportButton: {
    backgroundColor: COLORS.maroon,
    borderRadius: 14,
    padding: Spacing.lg,
    marginBottom: Spacing.xl,
  },

  reportButtonTitle: {
    color: COLORS.white,
    fontSize: 17,
    fontWeight: "800",
  },

  reportButtonText: {
    color: "#F6E9ED",
    fontSize: 12,
    marginTop: 5,
    lineHeight: 18,
  },

  stepCard: {
    backgroundColor: COLORS.white,
    borderRadius: 12,
    padding: Spacing.md,
    marginBottom: Spacing.sm,
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: COLORS.border,
  },

  stepNumber: {
    color: COLORS.maroon,
    fontSize: 16,
    fontWeight: "800",
    width: 45,
  },

  stepContent: {
    flex: 1,
  },

  stepTitle: {
    color: COLORS.text,
    fontSize: 14,
    fontWeight: "700",
  },

  stepText: {
    color: COLORS.textSecondary,
    fontSize: 12,
    marginTop: 3,
    lineHeight: 17,
  },
});