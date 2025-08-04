<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Release;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ReleaseController extends Controller
{
    public function index()
    {
        $releases = Release::orderBy('created_at', 'desc')->get();
        return Inertia::render('admin/releases/index', ['releases' => $releases]);
    }

    public function create()
    {
        return Inertia::render('admin/releases/create');
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'nullable|string',
            'type' => 'required|in:album,single,ep',
            'release_date' => 'required|date',
            'is_featured' => 'boolean'
        ]);

        Release::create($validated);
        return redirect()->route('admin.releases.index')->with('success', 'Release created successfully!');
    }

    public function edit(Release $release)
    {
        return Inertia::render('admin/releases/edit', ['release' => $release]);
    }

    public function update(Request $request, Release $release)
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'nullable|string',
            'type' => 'required|in:album,single,ep',
            'release_date' => 'required|date',
            'is_featured' => 'boolean'
        ]);

        $release->update($validated);
        return redirect()->route('admin.releases.index')->with('success', 'Release updated successfully!');
    }

    public function destroy(Release $release)
    {
        $release->delete();
        return back()->with('success', 'Release deleted successfully!');
    }
}
