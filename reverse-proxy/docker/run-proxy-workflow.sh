#!/bin/bash

# Exit script on any error
set -e

# Define the Docker image name
IMAGE_NAME="palaceofgoods-reverse-proxy"

# Define default values for environment variables
HTTPS="${HTTPS:-true}"
FRONTEND_DOMAIN_NAME="${FRONTEND_DOMAIN_NAME:-frontend.palaceofgoods.com}"
BACKEND_DOMAIN_NAME="${BACKEND_DOMAIN_NAME:-backend.palaceofgoods.com}"
FRONTEND_PORT="${FRONTEND_PORT:-80}"
BACKEND_PORT="${BACKEND_PORT:-3000}"
CERTBOT_EMAIL="${CERTBOT_EMAIL:-admin@palaceofgoods.com}"

# Ports to be exposed on the host machine
HTTP_PORT="${HTTP_PORT:-80}"
HTTPS_PORT="${HTTPS_PORT:-443}"

echo; echo "Palace of Goods Reverse Proxy Workflow"
echo "  - HTTPS: ${HTTPS}"
echo "  - FRONTEND_DOMAIN_NAME: ${FRONTEND_DOMAIN_NAME}"
echo "  - BACKEND_DOMAIN_NAME: ${BACKEND_DOMAIN_NAME}"
echo "  - FRONTEND_PORT: ${FRONTEND_PORT}"
echo "  - BACKEND_PORT: ${BACKEND_PORT}"
echo "  - CERTBOT_EMAIL: ${CERTBOT_EMAIL}"
echo "  - HTTP_PORT: ${HTTP_PORT}"
echo "  - HTTPS_PORT: ${HTTPS_PORT}"
echo

# Step 1: Build the Docker image
echo "Step 1: Building Docker image..."
docker build -t $IMAGE_NAME .

# Step 2: Run the Docker container
echo "Step 2: Running the Docker container..."
docker run -d \
    -e HTTPS="$HTTPS" \
    -e FRONTEND_DOMAIN_NAME="$FRONTEND_DOMAIN_NAME" \
    -e BACKEND_DOMAIN_NAME="$BACKEND_DOMAIN_NAME" \
    -e FRONTEND_PORT="$FRONTEND_PORT" \
    -e BACKEND_PORT="$BACKEND_PORT" \
    -e CERTBOT_EMAIL="$CERTBOT_EMAIL" \
    -p $HTTP_PORT:80 \
    -p $HTTPS_PORT:443 \
    --name palaceofgoods-proxy \
    $IMAGE_NAME

# Step 3: Monitor container logs
echo "Step 3: Displaying container logs..."
docker logs -f palaceofgoods-proxy

# Cleanup: Stop and remove the container
cleanup() {
  echo "Cleaning up Docker container..."
  docker stop palaceofgoods-proxy || true
  docker rm palaceofgoods-proxy || true
}
trap cleanup EXIT
