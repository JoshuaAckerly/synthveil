<?php

namespace Database\Seeders;

use App\Models\Contact;
use Illuminate\Database\Seeder;

class ContactSeeder extends Seeder
{
    public function run(): void
    {
        $contacts = [
            [
                'name' => 'Alex Johnson',
                'email' => 'alex@example.com',
                'message' => 'Love your latest album! When is the next tour?',
                'is_read' => true,
            ],
            [
                'name' => 'Sarah Chen',
                'email' => 'sarah.chen@email.com',
                'message' => 'Interested in booking you for our festival. Please contact me.',
                'is_read' => false,
            ],
            [
                'name' => 'Mike Rodriguez',
                'email' => 'mike.r@music.com',
                'message' => 'Your sound design is incredible. Would love to collaborate.',
                'is_read' => true,
            ],
            [
                'name' => 'Emma Thompson',
                'email' => 'emma@synthwave.net',
                'message' => 'Can you share the preset pack from your latest track?',
                'is_read' => false,
            ],
        ];

        foreach ($contacts as $contact) {
            Contact::create($contact);
        }
    }
}
