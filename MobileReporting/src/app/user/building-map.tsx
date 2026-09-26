import React, { useMemo } from "react";
import {
  Image,
  ImageSourcePropType,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";

import { router, useLocalSearchParams } from "expo-router";

import InteractiveMap, {
  MapHotspot,
} from "../../components/InteractiveMap";

import { COLORS, Spacing } from "../../constants/theme";

/*
|--------------------------------------------------------------------------
| MAP IMAGES
|--------------------------------------------------------------------------
*/

const building1Map = require("../../../assets/maps/Building1.png");
const building2Map = require("../../../assets/maps/Building2.png");
const buildingCRMap = require("../../../assets/maps/BuildingCR.png");
const oldBuildingMap = require("../../../assets/maps/Old_Building.png");
/*
|--------------------------------------------------------------------------
| PERCENTAGE HOTSPOT TYPE
|--------------------------------------------------------------------------
|
| These coordinates represent percentages of the original PNG.
|
| Example:
|
| x: 15
| y: 20
| width: 20
| height: 15
|
| means:
|
| left  = 15%
| top   = 20%
| width = 20%
| height = 15%
|
|--------------------------------------------------------------------------
*/

type PercentageHotspot = {
  id: string;
  name: string;
  x: number;
  y: number;
  width: number;
  height: number;
  type: "building" | "facility" | "room";
};

type BuildingConfig = {
  name: string;
  image: ImageSourcePropType;
  hotspots: PercentageHotspot[];
};

/*
|--------------------------------------------------------------------------
| BUILDING 1
|--------------------------------------------------------------------------
*/

const BUILDING_1_ROOMS: PercentageHotspot[] = [
  // 3rd Floor

  {
    id: "br202",
    name: "Br202",
    x: 15.65,
    y: 15.8,
    width: 21.4,
    height: 14.4,
    type: "room",
  },

  {
    id: "br201",
    name: "Br201",
    x: 41.25,
    y: 15.95,
    width: 20.8,
    height: 14.1,
    type: "room",
  },

  {
    id: "br200",
    name: "Br200",
    x: 65.45,
    y: 15.8,
    width: 21.1,
    height: 14.4,
    type: "room",
  },

  // 2nd Floor

  {
    id: "br103",
    name: "Br103",
    x: 15.65,
    y: 41.9,
    width: 21.4,
    height: 13.5,
    type: "room",
  },

  {
    id: "br102",
    name: "Br102",
    x: 41.25,
    y: 41.9,
    width: 20.8,
    height: 14.1,
    type: "room",
  },

  {
    id: "br101",
    name: "Br101",
    x: 65.45,
    y: 41.9,
    width: 21.1,
    height: 14.4,
    type: "room",
  },

  // 1st Floor

  {
    id: "br010",
    name: "Br010",
    x: 15.65,
    y: 64.85,
    width: 21.4,
    height: 13.5,
    type: "room",
  },

  {
    id: "br011",
    name: "Br011",
    x: 41.25,
    y: 64.25,
    width: 20.8,
    height: 14.1,
    type: "room",
  },

  {
    id: "br012",
    name: "Br012",
    x: 65.45,
    y: 63.95,
    width: 21.1,
    height: 14.4,
    type: "room",
  },
];

/*
|--------------------------------------------------------------------------
| BUILDING 2
|--------------------------------------------------------------------------
*/

const BUILDING_2_ROOMS: PercentageHotspot[] = [
  // 3rd Floor

  {
    id: "br312",
    name: "Br312",
    x: 5.1,
    y: 13.1,
    width: 14.3,
    height: 12.0,
    type: "room",
  },

  {
    id: "br313",
    name: "Br313",
    x: 21.0,
    y: 13.25,
    width: 14.6,
    height: 11.8,
    type: "room",
  },

  {
    id: "br314",
    name: "Br314",
    x: 37.05,
    y: 13.25,
    width: 13.85,
    height: 11.85,
    type: "room",
  },

  {
    id: "br315",
    name: "Br315",
    x: 53.05,
    y: 13.1,
    width: 13.0,
    height: 11.85,
    type: "room",
  },

  {
    id: "br316",
    name: "Br316",
    x: 68.2,
    y: 13.1,
    width: 13.6,
    height: 12.0,
    type: "room",
  },

  {
    id: "br317",
    name: "Br317",
    x: 83.65,
    y: 13.1,
    width: 12.25,
    height: 11.7,
    type: "room",
  },

  // 2nd Floor

  {
    id: "br211",
    name: "Br211",
    x: 5.1,
    y: 38.35,
    width: 14.3,
    height: 11.7,
    type: "room",
  },

  {
    id: "br210",
    name: "Br210",
    x: 21.0,
    y: 38.35,
    width: 14.6,
    height: 11.7,
    type: "room",
  },

  {
    id: "br209",
    name: "Br209",
    x: 37.2,
    y: 38.35,
    width: 13.85,
    height: 11.85,
    type: "room",
  },

  {
    id: "br208",
    name: "Br208",
    x: 52.65,
    y: 38.35,
    width: 13.0,
    height: 11.85,
    type: "room",
  },

  {
    id: "br207",
    name: "Br207",
    x: 68.2,
    y: 38.35,
    width: 13.6,
    height: 11.85,
    type: "room",
  },

  {
    id: "br206",
    name: "Br206",
    x: 83.4,
    y: 38.35,
    width: 12.25,
    height: 11.7,
    type: "room",
  },

  // 1st Floor

  {
    id: "br111",
    name: "Br111",
    x: 5.1,
    y: 63.3,
    width: 14.3,
    height: 11.7,
    type: "room",
  },

  {
    id: "br110",
    name: "Br110",
    x: 21.0,
    y: 63.3,
    width: 14.6,
    height: 11.7,
    type: "room",
  },

  {
    id: "br109",
    name: "Br109",
    x: 37.2,
    y: 63.3,
    width: 13.85,
    height: 11.85,
    type: "room",
  },

  {
    id: "br108",
    name: "Br108",
    x: 52.65,
    y: 63.3,
    width: 13.0,
    height: 11.85,
    type: "room",
  },

  {
    id: "br107",
    name: "Br107",
    x: 68.2,
    y: 63.3,
    width: 13.6,
    height: 11.85,
    type: "room",
  },

  {
    id: "br106",
    name: "Br106",
    x: 83.55,
    y: 63.3,
    width: 12.25,
    height: 11.7,
    type: "room",
  },
];

/*
|--------------------------------------------------------------------------
| BUILDING CR
|--------------------------------------------------------------------------
*/

const BUILDING_CR_ROOMS: PercentageHotspot[] = [
  {
    id: "female-cr3",
    name: "Female CR3",
    x: 21.15,
    y: 18.35,
    width: 28.6,
    height: 14.1,
    type: "room",
  },

  {
    id: "male-cr3",
    name: "Male CR3",
    x: 51.5,
    y: 18.5,
    width: 28.35,
    height: 14.1,
    type: "room",
  },

  {
    id: "female-cr2",
    name: "Female CR2",
    x: 21.15,
    y: 42.8,
    width: 28.6,
    height: 14.1,
    type: "room",
  },

  {
    id: "male-cr2",
    name: "Male CR2",
    x: 51.5,
    y: 42.8,
    width: 28.35,
    height: 14.1,
    type: "room",
  },

  {
    id: "female-cr1",
    name: "Female CR1",
    x: 21.15,
    y: 64.05,
    width: 28.6,
    height: 14.1,
    type: "room",
  },

  {
    id: "male-cr1",
    name: "Male CR1",
    x: 51.5,
    y: 64.05,
    width: 28.35,
    height: 14.1,
    type: "room",
  },
];

/*
|--------------------------------------------------------------------------
| OLD BUILDING
|--------------------------------------------------------------------------
*/

const OLD_BUILDING_ROOMS: PercentageHotspot[] = [
  // 3rd Floor

  {
    id: "rv302",
    name: "RV302",
    x: 10.5,
    y: 19.85,
    width: 25.65,
    height: 15.15,
    type: "room",
  },

  {
    id: "rv301",
    name: "RV301",
    x: 37.95,
    y: 19.85,
    width: 25.4,
    height: 15.15,
    type: "room",
  },

  {
    id: "avr",
    name: "AVR",
    x: 65.35,
    y: 19.85,
    width: 24.65,
    height: 15.6,
    type: "room",
  },

  // 2nd Floor

  {
    id: "comlabv2",
    name: "ComLabV2",
    x: 10.5,
    y: 40.2,
    width: 25.65,
    height: 15.15,
    type: "room",
  },

  {
    id: "comlabv1",
    name: "ComLabV1",
    x: 37.95,
    y: 40.65,
    width: 25.4,
    height: 15.15,
    type: "room",
  },

  {
    id: "comlabv3",
    name: "ComLabV3",
    x: 65.35,
    y: 40.2,
    width: 24.65,
    height: 15.6,
    type: "room",
  },

  // 1st Floor

  {
    id: "electrical-lab",
    name: "Electrical Lab",
    x: 10.5,
    y: 61.45,
    width: 37.8,
    height: 15.15,
    type: "room",
  },

  {
    id: "engineering-lab",
    name: "Engineering Lab",
    x: 50.6,
    y: 61.45,
    width: 39.4,
    height: 15.15,
    type: "room",
  },
];

/*
|--------------------------------------------------------------------------
| BUILDINGS
|--------------------------------------------------------------------------
*/

const BUILDINGS: Record<
  string,
  BuildingConfig
> = {
  building1: {
    name: "Building 1",
    image: building1Map,
    hotspots: BUILDING_1_ROOMS,
  },

  building2: {
    name: "Building 2",
    image: building2Map,
    hotspots: BUILDING_2_ROOMS,
  },

  buildingCR: {
    name: "Building CR",
    image: buildingCRMap,
    hotspots: BUILDING_CR_ROOMS,
  },

  oldBuilding: {
    name: "Old Building",
    image: oldBuildingMap,
    hotspots: OLD_BUILDING_ROOMS,
  },
};

/*
|--------------------------------------------------------------------------
| BUILDING ID NORMALIZER
|--------------------------------------------------------------------------
|
| This lets the screen accept:
|
| building1
| building01
| building2
| building02
| buildingCR
| cr
| oldBuilding
| Old_Building
|
|--------------------------------------------------------------------------
*/

function normalizeBuildingId(
  value?: string
): string | null {
  if (!value) {
    return null;
  }

  const normalized = value
    .toLowerCase()
    .replace(/[\s_-]/g, "");

  switch (normalized) {
    case "building1":
    case "building01":
      return "building1";

    case "building2":
    case "building02":
      return "building2";

    case "buildingcr":
    case "cr":
      return "buildingCR";

    case "oldbuilding":
      return "oldBuilding";

    default:
      return null;
  }
}

/*
|--------------------------------------------------------------------------
| CONVERT PERCENTAGE HOTSPOTS TO PIXEL HOTSPOTS
|--------------------------------------------------------------------------
|
| InteractiveMap expects:
|
| x
| y
| width
| height
|
| in ORIGINAL IMAGE PIXELS.
|
| Our room definitions are easier to maintain as percentages.
|
|--------------------------------------------------------------------------
*/

function convertHotspotsToPixels(
  image: ImageSourcePropType,
  hotspots: PercentageHotspot[]
): MapHotspot[] {
  const resolved =
    Image.resolveAssetSource(image);

  const imageWidth =
    resolved?.width ?? 1;

  const imageHeight =
    resolved?.height ?? 1;

  return hotspots.map((hotspot) => ({
    id: hotspot.id,
    name: hotspot.name,
    type: hotspot.type,

    x:
      (hotspot.x / 100) *
      imageWidth,

    y:
      (hotspot.y / 100) *
      imageHeight,

    width:
      (hotspot.width / 100) *
      imageWidth,

    height:
      (hotspot.height / 100) *
      imageHeight,
  }));
}

/*
|--------------------------------------------------------------------------
| SCREEN
|--------------------------------------------------------------------------
*/

export default function BuildingMapScreen() {
  const params =
    useLocalSearchParams<{
      building?: string;
      name?: string;
    }>();

  /*
   * Normalize whatever the campus map sends.
   */

  const buildingId = normalizeBuildingId(
    typeof params.building === "string"
      ? params.building
      : undefined
  );

  const config = buildingId
    ? BUILDINGS[buildingId]
    : undefined;

  /*
   * Convert the percentage room positions
   * to actual PNG pixel coordinates.
   */

  const pixelHotspots = useMemo(() => {
    if (!config) {
      return [];
    }

    return convertHotspotsToPixels(
      config.image,
      config.hotspots
    );
  }, [config]);

  /*
   * Invalid building.
   */

  if (!config) {
    return (
      <View
        style={styles.errorContainer}
      >
        <Text
          style={styles.errorTitle}
        >
          Building map not found
        </Text>

        <Text
          style={styles.errorMessage}
        >
          The selected building does not
          have a map configured.
        </Text>

        <Pressable
          onPress={() => router.back()}
          style={styles.errorButton}
        >
          <Text
            style={
              styles.errorButtonText
            }
          >
            Go Back
          </Text>
        </Pressable>
      </View>
    );
  }

  /*
   * Room selected.
   */

  const handleRoomPress = (
    hotspot: MapHotspot
  ) => {
    console.log(
      "ROOM SELECTED:",
      config.name,
      hotspot.name
    );

    router.push({
      pathname: "/user/report-damage",

      params: {
        building: config.name,
        room: hotspot.name,
      },
    } as any);
  };

  /*
   * Screen.
   */

  return (
    <View style={styles.container}>
      {/* ==========================================================
          HEADER
         ========================================================== */}

      <View style={styles.header}>
        <Pressable
          onPress={() => router.back()}
          style={styles.backButton}
          hitSlop={8}
        >
          <Text style={styles.backText}>
            ‹
          </Text>
        </Pressable>

        <View
          style={styles.headerText}
        >
          <Text style={styles.title}>
            {config.name}
          </Text>

          <Text
            style={styles.subtitle}
          >
            Tap the room where the
            damage occurred
          </Text>
        </View>
      </View>

      {/* ==========================================================
          MAP
         ========================================================== */}

      <View style={styles.mapArea}>
        <InteractiveMap
          image={config.image}
          hotspots={pixelHotspots}
          onPress={handleRoomPress}

          /*
           * Turn this ON while checking
           * room positions.
           */
          debug={false}
        />
      </View>

      {/* ==========================================================
          FOOTER
         ========================================================== */}

      <View style={styles.footer}>
        <Text
          style={styles.footerText}
        >
          Pinch to zoom • Drag to move
          • Tap a room to continue
        </Text>
      </View>
    </View>
  );
}

/*
|--------------------------------------------------------------------------
| STYLES
|--------------------------------------------------------------------------
*/

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor:
      COLORS.lighterMaroon,
  },

  header: {
    backgroundColor:
      COLORS.white,

    paddingHorizontal:
      Spacing.lg,

    paddingTop: 50,

    paddingBottom:
      Spacing.md,

    flexDirection: "row",

    alignItems: "center",

    borderBottomWidth: 1,

    borderBottomColor:
      COLORS.border,
  },

  backButton: {
    width: 42,
    height: 42,

    borderRadius: 21,

    backgroundColor:
      COLORS.maroon,

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
    color:
      COLORS.textSecondary,

    fontSize: 11,

    marginTop: 2,
  },

  mapArea: {
    flex: 1,

    backgroundColor:
      "#FFFFFF",

    overflow: "hidden",
  },

  footer: {
    backgroundColor:
      COLORS.white,

    paddingVertical: 13,

    paddingHorizontal: 16,

    borderTopWidth: 1,

    borderTopColor:
      COLORS.border,
  },

  footerText: {
    color:
      COLORS.textSecondary,

    textAlign: "center",

    fontSize: 11,
  },

  errorContainer: {
    flex: 1,

    alignItems: "center",

    justifyContent: "center",

    backgroundColor:
      COLORS.lighterMaroon,

    padding: 30,
  },

  errorTitle: {
    color: COLORS.maroon,

    fontSize: 20,

    fontWeight: "800",

    marginBottom: 8,

    textAlign: "center",
  },

  errorMessage: {
    color:
      COLORS.textSecondary,

    fontSize: 13,

    textAlign: "center",

    marginBottom: 24,
  },

  errorButton: {
    backgroundColor:
      COLORS.maroon,

    paddingHorizontal: 24,

    paddingVertical: 12,

    borderRadius: 10,
  },

  errorButtonText: {
    color: COLORS.white,

    fontWeight: "700",

    fontSize: 14,
  },
});