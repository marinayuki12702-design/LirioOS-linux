#!/usr/bin/env bash
# Se ejecuta una sola vez en el primer inicio de sesión de cada usuario.
marca="$HOME/.config/lirioos/primer-inicio-hecho"
[ -f "$marca" ] && exit 0
mkdir -p "$(dirname "$marca")"

# Esperar a que el escritorio esté listo
for _ in $(seq 1 30); do
  pgrep -x plasmashell >/dev/null && break
  sleep 1
done
sleep 4

/usr/bin/lirio-estilo win11 claro && touch "$marca"
exit 0
