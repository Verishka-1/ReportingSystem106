<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class DamageReport extends Model
{
    protected $fillable = [
    'report_number',
    'user_id',
    'title',
    'building_name',
    'room_name',
    'description',
    'status',
    'priority',
];

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }
}