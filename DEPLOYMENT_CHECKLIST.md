# ✅ Complete Deployment Checklist

## The Issue (Already Fixed)
❌ Sermons don't show on other devices accessing Vercel because the API still points to localhost

## What I've Fixed
✅ Removed hardcoded port 8002 references  
✅ Added cache-busting headers to API responses  
✅ Configured CORS to allow all Vercel domains  
✅ Added debug logging to show which API URL is being used  
✅ Created comprehensive deployment guides  

## What You MUST Do (Critical!)

### 1. ⚠️ Set Backend URL on Vercel Dashboard (IMPORTANT!)
```
Go to: https://vercel.com/dashboard
→ Select your project
→ Settings → Environment Variables
→ Add: VUE_APP_API_BASE_URL = https://YOUR_BACKEND_DOMAIN
→ Apply to: Production + Preview + Development
→ Save
```

**Replace `YOUR_BACKEND_DOMAIN` with your actual backend URL**
- Example: `https://api.thegladtidingsbaptist.org:8001`
- Or: `https://your-backend-server.com`

### 2. 🔄 Redeploy on Vercel
After setting the environment variable:
```bash
git add .
git commit -m "Configure Vercel deployment with production API"
git push
```
Or manually redeploy from Vercel dashboard

### 3. 🔐 Restart Backend Server
```bash
cd /home/judah/Documents/Laravel/thegladtidings
php artisan serve --port=8001
```

---

## Testing on Multiple Devices

1. **Open your Vercel link on a different device/browser**
2. **Go to Admin → Upload Message**
3. **Upload a test sermon**
4. **Refresh the page**
5. **New sermon should appear for all devices**

### Verify API Connection
On any device accessing Vercel:
1. Open DevTools (F12)
2. Go to Console tab
3. Should see: `[API Configuration] Using backend: https://YOUR_BACKEND_DOMAIN`
4. Go to Network tab
5. Upload a sermon
6. API calls should go to your backend domain, NOT localhost

---

## If Sermons Still Don't Show

### Diagnosis Steps

**Step 1: Check Vercel Environment Variable**
- Vercel Dashboard → Project → Deployments
- Click on latest deployment
- Check "Environment Variables" section
- Confirm `VUE_APP_API_BASE_URL` is set correctly

**Step 2: Clear Browser Cache**
```
DevTools → Application → Storage → Clear Site Data
Or: Ctrl+Shift+Delete to clear all cache
```

**Step 3: Test Backend Accessibility**
Open this in browser from any device:
```
https://YOUR_BACKEND_DOMAIN/api/sermons
```
Should return JSON data with sermon list

**Step 4: Check Browser Console**
- Open DevTools (F12) → Console
- Filter for errors
- Look for CORS errors or network failures

**Step 5: Verify Backend is Running**
```bash
curl http://127.0.0.1:8001/api/sermons
```
Should return JSON data

---

## Files Modified

### Frontend
- `src/api/config.js` - Added debug logging
- `src/components/AdminPanel.vue` - Updated error messages
- `.env` - Default configuration
- `.env.local` - Local development (you edit this)
- `.env.production` - Production template (reference only)
- `vercel.json` - Vercel configuration
- `SETUP_VERCEL.md` - Deployment guide

### Backend
- `app/Http/Controllers/SermonController.php` - Added cache-control headers
- `config/cors.php` - Allow Vercel domains with pattern
- `.env` - Updated FRONTEND_URL for Vercel

---

## Key Points to Remember

| Scenario | API URL | Configuration |
|---|---|---|
| Local development | `http://127.0.0.1:8001` | `.env.local` |
| Vercel deployment | Your backend domain | Vercel Dashboard env var |
| Other devices via Vercel | Your backend domain | Same as Vercel |
| Localhost on another device | Can't work | Not supported |

---

## Success Indicators

✅ Console shows correct backend URL  
✅ Network tab shows API calls to backend domain  
✅ Sermons upload successfully  
✅ Other devices can see uploaded sermons  
✅ No CORS errors in console  
✅ No "Cannot connect" errors  

---

## Questions?

1. **What's my backend domain?** - The URL where your Laravel app runs (usually your server IP or domain)
2. **Where do I set environment variables?** - Vercel Dashboard → Project Settings → Environment Variables
3. **Why localhost doesn't work on other devices?** - Localhost = that specific computer. Vercel on other devices needs internet-accessible backend
4. **Do I need to restart Laravel?** - Only if you change .env settings

---

## Next Steps

1. ✅ Know your backend URL
2. ✅ Set `VUE_APP_API_BASE_URL` on Vercel
3. ✅ Redeploy
4. ✅ Test on multiple devices
5. ✅ Celebrate! 🎉

Good luck! The setup is now complete. Just set that environment variable on Vercel and you're done.
