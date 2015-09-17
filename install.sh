#!/bin/bash

set -e

bundle install
npm install
gulp build
