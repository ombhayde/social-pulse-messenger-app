
import { useState } from 'react';
import LocationDetector from '@/components/LocationDetector';
import WeatherDisplay from '@/components/WeatherDisplay';
import CropRecommendations from '@/components/CropRecommendations';
import SoilSelector from '@/components/SoilSelector';
import { Card, CardContent } from '@/components/ui/card';
import { Leaf } from 'lucide-react';

export interface Location {
  latitude: number;
  longitude: number;
  city?: string;
  country?: string;
}

export interface WeatherData {
  current: {
    temp: number;
    humidity: number;
    description: string;
    icon: string;
  };
  forecast: Array<{
    date: string;
    temp_max: number;
    temp_min: number;
    humidity: number;
    rain?: number;
    description: string;
    icon: string;
  }>;
}

export interface SoilType {
  type: 'clay' | 'loamy' | 'sandy' | 'silty';
  ph: number;
  drainage: 'poor' | 'moderate' | 'good';
}

const Index = () => {
  const [location, setLocation] = useState<Location | null>(null);
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [soilType, setSoilType] = useState<SoilType | null>(null);
  const [loading, setLoading] = useState(false);

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 p-4">
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Header */}
        <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
          <CardContent className="p-6 text-center">
            <div className="flex items-center justify-center gap-3 mb-4">
              <Leaf className="h-8 w-8 text-green-600" />
              <h1 className="text-3xl font-bold text-gray-800">
                Smart Crop Advisor
              </h1>
            </div>
            <p className="text-gray-600 text-lg">
              Get personalized crop recommendations based on your location, weather, and soil conditions
            </p>
          </CardContent>
        </Card>

        {/* Location Detection */}
        <LocationDetector 
          onLocationDetected={setLocation}
          onWeatherFetched={setWeather}
          loading={loading}
          setLoading={setLoading}
        />

        {/* Weather Display */}
        {weather && location && (
          <WeatherDisplay weather={weather} location={location} />
        )}

        {/* Soil Type Selector */}
        {location && (
          <SoilSelector onSoilSelected={setSoilType} selectedSoil={soilType} />
        )}

        {/* Crop Recommendations */}
        {weather && soilType && (
          <CropRecommendations 
            weather={weather} 
            soilType={soilType} 
            location={location}
          />
        )}
      </div>
    </div>
  );
};

export default Index;
