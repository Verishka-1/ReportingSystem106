// src/app/admin-campus-map.tsx

import React from "react";
import {
  StyleSheet,
  Text,
  View,
} from "react-native";
import { router } from "expo-router";

import AdminInteractiveMap from "../components/AdminInteractiveMap";
import type { MapHotspot } from "../components/AdminInteractiveMap";

// ============================================================
// CAMPUS MAP
// ============================================================

const campusMap = require("../../assets/maps/Campus_Map.png");

// ============================================================
// CAMPUS HOTSPOTS
// ============================================================

const CAMPUS_HOTSPOTS: MapHotspot[] = [
  // ============================================================
  // TOP AREA
  // ============================================================

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

  // ============================================================
  // LEFT / MIDDLE AREA
  // ============================================================

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

  // ============================================================
  // CENTER
  // ============================================================

  {
    id: "courtyard",
    name: "Courtyard",
    x: 1162,
    y: 348,
    width: 326,
    height: 535,
    type: "facility",
  },

  // ============================================================
  // RIGHT AREA
  // ============================================================

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

  // ============================================================
  // LOWER LEFT / CENTER
  // ============================================================

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

  // ============================================================
  // LOWER RIGHT
  // ============================================================

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

// ============================================================
// REPORT COUNTS
// ============================================================
//
// These are temporary test values.
// Later we can replace these with automatic counts from
// your reports data / Laravel API.
//

const reportCounts: Record<string, number> = {
  "male-cr1": 0,
  "female-cr1": 0,
  rv1: 0,
  "physics-lab": 0,
  "chem-lab": 0,

  building1: 3,

  "female-cr2": 0,
  "male-cr2": 0,
  faculty: 0,

  "storage-house": 0,
  "parking-area": 0,
  cashier: 0,
  "meeting-room": 0,
  library: 0,
  "ict-room": 0,
  "guard-house": 0,
  entrance: 0,

  courtyard: 0,

  "drawing-room-1": 0,
  "drawing-room-2": 0,

  building2: 5,

  canteen: 2,
  "radio-house": 0,
  "male-cr3": 0,
  "female-cr3": 0,
  rv2: 3,
  rv3: 1,
  rv4: 0,

  oldBuilding: 7,
  buildingCR: 1,
};

// ============================================================
// ADMIN CAMPUS MAP SCREEN
// ============================================================

export default function AdminCampusMap() {
  // ============================================================
  // HOTSPOT PRESS
  // ============================================================

  const handleLocationPress = (hotspot: MapHotspot) => {
    console.log(
      "ADMIN CAMPUS HOTSPOT:",
      hotspot.id,
      hotspot.name
    );

    // ==========================================================
    // BUILDING 1
    // ==========================================================

    if (hotspot.id === "building1") {
      router.push({
        pathname: "/admin-building-map",
        params: {
          building: "building1",
        },
      } as any);

      return;
    }

    // ==========================================================
    // BUILDING 2
    // ==========================================================

    if (hotspot.id === "building2") {
      router.push({
        pathname: "/admin-building-map",
        params: {
          building: "building2",
        },
      } as any);

      return;
    }

    // ==========================================================
    // OLD BUILDING
    // ==========================================================

    if (hotspot.id === "oldBuilding") {
      router.push({
        pathname: "/admin-building-map",
        params: {
          building: "oldBuilding",
        },
      } as any);

      return;
    }

    // ==========================================================
    // BUILDING CR
    // ==========================================================

    if (hotspot.id === "buildingCR") {
      router.push({
        pathname: "/admin-building-map",
        params: {
          building: "buildingCR",
        },
      } as any);

      return;
    }

    // ==========================================================
    // OTHER CAMPUS LOCATIONS
    // ==========================================================

    console.log(
      "Selected campus location:",
      hotspot.name
    );
  };

  // ============================================================
  // RENDER
  // ============================================================

  return (
    <View style={styles.container}>
      {/* ======================================================
          HEADER
         ====================================================== */}

      <View style={styles.header}>
        <Text style={styles.title}>
          Campus Reports
        </Text>

        <Text style={styles.subtitle}>
          Select a campus location to view reports
        </Text>
      </View>

      {/* ======================================================
          MAP
         ====================================================== */}

      <View style={styles.mapArea}>
        <AdminInteractiveMap
          image={campusMap}
          hotspots={CAMPUS_HOTSPOTS}
          onPress={handleLocationPress}
          reportCounts={reportCounts}
          debug={false}
        />
      </View>
    </View>
  );
}

// ============================================================
// STYLES
// ============================================================

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },

  header: {
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 12,
    backgroundColor: "#FFFFFF",
  },

  title: {
    fontSize: 24,
    fontWeight: "800",
    color: "#800020",
  },

  subtitle: {
    marginTop: 4,
    fontSize: 14,
    color: "#666666",
  },

  mapArea: {
    flex: 1,
    width: "100%",
  },
});