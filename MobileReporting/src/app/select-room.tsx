import React, { useState } from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { router } from "expo-router";

import RoomCard from "../components/RoomCard";
import {
  buildings,
  getRoomsByBuilding,
} from "../data/rooms";
import { COLORS, Spacing } from "../constants/theme";

export default function SelectRoomScreen() {
  const [selectedBuilding, setSelectedBuilding] = useState("old");

  const filteredRooms = getRoomsByBuilding(selectedBuilding);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}>
          <Text style={styles.back}>‹ Back</Text>
        </TouchableOpacity>

        <View>
          <Text style={styles.title}>Select Room</Text>
          <Text style={styles.subtitle}>
            Where did the damage occur?
          </Text>
        </View>
      </View>

      <ScrollView
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        <Text style={styles.sectionTitle}>Building</Text>

        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.buildingList}
        >
          {buildings.map((building) => {
            const selected = selectedBuilding === building.id;

            return (
              <TouchableOpacity
                key={building.id}
                style={[
                  styles.buildingButton,
                  selected && styles.buildingButtonSelected,
                ]}
                onPress={() => setSelectedBuilding(building.id)}
              >
                <Text
                  style={[
                    styles.buildingText,
                    selected && styles.buildingTextSelected,
                  ]}
                >
                  {building.name}
                </Text>
              </TouchableOpacity>
            );
          })}
        </ScrollView>

        <Text style={styles.sectionTitle}>
          Rooms
        </Text>

        {filteredRooms.map((item) => (
          <RoomCard
            key={item.id}
            room={item}
            onPress={() =>
              router.push({
                pathname: "./report-damage",
                params: {
                  roomId: item.id,
                },
              })
            }
          />
        ))}

        {filteredRooms.length === 0 && (
          <View style={styles.empty}>
            <Text style={styles.emptyText}>
              No rooms found.
            </Text>
          </View>
        )}
      </ScrollView>
    </View>
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
    paddingBottom: Spacing.lg,
  },

  back: {
    color: COLORS.white,
    fontSize: 14,
    fontWeight: "600",
    marginBottom: Spacing.md,
  },

  title: {
    color: COLORS.white,
    fontSize: 25,
    fontWeight: "800",
  },

  subtitle: {
    color: "#F3DDE3",
    fontSize: 12,
    marginTop: 4,
  },

  content: {
    padding: Spacing.xl,
    paddingBottom: 40,
  },

  sectionTitle: {
    color: COLORS.text,
    fontSize: 17,
    fontWeight: "800",
    marginBottom: Spacing.md,
    marginTop: Spacing.sm,
  },

  buildingList: {
    paddingBottom: Spacing.md,
  },

  buildingButton: {
    borderWidth: 1,
    borderColor: COLORS.maroon,
    backgroundColor: COLORS.white,
    paddingVertical: 10,
    paddingHorizontal: 14,
    borderRadius: 10,
    marginRight: Spacing.sm,
  },

  buildingButtonSelected: {
    backgroundColor: COLORS.maroon,
  },

  buildingText: {
    color: COLORS.maroon,
    fontSize: 12,
    fontWeight: "700",
  },

  buildingTextSelected: {
    color: COLORS.white,
  },

  empty: {
    backgroundColor: COLORS.white,
    padding: Spacing.xl,
    borderRadius: 12,
    alignItems: "center",
  },

  emptyText: {
    color: COLORS.textSecondary,
  },
});