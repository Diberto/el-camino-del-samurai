#!/bin/bash
# Install & Enable PocketBase Systemd Service on Linux VPS
echo "⚔️ Instalando Servicio PocketBase Backend..."

# 1. Ensure PocketBase binary is installed
node scripts/start-pocketbase.js &
PID=$!
sleep 4
kill $PID 2>/dev/null || true

# 2. Copy systemd service file
CP_PATH="/etc/systemd/system/pocketbase.service"
sudo cp scripts/pocketbase.service $CP_PATH

# 3. Reload systemd daemon & enable service
sudo systemctl daemon-reload
sudo systemctl enable pocketbase
sudo systemctl restart pocketbase

echo "✅ Servicio PocketBase activo y configurado para iniciar automáticamente en Linux (Port 8090)."
sudo systemctl status pocketbase --no-pager
