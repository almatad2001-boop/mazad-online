@echo off
cd /d "%~dp0"
echo Installing dependencies if needed...
npm install
echo Starting Mazad Online...
npm start
pause
