import { useState, useEffect, useRef } from 'react';

interface UseTimerProps {
  isRunning: boolean;
  initialTime?: number;
}

export function useTimer({ isRunning, initialTime = 0 }: UseTimerProps) {
  const [time, setTime] = useState(initialTime);
  const intervalIdRef = useRef<number | null>(null);
  const lastTickTimeRef = useRef<number | null>(null);

  const resetTimer = () => {
    setTime(initialTime);
  };

  const setInitialTime = (newTime: number) => {
    setTime(newTime);
  };

  useEffect(() => {
    if (isRunning && time > 0) {
      lastTickTimeRef.current = Date.now();
      
      const tick = () => {
        const now = Date.now();
        const delta = now - (lastTickTimeRef.current || now);
        
        setTime(prevTime => {
          const newTime = Math.max(0, prevTime - delta);
          if (newTime === 0 && intervalIdRef.current) {
            clearInterval(intervalIdRef.current);
            intervalIdRef.current = null;
          }
          return newTime;
        });
        
        lastTickTimeRef.current = now;
      };
      
      intervalIdRef.current = window.setInterval(tick, 1000);
    } else if (intervalIdRef.current) {
      clearInterval(intervalIdRef.current);
      intervalIdRef.current = null;
      lastTickTimeRef.current = null;
    }
    
    return () => {
      if (intervalIdRef.current) {
        clearInterval(intervalIdRef.current);
        intervalIdRef.current = null;
      }
    };
  }, [isRunning, time]);

  return {
    time,
    resetTimer,
    setInitialTime,
  };
}