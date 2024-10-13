#!/usr/bin/env bash

echo; echo
echo "reverse-proxy: Starting up for Palace of Goods!"
echo "  - HTTPS: ${HTTPS}"
echo "  - FRONTEND_DOMAIN_NAME: ${FRONTEND_DOMAIN_NAME}"
echo "  - BACKEND_DOMAIN_NAME: ${BACKEND_DOMAIN_NAME}"

set -e

# Directory used by certbot to serve certificate requests challenges:
mkdir -p /var/www/certbot

# Helper function to obtain SSL certificates
obtain_ssl_certificate() {
  local domain_name=$1
  echo "Obtaining SSL certificate for domain: ${domain_name}"
  certbot certonly --noninteractive --agree-tos --register-unsafely-without-email --nginx -d ${domain_name}
}

if [ "$HTTPS" = "true" ]; then
  echo "Starting in SSL mode"

  # Remove the default Nginx config to avoid conflicts
  rm /etc/nginx/conf.d/default.conf

  # Obtain SSL certificates for both frontend and backend
  obtain_ssl_certificate "$FRONTEND_DOMAIN_NAME"
  obtain_ssl_certificate "$BACKEND_DOMAIN_NAME"

  # Stop any Nginx process that Certbot might have started in the background
  echo "Stopping background Nginx to avoid port conflicts"
  service nginx stop

  # Substitute the environment variables into the SSL Nginx config template
  envsubst '$FRONTEND_DOMAIN_NAME $BACKEND_DOMAIN_NAME $DOMAIN_VALIDATION_KEY' < /nginx-ssl.conf.template > /etc/nginx/conf.d/default.conf

else
  echo "Starting in HTTP mode"
  
  # Substitute the environment variables into the HTTP Nginx config template
  envsubst '$FRONTEND_DOMAIN_NAME $BACKEND_DOMAIN_NAME $DOMAIN_VALIDATION_KEY' < /nginx.conf.template > /etc/nginx/conf.d/default.conf
fi

# Start Nginx in the foreground
echo "Starting Nginx..."
nginx -g "daemon off;"
