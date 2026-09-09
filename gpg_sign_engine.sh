#!/usr/bin/env bash
set -euo pipefail
TARGET="${1:-data/theft_log.json}"
if ! command -v gpg >/dev/null 2>&1; then echo "GPG no disponible; configure una clave en CI" >&2; exit 2; fi
gpg --armor --detach-sign --output "${TARGET}.asc" "$TARGET"
echo "Firma creada: ${TARGET}.asc"
