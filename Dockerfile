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