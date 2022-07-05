#!/bin/bash

FILE=~/.theme/localhost.crt

if [ -f "$FILE" ]; then
  exit;
else 
  echo "Making SSL certificate...";
  mkdir -p ~/.theme;
  openssl req -x509 -days 5000 -out ~/.theme/localhost.crt -keyout ~/.theme/localhost.key \
    -newkey rsa:2048 -nodes -sha256 \
    -subj '/CN=localhost' -extensions EXT -config <( \
   printf "[dn]\nCN=localhost\n[req]\ndistinguished_name = dn\n[EXT]\nsubjectAltName=DNS:localhost\nkeyUsage=digitalSignature\nextendedKeyUsage=serverAuth");
  if [ -d "/Library/Keychains" ]; then
    sudo security add-trusted-cert \
      -k /Library/Keychains/System.keychain \
      -d ~/.theme/localhost.crt;
  fi
fi
