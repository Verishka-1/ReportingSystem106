<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\DamageReport;
use App\Support\PushNotifier;
use Illuminate\Http\Request;
use Illuminate\Validation\Rule;

/**
 * Admin-only report review. Route-level "admin" middleware already
 * guarantees $request->user() is an admin, so the controller itself
 * stays focused on the actual work.
 */
class AdminReportController extends Controller
{
    private const STATUS_MESSAGES = [
        'verified' => 'Your report has been accepted and is now being worked on.',
        'rejected' => 'Your report was reviewed and could not be accepted.',
        'completed' => 'Good news! The property you reported has been repaired.',
    ];

    /**
     * GET /api/admin/reports?status=pending&building=Building 1
     */
    public function index(Request $request)
    {
        $validated = $request->validate([
            'status' => ['nullable', 'string'],
            'building' => ['nullable', 'string', 'max:255'],
        ]);

        $reports = DamageReport::query()
            ->when(
                !empty($validated['status']),
                fn ($query) => $query->where('status', $validated['status'])
            )
            ->when(
                !empty($validated['building']),
                fn ($query) => $query->where('building_name', $validated['building'])
            )
            ->with('user:id,name,email')
            ->latest()
            ->get([
                'id',
                'report_number',
                'title',
                'building_name',
                'room_name',
                'status',
                'priority',
                'user_id',
                'created_at',
            ]);

        return response()->json(['data' => $reports]);
    }

    public function show(DamageReport $report)
    {
        return response()->json([
            'data' => $report->load(['user:id,name,email', 'photos', 'repairUpdates.maintenanceUser:id,name']),
        ]);
    }

    /**
     * PATCH /api/admin/reports/{report}
     *
     * Moves a report through: pending -> verified (accepted / in
     * progress) -> completed, or pending -> rejected. Every change is
     * logged as a repair update and the reporting user is notified.
     */
    public function update(Request $request, DamageReport $report)
    {
        $validated = $request->validate([
            'status' => ['required', 'string', Rule::in(array_keys(self::STATUS_MESSAGES))],
            'notes' => ['nullable', 'string', 'max:2000'],
        ]);

        $report->update(['status' => $validated['status']]);

        $report->repairUpdates()->create([
            'maintenance_user_id' => $request->user()->id,
            'status' => $validated['status'] === 'verified' ? 'in_progress' : $validated['status'],
            'notes' => $validated['notes'] ?? null,
        ]);

        if ($report->user) {
            PushNotifier::notify(
                $report->user,
                'Report ' . $report->report_number . ' updated',
                self::STATUS_MESSAGES[$validated['status']],
                'status_updated',
                $report
            );
        }

        return response()->json([
            'message' => 'Report status updated.',
            'data' => $report->fresh()->load('user:id,name,email'),
        ]);
    }
}
