#!/bin/bash

SCRIPT_DIR="$(dirname "${BASH_SOURCE[0]}")"

# .env file must exist
if [ ! -f "$SCRIPT_DIR/$ENV_FILE" ]; then
  echo "Error: .env file does not exist. Use .env.template as a reference"
  exit 1
fi

# install dependencies
# Download and install nvm:
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.40.4/install.sh | bash
\. "$HOME/.nvm/nvm.sh"

# Download and install Node.js:
nvm install 24

# use pm2 to manage backend and frontend instances
npm install -g pm2 

# npm doesn't work for the frontend for some reason, so yarn is used instead
npm install -g yarn

# start up docker compose services
sudo docker compose up -d
