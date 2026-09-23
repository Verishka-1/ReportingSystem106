import React, { useMemo } from "react";
import {
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";

import {
  router,
  useLocalSearchParams,
} from "expo-router";

import { reports } from "../data/rooms";
import { COLORS, Spacing } from "../constants/theme";

export default function AdminRoomReports() {
  const params =
    useLocalSearchParams<{
      building?: string;
      room?: string;
      roomId?: string;
    }>();

  const building =
    typeof params.building === "string"
      ? params.building
      : "";

  const room =
    typeof params.room === "string"
      ? params.room
      : "";

  const roomReports = useMemo(() => {
    return reports.filter((report: any) => {
      return (
        String(report.room)
          .toLowerCase()
          .trim() === room.toLowerCase().trim()
      );
    });
  }, [room]);

  return (
    <View style={styles.container}>
      {/* HEADER */}

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

        <View style={styles.headerText}>
          <Text style={styles.title}>
            {room || "Room"}
          </Text>

          <Text style={styles.subtitle}>
            {building}
          </Text>
        </View>
      </View>

      {/* SUMMARY */}

      <View style={styles.summaryCard}>
        <View style={styles.summaryNumberBox}>
          <Text style={styles.summaryNumber}>
            {roomReports.length}
          </Text>
        </View>

        <View style={styles.summaryInfo}>
          <Text style={styles.summaryTitle}>
            Damage Reports
          </Text>

          <Text style={styles.summarySubtitle}>
            Reports submitted for this room
          </Text>
        </View>
      </View>

      {/* REPORTS */}

      <ScrollView
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        {roomReports.length === 0 ? (
          <View style={styles.emptyCard}>
            <Text style={styles.emptyIcon}>
              ✓
            </Text>

            <Text style={styles.emptyTitle}>
              No Reports
            </Text>

            <Text style={styles.emptyText}>
              There are currently no damage
              reports for this room.
            </Text>
          </View>
        ) : (
          roomReports.map(
            (report: any, index: number) => (
              <View
                key={report.id ?? index}
                style={styles.reportCard}
              >
                <View style={styles.reportHeader}>
                  <Text style={styles.reportId}>
                    {report.id ??
                      `Report ${index + 1}`}
                  </Text>

                  <View
                    style={[
                      styles.statusBadge,
                      getStatusStyle(
                        report.status
                      ),
                    ]}
                  >
                    <Text
                      style={
                        styles.statusText
                      }
                    >
                      {report.status}
                    </Text>
                  </View>
                </View>

                <Text style={styles.property}>
                  {report.property}
                </Text>

                <Text style={styles.description}>
                  {report.description}
                </Text>

                <View style={styles.dateRow}>
                  <Text style={styles.dateLabel}>
                    Reported:
                  </Text>

                  <Text style={styles.date}>
                    {report.date}
                  </Text>
                </View>
              </View>
            )
          )
        )}
      </ScrollView>
    </View>
  );
}

/*
|--------------------------------------------------------------------------
| Status colors
|--------------------------------------------------------------------------
*/

function getStatusStyle(status: string) {
  switch (status) {
    case "Pending":
      return {
        backgroundColor: "#FFF3CD",
      };

    case "Verified":
      return {
        backgroundColor: "#DDEBFF",
      };

    case "For Repair":
      return {
        backgroundColor: "#FFE1C7",
      };

    case "Repaired":
      return {
        backgroundColor: "#DDF5E5",
      };

    default:
      return {
        backgroundColor: "#EEEEEE",
      };
  }
}

/*
|--------------------------------------------------------------------------
| Styles
|--------------------------------------------------------------------------
*/

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

  summaryCard: {
    margin: 16,
    padding: 15,
    borderRadius: 14,
    backgroundColor: COLORS.white,
    flexDirection: "row",
    alignItems: "center",

    elevation: 2,

    shadowColor: "#000",
    shadowOpacity: 0.08,
    shadowRadius: 4,
    shadowOffset: {
      width: 0,
      height: 2,
    },
  },

  summaryNumberBox: {
    width: 55,
    height: 55,
    borderRadius: 13,
    backgroundColor: "#FDECEC",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 13,
  },

  summaryNumber: {
    color: COLORS.maroon,
    fontSize: 23,
    fontWeight: "900",
  },

  summaryInfo: {
    flex: 1,
  },

  summaryTitle: {
    color: COLORS.darkMaroon,
    fontSize: 16,
    fontWeight: "800",
  },

  summarySubtitle: {
    color: COLORS.textSecondary,
    fontSize: 11,
    marginTop: 3,
  },

  content: {
    paddingHorizontal: 16,
    paddingBottom: 30,
  },

  reportCard: {
    backgroundColor: COLORS.white,
    borderRadius: 14,
    padding: 15,
    marginBottom: 12,

    elevation: 1,

    shadowColor: "#000",
    shadowOpacity: 0.06,
    shadowRadius: 3,
    shadowOffset: {
      width: 0,
      height: 1,
    },
  },

  reportHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 10,
  },

  reportId: {
    color: COLORS.textSecondary,
    fontSize: 11,
    fontWeight: "700",
  },

  statusBadge: {
    paddingHorizontal: 9,
    paddingVertical: 5,
    borderRadius: 7,
  },

  statusText: {
    color: COLORS.darkMaroon,
    fontSize: 9,
    fontWeight: "800",
  },

  property: {
    color: COLORS.maroon,
    fontSize: 16,
    fontWeight: "800",
    marginBottom: 5,
  },

  description: {
    color: COLORS.textSecondary,
    fontSize: 12,
    lineHeight: 18,
  },

  dateRow: {
    flexDirection: "row",
    marginTop: 12,
  },

  dateLabel: {
    color: COLORS.textSecondary,
    fontSize: 10,
    fontWeight: "700",
    marginRight: 5,
  },

  date: {
    color: COLORS.textSecondary,
    fontSize: 10,
  },

  emptyCard: {
    backgroundColor: COLORS.white,
    borderRadius: 14,
    padding: 30,
    alignItems: "center",
    marginTop: 5,
  },

  emptyIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: "#DDF5E5",
    textAlign: "center",
    textAlignVertical: "center",
    fontSize: 24,
    color: "#2E7D32",
    marginBottom: 12,
  },

  emptyTitle: {
    color: COLORS.darkMaroon,
    fontSize: 17,
    fontWeight: "800",
  },

  emptyText: {
    color: COLORS.textSecondary,
    fontSize: 12,
    textAlign: "center",
    marginTop: 5,
  },
});