import { useState, useRef, useCallback, useEffect } from 'react';

export function useTapTempo(maxTaps = 5) {
  const [taps, setTaps] = useState<number[]>([]);
  const resetTimeoutRef = useRef<number | null>(null);

  // Reset taps after 2 seconds of inactivity
  const resetAfterInactivity = useCallback(() => {
    if (resetTimeoutRef.current) {
      clearTimeout(resetTimeoutRef.current);
    }
    
    resetTimeoutRef.current = window.setTimeout(() => {
      setTaps([]);
      resetTimeoutRef.current = null;
    }, 2000);
  }, []);

  const addTap = useCallback(() => {
    const now = performance.now();
    setTaps(prev => {
      // Keep only the most recent maxTaps - 1 taps and add the new one
      const newTaps = [...prev.slice(-(maxTaps - 1)), now];
      return newTaps;
    });
    
    resetAfterInactivity();
  }, [maxTaps, resetAfterInactivity]);

  const resetTaps = useCallback(() => {
    setTaps([]);
    if (resetTimeoutRef.current) {
      clearTimeout(resetTimeoutRef.current);
      resetTimeoutRef.current = null;
    }
  }, []);

  const getTempo = useCallback(() => {
    if (taps.length < 2) return null;
    
    // Calculate the average time between taps
    let totalInterval = 0;
    let count = 0;
    
    for (let i = 1; i < taps.length; i++) {
      const interval = taps[i] - taps[i - 1];
      totalInterval += interval;
      count++;
    }
    
    if (count === 0) return null;
    
    const averageInterval = totalInterval / count;
    const bpm = 60000 / averageInterval; // Convert from ms to BPM
    
    return Math.min(300, Math.max(30, bpm)); // Clamp between 30 and 300 BPM
  }, [taps]);

  useEffect(() => {
    return () => {
      if (resetTimeoutRef.current) {
        clearTimeout(resetTimeoutRef.current);
      }
    };
  }, []);

  return {
    addTap,
    resetTaps,
    getTempo,
    tapCount: taps.length,
  };
}