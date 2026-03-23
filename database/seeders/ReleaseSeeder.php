<?php

namespace Database\Seeders;

use App\Models\Release;
use Illuminate\Database\Seeder;

class ReleaseSeeder extends Seeder
{
    public function run(): void
    {
        $releases = [
            [
                'title' => 'Ethereal Waves',
                'description' => 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
                'type' => 'album',
                'release_date' => '2024-01-15',
                'is_featured' => true,
            ],
            [
                'title' => 'Midnight Synthesis',
                'description' => 'Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
                'type' => 'single',
                'release_date' => '2024-03-22',
                'is_featured' => false,
            ],
            [
                'title' => 'Ambient Reflections',
                'description' => 'Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.',
                'type' => 'ep',
                'release_date' => '2024-06-10',
                'is_featured' => true,
            ],
            [
                'title' => 'Digital Dreams',
                'description' => 'Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
                'type' => 'single',
                'release_date' => '2024-08-05',
                'is_featured' => false,
            ],
        ];

        foreach ($releases as $release) {
            Release::create($release);
        }
    }
}
