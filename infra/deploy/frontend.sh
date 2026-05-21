#!/usr/bin/env bash
# Atomic Next.js release on the droplet.
# Piped via SSH stdin from .github/workflows/deploy.yml.
set -euo pipefail

APP=/var/www/alliances/frontend
REPO=https://github.com/nafeeur10/alliances.pro.git
BRANCH=main
TS=$(date +%Y%m%d%H%M%S)
RELEASE=$APP/releases/$TS

git clone --depth 1 --branch "$BRANCH" "$REPO" "$RELEASE"
cd "$RELEASE/frontend"

# NEXT_PUBLIC_* values are inlined at build time, so .env.production must
# be present BEFORE `npm run build`.
cp "$APP/shared/.env.production" .env.production

npm ci --no-audit --no-fund
npm run build

ln -snf "$RELEASE/frontend" "$APP/current"

# systemctl --user via non-interactive SSH needs XDG_RUNTIME_DIR.
# `loginctl enable-linger deploy` (one-time, as root) keeps /run/user/$UID alive.
export XDG_RUNTIME_DIR="/run/user/$(id -u)"
systemctl --user restart alliances-frontend

ls -1dt "$APP"/releases/* | tail -n +6 | xargs -r rm -rf

echo "[deploy] frontend release $TS live"
