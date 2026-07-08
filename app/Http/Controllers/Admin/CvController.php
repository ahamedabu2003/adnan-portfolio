<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Cv;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class CvController extends Controller
{
    public function index()
    {
        $cv = Cv::latest()->first();
        return view('admin.cvs.index', compact('cv'));
    }

    public function create()
    {
        return redirect()->route('admin.cvs.index');
    }

    public function store(Request $request)
    {
        $request->validate([
            'cv_file' => 'required|file|mimes:pdf,doc,docx|max:5120',
        ]);

        // Delete old CV if exists
        $oldCv = Cv::latest()->first();
        if ($oldCv) {
            Storage::disk('public')->delete($oldCv->file_path);
            $oldCv->delete();
        }

        $file = $request->file('cv_file');
        $path = $file->store('cvs', 'public');

        Cv::create([
            'file_path' => $path,
            'original_name' => $file->getClientOriginalName(),
        ]);

        return redirect()->route('admin.cvs.index')->with('success', 'CV uploaded successfully.');
    }

    public function show(Cv $cv)
    {
        return Storage::disk('public')->download($cv->file_path, $cv->original_name);
    }

    public function edit(string $id)
    {
        return redirect()->route('admin.cvs.index');
    }

    public function update(Request $request, string $id)
    {
        return redirect()->route('admin.cvs.index');
    }

    public function destroy(Cv $cv)
    {
        Storage::disk('public')->delete($cv->file_path);
        $cv->delete();
        return redirect()->route('admin.cvs.index')->with('success', 'CV deleted successfully.');
    }
}
