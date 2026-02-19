# PWA Setup Guide for Kollabary

## Overview
This project now has Progressive Web App (PWA) support, enabling users to install the app on their devices and use it offline.

## Features Implemented

### ✅ Core PWA Features
- **Installable**: Users can install the app on their devices (mobile and desktop)
- **Offline Support**: Service worker caches essential resources for offline access
- **App-like Experience**: Runs in standalone mode without browser UI
- **Auto-updates**: Service worker checks for updates every minute
- **Install Prompt**: Custom install banner appears for eligible users

### ✅ Files Created

1. **`/public/manifest.json`**
   - App metadata and configuration
   - Icon definitions for various sizes
   - Theme colors and display settings

2. **`/public/sw.js`**
   - Service worker for caching and offline functionality
   - Network-first strategy with cache fallback
   - Automatic cache cleanup

3. **`/src/lib/pwa-register.ts`**
   - Service worker registration logic
   - Update listener

4. **`/src/components/pwa/PWAInstaller.tsx`**
   - Custom install prompt UI
   - Dismissal logic (7-day cooldown)
   - Animated banner

5. **`/src/app/offline/page.tsx`**
   - Offline fallback page
   - User-friendly offline experience

## Required: Create App Icons

You need to create the following icon sizes and place them in `/public/icons/`:

- `icon-72x72.png`
- `icon-96x96.png`
- `icon-128x128.png`
- `icon-144x144.png`
- `icon-152x152.png`
- `icon-192x192.png`
- `icon-384x384.png`
- `icon-512x512.png`

### Icon Requirements:
- **Format**: PNG with transparent background
- **Content**: Your app logo/brand mark
- **Safe Area**: Keep important content within 80% of the canvas
- **Maskable**: Design should work well when masked to different shapes

### Quick Icon Generation:
You can use tools like:
- [PWA Asset Generator](https://github.com/elegantapp/pwa-asset-generator)
- [RealFaviconGenerator](https://realfavicongenerator.net/)
- [Favicon.io](https://favicon.io/)

Or use this command with your logo:
```bash
npx pwa-asset-generator public/logo.png public/icons --icon-only --padding "10%"
```

## Optional: Add Screenshots

For better app store presentation, add screenshots to `/public/screenshots/`:
- `desktop-1.png` (1920x1080)
- `mobile-1.png` (750x1334)

## Testing PWA

### Local Testing
1. Build the production version:
   ```bash
   npm run build
   npm start
   ```

2. Open Chrome DevTools → Application → Manifest
3. Check "Service Workers" section
4. Test "Add to Home Screen" functionality

### Testing Checklist
- ✅ Manifest loads correctly
- ✅ Service worker registers
- ✅ Icons display properly
- ✅ Install prompt appears
- ✅ Offline page works
- ✅ App installs successfully
- ✅ App opens in standalone mode

### Lighthouse Audit
Run Lighthouse PWA audit:
1. Open Chrome DevTools
2. Go to Lighthouse tab
3. Select "Progressive Web App"
4. Click "Generate report"

Target score: 90+

## Customization

### Update Theme Colors
Edit `/public/manifest.json`:
```json
{
  "theme_color": "#ff5722",  // Primary brand color
  "background_color": "#ffffff"  // Splash screen background
}
```

### Modify Caching Strategy
Edit `/public/sw.js` to change caching behavior:
- Network-first (current): Always tries network, falls back to cache
- Cache-first: Serves from cache if available, faster but less fresh
- Stale-while-revalidate: Serves cache while updating in background

### Customize Install Prompt
Edit `/src/components/pwa/PWAInstaller.tsx`:
- Change dismissal duration (currently 7 days)
- Modify UI/styling
- Add custom logic for when to show

## Deployment Considerations

### HTTPS Required
PWA features require HTTPS in production. Ensure your deployment platform supports HTTPS.

### Service Worker Scope
The service worker is registered at root (`/`) and controls all routes.

### Cache Invalidation
Service worker cache is versioned (`kollabary-v1`). Increment version in `sw.js` to force cache refresh:
```javascript
const CACHE_NAME = 'kollabary-v2'; // Increment version
```

## Browser Support

| Feature | Chrome | Firefox | Safari | Edge |
|---------|--------|---------|--------|------|
| Service Workers | ✅ | ✅ | ✅ | ✅ |
| Web Manifest | ✅ | ✅ | ✅ | ✅ |
| Install Prompt | ✅ | ❌ | ✅ (iOS 16.4+) | ✅ |
| Offline Support | ✅ | ✅ | ✅ | ✅ |

## Troubleshooting

### Service Worker Not Registering
- Check browser console for errors
- Ensure you're on HTTPS or localhost
- Clear browser cache and reload

### Install Prompt Not Showing
- Must be on HTTPS
- User must visit site at least twice
- User hasn't already installed
- Check `beforeinstallprompt` event fires

### Icons Not Displaying
- Verify icon files exist in `/public/icons/`
- Check file sizes match manifest
- Clear browser cache

### Offline Page Not Working
- Check service worker is active
- Verify `/offline` route exists
- Test by going offline in DevTools

## Next Steps

1. **Create Icons**: Generate all required icon sizes
2. **Test Installation**: Test on multiple devices/browsers
3. **Add Screenshots**: Enhance app store presentation
4. **Monitor**: Track PWA install rate and usage
5. **Optimize**: Fine-tune caching strategy based on usage patterns

## Resources

- [Web.dev PWA Guide](https://web.dev/progressive-web-apps/)
- [MDN Service Workers](https://developer.mozilla.org/en-US/docs/Web/API/Service_Worker_API)
- [PWA Builder](https://www.pwabuilder.com/)
- [Workbox](https://developers.google.com/web/tools/workbox) - Advanced service worker library

## Support

For issues or questions about PWA implementation, check:
- Browser DevTools → Application tab
- Service Worker logs in console
- Lighthouse PWA audit results
