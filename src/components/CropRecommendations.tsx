
import { useMemo } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Leaf, Droplets, Thermometer, Sun, Earth } from 'lucide-react';
import type { WeatherData, SoilType, Location } from '@/pages/Index';

interface CropRecommendationsProps {
  weather: WeatherData;
  soilType: SoilType;
  location: Location | null;
}

interface Crop {
  name: string;
  description: string;
  icon: string;
  idealTemp: { min: number; max: number };
  idealHumidity: { min: number; max: number };
  soilPreference: string[];
  waterRequirement: 'low' | 'medium' | 'high';
  growingSeason: string;
  benefits: string[];
  score: number;
}

const cropDatabase: Omit<Crop, 'score'>[] = [
  {
    name: 'Tomatoes',
    description: 'Versatile fruit vegetable, rich in vitamins and antioxidants',
    icon: '🍅',
    idealTemp: { min: 18, max: 26 },
    idealHumidity: { min: 60, max: 70 },
    soilPreference: ['loamy', 'sandy'],
    waterRequirement: 'medium',
    growingSeason: 'Spring to Summer',
    benefits: ['High in Vitamin C', 'Rich in lycopene', 'Good market value']
  },
  {
    name: 'Lettuce',
    description: 'Cool-season leafy green, perfect for salads',
    icon: '🥬',
    idealTemp: { min: 10, max: 20 },
    idealHumidity: { min: 50, max: 70 },
    soilPreference: ['loamy', 'silty'],
    waterRequirement: 'medium',
    growingSeason: 'Spring and Fall',
    benefits: ['Fast growing', 'Multiple harvests', 'Low maintenance']
  },
  {
    name: 'Carrots',
    description: 'Root vegetable rich in beta-carotene',
    icon: '🥕',
    idealTemp: { min: 15, max: 25 },
    idealHumidity: { min: 45, max: 65 },
    soilPreference: ['sandy', 'loamy'],
    waterRequirement: 'medium',
    growingSeason: 'Spring to Fall',
    benefits: ['Long storage life', 'High nutritional value', 'Good for deep soil']
  },
  {
    name: 'Spinach',
    description: 'Nutrient-dense leafy green vegetable',
    icon: '🍃',
    idealTemp: { min: 8, max: 18 },
    idealHumidity: { min: 50, max: 70 },
    soilPreference: ['loamy', 'silty'],
    waterRequirement: 'medium',
    growingSeason: 'Cool seasons',
    benefits: ['High in iron', 'Fast growing', 'Cold tolerant']
  },
  {
    name: 'Peppers',
    description: 'Warm-season vegetables with various heat levels',
    icon: '🌶️',
    idealTemp: { min: 20, max: 30 },
    idealHumidity: { min: 60, max: 80 },
    soilPreference: ['loamy', 'sandy'],
    waterRequirement: 'medium',
    growingSeason: 'Summer',
    benefits: ['High in Vitamin C', 'Long harvest period', 'Diverse varieties']
  },
  {
    name: 'Potatoes',
    description: 'Staple root vegetable with high yield potential',
    icon: '🥔',
    idealTemp: { min: 15, max: 22 },
    idealHumidity: { min: 70, max: 80 },
    soilPreference: ['sandy', 'loamy'],
    waterRequirement: 'medium',
    growingSeason: 'Spring to Summer',
    benefits: ['High caloric value', 'Good storage crop', 'Versatile cooking uses']
  },
  {
    name: 'Beans',
    description: 'Nitrogen-fixing legumes that improve soil',
    icon: '🫘',
    idealTemp: { min: 18, max: 24 },
    idealHumidity: { min: 60, max: 70 },
    soilPreference: ['loamy', 'clay'],
    waterRequirement: 'medium',
    growingSeason: 'Spring to Summer',
    benefits: ['Nitrogen fixation', 'High protein', 'Soil improvement']
  },
  {
    name: 'Cabbage',
    description: 'Cool-season brassica with good storage potential',
    icon: '🥬',
    idealTemp: { min: 12, max: 20 },
    idealHumidity: { min: 60, max: 75 },
    soilPreference: ['loamy', 'clay'],
    waterRequirement: 'high',
    growingSeason: 'Cool seasons',
    benefits: ['Long storage life', 'High yield', 'Cold tolerant']
  }
];

const CropRecommendations = ({ weather, soilType, location }: CropRecommendationsProps) => {
  const recommendations = useMemo(() => {
    const avgTemp = weather.forecast.reduce((sum, day) => sum + (day.temp_max + day.temp_min) / 2, 0) / weather.forecast.length;
    const avgHumidity = weather.forecast.reduce((sum, day) => sum + day.humidity, 0) / weather.forecast.length;
    
    const scoredCrops = cropDatabase.map(crop => {
      let score = 0;
      
      // Temperature compatibility (40% weight)
      if (avgTemp >= crop.idealTemp.min && avgTemp <= crop.idealTemp.max) {
        score += 40;
      } else {
        const tempDiff = Math.min(
          Math.abs(avgTemp - crop.idealTemp.min),
          Math.abs(avgTemp - crop.idealTemp.max)
        );
        score += Math.max(0, 40 - tempDiff * 2);
      }
      
      // Humidity compatibility (30% weight)
      if (avgHumidity >= crop.idealHumidity.min && avgHumidity <= crop.idealHumidity.max) {
        score += 30;
      } else {
        const humidityDiff = Math.min(
          Math.abs(avgHumidity - crop.idealHumidity.min),
          Math.abs(avgHumidity - crop.idealHumidity.max)
        );
        score += Math.max(0, 30 - humidityDiff * 0.5);
      }
      
      // Soil compatibility (30% weight)
      if (crop.soilPreference.includes(soilType.type)) {
        score += 30;
      } else {
        score += 10; // Partial score for non-ideal but workable soil
      }
      
      return { ...crop, score: Math.round(score) };
    });
    
    return scoredCrops.sort((a, b) => b.score - a.score).slice(0, 6);
  }, [weather, soilType]);

  const getScoreColor = (score: number) => {
    if (score >= 80) return 'bg-green-500';
    if (score >= 60) return 'bg-yellow-500';
    return 'bg-red-500';
  };

  const getScoreText = (score: number) => {
    if (score >= 80) return 'Excellent Match';
    if (score >= 60) return 'Good Match';
    return 'Fair Match';
  };

  return (
    <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Leaf className="h-5 w-5 text-green-600" />
          Crop Recommendations
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg">
          <h3 className="font-medium text-green-800 mb-2">Analysis Summary</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
            <div className="flex items-center gap-2">
              <Thermometer className="h-4 w-4 text-blue-600" />
              <span>Avg Temp: {Math.round(weather.forecast.reduce((sum, day) => sum + (day.temp_max + day.temp_min) / 2, 0) / weather.forecast.length)}°C</span>
            </div>
            <div className="flex items-center gap-2">
              <Droplets className="h-4 w-4 text-blue-600" />
              <span>Avg Humidity: {Math.round(weather.forecast.reduce((sum, day) => sum + day.humidity, 0) / weather.forecast.length)}%</span>
            </div>
            <div className="flex items-center gap-2">
              <Earth className="h-4 w-4 text-amber-600" />
              <span>Soil: {soilType.type.charAt(0).toUpperCase() + soilType.type.slice(1)}</span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {recommendations.map((crop, index) => (
            <div key={crop.name} className="border rounded-lg p-4 bg-white shadow-sm hover:shadow-md transition-shadow">
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center gap-3">
                  <span className="text-3xl">{crop.icon}</span>
                  <div>
                    <h3 className="font-semibold text-lg">{crop.name}</h3>
                    <Badge 
                      className={`${getScoreColor(crop.score)} text-white text-xs`}
                    >
                      {crop.score}% - {getScoreText(crop.score)}
                    </Badge>
                  </div>
                </div>
                {index < 3 && (
                  <Badge variant="outline" className="text-xs">
                    Top {index + 1}
                  </Badge>
                )}
              </div>
              
              <p className="text-gray-600 text-sm mb-3">{crop.description}</p>
              
              <div className="space-y-2 text-xs text-gray-500">
                <div className="flex justify-between">
                  <span>Ideal Temp:</span>
                  <span>{crop.idealTemp.min}-{crop.idealTemp.max}°C</span>
                </div>
                <div className="flex justify-between">
                  <span>Water Need:</span>
                  <span className="capitalize">{crop.waterRequirement}</span>
                </div>
                <div className="flex justify-between">
                  <span>Season:</span>
                  <span>{crop.growingSeason}</span>
                </div>
              </div>
              
              <div className="mt-3 pt-3 border-t">
                <p className="text-xs font-medium text-gray-700 mb-1">Benefits:</p>
                <div className="flex flex-wrap gap-1">
                  {crop.benefits.slice(0, 2).map((benefit, idx) => (
                    <Badge key={idx} variant="secondary" className="text-xs">
                      {benefit}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
          <h3 className="font-medium text-blue-800 mb-2">💡 Pro Tips</h3>
          <ul className="text-sm text-blue-700 space-y-1">
            <li>• Consider crop rotation to maintain soil health</li>
            <li>• Plant companion crops that benefit each other</li>
            <li>• Check local seed availability and planting calendars</li>
            <li>• Monitor weather forecasts for optimal planting times</li>
          </ul>
        </div>
      </CardContent>
    </Card>
  );
};

export default CropRecommendations;
