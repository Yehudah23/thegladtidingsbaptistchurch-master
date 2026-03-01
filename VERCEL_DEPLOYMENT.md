# Vercel Deployment Setup Guide

## Problem
The uploaded messages don't load after deploying to Vercel because the API is hardcoded to localhost (`http://127.0.0.1:8001`). Vercel is a cloud platform and can't access your local backend.

## Solution

### Step 1: Determine Your Backend URL
You need to know where your Laravel backend is hosted. This could be:
- A domain you own: `https://api.thegladtidingsbaptist.org`
- A cloud server: `https://your-backend-server.com:8001`
- A specific IP/domain: `https://[your-actual-domain]/api`

**Ask yourself:** Where is the Laravel backend running in production?

### Step 2: Update .env.production
Edit `.env.production` and replace `YOUR_BACKEND_DOMAIN` with your actual backend URL:

```
VUE_APP_API_BASE_URL=https://your-actual-backend-domain.com
```

### Step 3: Configure Vercel Environment Variables
1. Go to [Vercel Dashboard](https://vercel.com/dashboard)
2. Select your project
3. Click **Settings** → **Environment Variables**
4. Add a new variable:
   - Name: `VUE_APP_API_BASE_URL`
   - Value: `https://your-actual-backend-domain.com` (your production backend URL)
   - Select environments: **Production**, **Preview**, and **Development**
5. Click **Save**

### Step 4: Redeploy
1. Push changes or redeploy from Vercel dashboard
2. Vercel will rebuild with the new environment variable

## Environment-Specific Configuration

| Environment | File | Purpose |
|---|---|---|
| Local Dev | `.env.local` | Points to `http://127.0.0.1:8001` |
| Production | `.env.production` | Points to your production backend |
| Vercel | Environment Variables | Overrides `.env.production` |

## Testing

After deployment, check:
1. Open browser DevTools (F12)
2. Go to Network tab
3. Upload a message and watch the API request
4. It should go to your backend domain, not localhost

## Troubleshooting

If messages still don't load:
1. Check that your backend is accessible from the internet
2. Verify CORS settings on your backend (allow Vercel domain)
3. Check browser console for error messages
4. Verify the correct backend URL in Vercel environment variables

## CORS Configuration (Backend)

Make sure your Laravel backend allows requests from Vercel:

In `config/cors.php` or middleware, allow your Vercel domain:
```php
'allowed_origins' => [
    'http://localhost:3000',
    'http://localhost:8080',
    'https://your-vercel-project.vercel.app', // Add your Vercel domain
    // Add any other allowed domains
],
```

## Need Help?

- Vercel Env Vars: https://vercel.com/docs/concepts/projects/environment-variables
- Laravel CORS: https://laravel.com/docs/11.x/cors
