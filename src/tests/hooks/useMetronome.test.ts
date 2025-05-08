import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import { useMetronome } from '@/hooks/useMetronome';

// Mock the audioUtils
vi.mock('@/lib/audioUtils', () => ({
  playSound: vi.fn(),
}));

describe('useMetronome', () => {
  beforeEach(() => {
    vi.useFakeTimers();
    window.performance.now = vi.fn(() => 1000);
  });

  afterEach(() => {
    vi.useRealTimers();
    vi.restoreAllMocks();
  });

  it('should initialize with currentBeat set to 0', () => {
    const { result } = renderHook(() => 
      useMetronome({ bpm: 100, timeSignature: 4, isPlaying: false })
    );
    
    expect(result.current.currentBeat).toBe(0);
  });

  it('should keep currentBeat at 0 when not playing', () => {
    const { result } = renderHook(() => 
      useMetronome({ bpm: 100, timeSignature: 4, isPlaying: false })
    );
    
    expect(result.current.currentBeat).toBe(0);
    
    // Advance time
    act(() => {
      vi.advanceTimersByTime(1000);
    });
    
    expect(result.current.currentBeat).toBe(0);
  });

  it('should set isPlaying state correctly', () => {
    const { result } = renderHook(() => 
      useMetronome({ bpm: 100, timeSignature: 4, isPlaying: false })
    );
    
    expect(result.current.currentBeat).toBe(0);
    
    act(() => {
      result.current.setIsPlaying(true);
    });
    
    // Need to manually trigger animation frames in tests
    act(() => {
      window.requestAnimationFrame = (callback) => setTimeout(callback, 0);
      vi.runAllTimers();
    });
    
    // The beat should have advanced
    expect(result.current.currentBeat).not.toBe(0);
  });
});