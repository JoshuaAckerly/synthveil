<?php

namespace Tests\Feature;

use App\Models\Event;
use App\Models\Release;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use PHPUnit\Framework\Attributes\Test;
use Tests\TestCase;

class PagesTest extends TestCase
{
    use RefreshDatabase;

    #[Test]
    public function it_loads_the_homepage(): void
    {
        $response = $this->get('/');
        $response->assertStatus(200);
    }

    #[Test]
    public function it_loads_the_about_page(): void
    {
        $response = $this->get('/about');
        $response->assertStatus(200);
    }

    #[Test]
    public function it_loads_the_music_page_with_releases(): void
    {
        Release::create([
            'title' => 'Test Release',
            'type' => 'single',
            'release_date' => '2024-01-01',
        ]);

        $response = $this->get('/music');
        $response->assertStatus(200);
    }

    #[Test]
    public function it_loads_the_events_page_with_events(): void
    {
        Event::create([
            'title' => 'Test Event',
            'venue' => 'Test Venue',
            'location' => 'Test City',
            'event_date' => '2025-01-01 20:00:00',
        ]);

        $response = $this->get('/events');
        $response->assertStatus(200);
    }

    #[Test]
    public function it_loads_the_contact_page(): void
    {
        $response = $this->get('/contact');
        $response->assertStatus(200);
    }

    #[Test]
    public function it_loads_the_admin_dashboard(): void
    {
        $user = User::factory()->create();
        $response = $this->actingAs($user)->get('/admin');
        $response->assertStatus(200);
    }
}
