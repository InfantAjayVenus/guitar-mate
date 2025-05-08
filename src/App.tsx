import { useState } from 'react';
import { ThemeProvider } from '@/components/theme/theme-provider';
import Layout from '@/components/layout/Layout';
import MetronomeContainer from '@/components/metronome/MetronomeContainer';
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
      </Layout>
    </ThemeProvider>
  );
}

export default App;