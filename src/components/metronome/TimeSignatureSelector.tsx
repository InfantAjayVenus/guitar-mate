import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from '@/components/ui/select';

interface TimeSignature {
  numerator: number;
  denominator: number;
}

interface TimeSignatureSelectorProps {
  timeSignature: TimeSignature;
  onChange: (value: TimeSignature) => void;
}

const TimeSignatureSelector = ({ 
  timeSignature, 
  onChange 
}: TimeSignatureSelectorProps) => {
  const handleChange = (value: string) => {
    const [numerator, denominator] = value.split('-').map(Number);
    onChange({ numerator, denominator }); // Pass both numerator and denominator to the parent
  };

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <span className="text-sm font-medium">Time Signature</span>
        <div className="font-medium">{timeSignature.numerator}/{timeSignature.denominator}</div>
      </div>
      
      <Select
        value={`${timeSignature.numerator}-${timeSignature.denominator}`}
        onValueChange={handleChange}
      >
        <SelectTrigger>
          <SelectValue placeholder="Select time signature" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="2-4">2/4 - Simple duple time</SelectItem>
          <SelectItem value="3-4">3/4 - Simple triple time</SelectItem>
          <SelectItem value="4-4">4/4 - Simple quadruple time</SelectItem>
          <SelectItem value="6-8">6/8 - Compound duple time</SelectItem>
          <SelectItem value="9-8">9/8 - Compound triple time</SelectItem>
          <SelectItem value="12-8">12/8 - Compound quadruple time</SelectItem>
          <SelectItem value="5-4">5/4 - Irregular time (quintuple)</SelectItem>
          <SelectItem value="7-8">7/8 - Irregular time (septuple)</SelectItem>
          <SelectItem value="3-8">3/8 - Simple triple time (short)</SelectItem>
          <SelectItem value="4-2">4/2 - Simple quadruple time (half)</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
};

export default TimeSignatureSelector;