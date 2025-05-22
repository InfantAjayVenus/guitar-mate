import { useState, useEffect, useRef } from 'react';

interface UseTimerProps {
  isRunning: boolean;
  initialTime?: number;
  onTimerEnd?: () => void;
}

export function useTimer({ isRunning, initialTime = 0, onTimerEnd }: UseTimerProps) {
  const [time, setTime] = useState(initialTime);
  const intervalIdRef = useRef<number | null>(null);
  const isRunningRef = useRef(isRunning);
  const onTimerEndRef = useRef(onTimerEnd);

  // Update refs when props change
  useEffect(() => {
    isRunningRef.current = isRunning;
    onTimerEndRef.current = onTimerEnd;
  }, [isRunning, onTimerEnd]);

  const resetTimer = () => {
    setTime(initialTime);
  };

  const setInitialTime = (newTime: number) => {
    setTime(newTime);
  };

  // Set up or tear down the interval based on isRunning
  useEffect(() => {
    // Clean up any existing interval
    if (intervalIdRef.current) {
      clearInterval(intervalIdRef.current);
      intervalIdRef.current = null;
    }

    // Only set up a new interval if we're running and have time left
    if (isRunning && time > 0) {      
      const tick = () => {
        setTime(prevTime => {
          console.log("Timer tick, current time:", prevTime);
          // Stop at zero
          if (prevTime <= 1000) { // Check if this is the last tick (will be 0 after subtraction)
            console.log("Timer reached zero, clearing interval");
            if (intervalIdRef.current) {
              clearInterval(intervalIdRef.current);
              intervalIdRef.current = null;
            }
            
            // Call onTimerEnd callback when timer reaches zero
            console.log("Calling onTimerEnd callback", onTimerEndRef.current ? "callback exists" : "no callback");
            if (onTimerEndRef.current) {
              onTimerEndRef.current();
            }
            return 0;
          }
          
          return Math.max(0, prevTime - 1000); // Subtract exactly 1 second
        });
      };
      
      // Start the interval
      intervalIdRef.current = window.setInterval(tick, 1000);
    }
    
    // Clean up on unmount or when dependencies change
    return () => {
      if (intervalIdRef.current) {
        clearInterval(intervalIdRef.current);
        intervalIdRef.current = null;
      }
    };
  }, [isRunning, time > 0]);

  return {
    time,
    resetTimer,
    setInitialTime,
  };
}