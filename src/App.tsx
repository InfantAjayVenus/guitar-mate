import { useState } from 'react';
import { ThemeProvider } from '@/components/theme/theme-provider';
import Layout from '@/components/layout/Layout';
import MetronomeContainer from '@/components/metronome/MetronomeContainer';
import { UpdateNotification } from '@/components/pwa/UpdateNotification';
import { InstallPrompt } from '@/components/pwa/InstallPrompt';
import { Toaster } from '@/components/ui/toaster';
import './App.css';

function App() {
  const [isTimerEnabled, setIsTimerEnabled] = useState(true);
  const [isPlaying, setIsPlaying] = useState(false);

  const toggleTimerEnabled = () => {
    setIsTimerEnabled(!isTimerEnabled);
  };

  const togglePlaying = () => {
    setIsPlaying(!isPlaying);
  };

  return (
    <ThemeProvider defaultTheme="dark" storageKey="metronome-theme">
      <Layout>
        <MetronomeContainer 
          isTimerEnabled={isTimerEnabled} 
          isPlaying={isPlaying}
          onTimerToggle={toggleTimerEnabled}
          onPlayToggle={togglePlaying}
        />
        <UpdateNotification />
        <InstallPrompt />
        <Toaster />
      </Layout>
    </ThemeProvider>
  );
}

export default App;