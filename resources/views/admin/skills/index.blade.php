@extends('layouts.admin')
@section('page-title', 'Skills')

@section('content')
<div class="admin-card p-6">
    <div class="flex items-center justify-between mb-6">
        <h2 class="text-lg font-semibold text-white">Skills</h2>
        <a href="{{ route('admin.skills.create') }}" class="inline-flex items-center gap-2 px-4 py-2 btn-primary-theme text-sm font-medium rounded-lg transition-all">
            <i class='bx bx-plus'></i> Add Skill
        </a>
    </div>

    @if($skills->count())
        <div class="overflow-x-auto">
            <table class="w-full text-sm">
                <thead>
                    <tr class="border-b border-white/5">
                        <th class="text-left py-3 px-4 font-medium text-slate-400">#</th>
                        <th class="text-left py-3 px-4 font-medium text-slate-400">Skill Name</th>
                        <th class="text-left py-3 px-4 font-medium text-slate-400">Proficiency</th>
                        <th class="text-right py-3 px-4 font-medium text-slate-400">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    @foreach($skills as $i => $skill)
                        <tr class="border-b border-white/5 hover:bg-white/25">
                            <td class="py-3 px-4 text-slate-400">{{ $skills->firstItem() + $i }}</td>
                            <td class="py-3 px-4 font-medium text-white">{{ $skill->name }}</td>
                            <td class="py-3 px-4">
                                <div class="flex items-center gap-3">
                                    <div class="flex-1 h-2 bg-[#112e42] rounded-full overflow-hidden max-w-[200px]">
                                        <div class="h-full bg-gradient-to-r from-cyan-400 to-indigo-500 rounded-full" style="width: {{ $skill->percentage }}%"></div>
                                    </div>
                                    <span class="text-sm text-slate-300 font-medium">{{ $skill->percentage }}%</span>
                                </div>
                            </td>
                            <td class="py-3 px-4 text-right">
                                <div class="flex items-center justify-end gap-2">
                                    <a href="{{ route('admin.skills.edit', $skill) }}" class="p-2 text-slate-400 hover:text-cyan-400 hover:bg-[#112e42] rounded-lg transition-colors">
                                        <i class='bx bx-edit text-lg'></i>
                                    </a>
                                    <form action="{{ route('admin.skills.destroy', $skill) }}" method="POST" onsubmit="return confirm('Delete this skill?')">
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
        <div class="mt-4">{{ $skills->links() }}</div>
    @else
        <div class="text-center py-12">
            <i class='bx bx-bar-chart-alt-2 text-5xl text-slate-500 mb-3'></i>
            <p class="text-slate-400">No skills added yet.</p>
        </div>
    @endif
</div>
@endsection
