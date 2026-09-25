import React from "react";
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { router } from "expo-router";

import { COLORS, Spacing } from "../../constants/theme";

import InteractiveMap from "../../components/InteractiveMap";

// Use a runtime asset require so TypeScript does not try to resolve the PNG
// as a typed module in this screen file.
const campusMap = require("../../../assets/maps/Campus_Map.png");

import {
  CAMPUS_HOTSPOTS,
  CampusHotspot,
} from "../../data/campusHotspots";

export default function CampusMapScreen() {
  const mapHotspots = CAMPUS_HOTSPOTS.map((hotspot) => ({
    ...hotspot,
    left: hotspot.x,
    top: hotspot.y,
  }));

  const openLocation = (hotspot: CampusHotspot) => {
    if (hotspot.type === "building") {
      router.push({
        pathname: "/building-map",
        params: {
          building: hotspot.id,
          name: hotspot.name,
        },
      } as any);

      return;
    }

    router.push({
      pathname: "/report-damage",
      params: {
        building: hotspot.name,
        room: hotspot.name,
      },
    } as any);
  };

  return (
    <View style={styles.container}>

      {/* HEADER */}
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => router.back()}
          style={styles.backButton}
        >
          <Text style={styles.backText}>‹</Text>
        </TouchableOpacity>

        <View style={styles.headerText}>
          <Text style={styles.title}>
            Select Location
          </Text>

          <Text style={styles.subtitle}>
            Tap the building, room, or facility where the damage occurred
          </Text>
        </View>
      </View>

      {/* MAP */}
      <View style={styles.mapArea}>
        <InteractiveMap
          image={campusMap}
          hotspots={mapHotspots}
          onPress={(hotspot) =>
            openLocation(hotspot as unknown as CampusHotspot)
          }
          debug={false}
        />
      </View>

      {/* FOOTER */}
      <View style={styles.instruction}>
        <Text style={styles.instructionText}>
          Pinch to zoom • Drag to move • Double tap to reset
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
    marginTop: 3,
  },

  mapArea: {
    flex: 1,
    overflow: "hidden",
  },

  instruction: {
    backgroundColor: COLORS.white,

    paddingVertical: 12,
    paddingHorizontal: 16,

    borderTopWidth: 1,
    borderTopColor: COLORS.border,
  },

  instructionText: {
    textAlign: "center",
    color: COLORS.textSecondary,
    fontSize: 12,
  },
});