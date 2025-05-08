import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import { useTimer } from '@/hooks/useTimer';

describe('useTimer', () => {
  beforeEach(() => {
    vi.useFakeTimers();
    // Mock Date.now to have predictable results
    let currentTime = 1000;
    vi.spyOn(Date, 'now').mockImplementation(() => currentTime);
    
    // Helper to advance the mock time
    global.advanceTime = (ms: number) => {
      currentTime += ms;
      vi.advanceTimersByTime(ms);
    };
  });

  afterEach(() => {
    vi.useRealTimers();
    vi.restoreAllMocks();
    delete (global as any).advanceTime;
  });

  it('should initialize with time set to 0', () => {
    const { result } = renderHook(() => useTimer({ isRunning: false }));
    expect(result.current.time).toBe(0);
  });

  it('should not increment time when not running', () => {
    const { result } = renderHook(() => useTimer({ isRunning: false }));
    
    act(() => {
      (global as any).advanceTime(1000);
    });
    
    expect(result.current.time).toBe(0);
  });

  it('should increment time when running', () => {
    const { result } = renderHook(() => useTimer({ isRunning: true }));
    
    act(() => {
      (global as any).advanceTime(1000);
    });
    
    expect(result.current.time).toBe(1000);
  });

  it('should reset time when resetTimer is called', () => {
    const { result } = renderHook(() => useTimer({ isRunning: true }));
    
    act(() => {
      (global as any).advanceTime(1000);
    });
    
    expect(result.current.time).toBe(1000);
    
    act(() => {
      result.current.resetTimer();
    });
    
    expect(result.current.time).toBe(0);
  });

  it('should stop incrementing when isRunning becomes false', () => {
    const { result, rerender } = renderHook(
      ({ isRunning }) => useTimer({ isRunning }), 
      { initialProps: { isRunning: true } }
    );
    
    act(() => {
      (global as any).advanceTime(1000);
    });
    
    expect(result.current.time).toBe(1000);
    
    rerender({ isRunning: false });
    
    act(() => {
      (global as any).advanceTime(1000);
    });
    
    // Time should still be 1000 as the timer is paused
    expect(result.current.time).toBe(1000);
  });
});