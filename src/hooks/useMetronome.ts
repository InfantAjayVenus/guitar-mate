import { useState, useEffect, useRef } from 'react';
import { playSound, stopSound } from '@/lib/audioUtils';

interface UseMetronomeProps {
  bpm: number;
  timeSignature: number;
  isPlaying: boolean;
}

export function useMetronome({ bpm, timeSignature, isPlaying }: UseMetronomeProps) {
  const [currentBeat, setCurrentBeat] = useState(0);
  const nextBeatTimeRef = useRef<number | null>(null);
  const animationFrameRef = useRef<number | null>(null);

  const scheduleNextBeat = () => {
    if (!isPlaying) return;
    
    const beatDuration = 60000 / bpm; // in milliseconds
    const currentTime = performance.now();
    
    if (!nextBeatTimeRef.current) {
      nextBeatTimeRef.current = currentTime;
    }
    
    while (nextBeatTimeRef.current && nextBeatTimeRef.current <= currentTime + 100) {
      const nextBeat = (currentBeat % timeSignature) + 1;
      const isFirstBeat = nextBeat === 1;
      
      // Schedule the beat to play at the exact time
      const timeTillNextBeat = nextBeatTimeRef.current - currentTime;
      
      setTimeout(() => {
        setCurrentBeat(nextBeat);
        playSound(isFirstBeat ? 'accent' : 'normal');
      }, Math.max(0, timeTillNextBeat));
      
      // Set the next beat time
      nextBeatTimeRef.current += beatDuration;
    }
    
    // Schedule the next check
    animationFrameRef.current = requestAnimationFrame(scheduleNextBeat);
  };

  const setIsPlaying = (playing: boolean) => {
    if (playing === isPlaying) return;
    
    if (playing) {
      // Reset nextBeatTime and currentBeat on play
      nextBeatTimeRef.current = null;
      setCurrentBeat(0);
      scheduleNextBeat();
    } else {
      // Stop the current scheduling and sound
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
        animationFrameRef.current = null;
      }
      stopSound();
      setCurrentBeat(0);
    }
  };

  useEffect(() => {
    if (isPlaying) {
      scheduleNextBeat();
    } else {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
        animationFrameRef.current = null;
      }
      stopSound();
      setCurrentBeat(0);
    }

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
      stopSound();
    };
  }, [isPlaying, bpm, timeSignature]);

  return {
    currentBeat,
    setIsPlaying,
  };
}