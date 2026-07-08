<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Experience;
use Illuminate\Http\Request;

class ExperienceController extends Controller
{
    public function index()
    {
        $experiences = Experience::latest()->paginate(10);
        return view('admin.experiences.index', compact('experiences'));
    }

    public function create()
    {
        return view('admin.experiences.create');
    }

    public function store(Request $request)
    {
        $request->validate([
            'company' => 'required|string|max:255',
            'designation' => 'required|string|max:255',
            'duration' => 'required|string|max:255',
            'description' => 'required|string',
        ]);

        Experience::create($request->only('company', 'designation', 'duration', 'description'));

        return redirect()->route('admin.experiences.index')->with('success', 'Experience added successfully.');
    }

    public function show(Experience $experience)
    {
        return redirect()->route('admin.experiences.index');
    }

    public function edit(Experience $experience)
    {
        return view('admin.experiences.edit', compact('experience'));
    }

    public function update(Request $request, Experience $experience)
    {
        $request->validate([
            'company' => 'required|string|max:255',
            'designation' => 'required|string|max:255',
            'duration' => 'required|string|max:255',
            'description' => 'required|string',
        ]);

        $experience->update($request->only('company', 'designation', 'duration', 'description'));

        return redirect()->route('admin.experiences.index')->with('success', 'Experience updated successfully.');
    }

    public function destroy(Experience $experience)
    {
        $experience->delete();
        return redirect()->route('admin.experiences.index')->with('success', 'Experience deleted successfully.');
    }
}
