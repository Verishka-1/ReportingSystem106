<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\ComplaintController;
use App\Http\Controllers\Api\AdminReportController;
use App\Http\Controllers\Api\AdminRoomReportController;
use Illuminate\Http\Request;
use App\Http\Controllers\Api\AdminUserController;
use App\Http\Controllers\Api\DamageReportController;
use App\Http\Controllers\Api\ReportHistoryController;
use App\Http\Controllers\Api\LocationController;
use App\Http\Controllers\Api\MyReportsController;
use App\Http\Controllers\Api\ProfileController;
use App\Http\Controllers\Api\AdminMapController;
use App\Http\Controllers\Api\AdminDashboardController;


Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);

Route::middleware('auth:sanctum')->group(function () {
    Route::get('/me', [AuthController::class, 'me']);
    Route::post('/logout', [AuthController::class, 'logout']);
    Route::get('/user', function (\Illuminate\Http\Request $request) {
    return response()->json([
        'data' => $request->user(),
    ]);
});

Route::patch('/user/profile', [ProfileController::class, 'update']);

   Route::middleware('auth:sanctum')->group(function () {
    Route::post('/complaints', [ComplaintController::class, 'store']);
    Route::get('/admin/complaints', [ComplaintController::class, 'index']);
    Route::get('/user', function (Request $request) {
    return response()->json([
        'data' => $request->user(),
    ]);
    
});
});
Route::middleware(['auth:sanctum', 'admin'])->group(function () {
    Route::get('/admin/map/counts',
    [AdminMapController::class, 'counts']);
    Route::get('/admin/map/room-reports', [AdminMapController::class, 'roomReports']);
});
Route::middleware('auth:sanctum')
    ->prefix('admin')
    ->group(function () {
        Route::get('/map/counts', [AdminMapController::class, 'counts']);
        Route::get('/building-map/counts', [
            AdminMapController::class,
            'buildingCounts',
        ]);
    });
Route::middleware('auth:sanctum')->group(function () {
    Route::get('/admin/dashboard', [AdminDashboardController::class, 'index']);
    Route::get('/admin/building-counts', [AdminDashboardController::class, 'buildingCounts']);
});
Route::middleware('auth:sanctum')->get(
    '/admin/campus-counts',
    [AdminDashboardController::class, 'campusCounts']
);

Route::get('/admin/reports/{report}', [AdminReportController::class, 'show']);
Route::patch('/admin/reports/{report}', [AdminReportController::class, 'update']);

Route::get('/admin/reports', [AdminReportController::class, 'index']);
Route::get('/admin/rooms/reports', [AdminRoomReportController::class, 'index']);
Route::get('/me', function (Request $request) {
    return response()->json([
        'user' => $request->user(),
    ]);
});
Route::get('/admin/users', [AdminUserController::class, 'index']);
Route::middleware('auth:sanctum')->post(
    '/reports',
    [DamageReportController::class, 'store']
);
Route::get('/my/reports/history', [ReportHistoryController::class, 'index']);
Route::get('/locations', [LocationController::class, 'index']);
Route::get('/my/reports', [MyReportsController::class, 'index']);
});