<<<<<<< HEAD
# Frontend Dockerfile
FROM node:18-alpine AS base

# Install dependencies only when needed
FROM base AS deps
RUN apk add --no-cache libc6-compat
WORKDIR /app

COPY frontend/package.json frontend/package-lock.json* ./
RUN npm ci

# Rebuild the source code only when needed
FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY frontend/ .

ENV NEXT_TELEMETRY_DISABLED 1

RUN npm run build

# Production image, copy all the files and run next
FROM base AS runner
WORKDIR /app

ENV NODE_ENV production
ENV NEXT_TELEMETRY_DISABLED 1

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

COPY --from=builder /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

USER nextjs

EXPOSE 3000

ENV PORT 3000
ENV HOSTNAME "0.0.0.0"

CMD ["node", "server.js"]

=======
# Build stage
FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build
WORKDIR /src

# Copy csproj and restore dependencies
COPY Backend/StreamingPlatform.API/StreamingPlatform.API.csproj Backend/StreamingPlatform.API/
RUN dotnet restore "Backend/StreamingPlatform.API/StreamingPlatform.API.csproj"

# Copy everything else
COPY . .

# Build
WORKDIR /src/Backend/StreamingPlatform.API
RUN dotnet build "StreamingPlatform.API.csproj" -c Release -o /app/build

# Publish stage
FROM build AS publish
WORKDIR /src/Backend/StreamingPlatform.API
RUN dotnet publish "StreamingPlatform.API.csproj" -c Release -o /app/publish /p:UseAppHost=false

# Runtime stage
FROM mcr.microsoft.com/dotnet/aspnet:8.0 AS runtime
WORKDIR /app
EXPOSE 80
EXPOSE 443

# Copy ONLY the published output (not source code)
COPY --from=publish /app/publish .

# List files for debugging
RUN ls -la && echo "Files copied successfully"

ENTRYPOINT ["dotnet", "StreamingPlatform.API.dll"]
>>>>>>> 5ecd662d77964399998879c5a4a1651e21e99b4f
