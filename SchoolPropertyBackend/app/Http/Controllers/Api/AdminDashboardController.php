<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\DamageReport;
use Illuminate\Http\Request;

class AdminDashboardController extends Controller
{
    /**
     * Require an authenticated admin account.
     */
    private function ensureAdmin(Request $request): void
    {
        abort_unless(
            $request->user() && $request->user()->role === 'admin',
            403,
            'Unauthorized. Admin access is required.'
        );
    }

    /**
     * GET /api/admin/dashboard
     */
    public function index(Request $request)
    {
        $this->ensureAdmin($request);

        $summary = [
            'total_reports' => DamageReport::count(),
            'pending_review' => DamageReport::where('status', 'pending')->count(),
            'in_progress' => DamageReport::where('status', 'in_progress')->count(),
            'completed' => DamageReport::where('status', 'completed')->count(),
        ];

        $needsReview = DamageReport::query()
            ->where('status', 'pending')
            ->orderByDesc('created_at')
            ->limit(5)
            ->get([
                'id',
                'report_number',
                'property_name',
                'building_id',
                'room_id',
                'description',
                'priority',
                'status',
                'reported_at',
                'created_at',
            ]);

        return response()->json([
            'summary' => $summary,
            'needs_review' => $needsReview,
        ]);
    }

    /**
     * GET /api/admin/campus-counts
     *
     * Returns counts grouped by database building_id.
     */
    public function campusCounts(Request $request)
{
    abort_unless(
        $request->user() && $request->user()->role === 'admin',
        403,
        'Unauthorized. Admin access is required.'
    );

    $counts = DamageReport::query()
        ->selectRaw('building_id, COUNT(*) as report_count')
        ->whereNotNull('building_id')
        ->groupBy('building_id')
        ->get()
        ->mapWithKeys(function ($row) {
            return [
                (string) $row->building_id => (int) $row->report_count,
            ];
        });

    return response()->json([
        'building_counts' => $counts,
    ]);
}
    /**
     * GET /api/admin/building-counts?building_id=1
     *
     * Returns total reports in a building and grouped by room_id.
     */
    public function buildingCounts(Request $request)
    {
        $this->ensureAdmin($request);

        $validated = $request->validate([
            'building_id' => ['required', 'integer'],
        ]);

        $buildingId = (int) $validated['building_id'];

        $query = DamageReport::query()
            ->where('building_id', $buildingId);

        $buildingCount = (clone $query)->count();

        $roomCounts = (clone $query)
            ->whereNotNull('room_id')
            ->selectRaw('room_id, COUNT(*) as report_count')
            ->groupBy('room_id')
            ->get()
            ->mapWithKeys(function ($row) {
                return [
                    (string) $row->room_id => (int) $row->report_count,
                ];
            });

        return response()->json([
            'building_id' => $buildingId,
            'building_count' => $buildingCount,
            'room_counts' => $roomCounts,
        ]);
    }
}