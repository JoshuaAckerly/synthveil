@echo off
echo Starting Synthveil Development Servers...
echo.
echo Backend: http://127.0.0.1:8005
echo Frontend: http://127.0.0.1:5178
echo.

start "Synthveil Backend" cmd /k "php artisan serve --port=8005"
timeout /t 2 /nobreak >nul
start "Synthveil Frontend" cmd /k "npm run dev"

echo Development servers started!
echo Press any key to exit...
pause >nul