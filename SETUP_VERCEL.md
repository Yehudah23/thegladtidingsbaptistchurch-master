# 🚀 Complete Vercel Deployment Setup Guide

## Problem
Uploaded sermons don't show on other devices when accessing your Vercel link because the API URL needs to be configured for your production backend.

## ✅ Step-by-Step Solution

### Step 1: Determine Your Production Backend URL
First, you need to know where your Laravel backend is running in production.

**Options:**
- Self-hosted server: `https://your-ip-or-domain.com:8001`
- Cloud service (AWS, DigitalOcean, etc.): `https://your-backend-server.com`
- Custom domain: `https://api.thegladtidingsbaptist.org`

**Write down your backend URL:** `_________________________________`

### Step 2: Set Environment Variable on Vercel

1. **Log in to Vercel Dashboard:** https://vercel.com/dashboard
2. **Select your project** (thegladtidingsbaptistchurch)
3. **Go to:** Settings → Environment Variables
4. **Add new variable:**
   - **Name:** `VUE_APP_API_BASE_URL`
   - **Value:** (paste your backend URL from Step 1)
   - **Environments:** Toggle ON for: Production, Preview, Development
5. **Click Save**

### Step 3: Redeploy
After setting the environment variable, redeploy your app:

**Option A:** Automatic redeploy
- Push a commit to your repository
```bash
git add .
git commit -m "Configure API for production"
git push
```

**Option B:** Manual redeploy
- In Vercel Dashboard → Deployments → Click "Redeploy for..." button

### Step 4: Verify It Works
1. Open your Vercel app on any device
2. Upload a sermon from the admin panel
3. Check if it appears on the page
4. Open DevTools (F12) → Network tab
5. You should see API calls going to your backend domain (not localhost)

---

## 🔍 Troubleshooting

### Problem: Still showing 404 or connection errors

**Solution:**
1. Verify the backend URL works:
   ```bash
   curl https://YOUR_BACKEND_URL/api/sermons
   ```
   Should return JSON data, not HTML error

2. Check Vercel environment variables were saved:
   - Redeploy after setting them
   - Wait 30 seconds for changes to propagate

3. Check browser cache:
   - Open DevTools → Application → Clear Site Data
   - Or use Ctrl+Shift+Delete to clear all cache

### Problem: CORS error (blocked by browser)

Your backend must allow Vercel domain. This is already configured, but verify:
- Check that `config/cors.php` has Vercel pattern allowed
- Restart Laravel server: `php artisan serve --port=8001`

### Problem: Sermons upload works locally but not on Vercel

1. Make sure `VUE_APP_API_BASE_URL` is set in Vercel
2. The fallback value `http://127.0.0.1:8001` only works locally
3. Verify backend is accessible from internet (not blocked by firewall)

---

## 📋 Configuration Files Reference

| File | Purpose | Local | Production |
|---|---|---|---|
| `.env` | Default fallback | ✓ | ✓ |
| `.env.local` | Local development | ✓ (if exists) | ✗ |
| `.env.production` | Production template | ✗ | Info only |
| `vercel.json` | Vercel configuration | ✗ | ✓ |
| Vercel Dashboard | Environment vars | ✗ | ✓ (MOST IMPORTANT) |

---

## 🎯 Quick Reference: What to Set Where

```
DEVELOPMENT (Local):
  .env.local → VUE_APP_API_BASE_URL=http://127.0.0.1:8001

PRODUCTION (Vercel):
  Vercel Dashboard → Environment Variables → VUE_APP_API_BASE_URL=https://your-backend-domain
```

---

## ✨ How It Works

1. **Locally:** `http://127.0.0.1:8001` (your laptop's backend)
2. **On Vercel:** Uses `VUE_APP_API_BASE_URL` from Vercel Dashboard
3. **On Other Devices:** Accessing Vercel link uses the correct production backend

---

## 📞 Example Backend URL Setup

### If backend is on same server (port 8001):
```
VUE_APP_API_BASE_URL=https://your-domain.com:8001
```

### If backend is on subdomain:
```
VUE_APP_API_BASE_URL=https://api.your-domain.com
```

### If using IP address:
```
VUE_APP_API_BASE_URL=https://123.456.789.012:8001
```

---

## Done! 
Once Vercel is redeployed with the correct backend URL, all devices accessing your Vercel link will see the uploaded sermons.
