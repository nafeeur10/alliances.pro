# Deploy runbook — alliances.pro on Digital Ocean

Auto-deploy on push to `main`:
- `frontend/**` changes → redeploy Next.js (`https://alliances.pro`)
- `backend/**` changes → redeploy Laravel (`https://site-api.alliances.pro`)

Wired by `.github/workflows/deploy.yml`. Both jobs SSH into the droplet as `deploy@$DEPLOY_HOST` and pipe the matching script in this directory through `bash -s`.

---

## GitHub secrets (one-time)

On `nafeeur10/alliances.pro` → Settings → Secrets and variables → Actions:

| Secret | Value |
|---|---|
| `DEPLOY_HOST` | droplet IP or hostname |
| `DEPLOY_SSH_KEY` | private key (full PEM, including `BEGIN/END` lines) |

Generate the keypair locally:
```bash
ssh-keygen -t ed25519 -C "github-actions-alliances" -f deploy_key -N ""
# put deploy_key.pub on the droplet (see step 1b below)
# paste deploy_key into DEPLOY_SSH_KEY
```

---

## Droplet bootstrap (one-time, as root)

### 1a. DNS
- `A   alliances.pro          → <droplet-ip>`
- `A   www.alliances.pro      → <droplet-ip>`
- `A   site-api.alliances.pro → <droplet-ip>`

### 1b. Deploy user
```bash
adduser --disabled-password --gecos "" deploy
usermod -aG www-data deploy
mkdir -p /home/deploy/.ssh && chmod 700 /home/deploy/.ssh
nano /home/deploy/.ssh/authorized_keys   # paste deploy_key.pub
chmod 600 /home/deploy/.ssh/authorized_keys
chown -R deploy:deploy /home/deploy/.ssh
```

### 1c. Sudo for service reloads
```bash
visudo -f /etc/sudoers.d/deploy
# Paste:
deploy ALL=(root) NOPASSWD: /bin/systemctl reload php8.4-fpm, /bin/systemctl restart alliances-queue, /bin/systemctl restart alliances-frontend
```

### 1d. Release directories
```bash
sudo -u deploy mkdir -p /var/www/alliances/{frontend,backend}/{releases,shared}
sudo -u deploy mkdir -p /var/www/alliances/backend/shared/storage/{app/public,framework/{cache,sessions,views},logs}
sudo -u deploy touch /var/www/alliances/backend/shared/.env
sudo -u deploy touch /var/www/alliances/frontend/shared/.env.production
chmod -R 775 /var/www/alliances/backend/shared/storage
```

### 1e. PHP extensions
```bash
apt-get install -y php8.4-{fpm,cli,mbstring,xml,bcmath,curl,zip,intl,mysql,redis,gd,exif} unzip
```

### 1f. MySQL DB + user
```sql
CREATE DATABASE alliances_marketing CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
CREATE USER 'alliances'@'localhost' IDENTIFIED BY '<strong-password>';
GRANT ALL PRIVILEGES ON alliances_marketing.* TO 'alliances'@'localhost';
FLUSH PRIVILEGES;
```

### 1g. Backend `.env`
Copy `backend/.env.example` to `/var/www/alliances/backend/shared/.env`. Override:
```ini
APP_ENV=production
APP_DEBUG=false
APP_URL=https://site-api.alliances.pro
MARKETING_SITE_URL=https://alliances.pro
APP_MARKETING_ORIGINS="https://alliances.pro,https://www.alliances.pro"

DB_HOST=127.0.0.1
DB_DATABASE=alliances_marketing
DB_USERNAME=alliances
DB_PASSWORD=<strong-password>

REDIS_HOST=127.0.0.1
REDIS_DB=2
REDIS_CACHE_DB=3

MAIL_HOST=<smtp host>
MAIL_USERNAME=<smtp user>
MAIL_PASSWORD=<smtp pass>
MAIL_ENCRYPTION=tls
```
Then generate `APP_KEY`:
```bash
cd /var/www/alliances/backend/shared
php artisan key:generate --show   # paste into APP_KEY=
```

### 1h. Frontend `.env.production`
At `/var/www/alliances/frontend/shared/.env.production`:
```ini
NEXT_PUBLIC_SITE_URL=https://alliances.pro
NEXT_PUBLIC_API_BASE=https://site-api.alliances.pro/api/v1/marketing
INTERNAL_API_URL=https://site-api.alliances.pro/api/v1/marketing
NEXT_PUBLIC_PLAUSIBLE_DOMAIN=alliances.pro
```

### 1i. nginx + SSL
```bash
cp infra/nginx/alliances.pro.conf /etc/nginx/sites-available/alliances.pro
cp infra/nginx/site-api.alliances.pro.conf /etc/nginx/sites-available/site-api.alliances.pro
ln -s /etc/nginx/sites-available/alliances.pro          /etc/nginx/sites-enabled/
ln -s /etc/nginx/sites-available/site-api.alliances.pro /etc/nginx/sites-enabled/
nginx -t && systemctl reload nginx
certbot --nginx -d alliances.pro -d www.alliances.pro
certbot --nginx -d site-api.alliances.pro
```

### 1j. systemd units
```bash
cp infra/systemd/alliances-frontend.service /etc/systemd/system/
cp infra/systemd/alliances-queue.service    /etc/systemd/system/
systemctl daemon-reload
# Don't enable/start yet — current/ doesn't exist until first deploy.
```

### 1k. Cron (scheduler)
```bash
sudo -u deploy crontab -e
# Append:
* * * * * cd /var/www/alliances/backend/current && php artisan schedule:run >> /dev/null 2>&1
```

---

## First deploy (manual bootstrap)

Trigger the workflow via Actions → Deploy → "Run workflow" (workflow_dispatch), OR
run the scripts locally on the droplet first:
```bash
sudo -u deploy bash -c 'curl -fsSL https://raw.githubusercontent.com/nafeeur10/alliances.pro/main/infra/deploy/backend.sh | bash'
sudo -u deploy bash -c 'curl -fsSL https://raw.githubusercontent.com/nafeeur10/alliances.pro/main/infra/deploy/frontend.sh | bash'
sudo systemctl enable --now alliances-frontend alliances-queue
```

After the symlinks exist:
```bash
cd /var/www/alliances/backend/current
sudo -u deploy php artisan make:filament-user   # create first admin
```

---

## Smoke tests

```bash
dig +short alliances.pro site-api.alliances.pro
curl -I https://alliances.pro                                   # → 200
curl -I https://site-api.alliances.pro                          # → 200/302
curl  https://site-api.alliances.pro/api/v1/marketing/blog       # → JSON
sudo journalctl -u alliances-frontend -n 50
sudo journalctl -u alliances-queue -n 50
```

Then push a trivial change to `main` and watch the Actions run.

---

## Rollback

```bash
cd /var/www/alliances/backend
ls -1dt releases/*                     # find the previous timestamp
sudo -u deploy ln -snf releases/<ts>/backend current
sudo systemctl reload php8.4-fpm
sudo systemctl restart alliances-queue
```
Same pattern for `frontend`, but restart `alliances-frontend` instead.
