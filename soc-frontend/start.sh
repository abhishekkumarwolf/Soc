#!/bin/bash

echo "========================================"
echo "  CYBER-SOC TERMINAL - QUICK START"
echo "========================================"
echo ""

echo "[1/3] Installing dependencies..."
npm install

echo ""
echo "[2/3] Configuration check..."
if [ ! -f .env ]; then
    echo "Creating .env file..."
    cp .env.example .env
    echo "Please edit .env file with your backend URL"
    read -p "Press enter to continue..."
fi

echo ""
echo "[3/3] Starting development server..."
echo "Frontend will be available at: http://localhost:5173"
echo ""
npm run dev
