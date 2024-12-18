#!/bin/bash

# Step1: 更新原始碼至 Github／Gitlab
git add .
git commit -m "$(date +'%Y-%m-%d')"
git push origin main

# Step2: 登入 VPS 並執行更新及重啟服務
ssh root@64.176.37.84 << 'EOF'
  echo "切换到目录: nitori_furniture"
  cd nitori_furniture || { echo "Failed to change directory"; exit 1; }

  echo "Pulling latest code from repository"
  git pull || { echo "Failed to pull latest code"; exit 1; }

  echo "Starting docker compose"
  docker compose up -d || { echo "Failed to start docker compose"; exit 1; }

  echo "命令执行完毕，请手动关闭连接"
  bash # 保持会话打开以便手动检查
EOF