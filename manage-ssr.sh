#!/bin/bash

# SynthVeil SSR Management Script
# Usage: ./manage-ssr.sh [start|stop|restart|status|build]

SSR_PORT=${INERTIA_SSR_PORT:-13719}
SSR_PID_FILE="/tmp/synthveil-ssr.pid"
PROJECT_DIR="/var/www/synthveil"
NODE_ENV=${NODE_ENV:-production}

start_ssr() {
    echo "Starting SynthVeil SSR server on port $SSR_PORT..."
    
    # Build SSR if needed
    if [ ! -f "bootstrap/ssr/ssr.js" ]; then
        echo "SSR bundle not found. Building..."
        npm run build:ssr
    fi
    
    # Start SSR server
    cd "$PROJECT_DIR"
    nohup node bootstrap/ssr/ssr.js > storage/logs/ssr.log 2>&1 &
    echo $! > $SSR_PID_FILE
    echo "SSR server started with PID $(cat $SSR_PID_FILE)"
}

stop_ssr() {
    if [ -f $SSR_PID_FILE ]; then
        PID=$(cat $SSR_PID_FILE)
        echo "Stopping SSR server (PID: $PID)..."
        kill $PID 2>/dev/null
        rm -f $SSR_PID_FILE
        echo "SSR server stopped"
    else
        echo "No SSR server PID file found"
        # Try to kill any node process running ssr.js
        pkill -f "node bootstrap/ssr/ssr.js" 2>/dev/null && echo "Killed SSR processes"
    fi
}

restart_ssr() {
    stop_ssr
    sleep 2
    start_ssr
}

status_ssr() {
    if [ -f $SSR_PID_FILE ]; then
        PID=$(cat $SSR_PID_FILE)
        if ps -p $PID > /dev/null 2>&1; then
            echo "SSR server is running (PID: $PID)"
            echo "Listening on port: $SSR_PORT"
            echo "Log file: storage/logs/ssr.log"
        else
            echo "SSR server is not running (stale PID file)"
            rm -f $SSR_PID_FILE
        fi
    else
        echo "SSR server is not running"
    fi
    
    # Check if port is in use
    if netstat -tlnp 2>/dev/null | grep ":$SSR_PORT " > /dev/null; then
        echo "Port $SSR_PORT is in use"
    else
        echo "Port $SSR_PORT is available"
    fi
}

build_ssr() {
    echo "Building SSR bundle..."
    npm run build:ssr
    echo "SSR build complete"
}

case "$1" in
    start)
        start_ssr
        ;;
    stop)
        stop_ssr
        ;;
    restart)
        restart_ssr
        ;;
    status)
        status_ssr
        ;;
    build)
        build_ssr
        ;;
    *)
        echo "Usage: $0 {start|stop|restart|status|build}"
        echo ""
        echo "Commands:"
        echo "  start   - Start the SSR server"
        echo "  stop    - Stop the SSR server"
        echo "  restart - Restart the SSR server"
        echo "  status  - Check SSR server status"
        echo "  build   - Build SSR bundle"
        echo ""
        echo "Environment variables:"
        echo "  INERTIA_SSR_PORT - SSR server port (default: 13719)"
        echo "  NODE_ENV         - Node environment (default: production)"
        exit 1
        ;;
esac