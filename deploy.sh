#!/bin/bash

# Step1: 更新原始碼至 Github／Gitlab
git add .
git commit -m "$(date +'%Y-%m-%d')"
git push origin main

# Step2: 登入 VPS 並執行更新及重啟服務
ssh root@64.176.37.84 << 'EOF'
  cd nitori_furniture
  git pull
  docker compose up -d
EOF