@extends('layouts.admin')
@section('page-title', 'Projects')

@section('content')
<div class="admin-card p-6">
    <div class="flex items-center justify-between mb-6">
        <h2 class="text-lg font-semibold text-white">Projects</h2>
        <a href="{{ route('admin.projects.create') }}" class="inline-flex items-center gap-2 px-4 py-2 btn-primary-theme text-sm font-medium rounded-lg transition-all">
            <i class='bx bx-plus'></i> Add Project
        </a>
    </div>

    @if($projects->count())
        <div class="overflow-x-auto">
            <table class="w-full text-sm">
                <thead>
                    <tr class="border-b border-white/5">
                        <th class="text-left py-3 px-4 font-medium text-slate-400">#</th>
                        <th class="text-left py-3 px-4 font-medium text-slate-400">Image</th>
                        <th class="text-left py-3 px-4 font-medium text-slate-400">Title</th>
                        <th class="text-left py-3 px-4 font-medium text-slate-400">Technology</th>
                        <th class="text-left py-3 px-4 font-medium text-slate-400">Links</th>
                        <th class="text-right py-3 px-4 font-medium text-slate-400">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    @foreach($projects as $i => $project)
                        <tr class="border-b border-white/5 hover:bg-white/25">
                            <td class="py-3 px-4 text-slate-400">{{ $projects->firstItem() + $i }}</td>
                            <td class="py-3 px-4">
                                @if($project->image)
                                    <img src="{{ asset('storage/' . $project->image) }}" alt="{{ $project->title }}" class="w-12 h-12 rounded-lg object-cover border border-white/5">
                                @else
                                    <div class="w-12 h-12 rounded-lg bg-[#112e42] flex items-center justify-center border border-white/5">
                                        <i class='bx bx-image text-slate-500'></i>
                                    </div>
                                @endif
                            </td>
                            <td class="py-3 px-4 font-medium text-white">{{ $project->title }}</td>
                            <td class="py-3 px-4 text-slate-300">{{ $project->technology }}</td>
                            <td class="py-3 px-4">
                                <div class="flex gap-2">
                                    @if($project->github_link)
                                        <a href="{{ $project->github_link }}" target="_blank" class="text-slate-400 hover:text-white"><i class='bx bxl-github text-lg'></i></a>
                                    @endif
                                    @if($project->live_link)
                                        <a href="{{ $project->live_link }}" target="_blank" class="text-slate-400 hover:text-cyan-400"><i class='bx bx-link-external text-lg'></i></a>
                                    @endif
                                </div>
                            </td>
                            <td class="py-3 px-4 text-right">
                                <div class="flex items-center justify-end gap-2">
                                    <a href="{{ route('admin.projects.show', $project) }}" class="p-2 text-slate-400 hover:text-cyan-400 hover:bg-[#112e42] rounded-lg transition-colors">
                                        <i class='bx bx-show text-lg'></i>
                                    </a>
                                    <a href="{{ route('admin.projects.edit', $project) }}" class="p-2 text-slate-400 hover:text-cyan-400 hover:bg-[#112e42] rounded-lg transition-colors">
                                        <i class='bx bx-edit text-lg'></i>
                                    </a>
                                    <form action="{{ route('admin.projects.destroy', $project) }}" method="POST" onsubmit="return confirm('Delete this project?')">
                                        @csrf
                                        @method('DELETE')
                                        <button type="submit" class="p-2 text-slate-400 hover:text-red-400 hover:bg-red-500/10 rounded-lg transition-colors">
                                            <i class='bx bx-trash text-lg'></i>
                                        </button>
                                    </form>
                                </div>
                            </td>
                        </tr>
                    @endforeach
                </tbody>
            </table>
        </div>
        <div class="mt-4">{{ $projects->links() }}</div>
    @else
        <div class="text-center py-12">
            <i class='bx bx-folder-open text-5xl text-slate-500 mb-3'></i>
            <p class="text-slate-400">No projects added yet.</p>
        </div>
    @endif
</div>
@endsection
