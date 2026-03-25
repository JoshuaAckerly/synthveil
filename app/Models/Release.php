<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Release extends Model
{
    protected $fillable = [
        'title',
        'description',
        'type',
        'release_date',
        'cover_image',
        'streaming_links',
        'is_featured',
    ];

    protected $casts = [
        'release_date' => 'date',
        'streaming_links' => 'array',
        'is_featured' => 'boolean',
    ];
}
