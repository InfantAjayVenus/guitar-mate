import { cn } from '@/lib/utils';

interface MetronomeVisualizerProps {
  currentBeat: number;
  timeSignature: number;
  isPlaying: boolean;
}

const MetronomeVisualizer = ({
  currentBeat,
  timeSignature,
  isPlaying,
}: MetronomeVisualizerProps) => {
  // Create an array of beats based on the time signature
  const beats = Array.from({ length: timeSignature }, (_, i) => i + 1);

  return (
    <div className="w-full mb-8">
      <div className="flex justify-center items-center gap-3 md:gap-6 py-8">
        {beats.map((beat) => (
          <div
            key={beat}
            className={cn(
              "relative w-12 h-12 md:w-16 md:h-16 rounded-full flex items-center justify-center transition-all duration-100 border-2",
              beat === 1 
                ? "border-primary" 
                : "border-secondary",
              currentBeat === beat && isPlaying
                ? beat === 1
                  ? "bg-primary text-primary-foreground scale-110"
                  : "bg-secondary text-secondary-foreground scale-110"
                : "bg-background scale-100"
            )}
          >
            <span className="text-lg font-medium">{beat}</span>
            {currentBeat === beat && isPlaying && (
              <div 
                className={cn(
                  "absolute -inset-2 rounded-full z-0 animate-ping opacity-60",
                  beat === 1 ? "bg-primary" : "bg-secondary"
                )}
                style={{ animationDuration: '0.5s' }}
              />
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default MetronomeVisualizer;