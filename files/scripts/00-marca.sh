#!/usr/bin/env bash
# Pone la identidad de LirioOS en el sistema.
# No se toca ID ni ID_LIKE para no romper las herramientas de Bazzite/Universal Blue.
set -euo pipefail

OSREL=/usr/lib/os-release

sed -i 's/^NAME=.*/NAME="LirioOS"/' "$OSREL"
sed -i 's/^PRETTY_NAME=.*/PRETTY_NAME="LirioOS (basado en Bazzite)"/' "$OSREL"

if grep -q '^LOGO=' "$OSREL"; then
  sed -i 's/^LOGO=.*/LOGO=lirioos-logo/' "$OSREL"
else
  echo 'LOGO=lirioos-logo' >> "$OSREL"
fi

# Refrescar la caché de iconos para que se vea el logo del lirio
gtk-update-icon-cache -f /usr/share/icons/hicolor 2>/dev/null || true
