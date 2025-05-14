import { useState, useEffect, useRef } from 'react';
import { playSound, stopSound } from '@/lib/audioUtils';

interface UseMetronomeProps {
  bpm: number;
  timeSignature: { numerator: number; denominator: number };
  isPlaying: boolean;
}

export function useMetronome({ bpm, timeSignature, isPlaying }: UseMetronomeProps) {
  const [currentBeat, setCurrentBeat] = useState(0);
  const nextBeatTimeRef = useRef<number | null>(null);
  const animationFrameRef = useRef<number | null>(null);

  const scheduleNextBeat = () => {
    if (!isPlaying) return;

    // Adjust beat duration based on the denominator of the time signature
    const beatDuration = (60000 / bpm) * (4 / timeSignature.denominator); // in milliseconds
    const currentTime = performance.now();

    if (!nextBeatTimeRef.current) {
      nextBeatTimeRef.current = currentTime;
    }

    while (nextBeatTimeRef.current && nextBeatTimeRef.current <= currentTime + 100) {
      // Schedule the beat to play at the exact time
      const timeTillNextBeat = nextBeatTimeRef.current - currentTime;

      setTimeout(() => {
        setCurrentBeat((prevBeat) => {
          const nextBeat = (prevBeat % timeSignature.numerator) + 1;
          playSound(nextBeat === 1 ? 'accent' : 'normal');
          return nextBeat;
        });
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