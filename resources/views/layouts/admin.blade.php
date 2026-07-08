<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="csrf-token" content="{{ csrf_token() }}">
    <title>Admin Panel — {{ config('app.name', 'Adnan Portfolio') }}</title>
    <link rel="preconnect" href="https://fonts.bunny.net">
    <link href="https://fonts.bunny.net/css?family=inter:400,500,600,700&display=swap" rel="stylesheet" />
    <link href="https://unpkg.com/boxicons@2.1.4/css/boxicons.min.css" rel="stylesheet">
    @vite(['resources/css/app.css', 'resources/js/app.js'])
    <style>
        body { 
            font-family: 'Inter', sans-serif; 
            background-color: #112e42;
            color: #ededed;
        }
        .sidebar { 
            width: 260px; 
            min-height: 100vh; 
            background: #081b29; 
            border-right: 1px solid rgba(255, 255, 255, 0.05);
        }
        .sidebar .nav-link { 
            display: flex; 
            align-items: center; 
            gap: 12px; 
            padding: 12px 20px; 
            color: #94a3b8; 
            font-size: 14px; 
            font-weight: 500; 
            border-radius: 8px; 
            margin: 2px 12px; 
            transition: all 0.2s; 
            text-decoration: none; 
        }
        .sidebar .nav-link:hover, .sidebar .nav-link.active { 
            background: rgba(0, 171, 240, 0.1); 
            color: #00abf0; 
        }
        .sidebar .nav-link.active { 
            background: rgba(0, 171, 240, 0.15); 
            color: #00abf0; 
            border-left: 3px solid #00abf0;
            border-radius: 0 8px 8px 0;
            margin-left: 0;
        }
        .sidebar .nav-link i { font-size: 20px; }
        .content-area { 
            flex: 1; 
            background: #112e42; 
            min-height: 100vh; 
        }
        .admin-header { 
            background: #081b29; 
            border-bottom: 1px solid rgba(255, 255, 255, 0.05);
            padding: 16px 32px; 
            display: flex; 
            align-items: center; 
            justify-content: space-between; 
        }
        .admin-card { 
            background: #081b29; 
            border-radius: 12px; 
            border: 1px solid rgba(255, 255, 255, 0.05); 
            box-shadow: 0 4px 20px rgba(0,0,0,0.15); 
            color: #ededed;
        }
        
        /* Table Styles */
        table { color: #ededed; }
        th { color: #94a3b8 !important; border-bottom: 1px solid rgba(255, 255, 255, 0.05); }
        tr { border-bottom: 1px solid rgba(255, 255, 255, 0.02) !important; }
        tr:hover { background-color: rgba(255, 255, 255, 0.02) !important; }
        
        /* Form Inputs */
        input, textarea, select {
            background-color: #112e42 !important;
            border: 1px solid rgba(255, 255, 255, 0.1) !important;
            color: #ededed !important;
        }
        input:focus, textarea:focus, select:focus {
            border-color: #00abf0 !important;
            box-shadow: 0 0 10px rgba(0, 171, 240, 0.2) !important;
        }
        
        /* Dashboard Stat Cards */
        .stat-icon-box {
            background: rgba(0, 171, 240, 0.1) !important;
            color: #00abf0 !important;
        }
        .stat-badge {
            background: rgba(0, 171, 240, 0.2) !important;
            color: #00abf0 !important;
        }
        
        /* Buttons */
        .btn-primary-theme {
            background-color: #00abf0;
            color: #081b29;
            transition: all 0.3s;
        }
        .btn-primary-theme:hover {
            background-color: transparent;
            color: #00abf0;
            box-shadow: 0 0 15px #00abf0;
            border: 1px solid #00abf0;
        }
    </style>
</head>
<body class="antialiased">
    <div class="flex">
        {{-- Sidebar --}}
        <aside class="sidebar fixed top-0 left-0 z-40 flex flex-col">
            <div class="px-6 py-6 border-b border-white/5">
                <a href="{{ route('admin.dashboard') }}" class="text-white text-xl font-bold tracking-tight flex items-center gap-2">
                    <i class='bx bx-code-alt text-indigo-400 text-2xl' style="color: #00abf0;"></i>
                    Admin Panel
                </a>
            </div>

            <nav class="flex-1 py-4 space-y-1">
                <a href="{{ route('admin.dashboard') }}" class="nav-link {{ request()->routeIs('admin.dashboard') ? 'active' : '' }}">
                    <i class='bx bxs-dashboard'></i> Dashboard
                </a>
                <a href="{{ route('admin.about.index') }}" class="nav-link {{ request()->routeIs('admin.about.*') ? 'active' : '' }}">
                    <i class='bx bxs-user-detail'></i> About
                </a>
                <a href="{{ route('admin.experiences.index') }}" class="nav-link {{ request()->routeIs('admin.experiences.*') ? 'active' : '' }}">
                    <i class='bx bxs-briefcase'></i> Experience
                </a>
                <a href="{{ route('admin.projects.index') }}" class="nav-link {{ request()->routeIs('admin.projects.*') ? 'active' : '' }}">
                    <i class='bx bxs-folder-open'></i> Projects
                </a>
                <a href="{{ route('admin.skills.index') }}" class="nav-link {{ request()->routeIs('admin.skills.*') ? 'active' : '' }}">
                    <i class='bx bxs-bar-chart-alt-2'></i> Skills
                </a>
                <a href="{{ route('admin.cvs.index') }}" class="nav-link {{ request()->routeIs('admin.cvs.*') ? 'active' : '' }}">
                    <i class='bx bxs-file-pdf'></i> CV / Resume
                </a>
                <a href="{{ route('admin.messages.index') }}" class="nav-link {{ request()->routeIs('admin.messages.*') ? 'active' : '' }}">
                    <i class='bx bxs-envelope'></i> Messages
                </a>
            </nav>

            <div class="p-4 border-t border-white/5">
                <div class="flex items-center gap-3 px-3 mb-3">
                    <div class="w-9 h-9 rounded-full bg-cyan-500/20 flex items-center justify-center text-cyan-400 font-bold text-sm">
                        {{ strtoupper(substr(Auth::user()->name, 0, 1)) }}
                    </div>
                    <div>
                        <p class="text-sm font-medium text-slate-200">{{ Auth::user()->name }}</p>
                        <p class="text-xs text-slate-400">Administrator</p>
                    </div>
                </div>
                <form method="POST" action="{{ route('logout') }}">
                    @csrf
                    <button type="submit" class="nav-link w-full text-left hover:!bg-red-500/15 hover:!text-red-400">
                        <i class='bx bx-log-out'></i> Logout
                    </button>
                </form>
            </div>
        </aside>

        {{-- Main Content --}}
        <div class="content-area" style="margin-left: 260px;">
            <header class="admin-header">
                <div>
                    <h1 class="text-lg font-semibold text-gray-200">@yield('page-title', 'Dashboard')</h1>
                </div>
                <div class="flex items-center gap-4">
                    <a href="{{ route('home') }}" target="_blank" class="text-sm text-cyan-400 hover:text-cyan-300 flex items-center gap-1">
                        <i class='bx bx-link-external'></i> View Site
                    </a>
                </div>
            </header>

            <main class="p-6 lg:p-8">
                {{-- Flash Messages --}}
                @if(session('success'))
                    <div class="mb-6 px-4 py-3 rounded-lg bg-emerald-950/50 border border-emerald-800 text-emerald-400 text-sm flex items-center gap-2">
                        <i class='bx bx-check-circle text-lg'></i>
                        {{ session('success') }}
                    </div>
                @endif

                @if($errors->any())
                    <div class="mb-6 px-4 py-3 rounded-lg bg-red-950/50 border border-red-800 text-red-400 text-sm">
                        <ul class="list-disc list-inside">
                            @foreach($errors->all() as $error)
                                <li>{{ $error }}</li>
                            @endforeach
                        </ul>
                    </div>
                @endif

                @yield('content')
            </main>
        </div>
    </div>
</body>
</html>
