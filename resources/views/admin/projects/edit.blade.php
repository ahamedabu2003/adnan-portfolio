@extends('layouts.admin')
@section('page-title', 'Edit Project')

@section('content')
<div class="admin-card p-6 max-w-2xl">
    <h2 class="text-lg font-semibold text-gray-800 mb-6">Edit Project</h2>

    <form action="{{ route('admin.projects.update', $project) }}" method="POST" enctype="multipart/form-data" class="space-y-5">
        @csrf
        @method('PUT')

        <div>
            <label for="title" class="block text-sm font-medium text-gray-700 mb-1">Project Title</label>
            <input type="text" name="title" id="title" value="{{ old('title', $project->title) }}" required
                class="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-sm">
            @error('title') <p class="text-red-500 text-xs mt-1">{{ $message }}</p> @enderror
        </div>

        <div>
            <label for="technology" class="block text-sm font-medium text-gray-700 mb-1">Technology Stack</label>
            <input type="text" name="technology" id="technology" value="{{ old('technology', $project->technology) }}" required
                class="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-sm">
            @error('technology') <p class="text-red-500 text-xs mt-1">{{ $message }}</p> @enderror
        </div>

        <div>
            <label for="description" class="block text-sm font-medium text-gray-700 mb-1">Description</label>
            <textarea name="description" id="description" rows="4" required
                class="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-sm">{{ old('description', $project->description) }}</textarea>
            @error('description') <p class="text-red-500 text-xs mt-1">{{ $message }}</p> @enderror
        </div>

        <div>
            <label for="image" class="block text-sm font-medium text-gray-700 mb-1">Project Image</label>
            @if($project->image)
                <div class="mb-3">
                    <img src="{{ asset('storage/' . $project->image) }}" alt="{{ $project->title }}" class="w-32 h-24 rounded-lg object-cover">
                    <p class="text-xs text-gray-400 mt-1">Current image — upload new to replace</p>
                </div>
            @endif
            <input type="file" name="image" id="image" accept="image/*"
                class="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-sm">
            @error('image') <p class="text-red-500 text-xs mt-1">{{ $message }}</p> @enderror
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
                <label for="github_link" class="block text-sm font-medium text-gray-700 mb-1">GitHub Link</label>
                <input type="url" name="github_link" id="github_link" value="{{ old('github_link', $project->github_link) }}"
                    class="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-sm">
                @error('github_link') <p class="text-red-500 text-xs mt-1">{{ $message }}</p> @enderror
            </div>
            <div>
                <label for="live_link" class="block text-sm font-medium text-gray-700 mb-1">Live Demo Link</label>
                <input type="url" name="live_link" id="live_link" value="{{ old('live_link', $project->live_link) }}"
                    class="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-sm">
                @error('live_link') <p class="text-red-500 text-xs mt-1">{{ $message }}</p> @enderror
            </div>
        </div>

        <div class="flex items-center gap-3 pt-2">
            <button type="submit" class="inline-flex items-center gap-2 px-5 py-2.5 bg-indigo-600 text-white text-sm font-medium rounded-lg hover:bg-indigo-700 transition-colors">
                <i class='bx bx-save'></i> Update
            </button>
            <a href="{{ route('admin.projects.index') }}" class="px-5 py-2.5 text-sm text-gray-600 hover:text-gray-800">Cancel</a>
        </div>
    </form>
</div>
@endsection
