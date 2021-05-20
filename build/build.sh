#!/bin/bash
cd "$(dirname "$0")"

node build.js ../src/index.html > ../start.html
