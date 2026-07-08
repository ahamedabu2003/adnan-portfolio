@extends('layouts.admin')
@section('page-title', 'Edit Experience')

@section('content')
<div class="admin-card p-6 max-w-2xl">
    <h2 class="text-lg font-semibold text-gray-800 mb-6">Edit Experience</h2>

    <form action="{{ route('admin.experiences.update', $experience) }}" method="POST" class="space-y-5">
        @csrf
        @method('PUT')

        <div>
            <label for="company" class="block text-sm font-medium text-gray-700 mb-1">Company Name</label>
            <input type="text" name="company" id="company" value="{{ old('company', $experience->company) }}" required
                class="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-sm">
            @error('company') <p class="text-red-500 text-xs mt-1">{{ $message }}</p> @enderror
        </div>

        <div>
            <label for="designation" class="block text-sm font-medium text-gray-700 mb-1">Designation / Role</label>
            <input type="text" name="designation" id="designation" value="{{ old('designation', $experience->designation) }}" required
                class="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-sm">
            @error('designation') <p class="text-red-500 text-xs mt-1">{{ $message }}</p> @enderror
        </div>

        <div>
            <label for="duration" class="block text-sm font-medium text-gray-700 mb-1">Duration</label>
            <input type="text" name="duration" id="duration" value="{{ old('duration', $experience->duration) }}" required
                class="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-sm">
            @error('duration') <p class="text-red-500 text-xs mt-1">{{ $message }}</p> @enderror
        </div>

        <div>
            <label for="description" class="block text-sm font-medium text-gray-700 mb-1">Description</label>
            <textarea name="description" id="description" rows="4" required
                class="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-sm">{{ old('description', $experience->description) }}</textarea>
            @error('description') <p class="text-red-500 text-xs mt-1">{{ $message }}</p> @enderror
        </div>

        <div class="flex items-center gap-3 pt-2">
            <button type="submit" class="inline-flex items-center gap-2 px-5 py-2.5 bg-indigo-600 text-white text-sm font-medium rounded-lg hover:bg-indigo-700 transition-colors">
                <i class='bx bx-save'></i> Update
            </button>
            <a href="{{ route('admin.experiences.index') }}" class="px-5 py-2.5 text-sm text-gray-600 hover:text-gray-800">Cancel</a>
        </div>
    </form>
</div>
@endsection
