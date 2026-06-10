@echo off
echo ========================================
echo   AgriVision TN - Starting Frontend
echo ========================================
cd /d "%~dp0frontend"
echo Installing npm packages...
npm install
echo.
echo Starting Next.js on http://localhost:3000
npm run dev
