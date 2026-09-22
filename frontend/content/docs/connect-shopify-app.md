---
title: Connect Shopify App
description: Add your Shopify apps by App ID so every install syncs into Alliances PRO, and collect merchant emails from your app's OAuth callback.
section: Integrations
order: 2
author: Nafeeur Rahman
role: Founder, Alliances PRO
published: 2026-09-15
updated: 2026-09-16
art: shopify-plug
---

## Overview

When you connect your Shopify apps, Alliances PRO keeps track of the stores that have installed them. Each time a store installs one of your apps, the store is added to **Companies** as a merchant. When a store uninstalls, its status changes to **Uninstalled**. You don't need to change any code in your app.

Merchant contact details are a separate step. The Partner API tells us *which* store installed your app, not the owner's email address. If you want that too, your app sends it to Alliances PRO once per install — see [Step 3](#step-3-collect-merchant-emails-optional).

## Before you start

- A connected Shopify Partner account. If you haven't done that yet, follow [How to Connect Shopify Partner](/docs/connect-shopify-partner) first.
- The app must belong to the same Partner organization you connected.

## Step 1: Find your App ID

1. Log in to your [Shopify Partners Dashboard](https://partners.shopify.com).
2. In the left sidebar, click **App distribution**.
3. Click the app you want to sync.
4. Look at the address bar. The URL is `https://partners.shopify.com/<partner-id>/apps/<app-id>` — the last number is your **App ID**.

For example, in `https://partners.shopify.com/3150156/apps/327284654081` the App ID is `327284654081`.

## Step 2: Add the app in Alliances PRO

Go to **Settings → Shopify** and find the **Apps** section. Paste the App ID into the first field and click **+**.

![The Apps section of the Shopify settings page, with the App ID field and the optional App Store listing field](/docs/connect-apps.png)

You can paste the full app URL instead of the number — Alliances PRO takes the ID out of it for you.

The second field is the **App Store listing** (for example `apps.shopify.com/your-app`). It's optional: fill it in once your app is live.

Repeat for each app you want to track. Every app you add here starts syncing its installs; apps you leave out are ignored.

## Step 3: Collect merchant emails (optional)

Installs and uninstalls sync on their own. Merchant contact details — owner name, email, phone — can only come from your own app, because only your app holds the merchant's access token. Adding this means your app sends the shop's details to Alliances PRO once, right after OAuth completes.

Skip this step if you only need to know which stores installed your app.

### Create your ingest token

On the same **Settings → Shopify** page, open **Merchant email collection** and create the token your app will authenticate with.

One token covers every app in the workspace. The token is stored hashed and can't be shown again, so copy it now and keep it with your app's other secrets. If you lose it, **Regenerate token** — then update your app at the same time, because the old token stops working immediately.

### Post to your ingest URL after OAuth

Step 2 on that page shows the URL for your workspace, with your workspace's ID already in it. Copy it from there and use it in place of `INGEST_URL` below.

The request needs three headers:

| Header | Value |
|---|---|
| `Authorization` | `Bearer <your ingest token>` |
| `X-Shopify-Topic` | `app/installed` |
| `X-Shopify-Shop-Domain` | The installing store, e.g. `example.myshopify.com` |

The body is the shop object from Shopify's Admin API. Send the request after you've stored the access token, and don't let it block the install — every example below either times out fast or fails quietly.

#### React Router

```tsx
// app/routes/auth.$.tsx — after OAuth completes. Runs once per install.
const { admin, session } = await authenticate.admin(request);
const shop = (await admin.rest.resources.Shop.all({ session })).data[0];

await fetch(INGEST_URL, {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
    Authorization: "Bearer YOUR_INGEST_TOKEN",
    "X-Shopify-Topic": "app/installed",
    "X-Shopify-Shop-Domain": session.shop
  },
  body: JSON.stringify(shop),
  // Never let a slow CRM hold up the merchant's install.
  signal: AbortSignal.timeout(5000)
}).catch(() => {});
```

#### Node.js

```js
// In your OAuth callback, after you store the access token.
const r = await fetch(`https://${shop}/admin/api/2026-07/shop.json`, {
  headers: { "X-Shopify-Access-Token": accessToken }
});
const { shop: shopData } = await r.json();

await fetch(INGEST_URL, {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
    Authorization: "Bearer YOUR_INGEST_TOKEN",
    "X-Shopify-Topic": "app/installed",
    "X-Shopify-Shop-Domain": shop
  },
  body: JSON.stringify(shopData),
  // Never let a slow CRM hold up the merchant's install.
  signal: AbortSignal.timeout(5000)
}).catch(() => {});
```

#### Laravel

```php
// In your OAuth callback, after you store the access token.
$shop = Http::withHeaders(['X-Shopify-Access-Token' => $accessToken])
    ->get("https://{$shopDomain}/admin/api/2026-07/shop.json")
    ->json('shop');

// timeout() so a slow CRM never holds up the merchant's install.
Http::withToken('YOUR_INGEST_TOKEN')
    ->timeout(5)
    ->withHeaders([
        'X-Shopify-Topic' => 'app/installed',
        'X-Shopify-Shop-Domain' => $shopDomain,
    ])
    ->post(INGEST_URL, $shop);
```

#### cURL

```bash
# Test the connection by hand before touching your app.
curl -X POST "INGEST_URL" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_INGEST_TOKEN" \
  -H "X-Shopify-Topic: app/installed" \
  -H "X-Shopify-Shop-Domain: example.myshopify.com" \
  -d '{
    "name": "Example Store",
    "email": "owner@example.com",
    "phone": "+1 555 0100",
    "shop_owner": "Jane Doe",
    "domain": "example.com",
    "myshopify_domain": "example.myshopify.com",
    "country_code": "US",
    "currency": "USD",
    "plan_name": "basic",
    "plan_display_name": "Basic"
  }'
```

### Check it worked

Run the cURL example, then reload **Settings → Shopify**. **Merchant email collection** shows **Working** with the time it last received a payload. The example store appears in **Companies** with its email attached.

If it still says nothing has arrived, check that you copied the whole URL, that the token is sent as `Bearer <token>`, and that your app reaches the internet from wherever it runs.

## What happens next

- A store installs your app → it's added to **Companies** as a merchant.
- A store uninstalls → its status changes to **Uninstalled**; nothing is deleted.
- Your app posts the shop details → the merchant's name, email and phone are filled in, and you can follow up from the CRM.
