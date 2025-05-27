
import { useState } from 'react';
import LocationDetector from '@/components/LocationDetector';
import WeatherDisplay from '@/components/WeatherDisplay';
import CropRecommendations from '@/components/CropRecommendations';
import SoilSelector from '@/components/SoilSelector';
import { Card, CardContent } from '@/components/ui/card';
import { Leaf, Sparkles } from 'lucide-react';

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
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-green-50 to-teal-50 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-green-200/30 to-emerald-300/20 rounded-full animate-pulse"></div>
        <div className="absolute -bottom-32 -left-32 w-64 h-64 bg-gradient-to-tr from-blue-200/20 to-cyan-300/20 rounded-full animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-r from-green-100/10 to-emerald-200/10 rounded-full animate-spin" style={{animationDuration: '20s'}}></div>
      </div>

      <div className="relative z-10 p-4 sm:p-6 lg:p-8">
        <div className="max-w-6xl mx-auto space-y-8">
          {/* Enhanced Header */}
          <Card className="bg-white/90 backdrop-blur-lg border-0 shadow-2xl hover:shadow-3xl transition-all duration-500 animate-fade-in">
            <CardContent className="p-8 text-center">
              <div className="flex items-center justify-center gap-4 mb-6">
                <div className="relative">
                  <Leaf className="h-12 w-12 text-green-600 animate-pulse" />
                  <Sparkles className="h-6 w-6 text-yellow-500 absolute -top-2 -right-2 animate-pulse delay-500" />
                </div>
                <h1 className="text-4xl lg:text-5xl font-bold bg-gradient-to-r from-green-600 via-emerald-600 to-teal-600 bg-clip-text text-transparent">
                  Smart Crop Advisor
                </h1>
              </div>
              <p className="text-gray-600 text-xl max-w-3xl mx-auto leading-relaxed">
                Harness the power of AI and real-time data to discover the perfect crops for your location, 
                weather conditions, and soil type
              </p>
              <div className="mt-6 flex justify-center">
                <div className="h-1 w-24 bg-gradient-to-r from-green-400 to-emerald-500 rounded-full animate-pulse"></div>
              </div>
            </CardContent>
          </Card>

          {/* Location Detection */}
          <div className="animate-fade-in delay-200">
            <LocationDetector 
              onLocationDetected={setLocation}
              onWeatherFetched={setWeather}
              loading={loading}
              setLoading={setLoading}
            />
          </div>

          {/* Weather Display */}
          {weather && location && (
            <div className="animate-fade-in delay-300">
              <WeatherDisplay weather={weather} location={location} />
            </div>
          )}

          {/* Soil Type Selector */}
          {location && (
            <div className="animate-fade-in delay-400">
              <SoilSelector onSoilSelected={setSoilType} selectedSoil={soilType} />
            </div>
          )}

          {/* Crop Recommendations */}
          {weather && soilType && (
            <div className="animate-fade-in delay-500">
              <CropRecommendations 
                weather={weather} 
                soilType={soilType} 
                location={location}
              />
            </div>
          )}

          {/* Progress Indicator */}
          <div className="flex justify-center space-x-3 py-8">
            <div className={`w-3 h-3 rounded-full transition-all duration-300 ${location ? 'bg-green-500 animate-pulse' : 'bg-gray-300'}`}></div>
            <div className={`w-3 h-3 rounded-full transition-all duration-300 ${weather ? 'bg-green-500 animate-pulse' : 'bg-gray-300'}`}></div>
            <div className={`w-3 h-3 rounded-full transition-all duration-300 ${soilType ? 'bg-green-500 animate-pulse' : 'bg-gray-300'}`}></div>
            <div className={`w-3 h-3 rounded-full transition-all duration-300 ${weather && soilType ? 'bg-green-500 animate-pulse' : 'bg-gray-300'}`}></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
