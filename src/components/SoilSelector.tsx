
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Earth } from 'lucide-react';
import type { SoilType } from '@/pages/Index';

interface SoilSelectorProps {
  onSoilSelected: (soil: SoilType) => void;
  selectedSoil: SoilType | null;
}

const soilTypes = [
  {
    type: 'clay' as const,
    name: 'Clay Soil',
    description: 'Heavy, sticky soil with good nutrient retention but poor drainage',
    ph: 6.5,
    drainage: 'poor' as const,
    color: 'bg-red-100 border-red-300'
  },
  {
    type: 'loamy' as const,
    name: 'Loamy Soil',
    description: 'Well-balanced soil with good drainage and nutrient retention',
    ph: 6.8,
    drainage: 'good' as const,
    color: 'bg-green-100 border-green-300'
  },
  {
    type: 'sandy' as const,
    name: 'Sandy Soil',
    description: 'Light, well-draining soil but requires frequent watering',
    ph: 6.2,
    drainage: 'good' as const,
    color: 'bg-yellow-100 border-yellow-300'
  },
  {
    type: 'silty' as const,
    name: 'Silty Soil',
    description: 'Smooth soil with good water retention and moderate drainage',
    ph: 6.6,
    drainage: 'moderate' as const,
    color: 'bg-blue-100 border-blue-300'
  }
];

const SoilSelector = ({ onSoilSelected, selectedSoil }: SoilSelectorProps) => {
  const handleSoilChange = (value: string) => {
    const selectedSoilType = soilTypes.find(soil => soil.type === value);
    if (selectedSoilType) {
      onSoilSelected({
        type: selectedSoilType.type,
        ph: selectedSoilType.ph,
        drainage: selectedSoilType.drainage
      });
    }
  };

  return (
    <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Earth className="h-5 w-5 text-amber-600" />
          Soil Type Selection
        </CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-gray-600 mb-6">
          Select your soil type to get more accurate crop recommendations. If you're unsure, 
          loamy soil is the most common and versatile option.
        </p>
        
        <RadioGroup 
          value={selectedSoil?.type || ''} 
          onValueChange={handleSoilChange}
          className="space-y-4"
        >
          {soilTypes.map((soil) => (
            <div key={soil.type} className={`border rounded-lg p-4 ${soil.color}`}>
              <div className="flex items-start space-x-3">
                <RadioGroupItem value={soil.type} id={soil.type} className="mt-1" />
                <div className="flex-1">
                  <Label htmlFor={soil.type} className="text-lg font-medium cursor-pointer">
                    {soil.name}
                  </Label>
                  <p className="text-gray-600 mt-1">{soil.description}</p>
                  <div className="flex gap-4 mt-2 text-sm text-gray-500">
                    <span>pH: {soil.ph}</span>
                    <span>Drainage: {soil.drainage}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </RadioGroup>
      </CardContent>
    </Card>
  );
};

export default SoilSelector;
