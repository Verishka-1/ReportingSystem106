<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\DamageReport;
use App\Support\PushNotifier;
use Illuminate\Http\Request;
use Illuminate\Support\Str;

class DamageReportController extends Controller
{
    /**
     * POST /api/reports
     *
     * Accepts the description/location fields as normal form data and,
     * optionally, one or more photos as multipart file uploads under
     * the "photos" key (photos[] from the mobile app's camera/gallery
     * picker).
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'building_name' => ['required', 'string', 'max:255'],
            'room_name' => ['nullable', 'string', 'max:255'],
            'description' => ['required', 'string'],
            'photos' => ['nullable', 'array', 'max:5'],
            'photos.*' => ['image', 'max:8192'], // 8 MB per photo
        ]);

        $report = DamageReport::create([
            'report_number' => 'RPT-' . now()->format('Ymd') . '-' . Str::upper(Str::random(6)),
            'user_id' => $request->user()->id,
            'title' => 'Damage report',
            'building_name' => $validated['building_name'],
            'room_name' => $validated['room_name'] ?? null,
            'description' => $validated['description'],
            'status' => 'pending',
            'priority' => 'medium',
        ]);

        foreach ($request->file('photos', []) as $photo) {
            $path = $photo->store('damage-reports', 'public');

            $report->photos()->create(['photo_path' => $path]);
        }

        PushNotifier::notifyAdmins(
            'New damage report',
            sprintf(
                '%s reported an issue at %s%s.',
                $request->user()->name,
                $validated['building_name'],
                $validated['room_name'] ? ' - ' . $validated['room_name'] : ''
            ),
            $report
        );

        return response()->json([
            'message' => 'Report submitted successfully.',
            'report' => $report->load('photos'),
        ], 201);
    }
}
