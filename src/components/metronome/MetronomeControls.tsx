import { useState } from 'react';
import { Slider } from '@/components/ui/slider';
import { Button } from '@/components/ui/button';
import { 
  Play, 
  Pause, 
  Timer,
  TimerOff,
  Plus,
  Minus,
  Activity 
} from 'lucide-react';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useTapTempo } from '@/hooks/useTapTempo';
import TimeSignatureSelector from './TimeSignatureSelector';

interface MetronomeControlsProps {
  bpm: number;
  timeSignature: number;
  isPlaying: boolean;
  isTimerEnabled: boolean;
  onBpmChange: (bpm: number) => void;
  onTimeSignatureChange: (timeSignature: number) => void;
  onPlayToggle: () => void;
  onTimerToggle: () => void;
}

const MetronomeControls = ({
  bpm,
  timeSignature,
  isPlaying,
  isTimerEnabled,
  onBpmChange,
  onTimeSignatureChange,
  onPlayToggle,
  onTimerToggle,
}: MetronomeControlsProps) => {
  const [tapCount, setTapCount] = useState(0);
  const { addTap, resetTaps, getTempo } = useTapTempo();

  const handleTapTempo = () => {
    addTap();
    setTapCount(prev => prev + 1);
    
    const newTempo = getTempo();
    if (newTempo) {
      onBpmChange(Math.round(newTempo));
    }
  };

  const handleBpmChange = (value: number[]) => {
    onBpmChange(value[0]);
  };

  const handleIncreaseBpm = () => {
    onBpmChange(Math.min(bpm + 1, 300));
  };

  const handleDecreaseBpm = () => {
    onBpmChange(Math.max(bpm - 1, 30));
  };

  return (
    <div className="w-full space-y-6">
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <span className="text-sm font-medium">BPM</span>
          <div className="text-2xl font-bold tabular-nums">{bpm}</div>
        </div>
        
        <div className="flex items-center gap-2">
          <Button 
            variant="outline" 
            size="icon"
            onClick={handleDecreaseBpm}
            disabled={bpm <= 30}
          >
            <Minus className="h-4 w-4" />
          </Button>
          
          <Slider 
            value={[bpm]} 
            min={30} 
            max={300} 
            step={1}
            onValueChange={handleBpmChange}
            className="flex-1"
          />
          
          <Button 
            variant="outline" 
            size="icon" 
            onClick={handleIncreaseBpm}
            disabled={bpm >= 300}
          >
            <Plus className="h-4 w-4" />
          </Button>
        </div>
      </div>
      
      <TimeSignatureSelector 
        timeSignature={timeSignature}
        onChange={onTimeSignatureChange}
      />
      
      <div className="grid grid-cols-2 gap-4">
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button 
                variant="outline" 
                className="w-full"
                onClick={handleTapTempo}
              >
                <Activity className="mr-2 h-4 w-4" />
                Tap Tempo {tapCount > 0 ? `(${tapCount})` : ''}
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Tap this button repeatedly to set the tempo based on your tapping rhythm</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
        
        <Button 
          variant="outline" 
          className="w-full"
          onClick={onTimerToggle}
        >
          {isTimerEnabled ? (
            <>
              <Timer className="mr-2 h-4 w-4" />
              Timer On
            </>
          ) : (
            <>
              <TimerOff className="mr-2 h-4 w-4" />
              Timer Off
            </>
          )}
        </Button>
      </div>
      
      <Button 
        className="w-full h-16 text-lg"
        onClick={onPlayToggle}
      >
        {isPlaying ? (
          <>
            <Pause className="mr-2 h-6 w-6" />
            Stop
          </>
        ) : (
          <>
            <Play className="mr-2 h-6 w-6" />
            Start
          </>
        )}
      </Button>
    </div>
  );
};

export default MetronomeControls