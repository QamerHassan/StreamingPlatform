# Setup Guide - Streaming Platform

## Prerequisites

- **.NET 8 SDK** - [Download](https://dotnet.microsoft.com/download/dotnet/8.0)
- **Node.js 18+** - [Download](https://nodejs.org/)
- **PostgreSQL 15+** - [Download](https://www.postgresql.org/download/)
- **Git** - [Download](https://git-scm.com/)

## Option 1: Manual Setup (Development)

### Step 1: Database Setup

```bash
# Start PostgreSQL (if installed locally)
# On Windows (if installed as service, it should be running)
# On Linux/Mac:
sudo systemctl start postgresql

# Create database (using psql)
psql -U postgres

# In PostgreSQL console:
CREATE DATABASE StreamingPlatformDB;
\q
```

### Step 2: Backend Setup

```bash
# Navigate to backend directory
cd Backend/StreamingPlatform.API

# Restore NuGet packages
dotnet restore

# Update connection string in appsettings.json if needed
# Default: Host=localhost;Port=5432;Database=StreamingPlatformDB;Username=postgres;Password=8ETj7@Zv

# Run database migrations
dotnet ef database update

# Run the API
dotnet run

# API will be available at: http://localhost:5181
# Swagger UI: http://localhost:5181/swagger
```

### Step 3: Frontend Setup

```bash
# Navigate to frontend directory
cd frontend

# Install dependencies
npm install

# Create .env.local file (optional, defaults to localhost:5181)
echo "NEXT_PUBLIC_API_URL=http://localhost:5181" > .env.local

# Run development server
npm run dev

# Frontend will be available at: http://localhost:3000
```

## Option 2: Docker Setup (Recommended)

### Prerequisites
- **Docker Desktop** - [Download](https://www.docker.com/products/docker-desktop)

### Commands

```bash
# Make sure Docker Desktop is running

# Build and start all services
docker-compose up -d

# View logs
docker-compose logs -f

# Stop all services
docker-compose down

# Stop and remove volumes (clean slate)
docker-compose down -v

# Rebuild after code changes
docker-compose up -d --build
```

### Access Points (Docker)
- **Frontend**: http://localhost:3000
- **Backend API**: http://localhost:5181
- **Swagger**: http://localhost:5181/swagger
- **PostgreSQL**: localhost:5432

## Option 3: Quick Start Scripts

### Windows (PowerShell)

Create `start-backend.ps1`:
```powershell
cd Backend/StreamingPlatform.API
dotnet restore
dotnet ef database update
dotnet run
```

Create `start-frontend.ps1`:
```powershell
cd frontend
npm install
npm run dev
```

Run:
```powershell
# Terminal 1 - Backend
.\start-backend.ps1

# Terminal 2 - Frontend
.\start-frontend.ps1
```

### Linux/Mac (Bash)

Create `start-backend.sh`:
```bash
#!/bin/bash
cd Backend/StreamingPlatform.API
dotnet restore
dotnet ef database update
dotnet run
```

Create `start-frontend.sh`:
```bash
#!/bin/bash
cd frontend
npm install
npm run dev
```

Make executable and run:
```bash
chmod +x start-backend.sh start-frontend.sh

# Terminal 1 - Backend
./start-backend.sh

# Terminal 2 - Frontend
./start-frontend.sh
```

## Database Migration Commands

```bash
# Navigate to backend
cd Backend/StreamingPlatform.API

# Create a new migration (if you modify models)
dotnet ef migrations add MigrationName

# Apply migrations to database
dotnet ef database update

# Remove last migration (if needed)
dotnet ef migrations remove
```

## Testing the Setup

### 1. Test Backend API

```bash
# Check if API is running
curl http://localhost:5181/swagger

# Or open in browser:
# http://localhost:5181/swagger
```

### 2. Test Frontend

```bash
# Open browser:
# http://localhost:3000
```

### 3. Test Database Connection

```bash
# Using psql
psql -U postgres -d StreamingPlatformDB

# Check tables
\dt

# Exit
\q
```

## Common Issues & Solutions

### Issue: Database connection failed
```bash
# Check PostgreSQL is running
# Windows: Check Services
# Linux: sudo systemctl status postgresql

# Verify connection string in appsettings.json
# Test connection:
psql -U postgres -h localhost -p 5432
```

### Issue: Port already in use
```bash
# Windows - Find process using port 5181
netstat -ano | findstr :5181

# Kill process (replace PID)
taskkill /PID <PID> /F

# Linux/Mac - Find and kill
lsof -ti:5181 | xargs kill -9
```

### Issue: npm install fails
```bash
# Clear npm cache
npm cache clean --force

# Delete node_modules and reinstall
rm -rf node_modules package-lock.json
npm install
```

### Issue: dotnet restore fails
```bash
# Clear NuGet cache
dotnet nuget locals all --clear

# Restore again
dotnet restore
```

## Production Build Commands

### Backend
```bash
cd Backend/StreamingPlatform.API

# Build for production
dotnet publish -c Release -o ./publish

# Run production build
cd publish
dotnet StreamingPlatform.API.dll
```

### Frontend
```bash
cd frontend

# Build for production
npm run build

# Start production server
npm start
```

## Environment Variables

### Backend (appsettings.json)
```json
{
  "ConnectionStrings": {
    "DefaultConnection": "Host=localhost;Port=5432;Database=StreamingPlatformDB;Username=postgres;Password=YOUR_PASSWORD"
  },
  "JwtSettings": {
    "Secret": "YourSuperSecretKey12345678901234567890!",
    "Issuer": "StreamingPlatformAPI",
    "Audience": "StreamingPlatformClient"
  },
  "AWS": {
    "S3BucketName": "your-bucket-name",
    "CloudFrontDistributionId": "your-distribution-id",
    "Region": "us-east-1"
  }
}
```

### Frontend (.env.local)
```env
NEXT_PUBLIC_API_URL=http://localhost:5181
```

## Quick Reference

| Service | Port | URL |
|---------|------|-----|
| Frontend | 3000 | http://localhost:3000 |
| Backend API | 5181 | http://localhost:5181 |
| Swagger | 5181 | http://localhost:5181/swagger |
| PostgreSQL | 5432 | localhost:5432 |

## Next Steps After Setup

1. **Create Admin User**: Register first user, then manually update role to "Admin" in database
2. **Add Content**: Use Swagger UI or Admin panel to add movies/series
3. **Test Features**: 
   - Register/Login
   - Browse content
   - Add to watchlist
   - Watch videos
   - Check recommendations

## Support

If you encounter issues:
1. Check logs in console
2. Verify all prerequisites are installed
3. Ensure ports are not in use
4. Check database connection
5. Review error messages in browser console (F12)

