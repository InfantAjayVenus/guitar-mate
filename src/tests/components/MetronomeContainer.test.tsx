import MetronomeContainer from '@/components/metronome/MetronomeContainer';
import { useMetronome } from '@/hooks/useMetronome';
import { useTimer } from '@/hooks/useTimer';
import { act, render, screen } from '@testing-library/react';
import { beforeEach, describe, expect, it, vi } from 'vitest';

// Mock the hooks
vi.mock('@/hooks/useTimer', () => ({
  useTimer: vi.fn(),
}));

vi.mock('@/hooks/useMetronome', () => ({
  useMetronome: vi.fn(),
}));

describe('MetronomeContainer', () => {
  const resetTimerMock = vi.fn();
  const setInitialTimeMock = vi.fn();
  const setIsPlayingMock = vi.fn();
  const onPlayToggleMock = vi.fn();
  const onTimerToggleMock = vi.fn();
  
  beforeEach(() => {
    vi.clearAllMocks();
    
    // Default mock implementations
    (useTimer as any).mockReturnValue({
      time: 300000, // 5 minutes
      resetTimer: resetTimerMock,
      setInitialTime: setInitialTimeMock
    });
    
    (useMetronome as any).mockReturnValue({
      currentBeat: 1,
      setIsPlaying: setIsPlayingMock
    });
  });

  it('should stop the metronome when timer ends', () => {
    // Define what will happen when useTimer is called
    let timerEndCallback: (() => void) | undefined;
    
    (useTimer as any).mockImplementation(({ onTimerEnd }: { onTimerEnd?: () => void }) => {
      // Save the callback for later use
      timerEndCallback = onTimerEnd;
      
      return {
        time: 0, // Timer at zero
        resetTimer: resetTimerMock,
        setInitialTime: setInitialTimeMock,
      };
    });
    
    render(
      <MetronomeContainer
        isTimerEnabled={true}
        isPlaying={true}
        onTimerToggle={onTimerToggleMock}
        onPlayToggle={onPlayToggleMock}
      />
    );
    
    // Trigger the timer end callback
    act(() => {
      if (timerEndCallback) {
        timerEndCallback();
      }
    });
    
    // Verify that onPlayToggle was called to stop the metronome
    expect(onPlayToggleMock).toHaveBeenCalledTimes(1);
  });

  it('should render timer display when timer is enabled', () => {
    render(
      <MetronomeContainer
        isTimerEnabled={true}
        isPlaying={false}
        onTimerToggle={onTimerToggleMock}
        onPlayToggle={onPlayToggleMock}
      />
    );
    
    // Check for the reset timer button which is part of the timer display
    expect(screen.getByTitle('Reset Timer')).toBeInTheDocument();
  });

  it('should not render timer display when timer is disabled', () => {
    render(
      <MetronomeContainer
        isTimerEnabled={false}
        isPlaying={false}
        onTimerToggle={onTimerToggleMock}
        onPlayToggle={onPlayToggleMock}
      />
    );
    
    // Timer display should not be present
    expect(screen.queryByTitle('Reset Timer')).not.toBeInTheDocument();
  });
});
