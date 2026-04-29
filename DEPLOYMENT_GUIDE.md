# Alliances PRO - cPanel Deployment Guide

## Build Status
✅ **Build Completed Successfully**
- Output Directory: `out/`
- Total Size: ~3.5MB
- Pages Generated: 5 static pages

## Files Ready for Upload

All your static files are in the `out/` directory and ready for cPanel deployment.

---

## Deployment Steps for cPanel

### Method 1: Using File Manager (Recommended for Small Sites)

1. **Login to cPanel**
   - Go to your hosting provider's cPanel login page
   - Enter your credentials

2. **Navigate to File Manager**
   - Find and click "File Manager" in cPanel
   - Navigate to `public_html` (or your domain's document root)

3. **Clear Existing Files (if any)**
   - If this is a fresh installation, skip this step
   - Otherwise, select and delete old files in `public_html`

4. **Upload Files**
   - Click "Upload" button in File Manager
   - Navigate to your local `out/` folder
   - Select ALL files and folders from the `out/` directory
   - Upload them to `public_html`

5. **Verify Upload**
   - Ensure these files are in `public_html`:
     - `index.html`
     - `404.html`
     - `_next/` folder
     - `avatars/` folder
     - All image files (hero.png, seo.jpg, etc.)
     - `favicon.ico`

### Method 2: Using FTP Client (Recommended for Larger Sites)

1. **Setup FTP Client**
   - Download FileZilla or any FTP client
   - Get FTP credentials from cPanel (FTP Accounts section)

2. **Connect to Server**
   - Host: your-domain.com (or IP address)
   - Username: Your FTP username
   - Password: Your FTP password
   - Port: 21 (or as specified by host)

3. **Upload Files**
   - Navigate to `public_html` on remote server
   - Upload ALL contents from the `out/` folder
   - Wait for upload to complete

### Method 3: Using cPanel Terminal/SSH (Advanced)

If you have SSH access enabled:

```bash
# On your local machine, create a zip
cd /Users/nafeeur10/Projects/cosmic
zip -r alliances-pro.zip out/*

# Upload via SCP
scp alliances-pro.zip username@your-domain.com:~/

# SSH into server
ssh username@your-domain.com

# Unzip to public_html
cd ~/public_html
unzip ~/alliances-pro.zip
mv out/* .
rm -rf out
```

---

## Post-Deployment Configuration

### 1. Setup .htaccess for Clean URLs

Create/update `.htaccess` in `public_html`:

```apache
# Alliances PRO - .htaccess Configuration

# Enable Rewrite Engine
RewriteEngine On

# Redirect www to non-www (optional)
RewriteCond %{HTTP_HOST} ^www\.(.*)$ [NC]
RewriteRule ^(.*)$ https://%1/$1 [R=301,L]

# Force HTTPS (optional but recommended)
RewriteCond %{HTTPS} off
RewriteRule ^(.*)$ https://%{HTTP_HOST}%{REQUEST_URI} [L,R=301]

# Handle 404 errors
ErrorDocument 404 /404.html

# Cache static assets
<IfModule mod_expires.c>
  ExpiresActive On
  ExpiresByType image/jpg "access plus 1 year"
  ExpiresByType image/jpeg "access plus 1 year"
  ExpiresByType image/png "access plus 1 year"
  ExpiresByType image/svg+xml "access plus 1 year"
  ExpiresByType text/css "access plus 1 month"
  ExpiresByType application/javascript "access plus 1 month"
  ExpiresByType text/javascript "access plus 1 month"
</IfModule>

# Compression
<IfModule mod_deflate.c>
  AddOutputFilterByType DEFLATE text/html text/plain text/xml text/css text/javascript application/javascript
</IfModule>
```

### 2. Verify Metadata URLs

Once deployed, update `app/page.tsx` with your actual domain:

```typescript
url: "https://your-actual-domain.com",
site: "https://your-actual-domain.com",
```

Then rebuild and re-upload.

### 3. Test Your Deployment

Visit your domain and check:
- ✅ Homepage loads correctly
- ✅ All sections display properly
- ✅ Images load (check hero image, avatars)
- ✅ Navigation works
- ✅ Responsive design on mobile
- ✅ Forms are functional
- ✅ All links work correctly

---

## File Permissions (if needed)

Set proper permissions via cPanel File Manager:
- Directories: 755
- Files: 644

---

## Troubleshooting

### Issue: Site shows blank page
**Solution**: Check browser console for errors. Ensure all files uploaded correctly.

### Issue: Images not loading
**Solution**: Verify `avatars/` folder and image files uploaded. Check file permissions.

### Issue: 404 errors on refresh
**Solution**: Ensure `.htaccess` file is configured properly (see above).

### Issue: CSS/JS not loading
**Solution**: Check that `_next/` folder uploaded completely with all subfolders.

### Issue: Domain shows old site
**Solution**: Clear browser cache or try incognito mode. May need to wait for DNS propagation.

---

## Quick Upload Command Summary

For quick re-deployment after changes:

```bash
# Rebuild
npm run build

# Then upload the out/ folder contents to public_html via FTP or File Manager
```

---

## Support

Your site is now ready to be deployed to cPanel! The static export is optimized and ready for production.

**Built with:**
- Next.js 16.2 (latest)
- React 19
- TailwindCSS 4
- TypeScript 5

**Total Build Size**: ~3.5MB
**Load Time**: Optimized for fast loading
**SEO**: Fully optimized with proper metadata
