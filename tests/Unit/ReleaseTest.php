<?php

namespace Tests\Unit;

use App\Models\Release;
use Carbon\Carbon;
use Illuminate\Foundation\Testing\RefreshDatabase;
use PHPUnit\Framework\Attributes\Test;
use Tests\TestCase;

class ReleaseTest extends TestCase
{
    use RefreshDatabase;

    #[Test]
    public function it_can_create_a_release(): void
    {
        $release = Release::create([
            'title' => 'Test Release',
            'description' => 'Test description',
            'type' => 'single',
            'release_date' => '2024-01-01',
            'is_featured' => true,
        ]);

        $this->assertInstanceOf(Release::class, $release);
        $this->assertEquals('Test Release', $release->title);
        $this->assertEquals('single', $release->type);
        $this->assertTrue($release->is_featured);
    }

    #[Test]
    public function it_casts_release_date_to_date(): void
    {
        $release = Release::create([
            'title' => 'Test Release',
            'type' => 'album',
            'release_date' => '2024-01-01',
        ]);

        $this->assertInstanceOf(Carbon::class, $release->release_date);
    }

    #[Test]
    public function it_casts_streaming_links_to_array(): void
    {
        $links = ['spotify' => 'https://spotify.com', 'apple' => 'https://apple.com'];

        $release = Release::create([
            'title' => 'Test Release',
            'type' => 'ep',
            'release_date' => '2024-01-01',
            'streaming_links' => $links,
        ]);

        $this->assertIsArray($release->streaming_links);
        $this->assertEquals($links, $release->streaming_links);
    }
}
