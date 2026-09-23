import React, { useMemo, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Pressable,
  Image,
  ImageSourcePropType,
  SafeAreaView,
  ScrollView,
} from "react-native";
import { useRouter } from "expo-router";

type Room = {
  id: string;
  name: string;
  reportCount: number;
};

type Building = {
  id: string;
  name: string;
  image: ImageSourcePropType;
  rooms: Room[];
};

// ----------------------------------------------------
// TEMPORARY DATA
// Later this will come from Laravel/MySQL
// ----------------------------------------------------

const buildings: Building[] = [
  {
    id: "building1",
    name: "Building 1",
    image: require("../../assets/maps/Building1.png"),
    rooms: [
      { id: "br202", name: "Br202", reportCount: 3 },
      { id: "br201", name: "Br201", reportCount: 0 },
      { id: "br200", name: "Br200", reportCount: 5 },
      { id: "br103", name: "Br103", reportCount: 1 },
      { id: "br102", name: "Br102", reportCount: 0 },
      { id: "br101", name: "Br101", reportCount: 2 },
      { id: "br010", name: "Br010", reportCount: 0 },
      { id: "br011", name: "Br011", reportCount: 4 },
      { id: "br012", name: "Br012", reportCount: 0 },
    ],
  },

  {
    id: "building2",
    name: "Building 2",
    image: require("../../assets/maps/Building2.png"),
    rooms: [
      { id: "br312", name: "Br312", reportCount: 0 },
      { id: "br313", name: "Br313", reportCount: 2 },
      { id: "br314", name: "Br314", reportCount: 5 },
      { id: "br315", name: "Br315", reportCount: 1 },
      { id: "br316", name: "Br316", reportCount: 0 },
      { id: "br317", name: "Br317", reportCount: 3 },
      { id: "br211", name: "Br211", reportCount: 0 },
      { id: "br210", name: "Br210", reportCount: 0 },
      { id: "br209", name: "Br209", reportCount: 2 },
      { id: "br208", name: "Br208", reportCount: 7 },
      { id: "br207", name: "Br207", reportCount: 0 },
      { id: "br206", name: "Br206", reportCount: 1 },
      { id: "br111", name: "Br111", reportCount: 0 },
      { id: "br110", name: "Br110", reportCount: 0 },
      { id: "br109", name: "Br109", reportCount: 4 },
      { id: "br108", name: "Br108", reportCount: 0 },
      { id: "br107", name: "Br107", reportCount: 2 },
      { id: "br106", name: "Br106", reportCount: 0 },
    ],
  },

  {
    id: "buildingCR",
    name: "Building CR",
    image: require("../../assets/maps/BuildingCR.png"),
    rooms: [
      { id: "female-cr3", name: "Female CR3", reportCount: 1 },
      { id: "male-cr3", name: "Male CR3", reportCount: 0 },
      { id: "female-cr2", name: "Female CR2", reportCount: 3 },
      { id: "male-cr2", name: "Male CR2", reportCount: 0 },
      { id: "female-cr1", name: "Female CR1", reportCount: 2 },
      { id: "male-cr1", name: "Male CR1", reportCount: 1 },
    ],
  },

  {
    id: "oldBuilding",
    name: "Old Building",
    image: require("../../assets/maps/Old_Building.png"),
    rooms: [
      { id: "rv302", name: "RV302", reportCount: 0 },
      { id: "rv301", name: "RV301", reportCount: 2 },
      { id: "avr", name: "AVR", reportCount: 5 },
      { id: "comlabv2", name: "ComLabV2", reportCount: 1 },
      { id: "comlabv1", name: "ComLabV1", reportCount: 0 },
      { id: "comlabv3", name: "ComLabV3", reportCount: 3 },
      { id: "electrical-lab", name: "Electrical Lab", reportCount: 0 },
      { id: "engineering-lab", name: "Engineering Lab", reportCount: 4 },
    ],
  },
];

export default function AdminMap() {
  const router = useRouter();

  const [selectedBuilding, setSelectedBuilding] =
    useState<Building | null>(null);

  const buildingReportCounts = useMemo(() => {
    return buildings.map((building) => ({
      ...building,
      reportCount: building.rooms.reduce(
        (total, room) => total + room.reportCount,
        0
      ),
    }));
  }, []);

  const totalReports = buildingReportCounts.reduce(
    (total, building) => total + building.reportCount,
    0
  );

  // ----------------------------------------------------
  // BUILDING LIST
  // ----------------------------------------------------

  if (!selectedBuilding) {
    return (
      <SafeAreaView style={styles.container}>
        <ScrollView contentContainerStyle={styles.content}>
          <View style={styles.header}>
            <Text style={styles.title}>Admin Map</Text>
            <Text style={styles.subtitle}>
              Monitor property damage reports by location
            </Text>
          </View>

          <View style={styles.totalCard}>
            <Text style={styles.totalLabel}>Total Reports</Text>
            <Text style={styles.totalNumber}>{totalReports}</Text>
          </View>

          <Text style={styles.sectionTitle}>Buildings</Text>

          {buildingReportCounts.map((building) => (
            <Pressable
              key={building.id}
              style={styles.buildingCard}
              onPress={() => setSelectedBuilding(building)}
            >
              <Image
                source={building.image}
                style={styles.previewImage}
                resizeMode="cover"
              />

              <View style={styles.buildingInfo}>
                <Text style={styles.buildingName}>
                  {building.name}
                </Text>

                <Text style={styles.roomCount}>
                  {building.rooms.length} rooms
                </Text>
              </View>

              <View
                style={[
                  styles.reportBadge,
                  building.reportCount === 0 &&
                    styles.emptyReportBadge,
                ]}
              >
                <Text
                  style={[
                    styles.reportBadgeText,
                    building.reportCount === 0 &&
                      styles.emptyReportBadgeText,
                  ]}
                >
                  {building.reportCount}
                </Text>

                <Text
                  style={[
                    styles.reportBadgeLabel,
                    building.reportCount === 0 &&
                      styles.emptyReportBadgeText,
                  ]}
                >
                  reports
                </Text>
              </View>
            </Pressable>
          ))}
        </ScrollView>
      </SafeAreaView>
    );
  }

  // ----------------------------------------------------
  // ROOM MAP
  // ----------------------------------------------------

  const building = selectedBuilding;

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.mapHeader}>
        <Pressable
          style={styles.backButton}
          onPress={() => setSelectedBuilding(null)}
        >
          <Text style={styles.backText}>‹</Text>
        </Pressable>

        <View style={styles.mapHeaderInfo}>
          <Text style={styles.mapTitle}>{building.name}</Text>
          <Text style={styles.mapSubtitle}>
            {buildingReportCounts.find(
              (b) => b.id === building.id
            )?.reportCount ?? 0}{" "}
            total reports
          </Text>
        </View>
      </View>

      <View style={styles.mapContainer}>
        <Image
          source={building.image}
          style={styles.mapImage}
          resizeMode="contain"
        />

        {/* ------------------------------------------------
            ROOM REPORT LIST

            This is intentionally a list for now.
            We can place the counts directly on your
            existing hotspot coordinates next.
        ------------------------------------------------- */}

        <View style={styles.roomPanel}>
          <Text style={styles.roomPanelTitle}>
            Room Reports
          </Text>

          <ScrollView>
            {building.rooms.map((room) => (
              <Pressable
                key={room.id}
                style={styles.roomRow}
                onPress={() => {
                  router.push({
                    pathname: "/admin-room-reports",
                    params: {
                      buildingId: building.id,
                      roomId: room.id,
                      roomName: room.name,
                    },
                  } as any);
                }}
              >
                <View>
                  <Text style={styles.roomName}>
                    {room.name}
                  </Text>

                  <Text style={styles.roomStatus}>
                    {room.reportCount === 0
                      ? "No reports"
                      : `${room.reportCount} damage ${
                          room.reportCount === 1
                            ? "report"
                            : "reports"
                        }`}
                  </Text>
                </View>

                <View
                  style={[
                    styles.roomBadge,
                    room.reportCount === 0 &&
                      styles.emptyRoomBadge,
                  ]}
                >
                  <Text
                    style={[
                      styles.roomBadgeText,
                      room.reportCount === 0 &&
                        styles.emptyRoomBadgeText,
                    ]}
                  >
                    {room.reportCount}
                  </Text>
                </View>
              </Pressable>
            ))}
          </ScrollView>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f6f8",
  },

  content: {
    padding: 20,
    paddingBottom: 40,
  },

  header: {
    marginBottom: 20,
  },

  title: {
    fontSize: 30,
    fontWeight: "800",
    color: "#111827",
  },

  subtitle: {
    marginTop: 5,
    fontSize: 15,
    color: "#6b7280",
  },

  totalCard: {
    backgroundColor: "#ffffff",
    borderRadius: 18,
    padding: 20,
    marginBottom: 25,
  },

  totalLabel: {
    fontSize: 14,
    color: "#6b7280",
  },

  totalNumber: {
    fontSize: 38,
    fontWeight: "800",
    marginTop: 4,
    color: "#111827",
  },

  sectionTitle: {
    fontSize: 20,
    fontWeight: "700",
    marginBottom: 12,
    color: "#111827",
  },

  buildingCard: {
    backgroundColor: "#ffffff",
    borderRadius: 18,
    marginBottom: 14,
    padding: 12,
    flexDirection: "row",
    alignItems: "center",
  },

  previewImage: {
    width: 75,
    height: 75,
    borderRadius: 12,
  },

  buildingInfo: {
    flex: 1,
    marginLeft: 14,
  },

  buildingName: {
    fontSize: 17,
    fontWeight: "700",
    color: "#111827",
  },

  roomCount: {
    marginTop: 5,
    color: "#6b7280",
    fontSize: 13,
  },

  reportBadge: {
    minWidth: 62,
    height: 62,
    borderRadius: 31,
    backgroundColor: "#dc2626",
    justifyContent: "center",
    alignItems: "center",
  },

  emptyReportBadge: {
    backgroundColor: "#e5e7eb",
  },

  reportBadgeText: {
    color: "#ffffff",
    fontSize: 19,
    fontWeight: "800",
  },

  reportBadgeLabel: {
    color: "#ffffff",
    fontSize: 9,
    marginTop: 1,
  },

  emptyReportBadgeText: {
    color: "#6b7280",
  },

  mapHeader: {
    height: 75,
    backgroundColor: "#ffffff",
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#e5e7eb",
  },

  backButton: {
    width: 45,
    height: 45,
    justifyContent: "center",
    alignItems: "center",
  },

  backText: {
    fontSize: 38,
    color: "#111827",
  },

  mapHeaderInfo: {
    marginLeft: 5,
  },

  mapTitle: {
    fontSize: 20,
    fontWeight: "800",
    color: "#111827",
  },

  mapSubtitle: {
    fontSize: 13,
    color: "#6b7280",
    marginTop: 2,
  },

  mapContainer: {
    flex: 1,
    position: "relative",
  },

  mapImage: {
    width: "100%",
    height: "100%",
  },

  roomPanel: {
    position: "absolute",
    left: 12,
    right: 12,
    bottom: 12,
    maxHeight: 300,
    backgroundColor: "rgba(255,255,255,0.97)",
    borderRadius: 18,
    padding: 15,
  },

  roomPanelTitle: {
    fontSize: 17,
    fontWeight: "800",
    marginBottom: 8,
    color: "#111827",
  },

  roomRow: {
    minHeight: 58,
    borderBottomWidth: 1,
    borderBottomColor: "#e5e7eb",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },

  roomName: {
    fontSize: 15,
    fontWeight: "700",
    color: "#111827",
  },

  roomStatus: {
    fontSize: 12,
    color: "#6b7280",
    marginTop: 3,
  },

  roomBadge: {
    minWidth: 38,
    height: 38,
    borderRadius: 19,
    backgroundColor: "#dc2626",
    justifyContent: "center",
    alignItems: "center",
  },

  emptyRoomBadge: {
    backgroundColor: "#e5e7eb",
  },

  roomBadgeText: {
    color: "#ffffff",
    fontWeight: "800",
  },

  emptyRoomBadgeText: {
    color: "#6b7280",
  },
});