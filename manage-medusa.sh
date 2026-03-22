#!/bin/bash

# -----------------------------
# PM2 Control Script
# -----------------------------
# Usage:
#   ./pm2-control.sh start frontend
#   ./pm2-control.sh stop backend
# -----------------------------

# Paths to frontend and backend directories
FRONTEND_DIR="./medusa-frontend"
BACKEND_DIR="./medusa-backend"

# Names for PM2 processes
FRONTEND_NAME="medusa-frontend"
BACKEND_NAME="medusa-backend"

# Check for action argument
if [ -z "$1" ] || [ -z "$2" ]; then
  echo "Usage: $0 {start|stop|restart|status} {frontend|backend|all}"
  exit 1
fi

ACTION=$1
TARGET=$2

SCRIPT_DIR="$(dirname "${BASH_SOURCE[0]}")"

# Helper function to run pm2 commands
run_pm2() {
  local name=$1
  local dir=$2
  local manager=$3   # "npm" or "yarn"
  local cmd=$4       # "start" script name

  cd "$SCRIPT_DIR/$dir"

  case $ACTION in
    start)
      echo "Starting $name..."
      pm2 start $manager --name "$name" -- run $cmd
      ;;
    stop)
      echo "Stopping $name..."
      pm2 stop "$name"
      echo "Deleting old PM2 instance for $name..."
      pm2 delete "$name"
      ;;
    restart)
      echo "Restarting $name..."
      pm2 restart "$name"
      ;;
    status)
      pm2 show "$name"
      ;;
    *)
      echo "Unknown action: $ACTION"
      exit 1
      ;;
  esac
}

# Handle target
case $TARGET in
  frontend)
    run_pm2 "$FRONTEND_NAME" "$FRONTEND_DIR" "yarn" "start"
    ;;
  backend)
    run_pm2 "$BACKEND_NAME" "$BACKEND_DIR" "npm" "start"
    ;;
  all)
    run_pm2 "$FRONTEND_NAME" "$FRONTEND_DIR" "yarn" "start"
    run_pm2 "$BACKEND_NAME" "$BACKEND_DIR" "npm" "start"
    ;;
  *)
    echo "Unknown target: $TARGET"
    exit 1
    ;;
esac