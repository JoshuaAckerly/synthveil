@echo off
setlocal enabledelayedexpansion

:: SynthVeil SSR Management Script
:: Usage: manage-ssr.bat [start|stop|restart|status|build]

if "%INERTIA_SSR_PORT%"=="" set INERTIA_SSR_PORT=13719
set SSR_PID_FILE=%TEMP%\synthveil-ssr.pid
set PROJECT_DIR=%~dp0

if "%1"=="start" goto start_ssr
if "%1"=="stop" goto stop_ssr
if "%1"=="restart" goto restart_ssr
if "%1"=="status" goto status_ssr
if "%1"=="build" goto build_ssr
goto usage

:start_ssr
echo Starting SynthVeil SSR server on port %INERTIA_SSR_PORT%...

:: Build SSR if needed
if not exist "bootstrap\ssr\ssr.js" (
    echo SSR bundle not found. Building...
    call npm run build:ssr
)

:: Start SSR server
cd /d "%PROJECT_DIR%"
start /B node bootstrap\ssr\ssr.js > storage\logs\ssr.log 2>&1
echo SSR server started
goto end

:stop_ssr
echo Stopping SSR server...
taskkill /F /IM node.exe /FI "WINDOWTITLE eq*ssr.js*" 2>nul
if exist "%SSR_PID_FILE%" del "%SSR_PID_FILE%"
echo SSR server stopped
goto end

:restart_ssr
call :stop_ssr
timeout /t 2 /nobreak >nul
call :start_ssr
goto end

:status_ssr
echo Checking SSR server status...
tasklist /FI "IMAGENAME eq node.exe" /FI "WINDOWTITLE eq*ssr.js*" 2>nul | find "node.exe" >nul
if %errorlevel%==0 (
    echo SSR server is running
) else (
    echo SSR server is not running
)
goto end

:build_ssr
echo Building SSR bundle...
call npm run build:ssr
echo SSR build complete
goto end

:usage
echo Usage: %0 [start^|stop^|restart^|status^|build]
echo.
echo Commands:
echo   start   - Start the SSR server
echo   stop    - Stop the SSR server
echo   restart - Restart the SSR server
echo   status  - Check SSR server status
echo   build   - Build SSR bundle
echo.
echo Environment variables:
echo   INERTIA_SSR_PORT - SSR server port (default: 13719)
goto end

:end
endlocal