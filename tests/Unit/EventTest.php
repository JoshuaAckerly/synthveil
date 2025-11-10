<?php

namespace Tests\Unit;

use App\Models\Event;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class EventTest extends TestCase
{
    use RefreshDatabase;

    /** @test */
    public function it_can_create_an_event()
    {
        $event = Event::create([
            'title' => 'Test Event',
            'description' => 'Test description',
            'venue' => 'Test Venue',
            'location' => 'Test City',
            'event_date' => '2024-12-01 20:00:00',
            'price' => 25.50,
            'is_featured' => false
        ]);

        $this->assertInstanceOf(Event::class, $event);
        $this->assertEquals('Test Event', $event->title);
        $this->assertEquals('Test Venue', $event->venue);
        $this->assertEquals(25.50, $event->price);
        $this->assertFalse($event->is_featured);
    }

    /** @test */
    public function it_casts_event_date_to_datetime()
    {
        $event = Event::create([
            'title' => 'Test Event',
            'venue' => 'Test Venue',
            'location' => 'Test City',
            'event_date' => '2024-12-01 20:00:00',
        ]);

        $this->assertInstanceOf(\Carbon\Carbon::class, $event->event_date);
    }

    /** @test */
    public function it_casts_price_to_decimal()
    {
        $event = Event::create([
            'title' => 'Test Event',
            'venue' => 'Test Venue',
            'location' => 'Test City',
            'event_date' => '2024-12-01 20:00:00',
            'price' => 25.99
        ]);

        $this->assertEquals('25.99', $event->price);
    }
}