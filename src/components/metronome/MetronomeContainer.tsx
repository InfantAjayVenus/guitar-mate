import { useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import MetronomeVisualizer from '@/components/metronome/MetronomeVisualizer';
import MetronomeControls from '@/components/metronome/MetronomeControls';
import TimerDisplay from '@/components/timer/TimerDisplay';
import { useMetronome } from '@/hooks/useMetronome';
import { useTimer } from '@/hooks/useTimer';

interface MetronomeContainerProps {
  isTimerEnabled: boolean;
  isPlaying: boolean;
  onTimerToggle: () => void;
  onPlayToggle: () => void;
}

const MetronomeContainer = ({
  isTimerEnabled,
  isPlaying,
  onTimerToggle,
  onPlayToggle,
}: MetronomeContainerProps) => {
  const [bpm, setBpm] = useState(100);
  const [timeSignature, setTimeSignature] = useState<{ numerator: number; denominator: number }>({ numerator: 4, denominator: 4 });

  const { currentBeat, setIsPlaying } = useMetronome({
    bpm,
    timeSignature,
    isPlaying,
  });

  const { time, resetTimer, setInitialTime } = useTimer({
    isRunning: isPlaying && isTimerEnabled,
    initialTime: 300000, // 5 minutes default
  });

  useEffect(() => {
    setIsPlaying(isPlaying);
  }, [isPlaying, setIsPlaying]);

  const handlePlayToggle = () => {
    onPlayToggle();
  };

  const handleReset = () => {
    resetTimer();
  };

  const handleTimeSet = (milliseconds: number) => {
    setInitialTime(milliseconds);
  };

  const handleBpmChange = (newBpm: number) => {
    setBpm(newBpm);
  };

  const handleTimeSignatureChange = (newTimeSignature: { numerator: number; denominator: number }) => {
    setTimeSignature(newTimeSignature);
  };

  return (
    <Card className="w-full max-w-3xl shadow-xl">
      <Tabs defaultValue="metronome" className="w-full">
        <TabsList className="w-full grid grid-cols-2">
          <TabsTrigger value="metronome">Metronome</TabsTrigger>
          <TabsTrigger value="settings">Settings</TabsTrigger>
        </TabsList>
        <CardContent className="pt-6">
          {isTimerEnabled && (
            <TimerDisplay 
              time={time} 
              onReset={handleReset}
              onTimeSet={handleTimeSet}
              className="mb-6" 
            />
          )}
          
          <TabsContent value="metronome" className="mt-0">
            <div className="flex flex-col items-center">
              <MetronomeVisualizer 
                currentBeat={currentBeat} 
                timeSignature={timeSignature}
                isPlaying={isPlaying}
              />
              
              <MetronomeControls
                bpm={bpm}
                timeSignature={timeSignature}
                isPlaying={isPlaying}
                isTimerEnabled={isTimerEnabled}
                onBpmChange={handleBpmChange}
                onTimeSignatureChange={handleTimeSignatureChange}
                onPlayToggle={handlePlayToggle}
                onTimerToggle={onTimerToggle}
              />
            </div>
          </TabsContent>
          
          <TabsContent value="settings" className="mt-0">
            <div className="space-y-4">
              <h3 className="text-lg font-medium">Sound Settings</h3>
              <p className="text-muted-foreground">
                Sound settings will be implemented in future updates.
              </p>
              
              <h3 className="text-lg font-medium mt-6">Visual Settings</h3>
              <p className="text-muted-foreground">
                Visual customization will be implemented in future updates.
              </p>
            </div>
          </TabsContent>
        </CardContent>
      </Tabs>
    </Card>
  );
};

export default MetronomeContainer