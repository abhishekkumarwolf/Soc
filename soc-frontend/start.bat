@echo off
echo ========================================
echo   CYBER-SOC TERMINAL - QUICK START
echo ========================================
echo.

echo [1/3] Installing dependencies...
call npm install

echo.
echo [2/3] Configuration check...
if not exist .env (
    echo Creating .env file...
    copy .env.example .env
    echo Please edit .env file with your backend URL
    pause
)

echo.
echo [3/3] Starting development server...
echo Frontend will be available at: http://localhost:5173
echo.
call npm run dev
