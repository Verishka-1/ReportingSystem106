<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\DamageReport;
use App\Models\User;
use Illuminate\Http\Request;

class AdminDashboardController extends Controller
{
    /**
     * GET /api/admin/dashboard
     *
     * Summary counts + the newest pending reports, for the admin
     * landing screen.
     */
    public function index(Request $request)
    {
        $summary = [
            'total_reports' => DamageReport::count(),
            'pending_review' => DamageReport::where('status', 'pending')->count(),
            'in_progress' => DamageReport::where('status', 'verified')->count(),
            'completed' => DamageReport::where('status', 'completed')->count(),
            'rejected' => DamageReport::where('status', 'rejected')->count(),
            'total_users' => User::where('role', '!=', 'admin')->count(),
        ];

        $needsReview = DamageReport::query()
            ->where('status', 'pending')
            ->with('user:id,name')
            ->orderByDesc('created_at')
            ->limit(5)
            ->get([
                'id',
                'report_number',
                'title',
                'building_name',
                'room_name',
                'description',
                'priority',
                'status',
                'user_id',
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
     * Report counts grouped by building name, for the campus-wide map.
     */
    public function campusCounts(Request $request)
    {
        $counts = DamageReport::query()
            ->selectRaw('building_name, COUNT(*) as report_count')
            ->whereNotNull('building_name')
            ->groupBy('building_name')
            ->get()
            ->mapWithKeys(fn ($row) => [$row->building_name => (int) $row->report_count]);

        return response()->json([
            'building_counts' => $counts,
        ]);
    }
}
