---
title: How to Connect Shopify Partner
description: Connect your Shopify Partner account to Alliances PRO so your stores, apps and referrals sync into the CRM.
section: Integrations
order: 1
author: Nafeeur Rahman
role: Founder, Alliances PRO
published: 2026-09-15
updated: 2026-09-16
art: shopify-plug
---

## Overview

When you connect your Shopify Partner account, Alliances PRO keeps track of your apps for you. Each time a store installs one of your apps, the store is added to **Companies** as a merchant. When a store uninstalls, its status changes to **Uninstalled**. You don't need to change any code in your app.

This helps because your whole merchant base sits in your CRM. You can see who is still using each app, spot stores that uninstalled, and schedule follow-ups with them, all from one place.

## Before you start

- A Shopify Partner account where you are allowed to create **Shopify Apps, Shopify Themes**. This is usually the account owner or an admin.

  ![Shopify Partner Dashboard showing the permissions to create Shopify Apps and Shopify Themes](/docs/partners-shopify.png)
- An Alliances PRO account set up as a **Shopify app founder** or **Shopify agency** workspace. The Shopify settings page only appears for these workspace types.

  ![Alliances PRO settings showing the Shopify Partner page](/docs/alliances-pro-settings-shopify-partner.png)
- The **Manage Shopify Apps** permission in Alliances PRO. Workspace owners have it by default. Members need an owner to grant it under **Settings → Roles**.

## Step 1: Copy your Partner ID

1. Log in to your [Shopify Partners Dashboard](https://partners.shopify.com).
2. In the left sidebar, click **Partner settings**.
3. Under **Account information**, copy the number shown as **Partner ID** (for example, `1234567`). This is the **Partner organization ID** you'll enter in Alliances PRO.

![Shopify Partner account settings showing the Partner ID under Account information](/docs/partner-id.png)

## Step 2: Create a Partner API client and copy the access token

1. On the same **Partner settings** page, scroll down to **Partner API clients**.
2. Click **Manage Partner API clients**.

   ![Partner API clients section with the Manage Partner API clients button](/docs/manage-partner-api-client.png)

3. Click **Create API client**, give it a name (for example, `Alliances PRO`), and tick the **Manage apps** permission.
4. Copy the **access token**. It starts with `prtapi_` and looks like `prtapi_xxxxxxxxxxxxxxxx`.

> Keep your access token private. Anyone with it can read your Partner data, so don't share it in email or chat.

## Step 3: Connect in Alliances PRO

1. In Alliances PRO, go to **Settings → Shopify** and open the **Shopify Partner connection** window.
2. Paste your **Partner ID** into **Partner organization ID**.
3. Paste your access token into **Partner API access token**.
4. Click **Test connection**. If both values are correct, you'll see:

   > Connected to organization 1234567. The token has no "View financials" scope, which is fine — nothing here needs it.

5. Click **Save & verify**.

![Alliances PRO Shopify Partner connection window with a successful test result](/docs/ap-connection-modal.png?width=480)

## Step 4: Check the connection

After you save, the **Shopify** settings page shows **Connected to organization** followed by your Partner ID. You can click **Edit connection** to change the details, or **Disconnect** to remove the connection.

![Alliances PRO Shopify settings showing a connected Shopify Partner account](/docs/success-partner-connection.png)
