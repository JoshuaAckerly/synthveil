<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Event;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;

class EventController extends Controller
{
    public function index()
    {
        $events = Event::orderBy('event_date', 'desc')->get();

        return Inertia::render('admin/events/index', ['events' => $events]);
    }

    public function create()
    {
        return Inertia::render('admin/events/create');
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'nullable|string',
            'event_image' => 'nullable|image|max:5120',
            'venue' => 'required|string|max:255',
            'location' => 'required|string|max:255',
            'event_date' => 'required|date',
            'price' => 'nullable|numeric|min:0',
            'ticket_url' => 'nullable|url',
            'is_featured' => 'boolean',
        ]);

        if ($request->hasFile('event_image')) {
            $validated['event_image'] = Storage::disk('s3')->url(
                $request->file('event_image')->store('synthveil/events', 's3')
            );
        }

        Event::create($validated);

        return redirect()->route('admin.events.index')->with('success', 'Event created successfully!');
    }

    public function edit(Event $event)
    {
        return Inertia::render('admin/events/edit', ['event' => $event]);
    }

    public function update(Request $request, Event $event)
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'nullable|string',
            'event_image' => 'nullable|image|max:5120',
            'venue' => 'required|string|max:255',
            'location' => 'required|string|max:255',
            'event_date' => 'required|date',
            'price' => 'nullable|numeric|min:0',
            'ticket_url' => 'nullable|url',
            'is_featured' => 'boolean',
        ]);

        if ($request->hasFile('event_image')) {
            if ($event->event_image) {
                $oldPath = parse_url($event->event_image, PHP_URL_PATH);
                Storage::disk('s3')->delete(ltrim($oldPath, '/'));
            }
            $validated['event_image'] = Storage::disk('s3')->url(
                $request->file('event_image')->store('synthveil/events', 's3')
            );
        } else {
            unset($validated['event_image']);
        }

        $event->update($validated);

        return redirect()->route('admin.events.index')->with('success', 'Event updated successfully!');
    }

    public function destroy(Event $event)
    {
        if ($event->event_image) {
            $oldPath = parse_url($event->event_image, PHP_URL_PATH);
            Storage::disk('s3')->delete(ltrim($oldPath, '/'));
        }

        $event->delete();

        return back()->with('success', 'Event deleted successfully!');
    }
}
