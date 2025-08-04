<?php

namespace Database\Seeders;

use App\Models\Event;
use Illuminate\Database\Seeder;
use Carbon\Carbon;

class EventSeeder extends Seeder
{
    public function run(): void
    {
        $events = [
            [
                'title' => 'Synth Veil Live at The Observatory',
                'description' => 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation.',
                'venue' => 'The Observatory',
                'location' => 'Los Angeles, CA',
                'event_date' => Carbon::now()->addDays(30)->setTime(20, 0, 0),
                'price' => 25.00,
                'ticket_url' => 'https://example.com/tickets/1',
                'is_featured' => true
            ],
            [
                'title' => 'Ambient Nights Festival',
                'description' => 'Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident.',
                'venue' => 'Brooklyn Steel',
                'location' => 'Brooklyn, NY',
                'event_date' => Carbon::now()->addDays(60)->setTime(19, 30, 0),
                'price' => 35.00,
                'ticket_url' => 'https://example.com/tickets/2',
                'is_featured' => false
            ],
            [
                'title' => 'Modular Synthesis Workshop',
                'description' => 'Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam.',
                'venue' => 'Electronic Music Center',
                'location' => 'Portland, OR',
                'event_date' => Carbon::now()->addDays(90)->setTime(14, 0, 0),
                'price' => 50.00,
                'ticket_url' => 'https://example.com/tickets/3',
                'is_featured' => true
            ]
        ];

        foreach ($events as $event) {
            Event::create($event);
        }
    }
}
