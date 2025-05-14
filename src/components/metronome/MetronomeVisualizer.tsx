import { cn } from '@/lib/utils';

interface MetronomeVisualizerProps {
  currentBeat: number;
  timeSignature: { numerator: number; denominator: number };
  isPlaying: boolean;
}

const MetronomeVisualizer = ({
  currentBeat,
  timeSignature,
  isPlaying,
}: MetronomeVisualizerProps) => {
  // Use the numerator of the time signature to determine the number of beats
  const beats = Array.from({ length: timeSignature.numerator }, (_, i) => i + 1);

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
                ? `${beat === 1 ? "bg-primary text-primary-foreground" : "bg-secondary text-secondary-foreground"} scale-110`
                : "bg-background scale-100"
            )}
          >
            <span className="text-lg font-medium">{beat}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MetronomeVisualizer;