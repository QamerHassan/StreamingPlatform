<<<<<<< HEAD
This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
=======
# 🎬 Streaming Platform - Netflix Clone

A full-stack streaming platform built with Next.js, .NET 8, and PostgreSQL.

## 🚀 Quick Start

### Option 1: Docker (Easiest)

```bash
# Start everything with one command
docker-compose up -d

# View logs
docker-compose logs -f
```

**Access:**
- Frontend: http://localhost:3000
- Backend API: http://localhost:5181
- Swagger: http://localhost:5181/swagger

### Option 2: Manual Setup

#### 1. Database Setup
```bash
# Create PostgreSQL database
psql -U postgres
CREATE DATABASE StreamingPlatformDB;
\q
```

#### 2. Backend
```bash
cd Backend/StreamingPlatform.API
dotnet restore
dotnet ef database update
dotnet run
```

#### 3. Frontend
```bash
cd frontend
npm install
npm run dev
```

## 📋 Prerequisites

- .NET 8 SDK
- Node.js 18+
- PostgreSQL 15+
- Docker Desktop (for Docker setup)

## 🎯 Features

- ✅ User Authentication (JWT)
- ✅ Content Management
- ✅ Watch History & Progress Tracking
- ✅ Watchlist/Favorites
- ✅ Personalized Recommendations
- ✅ Advanced Search & Filters
- ✅ Admin Dashboard
- ✅ Payment/Subscription (Stripe)
- ✅ Adaptive Video Streaming (HLS/DASH)
- ✅ Real-time Notifications (SignalR)
- ✅ AWS S3/CloudFront Integration

## 📁 Project Structure

```
StreamingPlatform/
├── Backend/              # .NET 8 API
│   └── StreamingPlatform.API/
├── frontend/             # Next.js Frontend
├── Dockerfile            # Backend Docker config
├── docker-compose.yml    # Full stack Docker setup
└── README.md
```

## 🔧 Configuration

### Backend
- Port: `5181`
- Database: PostgreSQL
- Config: `Backend/StreamingPlatform.API/appsettings.json`

### Frontend
- Port: `3000`
- API URL: `http://localhost:5181`
- Config: `frontend/.env.local`

## 📚 Documentation

- [Setup Guide](SETUP_GUIDE.md) - Detailed setup instructions
- [Implementation Summary](IMPLEMENTATION_SUMMARY.md) - Feature documentation

## 🛠️ Development

### Backend Commands
```bash
cd Backend/StreamingPlatform.API
dotnet restore          # Restore packages
dotnet ef database update  # Apply migrations
dotnet run              # Run API
```

### Frontend Commands
```bash
cd frontend
npm install     # Install dependencies
npm run dev     # Development server
npm run build   # Production build
npm start       # Production server
```

## 🐳 Docker Commands

```bash
docker-compose up -d        # Start all services
docker-compose down          # Stop all services
docker-compose logs -f       # View logs
docker-compose up -d --build # Rebuild and start
```

## 📝 API Endpoints

- **Auth**: `/api/Auth/login`, `/api/Auth/register`
- **Content**: `/api/content`
- **Watchlist**: `/api/watchlist`
- **Watch History**: `/api/watchhistory`
- **Recommendations**: `/api/recommendation`
- **Search**: `/api/search`
- **Admin**: `/api/admin/*`
- **Payment**: `/api/payment/*`

Full API documentation: http://localhost:5181/swagger

## 🎬 Usage

1. **Register/Login** - Create account or sign in
2. **Browse Content** - Explore movies and series
3. **Add to Watchlist** - Save favorites
4. **Watch Videos** - Stream with adaptive playback
5. **Get Recommendations** - Personalized suggestions
6. **Admin Panel** - Manage users and content (Admin role required)

## 🔐 Default Admin

To create an admin user:
1. Register normally
2. Update user role in database:
```sql
UPDATE "Users" SET "Role" = 'Admin' WHERE "Email" = 'your-email@example.com';
```

## 📞 Support

For issues or questions, check:
- Console logs
- Browser console (F12)
- Swagger UI for API testing

## 📄 License

This project is for educational purposes.

>>>>>>> 5ecd662d77964399998879c5a4a1651e21e99b4f
