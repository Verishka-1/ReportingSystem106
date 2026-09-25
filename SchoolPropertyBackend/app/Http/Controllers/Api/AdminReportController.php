<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\DamageReport;
use Illuminate\Http\Request;
use Illuminate\Validation\Rule;

class AdminReportController extends Controller
{
    public function show(Request $request, DamageReport $report)
    {
        abort_unless($request->user()->role === 'admin', 403);

        return response()->json([
            'data' => $report->load('user:id,name,email'),
        ]);
    }

    public function update(Request $request, DamageReport $report)
    {
        abort_unless($request->user()->role === 'admin', 403);

        $validated = $request->validate([
            'status' => [
                'required',
                'string',
                Rule::in([
                    'verified',
                    'rejected',
                    'completed',
                ]),
            ],
        ]);

        $report->update([
            'status' => $validated['status'],
        ]);

        return response()->json([
            'message' => 'Report status updated.',
            'data' => $report->fresh()->load('user:id,name,email'),
        ]);
    }
    public function index(Request $request)
{
    abort_unless($request->user()->role === 'admin', 403);

    return response()->json([
        'data' => DamageReport::query()
            ->latest()
            ->get([
                'id',
                'report_number',
                'title',
                'building_name',
                'room_name',
                'status',
            ]),
    ]);
}
}