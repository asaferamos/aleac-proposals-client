#!/bin/bash

if [ ! -d "node_modules" ]; then
    yarn install
fi

REACT_APP_URL_API=http://localhost:3000 yarn start