<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Contact;
use Illuminate\Http\RedirectResponse;
use Inertia\Inertia;
use Inertia\Response;

class ContactController extends Controller
{
    public function index(): Response
    {
        $contacts = Contact::orderBy('created_at', 'desc')->get();

        return Inertia::render('admin/contacts/index', ['contacts' => $contacts]);
    }

    public function show(Contact $contact): Response
    {
        $contact->update(['is_read' => true]);

        return Inertia::render('admin/contacts/show', ['contact' => $contact]);
    }

    public function destroy(Contact $contact): RedirectResponse
    {
        $contact->delete();

        return back()->with('success', 'Contact deleted successfully!');
    }
}
