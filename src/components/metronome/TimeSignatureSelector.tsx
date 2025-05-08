import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from '@/components/ui/select';

interface TimeSignatureSelectorProps {
  timeSignature: number;
  onChange: (value: number) => void;
}

const TimeSignatureSelector = ({ 
  timeSignature, 
  onChange 
}: TimeSignatureSelectorProps) => {
  const handleChange = (value: string) => {
    onChange(parseInt(value, 10));
  };

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <span className="text-sm font-medium">Time Signature</span>
        <div className="font-medium">{timeSignature}/4</div>
      </div>
      
      <Select
        value={timeSignature.toString()}
        onValueChange={handleChange}
      >
        <SelectTrigger>
          <SelectValue placeholder="Select time signature" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="2">2/4</SelectItem>
          <SelectItem value="3">3/4</SelectItem>
          <SelectItem value="4">4/4</SelectItem>
          <SelectItem value="5">5/4</SelectItem>
          <SelectItem value="6">6/4</SelectItem>
          <SelectItem value="7">7/4</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
};

export default TimeSignatureSelector;