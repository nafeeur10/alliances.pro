#!/usr/bin/env bash
# Atomic Laravel release on the droplet.
# Piped via SSH stdin from .github/workflows/deploy.yml.
set -euo pipefail

APP=/var/www/alliances/backend
REPO=https://github.com/nafeeur10/alliances.pro.git
BRANCH=main
TS=$(date +%Y%m%d%H%M%S)
RELEASE=$APP/releases/$TS

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

ln -snf "$RELEASE/backend" "$APP/current"

# Tell running PHP-FPM workers to pick up the new code (no sudo: `opcache_reset`
# via artisan + queue:restart signals workers to exit gracefully and systemd
# auto-restarts them).
php artisan optimize:clear
php artisan queue:restart

# PHP-FPM reload is the only remaining root action. It's gated by a narrow
# sudoers rule (see infra/deploy/README.md §1c). If you ever drop FPM caching
# or move to FrankenPHP, this line can go away entirely.
export XDG_RUNTIME_DIR="/run/user/$(id -u)"
sudo -n /bin/systemctl reload php8.4-fpm

ls -1dt "$APP"/releases/* | tail -n +6 | xargs -r rm -rf

echo "[deploy] backend release $TS live"
