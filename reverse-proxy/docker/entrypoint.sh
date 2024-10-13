#!/bin/bash

# Fail on error
set -e

# Check for required environment variables
if [ -z "$DOMAIN" ]; then
    echo "Error: DOMAIN environment variable is not set."
    exit 1
fi

if [ -z "$UPSTREAM_HOST" ]; then
    echo "Error: UPSTREAM_HOST environment variable is not set."
    exit 1
fi

if [ -z "$UPSTREAM_PORT" ]; then
    echo "Error: UPSTREAM_PORT environment variable is not set."
    exit 1
fi

# Update nginx.conf.template with environment variables
sed "s/{DOMAIN}/$DOMAIN/g; s/{UPSTREAM_HOST}/$UPSTREAM_HOST/g; s/{UPSTREAM_PORT}/$UPSTREAM_PORT/g" \
    /nginx.conf.template > /etc/nginx/nginx.conf

# If SSL certificates do not exist, generate them
if [ ! -d "/etc/letsencrypt/live/$DOMAIN" ]; then
    certbot --nginx -d "$DOMAIN" --non-interactive --agree-tos -m "$CERTBOT_EMAIL"
fi

# Update nginx-ssl.conf.template with environment variables and enable SSL config
sed "s/{DOMAIN}/$DOMAIN/g; s/{UPSTREAM_HOST}/$UPSTREAM_HOST/g; s/{UPSTREAM_PORT}/$UPSTREAM_PORT/g" \
    /nginx-ssl.conf.template > /etc/nginx/nginx.conf

# Start nginx in foreground
nginx -g "daemon off;"
