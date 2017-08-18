#!/bin/bash

npm install -g weinre,anyproxy
echo "start weinre server at localhost:8080"
nohup weinre --httpPort 8080 --boundHost -all- &
echo "start anyproxy server, website port:8002, proxy port:8001"
nohup anyproxy --rule ./proxyRule.js &
