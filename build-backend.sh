#!/bin/bash

SCRIPT_DIR="$(dirname "${BASH_SOURCE[0]}")"

echo "Building backend..."
cd $SCRIPT_DIR/medusa-backend

npm install
npm run predeploy
npm run build
npx tsc

cp $SCRIPT_DIR/.env $SCRIPT_DIR/medusa-backend/.medusa/server
