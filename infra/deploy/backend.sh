#!/usr/bin/env bash
# Atomic, self-healing Laravel release.
#
# Guarantees the API never serves a broken release:
#   1. Composer + caches happen in the new release dir, NOT current/.
#   2. Migrations run before the symlink flip — if they fail, old code
#      keeps serving.
#   3. Flip `current/`, reload FPM, then curl the health endpoint.
#   4. If health fails, flip back and reload FPM again.
#
# Piped via SSH stdin from .github/workflows/deploy.yml.

set -euo pipefail

APP=/var/www/alliances/backend
REPO=https://github.com/nafeeur10/alliances.pro.git
BRANCH=main
TS=$(date +%Y%m%d%H%M%S)
RELEASE=$APP/releases/$TS
HEALTH_URL=${HEALTH_URL:-https://site-api.alliances.pro/up}
HEALTH_TIMEOUT=${HEALTH_TIMEOUT:-20}

PREVIOUS=""
if [ -L "$APP/current" ]; then
  PREVIOUS=$(readlink -f "$APP/current")
fi

cleanup_failed_release() {
  echo "[deploy] aborting; removing failed release $RELEASE"
  rm -rf "$RELEASE"
}

rollback() {
  echo "[deploy] HEALTH CHECK FAILED — rolling back to $PREVIOUS"
  if [ -n "$PREVIOUS" ] && [ -d "$PREVIOUS" ]; then
    ln -snf "$PREVIOUS" "$APP/current"
    sudo -n /bin/systemctl reload php8.4-fpm || true
    sudo -n /bin/systemctl restart alliances-queue || true
  fi
  rm -rf "$RELEASE"
  exit 1
}

# --- 1. Prepare new release in isolation ----------------------------------

trap cleanup_failed_release ERR

git clone --depth 1 --branch "$BRANCH" "$REPO" "$RELEASE"
cd "$RELEASE/backend"

ln -snf "$APP/shared/.env" .env
rm -rf storage
ln -snf "$APP/shared/storage" storage

composer install --no-dev --optimize-autoloader --no-interaction --prefer-dist
php artisan storage:link || true
php artisan migrate --force
php artisan config:cache
php artisan route:cache
php artisan view:cache
php artisan filament:cache-components || true

trap - ERR

# --- 2. Flip symlink + restart workers -------------------------------------

ln -snf "$RELEASE/backend" "$APP/current"
php artisan optimize:clear
sudo -n /bin/systemctl reload php8.4-fpm
sudo -n /bin/systemctl restart alliances-queue

# --- 3. Health check with rollback on failure ------------------------------

echo "[deploy] waiting up to ${HEALTH_TIMEOUT}s for $HEALTH_URL ..."
deadline=$((SECONDS + HEALTH_TIMEOUT))
while [ $SECONDS -lt $deadline ]; do
  if curl -fsS --max-time 5 -o /dev/null "$HEALTH_URL"; then
    echo "[deploy] backend release $TS live"
    ls -1dt "$APP"/releases/* | tail -n +6 | xargs -r rm -rf
    exit 0
  fi
  sleep 2
done

rollback
