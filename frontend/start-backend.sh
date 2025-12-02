#!/bin/bash

# Backend Startup Script for Linux/Mac
echo "Starting Backend API..."

# Navigate to backend directory
cd Backend/StreamingPlatform.API

# Restore packages
echo "Restoring NuGet packages..."
dotnet restore

# Check if migrations exist, if not create initial migration
echo "Checking database migrations..."
dotnet ef database update

# Run the API
echo "Starting API server on http://localhost:5181"
echo "Swagger UI: http://localhost:5181/swagger"
dotnet run

