<?php

namespace Tests\Feature;

use App\Models\Event;
use App\Models\Release;
use Illuminate\Foundation\Testing\RefreshDatabase;
use PHPUnit\Framework\Attributes\Test;
use Tests\TestCase;

class PagesTest extends TestCase
{
    use RefreshDatabase;

    #[Test]
    public function it_loads_the_homepage()
    {
        $response = $this->get('/');
        $response->assertStatus(200);
    }

    #[Test]
    public function it_loads_the_about_page()
    {
        $response = $this->get('/about');
        $response->assertStatus(200);
    }

    #[Test]
    public function it_loads_the_music_page_with_releases()
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
    public function it_loads_the_events_page_with_events()
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
    public function it_loads_the_contact_page()
    {
        $response = $this->get('/contact');
        $response->assertStatus(200);
    }

    #[Test]
    public function it_loads_the_admin_dashboard()
    {
        $response = $this->get('/admin');
        $response->assertStatus(200);
    }
}
