#!/usr/bin/env bash
# Atomic, self-healing Next.js release.
#
# Guarantees the site never serves a broken release:
#   1. Build the new release WITHOUT touching `current/`.
#   2. Flip `current/` only after the build succeeds.
#   3. Restart the service and curl localhost.
#   4. If the health check fails, flip `current/` back to the previous
#      release and restart — the old code keeps serving.
#
# Piped via SSH stdin from .github/workflows/deploy.yml.

set -euo pipefail

APP=/var/www/alliances/frontend
REPO=https://github.com/nafeeur10/alliances.pro.git
BRANCH=main
TS=$(date +%Y%m%d%H%M%S)
RELEASE=$APP/releases/$TS
HEALTH_URL=${HEALTH_URL:-http://127.0.0.1:3001/}
HEALTH_TIMEOUT=${HEALTH_TIMEOUT:-30}   # seconds to wait for a 2xx/3xx

# Remember the currently-live release so we can roll back if needed.
PREVIOUS=""
if [ -L "$APP/current" ]; then
  PREVIOUS=$(readlink -f "$APP/current")
fi

cleanup_failed_release() {
  # Build/test failed BEFORE we flipped the symlink — old release is fine,
  # just remove the half-baked one to keep the releases dir clean.
  echo "[deploy] aborting; removing failed release $RELEASE"
  rm -rf "$RELEASE"
}

rollback() {
  echo "[deploy] HEALTH CHECK FAILED — rolling back to $PREVIOUS"
  if [ -n "$PREVIOUS" ] && [ -d "$PREVIOUS" ]; then
    ln -snf "$PREVIOUS" "$APP/current"
    sudo -n /bin/systemctl restart alliances-frontend || true
  fi
  rm -rf "$RELEASE"
  exit 1
}

# --- 1. Build new release in isolation ------------------------------------

trap cleanup_failed_release ERR
git clone --depth 1 --branch "$BRANCH" "$REPO" "$RELEASE"
cd "$RELEASE/frontend"
cp "$APP/shared/.env.production" .env.production
npm ci --no-audit --no-fund
npm run build
trap - ERR

# --- 2. Flip symlink + restart --------------------------------------------

ln -snf "$RELEASE/frontend" "$APP/current"
sudo -n /bin/systemctl restart alliances-frontend

# --- 3. Health check with rollback on failure -----------------------------

echo "[deploy] waiting up to ${HEALTH_TIMEOUT}s for $HEALTH_URL ..."
deadline=$((SECONDS + HEALTH_TIMEOUT))
while [ $SECONDS -lt $deadline ]; do
  if curl -fsS --max-time 5 -o /dev/null "$HEALTH_URL"; then
    echo "[deploy] frontend release $TS live"

    # --- 4. Prune old releases (keep last 5) ------------------------------
    ls -1dt "$APP"/releases/* | tail -n +6 | xargs -r rm -rf
    exit 0
  fi
  sleep 2
done

rollback
