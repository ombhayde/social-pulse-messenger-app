
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Earth, CheckCircle2 } from 'lucide-react';
import type { SoilType } from '@/pages/Index';

interface SoilSelectorProps {
  onSoilSelected: (soil: SoilType) => void;
  selectedSoil: SoilType | null;
}

const soilTypes = [
  {
    type: 'clay' as const,
    name: 'Clay Soil',
    description: 'Heavy, sticky soil with excellent nutrient retention but slower drainage',
    ph: 6.5,
    drainage: 'poor' as const,
    color: 'from-red-100 to-orange-100',
    borderColor: 'border-red-300',
    icon: '🏺'
  },
  {
    type: 'loamy' as const,
    name: 'Loamy Soil',
    description: 'Perfect balance of sand, silt, and clay - ideal for most crops',
    ph: 6.8,
    drainage: 'good' as const,
    color: 'from-green-100 to-emerald-100',
    borderColor: 'border-green-300',
    icon: '🌱'
  },
  {
    type: 'sandy' as const,
    name: 'Sandy Soil',
    description: 'Light, well-draining soil perfect for root vegetables',
    ph: 6.2,
    drainage: 'good' as const,
    color: 'from-yellow-100 to-amber-100',
    borderColor: 'border-yellow-300',
    icon: '🏖️'
  },
  {
    type: 'silty' as const,
    name: 'Silty Soil',
    description: 'Smooth, fertile soil with excellent water retention',
    ph: 6.6,
    drainage: 'moderate' as const,
    color: 'from-blue-100 to-sky-100',
    borderColor: 'border-blue-300',
    icon: '💧'
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
    <Card className="bg-white/90 backdrop-blur-lg border-0 shadow-2xl hover:shadow-3xl transition-all duration-500 hover:scale-[1.01]">
      <CardHeader className="pb-4">
        <CardTitle className="flex items-center gap-3 text-2xl">
          <div className="p-2 bg-gradient-to-br from-amber-500 to-orange-600 rounded-xl">
            <Earth className="h-6 w-6 text-white" />
          </div>
          <span className="bg-gradient-to-r from-amber-600 to-orange-600 bg-clip-text text-transparent">
            Soil Type Selection
          </span>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="p-6 bg-gradient-to-r from-amber-50 to-orange-50 rounded-2xl border border-amber-200">
          <p className="text-gray-700 text-lg leading-relaxed">
            Choose your soil type for precise crop recommendations. Not sure? 
            <span className="font-semibold text-green-600"> Loamy soil</span> is the most versatile option! 🌱
          </p>
        </div>
        
        <RadioGroup 
          value={selectedSoil?.type || ''} 
          onValueChange={handleSoilChange}
          className="grid grid-cols-1 md:grid-cols-2 gap-4"
        >
          {soilTypes.map((soil, index) => (
            <div 
              key={soil.type} 
              className={`relative overflow-hidden rounded-2xl border-2 transition-all duration-300 hover:scale-105 hover:shadow-xl bg-gradient-to-br ${soil.color} ${
                selectedSoil?.type === soil.type 
                  ? `${soil.borderColor} shadow-lg scale-105` 
                  : 'border-gray-200 hover:border-gray-300'
              }`}
              style={{animationDelay: `${index * 100}ms`}}
            >
              {selectedSoil?.type === soil.type && (
                <div className="absolute top-3 right-3 z-10">
                  <CheckCircle2 className="h-6 w-6 text-green-600 bg-white rounded-full animate-pulse" />
                </div>
              )}
              
              <div className="p-6">
                <div className="flex items-start space-x-4">
                  <RadioGroupItem 
                    value={soil.type} 
                    id={soil.type} 
                    className="mt-2 border-2 border-gray-400 data-[state=checked]:border-green-600 data-[state=checked]:bg-green-600" 
                  />
                  <div className="flex-1 space-y-3">
                    <div className="flex items-center gap-3">
                      <span className="text-2xl">{soil.icon}</span>
                      <Label htmlFor={soil.type} className="text-xl font-bold cursor-pointer text-gray-800">
                        {soil.name}
                      </Label>
                    </div>
                    <p className="text-gray-600 leading-relaxed">{soil.description}</p>
                    <div className="flex flex-wrap gap-3 mt-4">
                      <div className="px-3 py-1 bg-white/70 backdrop-blur-sm rounded-full text-sm font-medium text-gray-700">
                        pH: {soil.ph}
                      </div>
                      <div className="px-3 py-1 bg-white/70 backdrop-blur-sm rounded-full text-sm font-medium text-gray-700 capitalize">
                        {soil.drainage} drainage
                      </div>
                    </div>
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
