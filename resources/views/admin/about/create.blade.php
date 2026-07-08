@extends('layouts.admin')
@section('page-title', 'Create About')

@section('content')
<div class="admin-card p-6 max-w-2xl">
    <h2 class="text-lg font-semibold text-gray-800 mb-6">Create About Section</h2>

    <form action="{{ route('admin.about.store') }}" method="POST" enctype="multipart/form-data" class="space-y-5">
        @csrf

        <div>
            <label for="title" class="block text-sm font-medium text-gray-700 mb-1">Title</label>
            <input type="text" name="title" id="title" value="{{ old('title') }}" required
                class="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-sm">
            @error('title') <p class="text-red-500 text-xs mt-1">{{ $message }}</p> @enderror
        </div>

        <div>
            <label for="description" class="block text-sm font-medium text-gray-700 mb-1">Description</label>
            <textarea name="description" id="description" rows="5" required
                class="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-sm">{{ old('description') }}</textarea>
            @error('description') <p class="text-red-500 text-xs mt-1">{{ $message }}</p> @enderror
        </div>

        <div>
            <label for="image" class="block text-sm font-medium text-gray-700 mb-1">Profile Image</label>
            <input type="file" name="image" id="image" accept="image/*" required
                class="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-sm">
            @error('image') <p class="text-red-500 text-xs mt-1">{{ $message }}</p> @enderror
        </div>

        <div class="flex items-center gap-3 pt-2">
            <button type="submit" class="inline-flex items-center gap-2 px-5 py-2.5 bg-indigo-600 text-white text-sm font-medium rounded-lg hover:bg-indigo-700 transition-colors">
                <i class='bx bx-save'></i> Save
            </button>
            <a href="{{ route('admin.about.index') }}" class="px-5 py-2.5 text-sm text-gray-600 hover:text-gray-800">Cancel</a>
        </div>
    </form>
</div>
@endsection
