<?php

namespace Tests\Feature\Admin;

use App\Models\Release;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use PHPUnit\Framework\Attributes\Test;
use Tests\TestCase;

class ReleaseControllerTest extends TestCase
{
    use RefreshDatabase;

    private User $user;

    protected function setUp(): void
    {
        parent::setUp();
        $this->user = User::factory()->create();
    }

    #[Test]
    public function it_can_view_releases_index(): void
    {
        Release::create([
            'title' => 'Test Release',
            'type' => 'single',
            'release_date' => '2024-01-01',
        ]);

        $response = $this->actingAs($this->user)->get('/admin/releases');

        $response->assertStatus(200);
    }

    #[Test]
    public function it_can_create_a_release(): void
    {
        $data = [
            'title' => 'New Release',
            'description' => 'Test description',
            'type' => 'single',
            'release_date' => '2024-01-01',
            'is_featured' => true,
        ];

        $response = $this->actingAs($this->user)->post('/admin/releases', $data);

        $response->assertRedirect('/admin/releases');
        $response->assertSessionHas('success', 'Release created successfully!');

        $this->assertDatabaseHas('releases', [
            'title' => 'New Release',
            'type' => 'single',
        ]);
    }

    #[Test]
    public function it_validates_release_creation(): void
    {
        $response = $this->actingAs($this->user)->post('/admin/releases', []);

        $response->assertSessionHasErrors(['title', 'type', 'release_date']);
    }

    #[Test]
    public function it_can_delete_a_release(): void
    {
        $release = Release::create([
            'title' => 'Test Release',
            'type' => 'single',
            'release_date' => '2024-01-01',
        ]);

        $response = $this->actingAs($this->user)->delete("/admin/releases/{$release->id}");

        $response->assertRedirect();
        $response->assertSessionHas('success', 'Release deleted successfully!');

        $this->assertDatabaseMissing('releases', ['id' => $release->id]);
    }
}
