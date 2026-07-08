@extends('layouts.admin')
@section('page-title', 'Message from ' . $message->name)

@section('content')
<div class="admin-card p-6 max-w-2xl">
    <div class="flex items-center justify-between mb-6">
        <h2 class="text-lg font-semibold text-white">Message Details</h2>
        <a href="{{ route('admin.messages.index') }}" class="text-sm text-slate-400 hover:text-white flex items-center gap-1">
            <i class='bx bx-arrow-back'></i> Back
        </a>
    </div>

    <div class="space-y-4">
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
                <label class="block text-xs font-medium text-slate-400 uppercase tracking-wide mb-1">Name</label>
                <p class="text-white font-medium">{{ $message->name }}</p>
            </div>
            <div>
                <label class="block text-xs font-medium text-slate-400 uppercase tracking-wide mb-1">Email</label>
                <p class="text-white">
                    <a href="mailto:{{ $message->email }}" class="text-cyan-400 hover:underline">{{ $message->email }}</a>
                </p>
            </div>
            <div>
                <label class="block text-xs font-medium text-slate-400 uppercase tracking-wide mb-1">Mobile</label>
                <p class="text-white">{{ $message->mobile }}</p>
            </div>
            <div>
                <label class="block text-xs font-medium text-slate-400 uppercase tracking-wide mb-1">Received</label>
                <p class="text-white">{{ $message->created_at->format('d M Y, h:i A') }}</p>
            </div>
        </div>

        <div class="pt-4 border-t border-white/5">
            <label class="block text-xs font-medium text-slate-400 uppercase tracking-wide mb-2">Message</label>
            <div class="bg-[#112e42]/50 rounded-xl p-4 text-slate-200 leading-relaxed border border-white/5">
                {{ $message->message }}
            </div>
        </div>

        <div class="flex items-center gap-3 pt-4">
            <a href="mailto:{{ $message->email }}" class="inline-flex items-center gap-2 px-4 py-2 btn-primary-theme text-sm font-medium rounded-lg transition-all">
                <i class='bx bx-reply'></i> Reply via Email
            </a>
            <form action="{{ route('admin.messages.destroy', $message) }}" method="POST" onsubmit="return confirm('Delete this message?')">
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
