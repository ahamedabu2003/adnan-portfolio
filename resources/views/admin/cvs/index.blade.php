@extends('layouts.admin')
@section('page-title', 'CV / Resume')

@section('content')
<div class="admin-card p-6 max-w-2xl">
    <h2 class="text-lg font-semibold text-white mb-6">CV / Resume Management</h2>

    @if($cv)
        <div class="border border-white/5 rounded-xl p-5 mb-6 bg-[#112e42]/50">
            <div class="flex items-center justify-between">
                <div class="flex items-center gap-4">
                    <div class="w-12 h-12 rounded-xl bg-red-950/20 flex items-center justify-center border border-red-800/30">
                        <i class='bx bxs-file-pdf text-2xl text-red-400'></i>
                    </div>
                    <div>
                        <p class="font-medium text-white">{{ $cv->original_name }}</p>
                        <p class="text-xs text-slate-400">Uploaded {{ $cv->created_at->diffForHumans() }}</p>
                    </div>
                </div>
                <div class="flex items-center gap-2">
                    <a href="{{ route('admin.cvs.show', $cv) }}" class="inline-flex items-center gap-1 px-3 py-2 btn-primary-theme text-xs font-medium rounded-lg transition-all">
                        <i class='bx bx-download'></i> Download
                    </a>
                    <form action="{{ route('admin.cvs.destroy', $cv) }}" method="POST" onsubmit="return confirm('Delete this CV?')">
                        @csrf
                        @method('DELETE')
                        <button type="submit" class="inline-flex items-center gap-1 px-3 py-2 bg-red-600 hover:bg-red-700 text-white text-xs font-medium rounded-lg transition-colors">
                            <i class='bx bx-trash'></i> Delete
                        </button>
                    </form>
                </div>
            </div>
        </div>
    @endif

    <form action="{{ route('admin.cvs.store') }}" method="POST" enctype="multipart/form-data" class="space-y-5">
        @csrf

        <div>
            <label for="cv_file" class="block text-sm font-medium text-slate-300 mb-1">
                {{ $cv ? 'Replace CV' : 'Upload CV' }} (PDF, DOC, DOCX — Max 5MB)
            </label>
            <input type="file" name="cv_file" id="cv_file" accept=".pdf,.doc,.docx" required
                class="w-full px-4 py-2.5 rounded-lg border border-white/10 bg-[#112e42] text-sm">
            @error('cv_file') <p class="text-red-400 text-xs mt-1">{{ $message }}</p> @enderror
        </div>

        <button type="submit" class="inline-flex items-center gap-2 px-5 py-2.5 btn-primary-theme text-sm font-medium rounded-lg transition-all">
            <i class='bx bx-upload'></i> {{ $cv ? 'Replace CV' : 'Upload CV' }}
        </button>
    </form>
</div>
@endsection
