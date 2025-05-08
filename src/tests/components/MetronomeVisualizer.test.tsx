import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import MetronomeVisualizer from '@/components/metronome/MetronomeVisualizer';

describe('MetronomeVisualizer', () => {
  it('should render the correct number of beats for the time signature', () => {
    render(
      <MetronomeVisualizer
        currentBeat={1}
        timeSignature={4}
        isPlaying={true}
      />
    );
    
    // Should render 4 beats
    const beats = screen.getAllByText(/[1-4]/);
    expect(beats).toHaveLength(4);
  });
  
  it('should highlight the current beat when playing', () => {
    render(
      <MetronomeVisualizer
        currentBeat={2}
        timeSignature={4}
        isPlaying={true}
      />
    );
    
    // First beat should have specific styling
    const firstBeat = screen.getByText('1');
    expect(firstBeat.parentElement).toHaveClass('border-primary');
    
    // Beat 2 should be highlighted as current
    const secondBeat = screen.getByText('2');
    expect(secondBeat.parentElement).toHaveClass('bg-secondary');
    expect(secondBeat.parentElement).toHaveClass('scale-110');
  });
  
  it('should not highlight any beat when not playing', () => {
    render(
      <MetronomeVisualizer
        currentBeat={2}
        timeSignature={4}
        isPlaying={false}
      />
    );
    
    // No beat should be highlighted
    const beats = screen.getAllByText(/[1-4]/);
    beats.forEach(beat => {
      expect(beat.parentElement).not.toHaveClass('scale-110');
    });
  });
  
  it('should adjust for different time signatures', () => {
    render(
      <MetronomeVisualizer
        currentBeat={1}
        timeSignature={3}
        isPlaying={true}
      />
    );
    
    // Should render 3 beats for 3/4 time signature
    const beats = screen.getAllByText(/[1-3]/);
    expect(beats).toHaveLength(3);
    
    // Should not render a 4th beat
    const beat4 = screen.queryByText('4');
    expect(beat4).toBeNull();
  });
});