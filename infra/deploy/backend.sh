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

sudo systemctl reload php8.4-fpm
sudo systemctl restart alliances-queue

ls -1dt "$APP"/releases/* | tail -n +6 | xargs -r rm -rf

echo "[deploy] backend release $TS live"
