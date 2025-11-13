# SynthVeil SSR Deployment Guide

This guide explains how to set up and manage Server-Side Rendering (SSR) for SynthVeil.

## Quick Fix for "Unable to connect to Inertia SSR server"

If you're seeing this error, follow these steps:

### 1. Set Environment Variable
Add to your `.env` file:
```bash
INERTIA_SSR_PORT=13719
```

### 2. Build SSR Bundle
```bash
npm run build:ssr
```

### 3. Start SSR Server

**On Linux/macOS:**
```bash
./manage-ssr.sh start
```

**On Windows:**
```cmd
manage-ssr.bat start
```

**Manual Start:**
```bash
node bootstrap/ssr/ssr.js
```

## Server Deployment

### Option 1: Using Systemd (Recommended for Linux)

1. Copy the service file to systemd:
```bash
sudo cp synthveil-ssr.service /etc/systemd/system/
sudo systemctl daemon-reload
```

2. Enable and start the service:
```bash
sudo systemctl enable synthveil-ssr
sudo systemctl start synthveil-ssr
```

3. Check status:
```bash
sudo systemctl status synthveil-ssr
```

### Option 2: Using Process Manager (PM2)

1. Install PM2:
```bash
npm install -g pm2
```

2. Start SSR with PM2:
```bash
pm2 start bootstrap/ssr/ssr.js --name "synthveil-ssr"
pm2 save
pm2 startup
```

### Option 3: Manual Management

Use the provided management scripts:

**Linux/macOS:**
```bash
chmod +x manage-ssr.sh
./manage-ssr.sh start
./manage-ssr.sh status
./manage-ssr.sh restart
./manage-ssr.sh stop
```

**Windows:**
```cmd
manage-ssr.bat start
manage-ssr.bat status
manage-ssr.bat restart
manage-ssr.bat stop
```

## Configuration

### Vite Configuration
The `vite.config.ts` is configured to:
- Listen on `0.0.0.0` for server deployment
- Use port `5178` for development
- Build SSR bundle to `bootstrap/ssr/ssr.js`

### Inertia Configuration
The `config/inertia.php` is set to:
- Use port from `INERTIA_SSR_PORT` environment variable (default: 13719)
- Look for SSR bundle at `bootstrap/ssr/ssr.js`

## Troubleshooting

### SSR Server Won't Start
1. Check if port 13719 is available:
   ```bash
   netstat -tlnp | grep 13719
   ```

2. Check if SSR bundle exists:
   ```bash
   ls -la bootstrap/ssr/ssr.js
   ```

3. Rebuild SSR if missing:
   ```bash
   npm run build:ssr
   ```

### Port Conflicts
If port 13719 is in use, change it:
1. Update `.env`:
   ```
   INERTIA_SSR_PORT=13720
   ```
2. Restart SSR server

### Permission Issues
Ensure web server user has read access to:
- `bootstrap/ssr/ssr.js`
- `storage/logs/` (for logging)

### Logs
Check SSR server logs:
- Systemd: `sudo journalctl -u synthveil-ssr -f`
- Manual: `tail -f storage/logs/ssr.log`
- PM2: `pm2 logs synthveil-ssr`

## Development vs Production

### Development
```bash
# Run both Vite dev server and SSR
npm run dev
# In another terminal
npm run dev:ssr
```

### Production
```bash
# Build assets and SSR
npm run build:ssr
# Start SSR server (choose one method above)
```

## Health Check

Create a simple health check script:
```bash
curl -f http://localhost:13719 || echo "SSR server is down"
```

## Notes

- SSR server should start automatically after building
- Monitor SSR server health in production
- SSR improves SEO and initial page load times
- Fallback: Laravel will work without SSR, but with client-side rendering only