<?php

namespace Tests\Unit;

use App\Models\Contact;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class ContactTest extends TestCase
{
    use RefreshDatabase;

    /** @test */
    public function it_can_create_a_contact()
    {
        $contact = Contact::create([
            'name' => 'John Doe',
            'email' => 'john@example.com',
            'message' => 'Test message',
            'is_read' => false
        ]);

        $this->assertInstanceOf(Contact::class, $contact);
        $this->assertEquals('John Doe', $contact->name);
        $this->assertEquals('john@example.com', $contact->email);
        $this->assertEquals('Test message', $contact->message);
        $this->assertFalse($contact->is_read);
    }

    /** @test */
    public function it_defaults_is_read_to_false()
    {
        $contact = Contact::create([
            'name' => 'Jane Doe',
            'email' => 'jane@example.com',
            'message' => 'Another test message',
            'is_read' => false
        ]);

        $this->assertFalse($contact->is_read);
    }

    /** @test */
    public function it_casts_is_read_to_boolean()
    {
        $contact = Contact::create([
            'name' => 'Test User',
            'email' => 'test@example.com',
            'message' => 'Test message',
            'is_read' => 1
        ]);

        $this->assertIsBool($contact->is_read);
        $this->assertTrue($contact->is_read);
    }
}