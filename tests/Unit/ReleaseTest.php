<?php

namespace Tests\Unit;

use App\Models\Release;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class ReleaseTest extends TestCase
{
    use RefreshDatabase;

    /** @test */
    public function it_can_create_a_release()
    {
        $release = Release::create([
            'title' => 'Test Release',
            'description' => 'Test description',
            'type' => 'single',
            'release_date' => '2024-01-01',
            'is_featured' => true
        ]);

        $this->assertInstanceOf(Release::class, $release);
        $this->assertEquals('Test Release', $release->title);
        $this->assertEquals('single', $release->type);
        $this->assertTrue($release->is_featured);
    }

    /** @test */
    public function it_casts_release_date_to_date()
    {
        $release = Release::create([
            'title' => 'Test Release',
            'type' => 'album',
            'release_date' => '2024-01-01',
        ]);

        $this->assertInstanceOf(\Carbon\Carbon::class, $release->release_date);
    }

    /** @test */
    public function it_casts_streaming_links_to_array()
    {
        $links = ['spotify' => 'https://spotify.com', 'apple' => 'https://apple.com'];
        
        $release = Release::create([
            'title' => 'Test Release',
            'type' => 'ep',
            'release_date' => '2024-01-01',
            'streaming_links' => $links
        ]);

        $this->assertIsArray($release->streaming_links);
        $this->assertEquals($links, $release->streaming_links);
    }
}