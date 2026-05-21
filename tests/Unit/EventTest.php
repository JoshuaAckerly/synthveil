<?php

namespace Tests\Unit;

use App\Models\Event;
use Carbon\Carbon;
use Illuminate\Foundation\Testing\RefreshDatabase;
use PHPUnit\Framework\Attributes\Test;
use Tests\TestCase;

class EventTest extends TestCase
{
    use RefreshDatabase;

    #[Test]
    public function it_can_create_an_event(): void
    {
        $event = Event::create([
            'title' => 'Test Event',
            'description' => 'Test description',
            'venue' => 'Test Venue',
            'location' => 'Test City',
            'event_date' => '2024-12-01 20:00:00',
            'price' => 25.50,
            'is_featured' => false,
        ]);

        $this->assertInstanceOf(Event::class, $event);
        $this->assertEquals('Test Event', $event->title);
        $this->assertEquals('Test Venue', $event->venue);
        $this->assertEquals(25.50, $event->price);
        $this->assertFalse($event->is_featured);
    }

    #[Test]
    public function it_casts_event_date_to_datetime(): void
    {
        $event = Event::create([
            'title' => 'Test Event',
            'venue' => 'Test Venue',
            'location' => 'Test City',
            'event_date' => '2024-12-01 20:00:00',
        ]);

        $this->assertInstanceOf(Carbon::class, $event->event_date);
    }

    #[Test]
    public function it_casts_price_to_decimal(): void
    {
        $event = Event::create([
            'title' => 'Test Event',
            'venue' => 'Test Venue',
            'location' => 'Test City',
            'event_date' => '2024-12-01 20:00:00',
            'price' => 25.99,
        ]);

        $this->assertEquals('25.99', $event->price);
    }
}
