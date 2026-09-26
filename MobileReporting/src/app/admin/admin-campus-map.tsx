import React, { useCallback, useState } from "react";
import {
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { router, useFocusEffect } from "expo-router";

import AdminInteractiveMap from "../../components/AdminInteractiveMap";
import type { MapHotspot } from "../../components/AdminInteractiveMap";

import { COLORS, Spacing } from "../../constants/theme";
import { apiRequest } from "../../services/api";

const campusMap = require("../../../assets/maps/Campus_Map.png");

/**
 * Replace these example numbers with the real buildings.id values
 * from your Laravel database.
 *
 * The object keys must match the building hotspot IDs below.
 */
const BUILDING_DATABASE_IDS: Record<string, number> = {
  building1: 1,
  building2: 2,
  oldBuilding: 3,
  buildingCR: 4,
};

type PercentageHotspot = {
  id: string;
  name: string;
  x: number;
  y: number;
  width: number;
  height: number;
  type: "building" | "facility";
};

type CampusCountsResponse = {
  building_counts?: Record<string, number | string>;
};

const CAMPUS_HOTSPOTS: PercentageHotspot[] = [
  {
    id: "male-cr1",
    name: "Male CR1",
    x: 516,
    y: 14,
    width: 177,
    height: 83,
    type: "facility",
  },
  {
    id: "female-cr1",
    name: "Female CR1",
    x: 450,
    y: 109,
    width: 165,
    height: 97,
    type: "facility",
  },
  {
    id: "rv1",
    name: "RV1",
    x: 719,
    y: 97,
    width: 128,
    height: 108,
    type: "facility",
  },
  {
    id: "physics-lab",
    name: "Physics Lab",
    x: 866,
    y: 97,
    width: 117,
    height: 108,
    type: "facility",
  },
  {
    id: "chem-lab",
    name: "Chem Lab",
    x: 1008,
    y: 97,
    width: 125,
    height: 108,
    type: "facility",
  },
  {
    id: "building1",
    name: "Building 1",
    x: 1161,
    y: 45,
    width: 479,
    height: 223,
    type: "building",
  },
  {
    id: "female-cr2",
    name: "Female CR2",
    x: 1659,
    y: 48,
    width: 133,
    height: 109,
    type: "facility",
  },
  {
    id: "male-cr2",
    name: "Male CR2",
    x: 1811,
    y: 48,
    width: 133,
    height: 110,
    type: "facility",
  },
  {
    id: "faculty",
    name: "Faculty",
    x: 1764,
    y: 176,
    width: 159,
    height: 286,
    type: "facility",
  },
  {
    id: "storage-house",
    name: "Storage House",
    x: 19,
    y: 220,
    width: 109,
    height: 386,
    type: "facility",
  },
  {
    id: "parking-area",
    name: "Parking Area",
    x: 133,
    y: 273,
    width: 360,
    height: 306,
    type: "facility",
  },
  {
    id: "cashier",
    name: "Cashier",
    x: 518,
    y: 231,
    width: 141,
    height: 126,
    type: "facility",
  },
  {
    id: "meeting-room",
    name: "Meeting Room",
    x: 518,
    y: 376,
    width: 141,
    height: 89,
    type: "facility",
  },
  {
    id: "library",
    name: "Library",
    x: 524,
    y: 484,
    width: 121,
    height: 305,
    type: "facility",
  },
  {
    id: "ict-room",
    name: "ICT Room",
    x: 333,
    y: 608,
    width: 164,
    height: 176,
    type: "facility",
  },
  {
    id: "guard-house",
    name: "Guard House",
    x: 34,
    y: 806,
    width: 205,
    height: 203,
    type: "facility",
  },
  {
    id: "entrance",
    name: "Entrance",
    x: 260,
    y: 830,
    width: 420,
    height: 100,
    type: "facility",
  },
  {
    id: "courtyard",
    name: "Courtyard",
    x: 1162,
    y: 348,
    width: 326,
    height: 535,
    type: "facility",
  },
  {
    id: "drawing-room-1",
    name: "Drawing Room 1",
    x: 1747,
    y: 482,
    width: 178,
    height: 194,
    type: "facility",
  },
  {
    id: "drawing-room-2",
    name: "Drawing Room 2",
    x: 1747,
    y: 675,
    width: 178,
    height: 195,
    type: "facility",
  },
  {
    id: "building2",
    name: "Building 2",
    x: 1620,
    y: 903,
    width: 316,
    height: 753,
    type: "building",
  },
  {
    id: "canteen",
    name: "Canteen",
    x: 79,
    y: 1183,
    width: 266,
    height: 282,
    type: "facility",
  },
  {
    id: "radio-house",
    name: "Radio House",
    x: 17,
    y: 1753,
    width: 180,
    height: 186,
    type: "facility",
  },
  {
    id: "male-cr3",
    name: "Male CR3",
    x: 260,
    y: 1749,
    width: 106,
    height: 106,
    type: "facility",
  },
  {
    id: "female-cr3",
    name: "Female CR3",
    x: 373,
    y: 1749,
    width: 89,
    height: 106,
    type: "facility",
  },
  {
    id: "rv2",
    name: "RV2",
    x: 475,
    y: 1736,
    width: 151,
    height: 126,
    type: "facility",
  },
  {
    id: "rv3",
    name: "RV3",
    x: 644,
    y: 1736,
    width: 155,
    height: 126,
    type: "facility",
  },
  {
    id: "rv4",
    name: "RV4",
    x: 818,
    y: 1736,
    width: 144,
    height: 126,
    type: "facility",
  },
  {
    id: "oldBuilding",
    name: "Old Building",
    x: 974,
    y: 1603,
    width: 536,
    height: 300,
    type: "building",
  },
  {
    id: "buildingCR",
    name: "Building CRs",
    x: 1520,
    y: 1688,
    width: 313,
    height: 191,
    type: "building",
  },
];

function convertCampusHotspots(): MapHotspot[] {
  return CAMPUS_HOTSPOTS.map((hotspot) => ({
    id: hotspot.id,
    name: hotspot.name,
    type: hotspot.type,
    x: hotspot.x,
    y: hotspot.y,
    width: hotspot.width,
    height: hotspot.height,
  }));
}

export default function AdminCampusMapScreen() {
  const pixelHotspots = convertCampusHotspots();

  const [reportCounts, setReportCounts] = useState<
    Record<string, number>
  >({});
  const [countsLoading, setCountsLoading] = useState(true);
  const [countsError, setCountsError] = useState("");

  /**
   * Fetch campus building report totals from Laravel.
   *
   * Expected API response:
   * {
   *   "building_counts": {
   *     "1": 4,
   *     "2": 2
   *   }
   * }
   *
   * Keys in building_counts are database building IDs.
   */
  const loadReportCounts = useCallback(async () => {
    try {
      setCountsLoading(true);
      setCountsError("");

      const result = (await apiRequest(
        "/admin/campus-counts"
      )) as CampusCountsResponse;

      const databaseCounts = result?.building_counts ?? {};
      const normalizedCounts: Record<string, number> = {};

      // Initialize all map hotspot counts to zero.
      CAMPUS_HOTSPOTS.forEach((hotspot) => {
        normalizedCounts[hotspot.id] = 0;
      });

      // Transfer counts for the main building hotspots using
      // the database IDs configured above.
      Object.entries(BUILDING_DATABASE_IDS).forEach(
        ([hotspotId, databaseId]) => {
          normalizedCounts[hotspotId] = Number(
            databaseCounts[String(databaseId)] ?? 0
          );
        }
      );

      setReportCounts(normalizedCounts);
    } catch (error) {
      console.error(
        "Failed to load campus report counts:",
        error
      );

      setCountsError(
        error instanceof Error
          ? error.message
          : "Could not load report counts. Please try again."
      );

      setReportCounts({});
    } finally {
      setCountsLoading(false);
    }
  }, []);

  // Reload the report counts whenever this screen comes into focus.
  useFocusEffect(
    useCallback(() => {
      loadReportCounts();
    }, [loadReportCounts])
  );

  const handleCampusPress = (hotspot: MapHotspot) => {
    // Main buildings open the detailed building/room map.
    if (
      hotspot.id === "building1" ||
      hotspot.id === "building2" ||
      hotspot.id === "buildingCR" ||
      hotspot.id === "oldBuilding"
    ) {
      router.push({
        pathname: "/admin/admin-building-map",
        params: {
          building: hotspot.id,
        },
      } as any);

      return;
    }

    // Other campus locations open the general location reports screen.
    router.push({
      pathname: "/admin/admin-room-reports",
      params: {
        location: hotspot.name,
        locationId: hotspot.id,
      },
    } as any);
  };

  return (
    <View style={styles.container}>
      {/* HEADER */}
      <View style={styles.header}>
        <Pressable
          onPress={() => router.back()}
          style={styles.backButton}
          hitSlop={8}
          accessibilityRole="button"
          accessibilityLabel="Go back"
        >
          <Text style={styles.backText}>‹</Text>
        </Pressable>

        <View style={styles.headerText}>
          <Text style={styles.title}>
            Campus Damage Map
          </Text>

          <Text style={styles.subtitle}>
            Tap a location to view damage reports
          </Text>
        </View>
      </View>

      {/* MAP */}
      <View style={styles.mapArea}>
        <AdminInteractiveMap
          image={campusMap}
          hotspots={pixelHotspots}
          onPress={handleCampusPress}
          reportCounts={reportCounts}
          debug={false}
        />
      </View>

      {/* FOOTER */}
      <View style={styles.footer}>
        <View style={styles.footerTextContainer}>
          <Text style={styles.footerTitle}>
            Campus Report Counts
          </Text>

          <Text style={styles.footerText}>
            {countsLoading
              ? "Loading report counts…"
              : countsError
                ? countsError
                : "Tap a building to view reports by room."}
          </Text>
        </View>

        <Pressable
          onPress={loadReportCounts}
          style={[
            styles.refreshButton,
            countsLoading && styles.refreshButtonDisabled,
          ]}
          accessibilityRole="button"
          accessibilityLabel="Refresh report counts"
          disabled={countsLoading}
        >
          <Text style={styles.refreshText}>
            {countsLoading ? "…" : "Refresh"}
          </Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.lighterMaroon,
  },

  header: {
    backgroundColor: COLORS.white,
    paddingHorizontal: Spacing.lg,
    paddingTop: 50,
    paddingBottom: Spacing.md,
    flexDirection: "row",
    alignItems: "center",
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },

  backButton: {
    width: 42,
    height: 42,
    borderRadius: 21,
    backgroundColor: COLORS.maroon,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 12,
  },

  backText: {
    color: COLORS.white,
    fontSize: 30,
    lineHeight: 32,
    marginTop: -3,
  },

  headerText: {
    flex: 1,
  },

  title: {
    color: COLORS.maroon,
    fontSize: 20,
    fontWeight: "800",
  },

  subtitle: {
    color: COLORS.textSecondary,
    fontSize: 11,
    marginTop: 2,
  },

  mapArea: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    overflow: "hidden",
  },

  footer: {
    backgroundColor: COLORS.white,
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderTopWidth: 1,
    borderTopColor: COLORS.border,
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },

  footerTextContainer: {
    flex: 1,
  },

  footerTitle: {
    color: COLORS.maroon,
    fontSize: 12,
    fontWeight: "800",
  },

  footerText: {
    color: COLORS.textSecondary,
    fontSize: 10,
    marginTop: 2,
  },

  refreshButton: {
    backgroundColor: COLORS.maroon,
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 8,
  },

  refreshButtonDisabled: {
    opacity: 0.6,
  },

  refreshText: {
    color: COLORS.white,
    fontSize: 11,
    fontWeight: "700",
  },
});