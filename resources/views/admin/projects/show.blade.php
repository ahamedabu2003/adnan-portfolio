@extends('layouts.admin')
@section('page-title', $project->title)

@section('content')
<div class="admin-card p-6 max-w-3xl">
    <div class="flex items-center justify-between mb-6">
        <h2 class="text-lg font-semibold text-white">{{ $project->title }}</h2>
        <a href="{{ route('admin.projects.index') }}" class="text-sm text-slate-400 hover:text-white flex items-center gap-1">
            <i class='bx bx-arrow-back'></i> Back
        </a>
    </div>

    @if($project->image)
        <img src="{{ asset('storage/' . $project->image) }}" alt="{{ $project->title }}" class="w-full max-h-72 object-cover rounded-xl mb-6 border border-white/5">
    @endif

    <div class="space-y-4">
        <div>
            <span class="text-xs font-medium stat-badge px-3 py-1 rounded-full">{{ $project->technology }}</span>
        </div>

        <p class="text-slate-300 leading-relaxed">{{ $project->description }}</p>

        <div class="flex items-center gap-4 pt-2">
            @if($project->github_link)
                <a href="{{ $project->github_link }}" target="_blank" class="inline-flex items-center gap-2 text-sm text-slate-400 hover:text-white">
                    <i class='bx bxl-github text-lg'></i> GitHub
                </a>
            @endif
            @if($project->live_link)
                <a href="{{ $project->live_link }}" target="_blank" class="inline-flex items-center gap-2 text-sm text-cyan-400 hover:text-cyan-300">
                    <i class='bx bx-link-external text-lg'></i> Live Demo
                </a>
            @endif
        </div>

        <div class="flex items-center gap-3 pt-4 border-t border-white/5">
            <a href="{{ route('admin.projects.edit', $project) }}" class="inline-flex items-center gap-2 px-4 py-2 btn-primary-theme text-sm font-medium rounded-lg transition-all">
                <i class='bx bx-edit'></i> Edit
            </a>
            <form action="{{ route('admin.projects.destroy', $project) }}" method="POST" onsubmit="return confirm('Delete this project?')">
                @csrf
                @method('DELETE')
                <button type="submit" class="inline-flex items-center gap-2 px-4 py-2 bg-red-650 hover:bg-red-700 text-white text-sm font-medium rounded-lg transition-colors">
                    <i class='bx bx-trash'></i> Delete
                </button>
            </form>
        </div>
    </div>
</div>
@endsection
