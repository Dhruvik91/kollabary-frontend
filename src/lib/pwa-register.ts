const isDev = process.env.NEXT_PUBLIC_NODE === 'dev' || process.env.NODE_ENV === 'development';

export function registerServiceWorker() {
  if (isDev) {
    if (typeof window !== 'undefined' && 'serviceWorker' in navigator) {
      navigator.serviceWorker.getRegistrations().then((registrations) => {
        for (const registration of registrations) {
          registration.unregister();
        }
      });
    }
    return;
  }
  if (typeof window !== 'undefined' && 'serviceWorker' in navigator) {
    window.addEventListener('load', () => {
      navigator.serviceWorker
        .register('/sw.js')
        .then((registration) => {
          // Check for updates periodically
          setInterval(() => {
            registration.update();
          }, 60000); // Check every minute
        })
        .catch((error) => {
          console.error('Service Worker registration failed:', error);
        });
    });
  }
}

// Listen for service worker updates
export function listenForSWUpdates() {
  if (isDev) return;
  if (typeof window !== 'undefined' && 'serviceWorker' in navigator) {
    navigator.serviceWorker.addEventListener('controllerchange', () => {
      // Reload the page when a new service worker takes control
      console.log('New service worker active, reloading...');
      window.location.reload();
    });
  }
}
