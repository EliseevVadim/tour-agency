<!DOCTYPE html>
<html>
<head>
    <title>Панель администратора</title>
    <link rel="stylesheet" href="{{ mix('css/app.css') }}">
    <style>
        body {
            font-family: sans-serif;
            margin: 0;
            overflow-x: hidden;
        }

        .top-bar {
            background-color: #f0f0f0;
            padding: 10px 20px;
            margin-bottom: 15px;
        }

        .top-bar .admin-email {
            font-size: 0.9em;
            color: #333;
        }

        .top-bar .navigation {
            display: flex;
            align-items: center;
        }

        .top-bar .nav-link {
            display: block;
            margin-left: 20px;
            text-decoration: none;
            color: #333;
            font-size: 0.9em;
            transition: color 0.3s ease;
        }

        .top-bar .nav-link:hover {
            color: #007bff;
            text-decoration: underline;
        }

        .top-bar .nav-link.active {
            font-weight: bold;
            color: #007bff;
        }

        .top-bar .logout-button {
            background: none;
            border: none;
            color: blue;
            cursor: pointer;
            font-size: 0.9em;
            padding: 5px 10px;
            margin-left: 20px;
            transition: color 0.3s ease;
        }

        .top-bar .logout-button:hover {
            color: darkblue;
            text-decoration: underline;
        }

        .main-content {
            padding: 20px;
            box-sizing: border-box;
        }

        .content-area {
            margin-top: 10px;
        }

        h1 {
            margin-top: 0;
        }
    </style>
</head>
<body>
<div class="top-bar">
    <div class="container d-flex justify-content-between">
        <div style="display: flex; align-items: center;">
            <span class="admin-email">{{ session('admin_email') }}</span>
            <nav class="navigation">
                <a href="{{ route('admin.videos') }}"
                   class="nav-link {{ request()->routeIs('admin.videos') ? 'active' : '' }}">Видео</a>
                <a href="{{ route('admin.clips') }}"
                   class="nav-link {{ request()->routeIs('admin.clips') ? 'active' : '' }}">Клипы</a>
            </nav>
        </div>
        <form method="POST" action="{{ route('admin.logout') }}" style="display:inline;">
            @csrf
            <button type="submit" class="logout-button">Выйти</button>
        </form>
    </div>
</div>
<div class="content">
    @yield('admin_content')
</div>

<script src="{{ mix('js/app.js') }}"></script>
</body>
</html>
