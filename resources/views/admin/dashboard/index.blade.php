@extends('layouts.admin')
@section('page-title', 'Dashboard')

@section('content')
<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
    {{-- Projects --}}
    <div class="admin-card p-6">
        <div class="flex items-center justify-between mb-4">
            <div class="w-12 h-12 rounded-xl stat-icon-box flex items-center justify-center">
                <i class='bx bxs-folder-open text-2xl'></i>
            </div>
            <span class="text-xs font-medium stat-badge px-2 py-1 rounded-full">Active</span>
        </div>
        <h3 class="text-3xl font-bold text-white">{{ $projects }}</h3>
        <p class="text-sm text-slate-400 mt-1">Total Projects</p>
    </div>

    {{-- Skills --}}
    <div class="admin-card p-6">
        <div class="flex items-center justify-between mb-4">
            <div class="w-12 h-12 rounded-xl stat-icon-box flex items-center justify-center">
                <i class='bx bxs-bar-chart-alt-2 text-2xl'></i>
            </div>
            <span class="text-xs font-medium stat-badge px-2 py-1 rounded-full">Active</span>
        </div>
        <h3 class="text-3xl font-bold text-white">{{ $skills }}</h3>
        <p class="text-sm text-slate-400 mt-1">Total Skills</p>
    </div>

    {{-- Experiences --}}
    <div class="admin-card p-6">
        <div class="flex items-center justify-between mb-4">
            <div class="w-12 h-12 rounded-xl stat-icon-box flex items-center justify-center">
                <i class='bx bxs-briefcase text-2xl'></i>
            </div>
            <span class="text-xs font-medium stat-badge px-2 py-1 rounded-full">Active</span>
        </div>
        <h3 class="text-3xl font-bold text-white">{{ $experiences }}</h3>
        <p class="text-sm text-slate-400 mt-1">Experiences</p>
    </div>

    {{-- Messages --}}
    <div class="admin-card p-6">
        <div class="flex items-center justify-between mb-4">
            <div class="w-12 h-12 rounded-xl stat-icon-box flex items-center justify-center">
                <i class='bx bxs-envelope text-2xl'></i>
            </div>
            <span class="text-xs font-medium stat-badge px-2 py-1 rounded-full">Messages</span>
        </div>
        <h3 class="text-3xl font-bold text-white">{{ $messages }}</h3>
        <p class="text-sm text-slate-400 mt-1">Total Messages</p>
    </div>
</div>

{{-- Quick Actions --}}
<div class="admin-card p-6">
    <h2 class="text-lg font-semibold text-white mb-4">Quick Actions</h2>
    <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
        <a href="{{ route('admin.projects.create') }}" class="flex items-center gap-3 p-4 rounded-xl border border-white/5 bg-[#112e42]/50 hover:border-cyan-500 hover:bg-[#112e42] transition-all group">
            <i class='bx bx-plus-circle text-xl text-slate-400 group-hover:text-cyan-400'></i>
            <span class="text-sm font-medium text-slate-300 group-hover:text-white">Add Project</span>
        </a>
        <a href="{{ route('admin.skills.create') }}" class="flex items-center gap-3 p-4 rounded-xl border border-white/5 bg-[#112e42]/50 hover:border-cyan-500 hover:bg-[#112e42] transition-all group">
            <i class='bx bx-plus-circle text-xl text-slate-400 group-hover:text-cyan-400'></i>
            <span class="text-sm font-medium text-slate-300 group-hover:text-white">Add Skill</span>
        </a>
        <a href="{{ route('admin.experiences.create') }}" class="flex items-center gap-3 p-4 rounded-xl border border-white/5 bg-[#112e42]/50 hover:border-cyan-500 hover:bg-[#112e42] transition-all group">
            <i class='bx bx-plus-circle text-xl text-slate-400 group-hover:text-cyan-400'></i>
            <span class="text-sm font-medium text-slate-300 group-hover:text-white">Add Experience</span>
        </a>
        <a href="{{ route('admin.messages.index') }}" class="flex items-center gap-3 p-4 rounded-xl border border-white/5 bg-[#112e42]/50 hover:border-cyan-500 hover:bg-[#112e42] transition-all group">
            <i class='bx bx-envelope text-xl text-slate-400 group-hover:text-cyan-400'></i>
            <span class="text-sm font-medium text-slate-300 group-hover:text-white">View Messages</span>
        </a>
    </div>
</div>
@endsection
