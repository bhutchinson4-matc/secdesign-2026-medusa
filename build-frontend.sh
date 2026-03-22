#!/bin/bash

SCRIPT_DIR="$(dirname "${BASH_SOURCE[0]}")"

echo "Building frontend..."
echo "Note, build requires the backend to be running, and the NEXT_PUBLIC_MEDUSA_PUBLISHABLE_KEY env var is set"

cd $SCRIPT_DIR/medusa-frontend
yarn install
yarn build
