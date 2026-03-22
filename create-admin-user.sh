#!/bin/bash

SCRIPT_DIR="$(dirname "${BASH_SOURCE[0]}")"

cd "$SCRIPT_DIR/medusa-backend"
npx medusa user -e "$1" -p "$2"