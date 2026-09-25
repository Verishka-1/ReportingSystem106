<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\DamageReport;
use Illuminate\Http\Request;
use Illuminate\Support\Str;

class DamageReportController extends Controller
{
    public function store(Request $request)
    {
        $validated = $request->validate([
            'building_name' => ['required', 'string', 'max:255'],
            'room_name' => ['nullable', 'string', 'max:255'],
            'description' => ['required', 'string'],
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

        return response()->json([
            'message' => 'Report submitted successfully.',
            'report' => $report,
        ], 201);
    }
}