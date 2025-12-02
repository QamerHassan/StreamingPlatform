#!/bin/bash

# Frontend Startup Script for Linux/Mac
echo "Starting Frontend..."

# Navigate to frontend directory
cd frontend

# Check if node_modules exists
if [ ! -d "node_modules" ]; then
    echo "Installing dependencies..."
    npm install
fi

# Run development server
echo "Starting development server on http://localhost:3000"
npm run dev

