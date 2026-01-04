#!/bin/bash
set -e

VERSION="7.2.0.5079"
FILENAME="sonar-scanner-cli-${VERSION}-linux-x64.zip"
INSTALL_DIR="$HOME/sonar-scanner"

if [ ! -d "$INSTALL_DIR" ]; then
  echo "Downloading sonar-scanner $VERSION..."
  wget https://binaries.sonarsource.com/Distribution/sonar-scanner-cli/$FILENAME
  unzip $FILENAME
  mv sonar-scanner-${VERSION}-linux-x64 $INSTALL_DIR
  rm $FILENAME
  echo "sonar-scanner installed in $INSTALL_DIR"
else
  echo "sonar-scanner already installed in $INSTALL_DIR"
fi