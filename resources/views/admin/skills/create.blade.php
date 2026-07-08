@extends('layouts.admin')
@section('page-title', 'Add Skill')

@section('content')
<div class="admin-card p-6 max-w-2xl">
    <h2 class="text-lg font-semibold text-gray-800 mb-6">Add New Skill</h2>

    <form action="{{ route('admin.skills.store') }}" method="POST" class="space-y-5">
        @csrf

        <div>
            <label for="name" class="block text-sm font-medium text-gray-700 mb-1">Skill Name</label>
            <input type="text" name="name" id="name" value="{{ old('name') }}" required placeholder="e.g. PHP, Laravel, MySQL"
                class="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-sm">
            @error('name') <p class="text-red-500 text-xs mt-1">{{ $message }}</p> @enderror
        </div>

        <div>
            <label for="percentage" class="block text-sm font-medium text-gray-700 mb-1">Proficiency (0-100%)</label>
            <input type="number" name="percentage" id="percentage" value="{{ old('percentage', 80) }}" min="0" max="100" required
                class="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-sm">
            @error('percentage') <p class="text-red-500 text-xs mt-1">{{ $message }}</p> @enderror
        </div>

        <div class="flex items-center gap-3 pt-2">
            <button type="submit" class="inline-flex items-center gap-2 px-5 py-2.5 bg-indigo-600 text-white text-sm font-medium rounded-lg hover:bg-indigo-700 transition-colors">
                <i class='bx bx-save'></i> Save
            </button>
            <a href="{{ route('admin.skills.index') }}" class="px-5 py-2.5 text-sm text-gray-600 hover:text-gray-800">Cancel</a>
        </div>
    </form>
</div>
@endsection
