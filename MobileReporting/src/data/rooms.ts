/* =====================================================
   TYPES
===================================================== */

export type Building = {
  id: string;
  name: string;
};

export type Room = {
  id: string;
  name: string;
  buildingId: string;
  building: string;
  floor: string;
};

export type ReportStatus =
  | "Pending"
  | "Verified"
  | "For Repair"
  | "Repaired";

export type Report = {
  id: string;
  roomId: string;
  room: string;
  buildingId: string;
  building: string;
  floor: string;
  property: string;
  description: string;
  status: ReportStatus;
  date: string;
};

/* =====================================================
   BUILDINGS
===================================================== */

export const buildings: Building[] = [
  {
    id: "old",
    name: "Old Building",
  },

  {
    id: "new1",
    name: "New Building 1",
  },

  {
    id: "new2",
    name: "New Building 2",
  },

  {
    id: "cr",
    name: "Building CR",
  },
];

/* =====================================================
   ROOMS
===================================================== */

export const rooms: Room[] = [
  /* ===================================================
     OLD BUILDING
  =================================================== */

  {
    id: "old-302",
    name: "302",
    buildingId: "old",
    building: "Old Building",
    floor: "3rd Floor",
  },

  {
    id: "old-301",
    name: "301",
    buildingId: "old",
    building: "Old Building",
    floor: "3rd Floor",
  },

  {
    id: "old-avr",
    name: "AVR",
    buildingId: "old",
    building: "Old Building",
    floor: "Ground Floor",
  },

  {
    id: "old-comlab-v1",
    name: "COMLAB - V1",
    buildingId: "old",
    building: "Old Building",
    floor: "Ground Floor",
  },

  {
    id: "old-comlab-v3",
    name: "COMLAB - V3",
    buildingId: "old",
    building: "Old Building",
    floor: "Ground Floor",
  },

  {
    id: "old-comlab-v2",
    name: "COMLAB - V2",
    buildingId: "old",
    building: "Old Building",
    floor: "Ground Floor",
  },

  {
    id: "old-engineering-comlab",
    name: "ENGINEERING COMLAB",
    buildingId: "old",
    building: "Old Building",
    floor: "Ground Floor",
  },

  /* ===================================================
     NEW BUILDING 1
  =================================================== */

  {
    id: "new1-r202",
    name: "R-202",
    buildingId: "new1",
    building: "New Building 1",
    floor: "2nd Floor",
  },

  {
    id: "new1-r201",
    name: "R-201",
    buildingId: "new1",
    building: "New Building 1",
    floor: "2nd Floor",
  },

  {
    id: "new1-r203",
    name: "R-203",
    buildingId: "new1",
    building: "New Building 1",
    floor: "2nd Floor",
  },

  {
    id: "new1-r103",
    name: "R-103",
    buildingId: "new1",
    building: "New Building 1",
    floor: "1st Floor",
  },

  {
    id: "new1-r102",
    name: "R-102",
    buildingId: "new1",
    building: "New Building 1",
    floor: "1st Floor",
  },

  {
    id: "new1-r101",
    name: "R-101",
    buildingId: "new1",
    building: "New Building 1",
    floor: "1st Floor",
  },

  {
    id: "new1-r010",
    name: "R-010",
    buildingId: "new1",
    building: "New Building 1",
    floor: "Ground Floor",
  },

  {
    id: "new1-r011",
    name: "R-011",
    buildingId: "new1",
    building: "New Building 1",
    floor: "Ground Floor",
  },

  {
    id: "new1-r012",
    name: "R-012",
    buildingId: "new1",
    building: "New Building 1",
    floor: "Ground Floor",
  },

  /* ===================================================
     NEW BUILDING 2
  =================================================== */

  {
    id: "new2-r213",
    name: "R-213",
    buildingId: "new2",
    building: "New Building 2",
    floor: "2nd Floor",
  },

  {
    id: "new2-r214",
    name: "R-214",
    buildingId: "new2",
    building: "New Building 2",
    floor: "2nd Floor",
  },

  {
    id: "new2-r215",
    name: "R-215",
    buildingId: "new2",
    building: "New Building 2",
    floor: "2nd Floor",
  },

  {
    id: "new2-r216",
    name: "R-216",
    buildingId: "new2",
    building: "New Building 2",
    floor: "2nd Floor",
  },

  {
    id: "new2-r217",
    name: "R-217",
    buildingId: "new2",
    building: "New Building 2",
    floor: "2nd Floor",
  },

  {
    id: "new2-r211",
    name: "R-211",
    buildingId: "new2",
    building: "New Building 2",
    floor: "2nd Floor",
  },

  {
    id: "new2-r210",
    name: "R-210",
    buildingId: "new2",
    building: "New Building 2",
    floor: "2nd Floor",
  },

  {
    id: "new2-r209",
    name: "R-209",
    buildingId: "new2",
    building: "New Building 2",
    floor: "2nd Floor",
  },

  {
    id: "new2-r208",
    name: "R-208",
    buildingId: "new2",
    building: "New Building 2",
    floor: "2nd Floor",
  },

  {
    id: "new2-r207",
    name: "R-207",
    buildingId: "new2",
    building: "New Building 2",
    floor: "2nd Floor",
  },

  {
    id: "new2-r101",
    name: "R-101",
    buildingId: "new2",
    building: "New Building 2",
    floor: "1st Floor",
  },

  {
    id: "new2-r102",
    name: "R-102",
    buildingId: "new2",
    building: "New Building 2",
    floor: "1st Floor",
  },

  {
    id: "new2-r103",
    name: "R-103",
    buildingId: "new2",
    building: "New Building 2",
    floor: "1st Floor",
  },

  {
    id: "new2-r104",
    name: "R-104",
    buildingId: "new2",
    building: "New Building 2",
    floor: "1st Floor",
  },

  {
    id: "new2-r105",
    name: "R-105",
    buildingId: "new2",
    building: "New Building 2",
    floor: "1st Floor",
  },

  /* ===================================================
     BUILDING CR
  =================================================== */

  {
    id: "cr-female-3",
    name: "Female CR3",
    buildingId: "cr",
    building: "Building CR",
    floor: "3rd Floor",
  },

  {
    id: "cr-male-3",
    name: "Male CR3",
    buildingId: "cr",
    building: "Building CR",
    floor: "3rd Floor",
  },

  {
    id: "cr-female-2",
    name: "Female CR2",
    buildingId: "cr",
    building: "Building CR",
    floor: "2nd Floor",
  },

  {
    id: "cr-male-2",
    name: "Male CR2",
    buildingId: "cr",
    building: "Building CR",
    floor: "2nd Floor",
  },

  {
    id: "cr-female-1",
    name: "Female CR1",
    buildingId: "cr",
    building: "Building CR",
    floor: "1st Floor",
  },

  {
    id: "cr-male-1",
    name: "Male CR1",
    buildingId: "cr",
    building: "Building CR",
    floor: "1st Floor",
  },
];

/* =====================================================
   SAMPLE REPORTS
===================================================== */

export const reports: Report[] = [
  {
    id: "report-001",
    roomId: "old-302",
    room: "302",
    buildingId: "old",
    building: "Old Building",
    floor: "3rd Floor",
    property: "Ceiling",
    description:
      "There is water leakage from the ceiling.",
    status: "Pending",
    date: "2026-09-05",
  },

  {
    id: "report-002",
    roomId: "old-302",
    room: "302",
    buildingId: "old",
    building: "Old Building",
    floor: "3rd Floor",
    property: "Chair",
    description:
      "One classroom chair is damaged.",
    status: "Verified",
    date: "2026-09-08",
  },

  {
    id: "report-003",
    roomId: "old-302",
    room: "302",
    buildingId: "old",
    building: "Old Building",
    floor: "3rd Floor",
    property: "Window",
    description:
      "Window glass is cracked.",
    status: "For Repair",
    date: "2026-09-10",
  },

  {
    id: "report-004",
    roomId: "new1-r101",
    room: "R-101",
    buildingId: "new1",
    building: "New Building 1",
    floor: "1st Floor",
    property: "Electric Fan",
    description:
      "The electric fan is not functioning properly.",
    status: "Pending",
    date: "2026-09-11",
  },

  {
    id: "report-005",
    roomId: "new2-r208",
    room: "R-208",
    buildingId: "new2",
    building: "New Building 2",
    floor: "2nd Floor",
    property: "Door",
    description:
      "The classroom door lock is damaged.",
    status: "Repaired",
    date: "2026-09-12",
  },

  {
    id: "report-006",
    roomId: "old-comlab-v1",
    room: "COMLAB - V1",
    buildingId: "old",
    building: "Old Building",
    floor: "Ground Floor",
    property: "Computer",
    description:
      "One computer is not turning on.",
    status: "For Repair",
    date: "2026-09-13",
  },

  {
    id: "report-007",
    roomId: "old-302",
    room: "302",
    buildingId: "old",
    building: "Old Building",
    floor: "3rd Floor",
    property: "Light",
    description:
      "One ceiling light is not working.",
    status: "Repaired",
    date: "2026-09-15",
  },
];

/* =====================================================
   ROOM HELPERS
===================================================== */

/**
 * Find one room using its ID.
 */
export const getRoomById = (
  roomId: string
): Room | undefined => {
  return rooms.find(
    (room) => room.id === roomId
  );
};

/**
 * Get all rooms belonging to one building.
 */
export const getRoomsByBuilding = (
  buildingId: string
): Room[] => {
  return rooms.filter(
    (room) => room.buildingId === buildingId
  );
};

/* =====================================================
   REPORT HELPERS
===================================================== */

/**
 * Get all reports belonging to one room.
 */
export const getReportsByRoom = (
  roomId: string
): Report[] => {
  return reports.filter(
    (report) => report.roomId === roomId
  );
};

/**
 * Count reports belonging to one room.
 */
export const getReportCount = (
  roomId: string
): number => {
  return reports.filter(
    (report) => report.roomId === roomId
  ).length;
};

/**
 * Get all reports belonging to one building.
 */
export const getReportsByBuilding = (
  buildingId: string
): Report[] => {
  return reports.filter(
    (report) => report.buildingId === buildingId
  );
};

/**
 * Count reports belonging to one building.
 */
export const getBuildingReportCount = (
  buildingId: string
): number => {
  return reports.filter(
    (report) => report.buildingId === buildingId
  ).length;
};

/* =====================================================
   BUILDING SUMMARY
===================================================== */

/**
 * Get a building together with its report count.
 *
 * Example:
 *
 * {
 *   id: "old",
 *   name: "Old Building",
 *   reportCount: 5
 * }
 */
export const getBuildingReportSummary = () => {
  return buildings.map((building) => ({
    ...building,
    reportCount: getBuildingReportCount(
      building.id
    ),
  }));
};

/* =====================================================
   ROOM SUMMARY
===================================================== */

/**
 * Get all rooms for a building together
 * with their report counts.
 *
 * This is especially useful for the
 * ADMIN MAP.
 */
export const getRoomReportSummary = (
  buildingId: string
) => {
  return getRoomsByBuilding(buildingId).map(
    (room) => ({
      ...room,
      reportCount: getReportCount(room.id),
    })
  );
};

/* =====================================================
   STATUS HELPERS
===================================================== */

/**
 * Count reports with a specific status.
 */
export const getReportCountByStatus = (
  status: ReportStatus
): number => {
  return reports.filter(
    (report) => report.status === status
  ).length;
};

/**
 * Get all status counts.
 */
export const getReportStatusSummary = () => {
  return {
    pending: getReportCountByStatus("Pending"),
    verified: getReportCountByStatus("Verified"),
    forRepair: getReportCountByStatus("For Repair"),
    repaired: getReportCountByStatus("Repaired"),
  };
};