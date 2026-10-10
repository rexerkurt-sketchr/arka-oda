#!/bin/bash
cd "$(dirname "$0")"
PORT=8765
if lsof -iTCP:"$PORT" -sTCP:LISTEN >/dev/null 2>&1; then
  PORT=8775
fi
IP="$(ipconfig getifaddr en0 2>/dev/null || ipconfig getifaddr en1 2>/dev/null || true)"
echo ""
echo "Arka Oda açılıyor."
echo "Bu bilgisayar: http://localhost:$PORT"
if [ -n "$IP" ]; then
  echo "Aynı Wi-Fi'deki telefon: http://$IP:$PORT"
  echo "Telefonda Safari veya Chrome ile aç, sonra Ana Ekrana Ekle."
fi
echo "Kapatmak için bu pencerede Control-C."
echo ""
open "http://localhost:$PORT"
exec python3 -m http.server "$PORT"
