import React, { useState } from "react";
import {
  ActivityIndicator,
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
import { router, useLocalSearchParams } from "expo-router";

import { COLORS, Spacing } from "../../constants/theme";
import { apiRequest } from "../../services/api";

export default function ReportDamageScreen() {
  const params = useLocalSearchParams<{
    building?: string;
    buildingName?: string;
    room?: string;
    roomName?: string;
  }>();

  const [selectedBuilding, setSelectedBuilding] = useState(
    typeof params.building === "string" ? params.building : ""
  );
  const [selectedRoom, setSelectedRoom] = useState(
    typeof params.room === "string" ? params.room : ""
  );
  const [selectedBuildingName, setSelectedBuildingName] = useState(
    typeof params.buildingName === "string" ? params.buildingName : ""
  );
  const [selectedRoomName, setSelectedRoomName] = useState(
    typeof params.roomName === "string" ? params.roomName : ""
  );

  const [description, setDescription] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const chooseLocation = () => {
    router.push("/campus-map" as any);
  };

  const handleSubmit = async () => {
    if (!selectedBuilding || !selectedRoom) {
      Alert.alert(
        "Location Required",
        "Please select the building and room where the damage occurred."
      );
      return;
    }

    const cleanDescription = description.trim();

    if (!cleanDescription) {
      Alert.alert(
        "Description Required",
        "Please provide a short description of the damage."
      );
      return;
    }

    setSubmitting(true);

    try {
      await apiRequest("/reports", {
        method: "POST",
        body: JSON.stringify({
          building_name: selectedBuildingName || selectedBuilding,
          room_name: selectedRoomName || selectedRoom,
          description: cleanDescription,
        }),
      });

      Alert.alert(
        "Report Submitted",
        "Your damage report has been submitted successfully.",
        [
          {
            text: "OK",
            onPress: () => router.replace("/user-dashboard" as any),
          },
        ]
      );
    } catch (error) {
      Alert.alert(
        "Submission Failed",
        error instanceof Error
          ? error.message
          : "Could not submit your report. Please try again."
      );
    } finally {
      setSubmitting(false);
    }
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
        <View style={styles.header}>
          <TouchableOpacity
            onPress={() => router.back()}
            style={styles.backButton}
            disabled={submitting}
          >
            <Text style={styles.backText}>‹</Text>
          </TouchableOpacity>

          <View>
            <Text style={styles.headerTitle}>Report Damage</Text>
            <Text style={styles.headerSubtitle}>
              Report a damaged school property
            </Text>
          </View>
        </View>

        <View style={styles.card}>
          <Text style={styles.sectionTitle}>Property Location</Text>

          <Text style={styles.sectionDescription}>
            Select the building and room where the damage occurred.
          </Text>

          <TouchableOpacity
            style={styles.mapButton}
            onPress={chooseLocation}
            activeOpacity={0.8}
            disabled={submitting}
          >
            <Text style={styles.mapButtonText}>
              {selectedBuilding && selectedRoom
                ? "Change Location"
                : "Select Location on Map"}
            </Text>
          </TouchableOpacity>

          {selectedBuilding && selectedRoom ? (
            <View style={styles.selectedLocation}>
              <Text style={styles.selectedLabel}>Selected Location</Text>

              <Text style={styles.selectedLocationText}>
                {selectedBuildingName || selectedBuilding}
              </Text>

              <Text style={styles.selectedRoomText}>
                Room {selectedRoomName || selectedRoom}
              </Text>
            </View>
          ) : (
            <View style={styles.noLocation}>
              <Text style={styles.noLocationText}>
                No location selected yet.
              </Text>
            </View>
          )}
        </View>

        <View style={styles.card}>
          <Text style={styles.sectionTitle}>Damage Description</Text>

          <Text style={styles.sectionDescription}>
            Briefly describe what is damaged.
          </Text>

          <TextInput
            style={styles.descriptionInput}
            placeholder="Example: The window is cracked and cannot close properly."
            placeholderTextColor={COLORS.gray}
            value={description}
            onChangeText={setDescription}
            multiline
            textAlignVertical="top"
            maxLength={500}
            editable={!submitting}
          />

          <Text style={styles.characterCount}>
            {description.length}/500
          </Text>
        </View>

        <TouchableOpacity
          style={[
            styles.submitButton,
            submitting && styles.submitButtonDisabled,
          ]}
          onPress={handleSubmit}
          activeOpacity={0.8}
          disabled={submitting}
        >
          {submitting ? (
            <ActivityIndicator color={COLORS.white} />
          ) : (
            <Text style={styles.submitButtonText}>
              SUBMIT DAMAGE REPORT
            </Text>
          )}
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.cancelButton}
          onPress={() => router.back()}
          disabled={submitting}
        >
          <Text style={styles.cancelButtonText}>Cancel</Text>
        </TouchableOpacity>
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
    padding: Spacing.lg,
    paddingBottom: 40,
  },

  header: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: Spacing.lg,
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

  headerTitle: {
    color: COLORS.maroon,
    fontSize: 22,
    fontWeight: "800",
  },

  headerSubtitle: {
    color: COLORS.textSecondary,
    fontSize: 12,
    marginTop: 3,
  },

  card: {
    backgroundColor: COLORS.white,
    borderRadius: 16,
    padding: Spacing.lg,
    borderWidth: 1,
    borderColor: COLORS.border,
    marginBottom: Spacing.lg,
  },

  sectionTitle: {
    color: COLORS.text,
    fontSize: 17,
    fontWeight: "700",
  },

  sectionDescription: {
    color: COLORS.textSecondary,
    fontSize: 12,
    marginTop: 5,
    marginBottom: Spacing.md,
    lineHeight: 18,
  },

  mapButton: {
    height: 48,
    backgroundColor: COLORS.maroon,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
  },

  mapButtonText: {
    color: COLORS.white,
    fontSize: 13,
    fontWeight: "700",
  },

  selectedLocation: {
    backgroundColor: COLORS.lightMaroon,
    borderRadius: 10,
    padding: Spacing.md,
    marginTop: Spacing.md,
    borderLeftWidth: 4,
    borderLeftColor: COLORS.maroon,
  },

  selectedLabel: {
    color: COLORS.textSecondary,
    fontSize: 11,
    marginBottom: 3,
  },

  selectedLocationText: {
    color: COLORS.maroon,
    fontSize: 16,
    fontWeight: "800",
  },

  selectedRoomText: {
    color: COLORS.text,
    fontSize: 13,
    marginTop: 2,
  },

  noLocation: {
    backgroundColor: "#F7F7F7",
    borderRadius: 10,
    padding: Spacing.md,
    marginTop: Spacing.md,
  },

  noLocationText: {
    color: COLORS.textSecondary,
    fontSize: 12,
    textAlign: "center",
  },

  descriptionInput: {
    minHeight: 130,
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: 10,
    padding: 14,
    color: COLORS.text,
    fontSize: 13,
    backgroundColor: COLORS.white,
  },

  characterCount: {
    color: COLORS.textSecondary,
    fontSize: 10,
    textAlign: "right",
    marginTop: 5,
  },

  submitButton: {
    height: 52,
    backgroundColor: COLORS.maroon,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 12,
  },

  submitButtonDisabled: {
    opacity: 0.7,
  },

  submitButtonText: {
    color: COLORS.white,
    fontSize: 13,
    fontWeight: "800",
  },

  cancelButton: {
    height: 48,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: COLORS.maroon,
    alignItems: "center",
    justifyContent: "center",
  },

  cancelButtonText: {
    color: COLORS.maroon,
    fontSize: 13,
    fontWeight: "700",
  },
});