import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Download, X } from 'lucide-react';

export function InstallPrompt() {
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null);
  const [showPrompt, setShowPrompt] = useState(false);

  useEffect(() => {
    // Check if the app is already installed
    const isAppInstalled = window.matchMedia('(display-mode: standalone)').matches;

    // If it's already installed, don't show the prompt
    if (isAppInstalled) {
      return;
    }

    // Listen for the beforeinstallprompt event
    const handleBeforeInstallPrompt = (e: Event) => {
      // Prevent Chrome 76+ from automatically showing the prompt
      e.preventDefault();
      // Stash the event so it can be triggered later
      setDeferredPrompt(e);
      // Show the install button
      setShowPrompt(true);
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);

    // Check for installedRelatedApps (only works in supported browsers)
    if ('getInstalledRelatedApps' in navigator) {
      (navigator as any).getInstalledRelatedApps().then((relatedApps: any[]) => {
        if (relatedApps.length > 0) {
          // The app is installed, hide the installation prompt
          setShowPrompt(false);
        }
      }).catch((error: Error) => {
        console.error('Error checking for installed related apps:', error);
      });
    }

    // Cleanup function
    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    };
  }, []);

  const handleInstallClick = () => {
    if (!deferredPrompt) {
      return;
    }

    // Show the installation prompt
    deferredPrompt.prompt();

    // Wait for the user to respond to the prompt
    deferredPrompt.userChoice.then((choiceResult: { outcome: string }) => {
      if (choiceResult.outcome === 'accepted') {
        console.log('User accepted the install prompt');
      } else {
        console.log('User dismissed the install prompt');
      }
      // Clear the saved prompt as it can't be used again
      setDeferredPrompt(null);
      // Hide our install button
      setShowPrompt(false);
    });
  };

  const handleDismiss = () => {
    setShowPrompt(false);
    // Store in localStorage to prevent showing again for some time
    localStorage.setItem('installPromptDismissed', Date.now().toString());
  };

  if (!showPrompt || !deferredPrompt) {
    return null;
  }

  // Check if the prompt was recently dismissed
  const dismissedTime = localStorage.getItem('installPromptDismissed');
  if (dismissedTime) {
    const currentTime = Date.now();
    const dayInMs = 24 * 60 * 60 * 1000;
    
    // If dismissed less than a day ago, don't show
    if (currentTime - parseInt(dismissedTime) < dayInMs) {
      return null;
    }
  }

  return (
    <Card className="fixed bottom-4 left-4 right-4 max-w-md mx-auto z-50 shadow-lg">
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <CardTitle>Install Guitar Mate</CardTitle>
          <Button variant="ghost" size="icon" onClick={handleDismiss} aria-label="Dismiss">
            <X className="h-4 w-4" />
          </Button>
        </div>
        <CardDescription>Add to your home screen for easy access</CardDescription>
      </CardHeader>
      <CardContent className="pb-2">
        <p className="text-sm text-muted-foreground">
          Install Guitar Mate to practice anywhere, even offline. It works just like a regular app!
        </p>
      </CardContent>
      <CardFooter>
        <Button onClick={handleInstallClick} className="w-full">
          <Download className="mr-2 h-4 w-4" /> Install App
        </Button>
      </CardFooter>
    </Card>
  );
}
