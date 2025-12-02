# Frontend Startup Script for Windows
Write-Host "Starting Frontend..." -ForegroundColor Green

# Navigate to frontend directory
Set-Location "frontend"

# Check if node_modules exists
if (-not (Test-Path "node_modules")) {
    Write-Host "Installing dependencies..." -ForegroundColor Yellow
    npm install
}

# Run development server
Write-Host "Starting development server on http://localhost:3000" -ForegroundColor Green
npm run dev

