import React from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { router } from "expo-router";

import { reports, rooms } from "../data/rooms";
import { COLORS, Spacing } from "../constants/theme";

export default function AdminDashboardScreen() {
  // -----------------------------------------
  // REPORT STATISTICS
  // -----------------------------------------

  const totalReports = reports.length;

  const pendingReports = reports.filter(
    (report) => report.status === "Pending"
  ).length;

  const verifiedReports = reports.filter(
    (report) => report.status === "Verified"
  ).length;

  const forRepairReports = reports.filter(
    (report) => report.status === "For Repair"
  ).length;

  const repairedReports = reports.filter(
    (report) => report.status === "Repaired"
  ).length;

  // -----------------------------------------
  // DASHBOARD
  // -----------------------------------------

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.scrollContent}
      showsVerticalScrollIndicator={false}
    >
      {/* =====================================
          HEADER
      ===================================== */}

      <View style={styles.header}>
        <View>
          <Text style={styles.smallTitle}>
            SCHOOL PROPERTY
          </Text>

          <Text style={styles.title}>
            Admin Dashboard
          </Text>
        </View>

        <TouchableOpacity
          style={styles.logoutButton}
          onPress={() => router.replace("/")}
          activeOpacity={0.8}
        >
          <Text style={styles.logoutText}>
            Logout
          </Text>
        </TouchableOpacity>
      </View>

      <View style={styles.content}>
        {/* =====================================
            TOTAL REPORTS
        ===================================== */}

        <View style={styles.summaryCard}>
          <Text style={styles.summaryLabel}>
            TOTAL REPORTS
          </Text>

          <Text style={styles.summaryNumber}>
            {totalReports}
          </Text>

          <Text style={styles.summaryText}>
            Reports recorded in the system
          </Text>
        </View>

        {/* =====================================
            REPORT STATUS
        ===================================== */}

        <Text style={styles.sectionTitle}>
          Report Status
        </Text>

        <View style={styles.statsGrid}>
          {/* Pending */}

          <View style={styles.statCard}>
            <Text style={styles.statNumber}>
              {pendingReports}
            </Text>

            <Text style={styles.statLabel}>
              Pending
            </Text>
          </View>

          {/* Verified */}

          <View style={styles.statCard}>
            <Text style={styles.statNumber}>
              {verifiedReports}
            </Text>

            <Text style={styles.statLabel}>
              Verified
            </Text>
          </View>

          {/* For Repair */}

          <View style={styles.statCard}>
            <Text style={styles.statNumber}>
              {forRepairReports}
            </Text>

            <Text style={styles.statLabel}>
              For Repair
            </Text>
          </View>

          {/* Repaired */}

          <View style={styles.statCard}>
            <Text style={styles.statNumber}>
              {repairedReports}
            </Text>

            <Text style={styles.statLabel}>
              Repaired
            </Text>
          </View>
        </View>

        {/* =====================================
            CAMPUS DAMAGE MAP
        ===================================== */}

        <Text style={styles.sectionTitle}>
          Campus Damage Map
        </Text>

        <TouchableOpacity
          style={styles.mapCard}
          activeOpacity={0.85}
          onPress={() =>
            router.push("/admin-campus-map" as any)
          }
        >
          <View style={styles.mapIconContainer}>
            <Text style={styles.mapIcon}>
              🗺
            </Text>
          </View>

          <View style={styles.mapContent}>
            <Text style={styles.mapTitle}>
              View Campus Map
            </Text>

            <Text style={styles.mapText}>
              Monitor damage reports by building and
              room. Tap a building to view the number
              of reports recorded in each room.
            </Text>
          </View>

          <Text style={styles.mapArrow}>
            ›
          </Text>
        </TouchableOpacity>

        {/* =====================================
            QUICK MAP INFORMATION
        ===================================== */}

        <View style={styles.mapInfoCard}>
          <View style={styles.mapInfoItem}>
            <Text style={styles.mapInfoNumber}>
              4
            </Text>

            <Text style={styles.mapInfoLabel}>
              Buildings
            </Text>
          </View>

          <View style={styles.mapInfoDivider} />

          <View style={styles.mapInfoItem}>
            <Text style={styles.mapInfoNumber}>
              {rooms.length}
            </Text>

            <Text style={styles.mapInfoLabel}>
              Rooms
            </Text>
          </View>

          <View style={styles.mapInfoDivider} />

          <View style={styles.mapInfoItem}>
            <Text style={styles.mapInfoNumber}>
              {reports.length}
            </Text>

            <Text style={styles.mapInfoLabel}>
              Reports
            </Text>
          </View>
        </View>

        {/* =====================================
            ROOM REPORTS
        ===================================== */}

        <Text style={styles.sectionTitle}>
          Room Reports
        </Text>

        <TouchableOpacity
          style={styles.actionCard}
          onPress={() =>
            router.push("/admin-room-reports" as any)
          }
          activeOpacity={0.8}
        >
          <View style={styles.actionContent}>
            <Text style={styles.actionTitle}>
              View Room Reports
            </Text>

            <Text style={styles.actionText}>
              View rooms and the number of property
              damage reports recorded for each room.
            </Text>
          </View>

          <Text style={styles.arrow}>
            ›
          </Text>
        </TouchableOpacity>

        {/* =====================================
            SYSTEM OVERVIEW
        ===================================== */}

        <View style={styles.infoCard}>
          <Text style={styles.infoTitle}>
            System Overview
          </Text>

          <Text style={styles.infoText}>
            Total Rooms: {rooms.length}
          </Text>

          <Text style={styles.infoText}>
            Total Buildings: 4
          </Text>

          <Text style={styles.infoText}>
            Total Damage Reports: {reports.length}
          </Text>
        </View>
      </View>
    </ScrollView>
  );
}

// =================================================
// STYLES
// =================================================

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.lighterMaroon,
  },

  scrollContent: {
    paddingBottom: 30,
  },

  // ===============================================
  // HEADER
  // ===============================================

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
    borderColor: COLORS.white,
    borderRadius: 8,
    paddingVertical: 7,
    paddingHorizontal: 12,
  },

  logoutText: {
    color: COLORS.white,
    fontSize: 12,
    fontWeight: "700",
  },

  // ===============================================
  // CONTENT
  // ===============================================

  content: {
    padding: Spacing.xl,
  },

  // ===============================================
  // TOTAL REPORT CARD
  // ===============================================

  summaryCard: {
    backgroundColor: COLORS.white,
    borderRadius: 14,
    padding: Spacing.lg,

    borderWidth: 1,
    borderColor: COLORS.border,

    marginBottom: Spacing.xl,
  },

  summaryLabel: {
    color: COLORS.textSecondary,
    fontSize: 10,
    fontWeight: "700",
    letterSpacing: 1,
  },

  summaryNumber: {
    color: COLORS.maroon,
    fontSize: 38,
    fontWeight: "800",
    marginTop: 3,
  },

  summaryText: {
    color: COLORS.textSecondary,
    fontSize: 12,
  },

  // ===============================================
  // SECTION TITLE
  // ===============================================

  sectionTitle: {
    color: COLORS.text,
    fontSize: 17,
    fontWeight: "800",
    marginBottom: Spacing.md,
  },

  // ===============================================
  // REPORT STATUS
  // ===============================================

  statsGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",

    marginBottom: Spacing.xl,
  },

  statCard: {
    width: "48%",

    backgroundColor: COLORS.white,

    borderRadius: 12,

    padding: Spacing.lg,

    marginBottom: Spacing.sm,

    borderWidth: 1,
    borderColor: COLORS.border,
  },

  statNumber: {
    color: COLORS.maroon,
    fontSize: 25,
    fontWeight: "800",
  },

  statLabel: {
    color: COLORS.textSecondary,
    fontSize: 12,
    marginTop: 3,
  },

  // ===============================================
  // CAMPUS MAP CARD
  // ===============================================

  mapCard: {
    backgroundColor: COLORS.maroon,

    borderRadius: 16,

    padding: Spacing.lg,

    flexDirection: "row",
    alignItems: "center",

    marginBottom: Spacing.md,
  },

  mapIconContainer: {
    width: 50,
    height: 50,

    borderRadius: 25,

    backgroundColor: "rgba(255,255,255,0.15)",

    justifyContent: "center",
    alignItems: "center",

    marginRight: 14,
  },

  mapIcon: {
    fontSize: 25,
  },

  mapContent: {
    flex: 1,
  },

  mapTitle: {
    color: COLORS.white,
    fontSize: 17,
    fontWeight: "800",
  },

  mapText: {
    color: "#F3DDE3",

    fontSize: 12,

    lineHeight: 18,

    marginTop: 5,
  },

  mapArrow: {
    color: COLORS.white,

    fontSize: 32,

    marginLeft: Spacing.md,
  },

  // ===============================================
  // MAP INFORMATION
  // ===============================================

  mapInfoCard: {
    backgroundColor: COLORS.white,

    borderRadius: 14,

    borderWidth: 1,
    borderColor: COLORS.border,

    paddingVertical: 16,

    flexDirection: "row",

    alignItems: "center",

    marginBottom: Spacing.xl,
  },

  mapInfoItem: {
    flex: 1,

    alignItems: "center",
  },

  mapInfoNumber: {
    color: COLORS.maroon,

    fontSize: 21,

    fontWeight: "800",
  },

  mapInfoLabel: {
    color: COLORS.textSecondary,

    fontSize: 11,

    marginTop: 3,
  },

  mapInfoDivider: {
    width: 1,

    height: 35,

    backgroundColor: COLORS.border,
  },

  // ===============================================
  // ROOM REPORTS
  // ===============================================

  actionCard: {
    backgroundColor: COLORS.maroon,

    borderRadius: 14,

    padding: Spacing.lg,

    flexDirection: "row",

    alignItems: "center",

    marginBottom: Spacing.xl,
  },

  actionContent: {
    flex: 1,
  },

  actionTitle: {
    color: COLORS.white,

    fontSize: 16,

    fontWeight: "800",
  },

  actionText: {
    color: "#F3DDE3",

    fontSize: 12,

    lineHeight: 18,

    marginTop: 4,
  },

  arrow: {
    color: COLORS.white,

    fontSize: 30,

    marginLeft: Spacing.md,
  },

  // ===============================================
  // SYSTEM OVERVIEW
  // ===============================================

  infoCard: {
    backgroundColor: COLORS.white,

    borderRadius: 12,

    padding: Spacing.lg,

    borderWidth: 1,
    borderColor: COLORS.border,
  },

  infoTitle: {
    color: COLORS.maroon,

    fontSize: 15,

    fontWeight: "800",

    marginBottom: Spacing.sm,
  },

  infoText: {
    color: COLORS.textSecondary,

    fontSize: 13,

    marginBottom: 5,
  },
});