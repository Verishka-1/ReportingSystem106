<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;

class AdminUserController extends Controller
{
    public function index(Request $request)
    {
        abort_unless($request->user()?->role === 'admin', 403);

        $users = User::query()
            ->latest()
            ->get(['id', 'name', 'email', 'role']);

        return response()->json([
            'data' => $users,
        ]);
    }
}