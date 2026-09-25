<?php

namespace App\Http\Controllers\Api;

use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\DB;
use App\Http\Controllers\Controller;


class AdminMapController extends Controller
{
    public function counts(): JsonResponse
    {
        // Keep these keys in sync with CAMPUS_HOTSPOTS in the mobile app.
        $counts = [
            'male-cr1' => 0,
            'female-cr1' => 0,
            'rv1' => 0,
            'physics-lab' => 0,
            'chem-lab' => 0,
            'building1' => 0,
            'female-cr2' => 0,
            'male-cr2' => 0,
            'faculty' => 0,
            'storage-house' => 0,
            'parking-area' => 0,
            'cashier' => 0,
            'meeting-room' => 0,
            'library' => 0,
            'ict-room' => 0,
            'guard-house' => 0,
            'entrance' => 0,
            'courtyard' => 0,
            'drawing-room-1' => 0,
            'drawing-room-2' => 0,
            'building2' => 0,
            'canteen' => 0,
            'radio-house' => 0,
            'male-cr3' => 0,
            'female-cr3' => 0,
            'rv2' => 0,
            'rv3' => 0,
            'rv4' => 0,
            'oldBuilding' => 0,
            'buildingCR' => 0,
        ];

        // Building counts use building_name; facility counts use room_name.
        $buildingIds = [
            'building1' => 'Building 1',
            'building2' => 'Building 2',
            'oldBuilding' => 'Old Building',
            'buildingCR' => 'Building CRs',
        ];

        $facilityIds = [
            'male-cr1' => 'Male CR1',
            'female-cr1' => 'Female CR1',
            'rv1' => 'RV1',
            'physics-lab' => 'Physics Lab',
            'chem-lab' => 'Chem Lab',
            'female-cr2' => 'Female CR2',
            'male-cr2' => 'Male CR2',
            'faculty' => 'Faculty',
            'storage-house' => 'Storage House',
            'parking-area' => 'Parking Area',
            'cashier' => 'Cashier',
            'meeting-room' => 'Meeting Room',
            'library' => 'Library',
            'ict-room' => 'ICT Room',
            'guard-house' => 'Guard House',
            'entrance' => 'Entrance',
            'courtyard' => 'Courtyard',
            'drawing-room-1' => 'Drawing Room 1',
            'drawing-room-2' => 'Drawing Room 2',
            'canteen' => 'Canteen',
            'radio-house' => 'Radio House',
            'male-cr3' => 'Male CR3',
            'female-cr3' => 'Female CR3',
            'rv2' => 'RV2',
            'rv3' => 'RV3',
            'rv4' => 'RV4',
        ];

        $reports = DB::table('damage_reports')
            ->select('building_name', 'room_name')
            ->get();

        foreach ($reports as $report) {
            $buildingName = trim((string) $report->building_name);
            $roomName = trim((string) ($report->room_name ?? ''));

            foreach ($buildingIds as $id => $name) {
                if (strcasecmp($buildingName, $name) === 0) {
                    $counts[$id]++;
                    break;
                }
            }

            foreach ($facilityIds as $id => $name) {
                if ($roomName !== '' && strcasecmp($roomName, $name) === 0) {
                    $counts[$id]++;
                    break;
                }
            }
        }

        return response()->json([
            'counts' => $counts,
        ]);
    }
}