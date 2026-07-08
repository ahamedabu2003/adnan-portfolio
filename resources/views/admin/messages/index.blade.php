@extends('layouts.admin')
@section('page-title', 'Messages')

@section('content')
<div class="admin-card p-6">
    <div class="flex items-center justify-between mb-6">
        <h2 class="text-lg font-semibold text-white">Contact Messages</h2>
    </div>

    @if($messages->count())
        <div class="overflow-x-auto">
            <table class="w-full text-sm">
                <thead>
                    <tr class="border-b border-white/5">
                        <th class="text-left py-3 px-4 font-medium text-slate-400">#</th>
                        <th class="text-left py-3 px-4 font-medium text-slate-400">Name</th>
                        <th class="text-left py-3 px-4 font-medium text-slate-400">Email</th>
                        <th class="text-left py-3 px-4 font-medium text-slate-400">Mobile</th>
                        <th class="text-left py-3 px-4 font-medium text-slate-400">Date</th>
                        <th class="text-right py-3 px-4 font-medium text-slate-400">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    @foreach($messages as $i => $msg)
                        <tr class="border-b border-white/5 hover:bg-white/25">
                            <td class="py-3 px-4 text-slate-400">{{ $messages->firstItem() + $i }}</td>
                            <td class="py-3 px-4 font-medium text-white">{{ $msg->name }}</td>
                            <td class="py-3 px-4 text-slate-300">{{ $msg->email }}</td>
                            <td class="py-3 px-4 text-slate-300">{{ $msg->mobile }}</td>
                            <td class="py-3 px-4 text-slate-400 text-xs">{{ $msg->created_at->format('d M Y, h:i A') }}</td>
                            <td class="py-3 px-4 text-right">
                                <div class="flex items-center justify-end gap-2">
                                    <a href="{{ route('admin.messages.show', $msg) }}" class="p-2 text-slate-400 hover:text-cyan-400 hover:bg-[#112e42] rounded-lg transition-colors">
                                        <i class='bx bx-show text-lg'></i>
                                    </a>
                                    <form action="{{ route('admin.messages.destroy', $msg) }}" method="POST" onsubmit="return confirm('Delete this message?')">
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
        <div class="mt-4">{{ $messages->links() }}</div>
    @else
        <div class="text-center py-12">
            <i class='bx bx-envelope text-5xl text-slate-500 mb-3'></i>
            <p class="text-slate-400">No messages received yet.</p>
        </div>
    @endif
</div>
@endsection
