<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\DamageReport;
use Illuminate\Http\Request;

class MyReportsController extends Controller
{
    public function index(Request $request)
    {
        $reports = DamageReport::query()
            ->where('user_id', $request->user()->id)
            ->latest()
            ->get([
                'id',
                'report_number',
                'title',
                'building_name',
                'room_name',
                'status',
                'created_at',
            ]);

        return response()->json([
            'data' => $reports,
        ]);
    }
}