// campusHotspots.ts

export type HotspotType =
  | "building"
  | "room"
  | "facility";

export type CampusHotspot = {
  id: string;
  name: string;

  // Coordinates are based on the ORIGINAL 2000 x 2000 PNG.
  x: number;
  y: number;
  width: number;
  height: number;

  type: HotspotType;

  // Used when the hotspot represents a building
  // that has its own detailed map.
  map?: string;
};

export const CAMPUS_MAP_WIDTH = 2000;
export const CAMPUS_MAP_HEIGHT = 2000;

export const CAMPUS_HOTSPOTS: CampusHotspot[] = [
  // =========================================================
  // BUILDINGS
  // =========================================================

  {
    id: "building1",
    name: "Building 1",
    x: 1188,
    y: 45,
    width: 494,
    height: 232,
    type: "building",
    map: "building1",
  },

  {
    id: "building2",
    name: "Building 2",
    x: 1659,
    y: 926,
    width: 326,
    height: 775,
    type: "building",
    map: "building2",
  },

  {
    id: "old-building",
    name: "Old Building",
    x: 996,
    y: 1640,
    width: 555,
    height: 314,
    type: "building",
    map: "old-building",
  },

  {
    id: "building-cr",
    name: "Building CRs",
    x: 1557,
    y: 1731,
    width: 328,
    height: 195,
    type: "building",
    map: "building-cr",
  },

  // =========================================================
  // TOP-LEFT / MAIN CAMPUS FACILITIES
  // =========================================================

  {
    id: "storage-house",
    name: "Storage House",
    x: 19,
    y: 225,
    width: 111,
    height: 393,
    type: "facility",
  },

  {
    id: "parking-area",
    name: "Parking Area",
    x: 130,
    y: 281,
    width: 378,
    height: 312,
    type: "facility",
  },

  {
    id: "guard-house",
    name: "GuardHouse",
    x: 37,
    y: 827,
    width: 208,
    height: 207,
    type: "facility",
  },

  {
    id: "canteen",
    name: "Canteen",
    x: 82,
    y: 1214,
    width: 275,
    height: 286,
    type: "facility",
  },

  {
    id: "radio-house",
    name: "Radio House",
    x: 18,
    y: 1797,
    width: 188,
    height: 193,
    type: "facility",
  },

  // =========================================================
  // ADMIN / CLASSROOM FACILITIES
  // =========================================================

  {
    id: "cashier",
    name: "Cashier",
    x: 530,
    y: 237,
    width: 141,
    height: 129,
    type: "facility",
  },

  {
    id: "meeting-room",
    name: "Meeting Room",
    x: 530,
    y: 385,
    width: 141,
    height: 93,
    type: "facility",
  },

  {
    id: "library",
    name: "Library",
    x: 538,
    y: 497,
    width: 125,
    height: 313,
    type: "facility",
  },

  {
    id: "ict-room",
    name: "ICT Room",
    x: 342,
    y: 623,
    width: 169,
    height: 181,
    type: "facility",
  },

  {
    id: "physics-lab",
    name: "Physics Lab",
    x: 889,
    y: 103,
    width: 122,
    height: 108,
    type: "facility",
  },

  {
    id: "chem-lab",
    name: "Chem Lab",
    x: 1034,
    y: 103,
    width: 128,
    height: 110,
    type: "facility",
  },

  // =========================================================
  // COURTYARD / RIGHT SIDE
  // =========================================================

  {
    id: "courtyard",
    name: "Courtyard",
    x: 1192,
    y: 358,
    width: 332,
    height: 547,
    type: "facility",
  },

  {
    id: "faculty",
    name: "Faculty",
    x: 1812,
    y: 179,
    width: 164,
    height: 297,
    type: "facility",
  },

  {
    id: "drawing-room-1",
    name: "Drawing Room 1",
    x: 1793,
    y: 497,
    width: 183,
    height: 198,
    type: "room",
  },

  {
    id: "drawing-room-2",
    name: "Drawing Room 2",
    x: 1793,
    y: 695,
    width: 183,
    height: 200,
    type: "room",
  },

  // =========================================================
  // CRs
  // =========================================================

  {
    id: "male-cr1",
    name: "Male CR1",
    x: 530,
    y: 15,
    width: 183,
    height: 86,
    type: "room",
  },

  {
    id: "female-cr1",
    name: "Female CR1",
    x: 463,
    y: 112,
    width: 170,
    height: 101,
    type: "room",
  },

  {
    id: "female-cr2",
    name: "Female CR2",
    x: 1703,
    y: 50,
    width: 136,
    height: 113,
    type: "room",
  },

  {
    id: "male-cr2",
    name: "Male CR2",
    x: 1859,
    y: 49,
    width: 130,
    height: 115,
    type: "room",
  },

  {
    id: "male-cr3",
    name: "Male CR3",
    x: 267,
    y: 1797,
    width: 108,
    height: 109,
    type: "room",
  },

  {
    id: "female-cr3",
    name: "Female CR3",
    x: 384,
    y: 1797,
    width: 92,
    height: 109,
    type: "room",
  },

  // =========================================================
  // RV
  // =========================================================

  {
    id: "rv1",
    name: "RV1",
    x: 738,
    y: 100,
    width: 132,
    height: 113,
    type: "room",
  },

  {
    id: "rv2",
    name: "RV2",
    x: 488,
    y: 1782,
    width: 156,
    height: 131,
    type: "room",
  },

  {
    id: "rv3",
    name: "RV3",
    x: 662,
    y: 1782,
    width: 158,
    height: 131,
    type: "room",
  },

  {
    id: "rv4",
    name: "RV4",
    x: 840,
    y: 1782,
    width: 149,
    height: 131,
    type: "room",
  },
];