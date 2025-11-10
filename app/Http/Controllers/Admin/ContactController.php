<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Contact;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ContactController extends Controller
{
    public function index()
    {
        $contacts = Contact::orderBy('created_at', 'desc')->get();
        return Inertia::render('admin/contacts/index', ['contacts' => $contacts]);
    }

    public function show(Contact $contact)
    {
        $contact->update(['is_read' => true]);
        return Inertia::render('admin/contacts/show', ['contact' => $contact]);
    }

    public function destroy(Contact $contact)
    {
        $contact->delete();
        return back()->with('success', 'Contact deleted successfully!');
    }
}
