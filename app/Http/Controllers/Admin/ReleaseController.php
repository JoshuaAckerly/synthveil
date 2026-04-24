<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Release;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
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
            'cover_image' => 'nullable|image|max:5120',
            'is_featured' => 'boolean',
        ]);

        if ($request->hasFile('cover_image')) {
            $validated['cover_image'] = Storage::disk('s3')->url(
                $request->file('cover_image')->store('synthveil/releases', 's3')
            );
        }

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
            'cover_image' => 'nullable|image|max:5120',
            'is_featured' => 'boolean',
        ]);

        if ($request->hasFile('cover_image')) {
            if ($release->cover_image) {
                $oldPath = parse_url($release->cover_image, PHP_URL_PATH);
                Storage::disk('s3')->delete(ltrim($oldPath, '/'));
            }
            $validated['cover_image'] = Storage::disk('s3')->url(
                $request->file('cover_image')->store('synthveil/releases', 's3')
            );
        } else {
            unset($validated['cover_image']);
        }

        $release->update($validated);

        return redirect()->route('admin.releases.index')->with('success', 'Release updated successfully!');
    }

    public function destroy(Release $release)
    {
        if ($release->cover_image) {
            $oldPath = parse_url($release->cover_image, PHP_URL_PATH);
            Storage::disk('s3')->delete(ltrim($oldPath, '/'));
        }

        $release->delete();

        return back()->with('success', 'Release deleted successfully!');
    }
}
