@echo off
setlocal
cd /d "%~dp0"
title Mazad Online Server
if not exist node_modules (
  echo Installing Mazad server packages...
  call npm.cmd install
  if errorlevel 1 (
    echo.
    echo Installation failed. Make sure Node.js is installed.
    pause
    exit /b 1
  )
)
echo.
echo Starting Mazad Online...
echo Keep this window open while playing.
echo Browser will open automatically.
start "" "http://localhost:3000"
call npm.cmd start
pause
