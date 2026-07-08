@extends('layouts.admin')
@section('page-title', 'About Section')

@section('content')
<div class="admin-card p-6">
    <div class="flex items-center justify-between mb-6">
        <h2 class="text-lg font-semibold text-white">About Information</h2>
        @if(!$about)
            <a href="{{ route('admin.about.create') }}" class="inline-flex items-center gap-2 px-4 py-2 btn-primary-theme text-sm font-medium rounded-lg transition-all">
                <i class='bx bx-plus'></i> Create About
            </a>
        @endif
    </div>

    @if($about)
        <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div class="md:col-span-1">
                @if($about->image)
                    <img src="{{ asset('storage/' . $about->image) }}" alt="About Image" class="w-full rounded-xl object-cover shadow-sm border border-white/5">
                @else
                    <div class="w-full h-48 rounded-xl bg-[#112e42] flex items-center justify-center border border-white/5">
                        <i class='bx bx-image text-4xl text-slate-500'></i>
                    </div>
                @endif
            </div>
            <div class="md:col-span-2">
                <h3 class="text-xl font-bold text-white mb-2">{{ $about->title }}</h3>
                <p class="text-slate-300 leading-relaxed mb-6">{{ $about->description }}</p>
                <div class="flex items-center gap-3">
                    <a href="{{ route('admin.about.edit', $about) }}" class="inline-flex items-center gap-2 px-4 py-2 btn-primary-theme text-sm font-medium rounded-lg transition-all">
                        <i class='bx bx-edit'></i> Edit
                    </a>
                    <form action="{{ route('admin.about.destroy', $about) }}" method="POST" onsubmit="return confirm('Are you sure?')">
                        @csrf
                        @method('DELETE')
                        <button type="submit" class="inline-flex items-center gap-2 px-4 py-2 bg-red-600 hover:bg-red-700 text-white text-sm font-medium rounded-lg transition-colors">
                            <i class='bx bx-trash'></i> Delete
                        </button>
                    </form>
                </div>
            </div>
        </div>
    @else
        <div class="text-center py-12">
            <i class='bx bx-user-circle text-5xl text-slate-500 mb-3'></i>
            <p class="text-slate-400">No about information yet. Create one to get started.</p>
        </div>
    @endif
</div>
@endsection
