#!/bin/bash
# ============================================
# Setup Claude Remote on VPS
# ============================================
# วิธีใช้: SSH เข้า VPS แล้วรัน:
#   bash setup-vps.sh
# ============================================

set -e

echo "──────────────────────────────"
echo "  Setup Claude Remote on VPS"
echo "──────────────────────────────"

# 1. ติดตั้ง Node.js 20 (ถ้ายังไม่มี)
if ! command -v node &> /dev/null || [[ $(node -v | cut -d. -f1 | tr -d 'v') -lt 20 ]]; then
  echo "📦 ติดตั้ง Node.js 20..."
  curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
  sudo apt-get install -y nodejs
else
  echo "✅ Node.js $(node -v) พร้อมแล้ว"
fi

# 2. ติดตั้ง PM2 (process manager)
if ! command -v pm2 &> /dev/null; then
  echo "📦 ติดตั้ง PM2..."
  sudo npm install -g pm2
else
  echo "✅ PM2 พร้อมแล้ว"
fi

# 3. ติดตั้ง Claude CLI
if ! command -v claude &> /dev/null; then
  echo "📦 ติดตั้ง Claude CLI..."
  npm install -g @anthropic-ai/claude-code
  echo ""
  echo "⚠️  ต้อง login Claude CLI ก่อน! รัน:"
  echo "   claude login"
  echo "   หรือตั้ง env: export ANTHROPIC_API_KEY=sk-ant-..."
  echo ""
else
  echo "✅ Claude CLI พร้อมแล้ว"
fi

# 4. ติดตั้ง git (ถ้ายังไม่มี)
if ! command -v git &> /dev/null; then
  echo "📦 ติดตั้ง git..."
  sudo apt-get install -y git
else
  echo "✅ Git พร้อมแล้ว"
fi

# 5. Clone repo (ถ้ายังไม่มี)
REPO_DIR="$HOME/next-js-claude"
if [ ! -d "$REPO_DIR" ]; then
  echo ""
  echo "📂 Clone repo..."
  echo "ใส่ GitHub repo URL (เช่น https://github.com/username/repo.git):"
  read -r REPO_URL
  git clone "$REPO_URL" "$REPO_DIR"
else
  echo "✅ Repo อยู่ที่ $REPO_DIR แล้ว"
  cd "$REPO_DIR" && git pull
fi

# 6. รัน Claude Remote ด้วย PM2
echo ""
echo "🚀 เริ่ม Claude Remote ด้วย PM2..."
cd "$REPO_DIR"
pm2 delete claude-remote 2>/dev/null || true
PROJECT_DIR="$REPO_DIR" pm2 start claude-server.js --name claude-remote
pm2 save

echo ""
echo "──────────────────────────────"
echo "✅ Claude Remote พร้อมแล้ว!"
echo "──────────────────────────────"
echo "📍 รันอยู่ที่: http://$(curl -s ifconfig.me):4000"
echo ""
echo "📌 สิ่งที่ต้องทำต่อ:"
echo "  1. ตั้งค่า ANTHROPIC_API_KEY (ถ้ายังไม่ได้):"
echo "     export ANTHROPIC_API_KEY=sk-ant-..."
echo "     แล้ว pm2 restart claude-remote"
echo ""
echo "  2. ไปที่ Dokploy > Projects > สร้าง Domain ใหม่:"
echo "     Host: claude.expert8solution.cloud (หรือชื่อที่ต้องการ)"
echo "     Port: 4000"
echo "     HTTPS: เปิด"
echo ""
echo "  3. ตั้ง DNS A record ชี้โดเมนมาที่ IP ของ VPS"
echo ""
echo "📋 คำสั่งที่มีประโยชน์:"
echo "  pm2 logs claude-remote    ← ดู logs"
echo "  pm2 restart claude-remote ← restart"
echo "  pm2 status                ← ดูสถานะ"
echo "──────────────────────────────"
