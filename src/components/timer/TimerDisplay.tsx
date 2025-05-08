import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { RotateCcw, Clock } from 'lucide-react';
import { cn } from '@/lib/utils';
import { formatTime } from '@/lib/timeUtils';

interface TimerDisplayProps {
  time: number;
  onReset: () => void;
  onTimeSet: (milliseconds: number) => void;
  className?: string;
}

const TimerDisplay = ({ time, onReset, onTimeSet, className }: TimerDisplayProps) => {
  const { hours, minutes, seconds } = formatTime(time);

  const handleTimeChange = (type: 'hours' | 'minutes' | 'seconds', value: string) => {
    const numValue = parseInt(value) || 0;
    const currentTime = formatTime(time);
    
    const newTime = {
      hours: type === 'hours' ? numValue : currentTime.hours,
      minutes: type === 'minutes' ? numValue : currentTime.minutes,
      seconds: type === 'seconds' ? numValue : currentTime.seconds,
    };
    
    const totalMilliseconds = 
      (newTime.hours * 3600 + newTime.minutes * 60 + newTime.seconds) * 1000;
    
    onTimeSet(totalMilliseconds);
  };

  return (
    <Card className={cn("p-4", className)}>
      <div className="flex items-center gap-4">
        <Clock className="h-5 w-5 text-muted-foreground" />
        <div className="flex gap-2 items-center flex-1">
          <Input
            type="number"
            min="0"
            max="99"
            value={hours}
            onChange={(e) => handleTimeChange('hours', e.target.value)}
            className="w-16 text-center"
          />
          <span className="text-xl">:</span>
          <Input
            type="number"
            min="0"
            max="59"
            value={minutes.toString().padStart(2, '0')}
            onChange={(e) => handleTimeChange('minutes', e.target.value)}
            className="w-16 text-center"
          />
          <span className="text-xl">:</span>
          <Input
            type="number"
            min="0"
            max="59"
            value={seconds.toString().padStart(2, '0')}
            onChange={(e) => handleTimeChange('seconds', e.target.value)}
            className="w-16 text-center"
          />
        </div>
        
        <Button 
          variant="ghost" 
          size="sm" 
          onClick={onReset}
          title="Reset Timer"
        >
          <RotateCcw className="h-4 w-4" />
          <span className="sr-only">Reset Timer</span>
        </Button>
      </div>
    </Card>
  );
};

export default TimerDisplay