<?php

namespace Tests\Feature\Admin;

use App\Models\Release;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class ReleaseControllerTest extends TestCase
{
    use RefreshDatabase;

    /** @test */
    public function it_can_view_releases_index()
    {
        Release::create([
            'title' => 'Test Release',
            'type' => 'single',
            'release_date' => '2024-01-01'
        ]);

        $response = $this->get('/admin/releases');

        $response->assertStatus(200);
    }

    /** @test */
    public function it_can_create_a_release()
    {
        $data = [
            'title' => 'New Release',
            'description' => 'Test description',
            'type' => 'single',
            'release_date' => '2024-01-01',
            'is_featured' => true
        ];

        $response = $this->post('/admin/releases', $data);

        $response->assertRedirect('/admin/releases');
        $response->assertSessionHas('success', 'Release created successfully!');
        
        $this->assertDatabaseHas('releases', [
            'title' => 'New Release',
            'type' => 'single'
        ]);
    }

    /** @test */
    public function it_validates_release_creation()
    {
        $response = $this->post('/admin/releases', []);

        $response->assertSessionHasErrors(['title', 'type', 'release_date']);
    }

    /** @test */
    public function it_can_delete_a_release()
    {
        $release = Release::create([
            'title' => 'Test Release',
            'type' => 'single',
            'release_date' => '2024-01-01'
        ]);

        $response = $this->delete("/admin/releases/{$release->id}");

        $response->assertRedirect();
        $response->assertSessionHas('success', 'Release deleted successfully!');
        
        $this->assertDatabaseMissing('releases', ['id' => $release->id]);
    }
}