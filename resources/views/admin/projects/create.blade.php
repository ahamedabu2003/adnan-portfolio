@extends('layouts.admin')
@section('page-title', 'Add Project')

@section('content')
<div class="admin-card p-6 max-w-2xl">
    <h2 class="text-lg font-semibold text-gray-800 mb-6">Add New Project</h2>

    <form action="{{ route('admin.projects.store') }}" method="POST" enctype="multipart/form-data" class="space-y-5">
        @csrf

        <div>
            <label for="title" class="block text-sm font-medium text-gray-700 mb-1">Project Title</label>
            <input type="text" name="title" id="title" value="{{ old('title') }}" required
                class="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-sm">
            @error('title') <p class="text-red-500 text-xs mt-1">{{ $message }}</p> @enderror
        </div>

        <div>
            <label for="technology" class="block text-sm font-medium text-gray-700 mb-1">Technology Stack</label>
            <input type="text" name="technology" id="technology" value="{{ old('technology') }}" required placeholder="e.g. Laravel, MySQL, REST API"
                class="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-sm">
            @error('technology') <p class="text-red-500 text-xs mt-1">{{ $message }}</p> @enderror
        </div>

        <div>
            <label for="description" class="block text-sm font-medium text-gray-700 mb-1">Description</label>
            <textarea name="description" id="description" rows="4" required
                class="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-sm">{{ old('description') }}</textarea>
            @error('description') <p class="text-red-500 text-xs mt-1">{{ $message }}</p> @enderror
        </div>

        <div>
            <label for="image" class="block text-sm font-medium text-gray-700 mb-1">Project Image (optional)</label>
            <input type="file" name="image" id="image" accept="image/*"
                class="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-sm">
            @error('image') <p class="text-red-500 text-xs mt-1">{{ $message }}</p> @enderror
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
                <label for="github_link" class="block text-sm font-medium text-gray-700 mb-1">GitHub Link (optional)</label>
                <input type="url" name="github_link" id="github_link" value="{{ old('github_link') }}" placeholder="https://github.com/..."
                    class="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-sm">
                @error('github_link') <p class="text-red-500 text-xs mt-1">{{ $message }}</p> @enderror
            </div>
            <div>
                <label for="live_link" class="block text-sm font-medium text-gray-700 mb-1">Live Demo Link (optional)</label>
                <input type="url" name="live_link" id="live_link" value="{{ old('live_link') }}" placeholder="https://..."
                    class="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-sm">
                @error('live_link') <p class="text-red-500 text-xs mt-1">{{ $message }}</p> @enderror
            </div>
        </div>

        <div class="flex items-center gap-3 pt-2">
            <button type="submit" class="inline-flex items-center gap-2 px-5 py-2.5 bg-indigo-600 text-white text-sm font-medium rounded-lg hover:bg-indigo-700 transition-colors">
                <i class='bx bx-save'></i> Save
            </button>
            <a href="{{ route('admin.projects.index') }}" class="px-5 py-2.5 text-sm text-gray-600 hover:text-gray-800">Cancel</a>
        </div>
    </form>
</div>
@endsection
