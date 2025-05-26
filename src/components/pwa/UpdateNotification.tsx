import { useEffect, useState } from 'react';
import { ToastAction } from '@/components/ui/toast';
import { useToast } from '@/hooks/use-toast';

// For registerSW from vite-plugin-pwa
declare global {
  interface Window {
    workbox?: {
      messageSkipWaiting: () => void;
      register: () => void;
    };
    registerSW?: (options: { immediate?: boolean }) => Promise<{
      update: () => Promise<void>;
    }>;
  }
}

export function UpdateNotification() {
  const { toast } = useToast();
  const [registrationState, setRegistrationState] = useState<{
    registration: ServiceWorkerRegistration | null;
    waitingWorker: ServiceWorker | null;
  }>({
    registration: null,
    waitingWorker: null,
  });

  useEffect(() => {
    // Check if the service worker needs an update
    const onNeedRefresh = () => {
      showUpdateToast();
    };

    // Listen for the custom event from vite-plugin-pwa
    window.addEventListener('sw-update-found', () => {
      onNeedRefresh();
    });

    // For vite-plugin-pwa managed service worker
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.getRegistration().then((registration) => {
        if (!registration) return;

        // Check if there's an update waiting
        if (registration.waiting) {
          setRegistrationState({
            registration,
            waitingWorker: registration.waiting,
          });
          
          showUpdateToast();
        }

        // Listen for new updates
        registration.addEventListener('updatefound', () => {
          const newWorker = registration.installing;
          if (!newWorker) return;

          newWorker.addEventListener('statechange', () => {
            if (newWorker.state === 'installed' && navigator.serviceWorker.controller) {
              setRegistrationState({
                registration,
                waitingWorker: newWorker,
              });
              
              showUpdateToast();
            }
          });
        });
      });
    }

    const eventHandler = () => showUpdateToast();
    
    return () => {
      window.removeEventListener('sw-update-found', eventHandler);
    };
  }, []);

  const showUpdateToast = () => {
    toast({
      title: "Update Available",
      description: "A new version of Guitar Mate is available.",
      action: <ToastAction altText="Update now" onClick={updateServiceWorker}>Update Now</ToastAction>,
      duration: 15000, // Show for 15 seconds
    });
  };

  const updateServiceWorker = () => {
    // For vite-plugin-pwa workbox
    if (window.workbox) {
      window.workbox.messageSkipWaiting();
      window.location.reload();
      return;
    }

    // For registerSW from vite-plugin-pwa
    if (window.registerSW) {
      window.registerSW({ immediate: true })
        .then(registration => {
          registration.update().then(() => {
            window.location.reload();
          });
        });
      return;
    }

    // Legacy approach
    const { waitingWorker } = registrationState;
    if (!waitingWorker) return;

    // Send message to service worker to skip waiting
    waitingWorker.postMessage({ type: 'SKIP_WAITING' });

    // Reload the page to get the new version
    window.location.reload();
  };

  return null; // This component doesn't render anything
}
