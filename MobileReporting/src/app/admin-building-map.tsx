import React, { useMemo } from "react";
import {
  Image,
  ImageSourcePropType,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { router } from "expo-router";

import AdminInteractiveMap from "../components/AdminInteractiveMap";
import type { MapHotspot } from "../components/AdminInteractiveMap";

import { COLORS, Spacing } from "../constants/theme";
import { reports } from "../data/rooms";

const campusMap = require("../../assets/maps/Campus_Map.png");

type PercentageHotspot = {
  id: string;
  name: string;
  x: number;
  y: number;
  width: number;
  height: number;
  type: "building" | "facility";
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
  const resolved = Image.resolveAssetSource(campusMap);

  const imageWidth = resolved?.width ?? 1;
  const imageHeight = resolved?.height ?? 1;

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
  const pixelHotspots = useMemo(
    () => convertCampusHotspots(),
    []
  );

  /*
   * Temporary campus-level count mapping.
   *
   * For buildings, this sums reports from their rooms.
   * Other campus locations currently have 0 until their
   * report/location IDs are connected to the report data.
   */
  const reportCounts = useMemo(() => {
    const counts: Record<string, number> = {};

    CAMPUS_HOTSPOTS.forEach((hotspot) => {
      counts[hotspot.id] = 0;
    });

    // Building 1
    counts["building1"] = reports.filter((report) =>
      report.roomId?.startsWith("new1-")
    ).length;

    // Building 2
    counts["building2"] = reports.filter((report) =>
      report.roomId?.startsWith("new2-")
    ).length;

    // Old Building
    counts["oldBuilding"] = reports.filter((report) =>
      report.roomId?.startsWith("old-")
    ).length;

    // Building CR
    counts["buildingCR"] = reports.filter((report) =>
      [
        "female-cr1",
        "male-cr1",
        "female-cr2",
        "male-cr2",
        "female-cr3",
        "male-cr3",
      ].includes(report.roomId)
    ).length;

    return counts;
  }, []);

  const handleCampusPress = (hotspot: MapHotspot) => {
    /*
     * Main buildings open their detailed room map.
     */
    if (
      hotspot.id === "building1" ||
      hotspot.id === "building2" ||
      hotspot.id === "buildingCR" ||
      hotspot.id === "oldBuilding"
    ) {
      router.push({
        pathname: "/admin-building-map",
        params: {
          building: hotspot.id,
        },
      } as any);

      return;
    }

    /*
     * Other campus locations currently open the
     * general room reports screen.
     */
    router.push({
      pathname: "/admin-room-reports",
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
        <Text style={styles.footerTitle}>
          Campus Report Counts
        </Text>

        <Text style={styles.footerText}>
          Tap a building to view reports by room.
        </Text>
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
});