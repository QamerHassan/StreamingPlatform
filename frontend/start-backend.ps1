# Backend Startup Script for Windows
Write-Host "Starting Backend API..." -ForegroundColor Green

# Navigate to backend directory
Set-Location "Backend\StreamingPlatform.API"

# Restore packages
Write-Host "Restoring NuGet packages..." -ForegroundColor Yellow
dotnet restore

# Check if migrations exist, if not create initial migration
Write-Host "Checking database migrations..." -ForegroundColor Yellow
dotnet ef database update

# Run the API
Write-Host "Starting API server on http://localhost:5181" -ForegroundColor Green
Write-Host "Swagger UI: http://localhost:5181/swagger" -ForegroundColor Cyan
dotnet run

