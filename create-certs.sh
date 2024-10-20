#!/bin/bash

# Clean
rm -rf certs/
mkdir certs/

# Create a certificate and a private key
openssl req \
  -newkey rsa:2048 \
  -x509 \
  -sha256 \
  -days 365 \
  -nodes \
  -out certs/azure_sp_cert.pem \
  -keyout certs/azure_sp_key.pem \

# Combine the certificate and the key (required by the sample app)
touch certs/azure_sp.pem
cat certs/*.pem > certs/azure_sp.pem
