@extends('layouts.admin')
@section('page-title', 'Experiences')

@section('content')
<div class="admin-card p-6">
    <div class="flex items-center justify-between mb-6">
        <h2 class="text-lg font-semibold text-white">Work Experience</h2>
        <a href="{{ route('admin.experiences.create') }}" class="inline-flex items-center gap-2 px-4 py-2 btn-primary-theme text-sm font-medium rounded-lg transition-all">
            <i class='bx bx-plus'></i> Add Experience
        </a>
    </div>

    @if($experiences->count())
        <div class="overflow-x-auto">
            <table class="w-full text-sm">
                <thead>
                    <tr class="border-b border-white/5">
                        <th class="text-left py-3 px-4 font-medium text-slate-400">#</th>
                        <th class="text-left py-3 px-4 font-medium text-slate-400">Company</th>
                        <th class="text-left py-3 px-4 font-medium text-slate-400">Designation</th>
                        <th class="text-left py-3 px-4 font-medium text-slate-400">Duration</th>
                        <th class="text-right py-3 px-4 font-medium text-slate-400">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    @foreach($experiences as $i => $exp)
                        <tr class="border-b border-white/5 hover:bg-white/25">
                            <td class="py-3 px-4 text-slate-400">{{ $experiences->firstItem() + $i }}</td>
                            <td class="py-3 px-4 font-medium text-white">{{ $exp->company }}</td>
                            <td class="py-3 px-4 text-slate-300">{{ $exp->designation }}</td>
                            <td class="py-3 px-4 text-slate-300">{{ $exp->duration }}</td>
                            <td class="py-3 px-4 text-right">
                                <div class="flex items-center justify-end gap-2">
                                    <a href="{{ route('admin.experiences.edit', $exp) }}" class="p-2 text-slate-400 hover:text-cyan-400 hover:bg-[#112e42] rounded-lg transition-colors">
                                        <i class='bx bx-edit text-lg'></i>
                                    </a>
                                    <form action="{{ route('admin.experiences.destroy', $exp) }}" method="POST" onsubmit="return confirm('Delete this experience?')">
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
        <div class="mt-4">{{ $experiences->links() }}</div>
    @else
        <div class="text-center py-12">
            <i class='bx bx-briefcase text-5xl text-slate-500 mb-3'></i>
            <p class="text-slate-400">No experiences added yet.</p>
        </div>
    @endif
</div>
@endsection
