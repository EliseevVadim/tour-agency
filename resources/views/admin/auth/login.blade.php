<!DOCTYPE html>
<html>
<head>
    <title>Вход в админку</title>
    <style>
        body { font-family: sans-serif; }
        .container { width: 300px; margin: 100px auto; padding: 20px; border: 1px solid #ccc; border-radius: 5px; }
        .form-group { margin-bottom: 15px; }
        label { display: block; margin-bottom: 5px; }
        input[type="email"], input[type="password"] { width: 100%; padding: 8px; border: 1px solid #ccc; border-radius: 3px; box-sizing: border-box; }
        button { background-color: #4CAF50; color: white; padding: 10px 15px; border: none; border-radius: 3px; cursor: pointer; width: 100%; }
        button:hover { background-color: #45a049; }
        .error-message { color: red; margin-top: 10px; }
    </style>
</head>
<body>
<div class="container">
    <h2>Вход в админку</h2>
    <form method="POST" action="{{ route('admin.login.submit') }}">
        @csrf
        <div class="form-group">
            <label for="email">Email:</label>
            <input type="email" id="email" name="email" value="{{ old('email') }}" required autofocus>
        </div>
        <div class="form-group">
            <label for="password">Пароль:</label>
            <input type="password" id="password" name="password" required>
        </div>
        <button type="submit">Войти</button>
    </form>
    @if ($errors->any())
        <div class="error-message">
            <ul>
                @foreach ($errors->all() as $error)
                    <li>{{ $error }}</li>
                @endforeach
            </ul>
        </div>
    @endif
</div>
</body>
</html>
