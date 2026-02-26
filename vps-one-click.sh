#!/bin/bash
set -e

echo "🚀 ติดตั้ง Claude Remote บน VPS..."

# 1. ติดตั้ง Node.js 20
if ! command -v node &> /dev/null || [[ $(node -v | cut -d. -f1 | tr -d 'v') -lt 20 ]]; then
  curl -fsSL https://deb.nodesource.com/setup_20.x | bash -
  apt-get install -y nodejs
fi
echo "✅ Node $(node -v)"

# 2. ติดตั้ง PM2 + Claude CLI
npm install -g pm2 @anthropic-ai/claude-code 2>/dev/null || true
echo "✅ PM2 + Claude CLI"

# 3. Clone repo
if [ ! -d "$HOME/next-js-claude" ]; then
  git clone https://github.com/Ronnakrit11/next-claude.git ~/next-js-claude
else
  cd ~/next-js-claude && git pull
fi
echo "✅ Repo ready"

# 4. รัน Claude Remote
cd ~/next-js-claude
pm2 delete claude-remote 2>/dev/null || true
PROJECT_DIR="$HOME/next-js-claude" pm2 start claude-server.js --name claude-remote
pm2 save
pm2 startup 2>/dev/null || true

echo ""
echo "════════════════════════════════════"
echo "✅ Claude Remote รันแล้ว!"
echo "🌐 เข้าได้ที่: http://$(curl -s ifconfig.me):4000"
echo "════════════════════════════════════"
echo ""
echo "⚠️  ขั้นตอนสุดท้าย — ตั้ง API Key:"
echo "  pm2 set claude-remote:ANTHROPIC_API_KEY sk-ant-xxx"
echo "  หรือ:"
echo "  ANTHROPIC_API_KEY=sk-ant-xxx pm2 restart claude-remote --update-env"
