
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Cloud, Droplets, Thermometer, Calendar, MapPin, Wind } from 'lucide-react';
import type { WeatherData, Location } from '@/pages/Index';

interface WeatherDisplayProps {
  weather: WeatherData;
  location: Location;
}

const WeatherDisplay = ({ weather, location }: WeatherDisplayProps) => {
  return (
    <Card className="bg-white/90 backdrop-blur-lg border-0 shadow-2xl hover:shadow-3xl transition-all duration-500 hover:scale-[1.02]">
      <CardHeader className="pb-4">
        <CardTitle className="flex items-center gap-3 text-2xl">
          <div className="p-2 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl">
            <Cloud className="h-6 w-6 text-white" />
          </div>
          <div>
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Weather Information
            </span>
            <div className="flex items-center gap-2 text-sm font-normal text-gray-600 mt-1">
              <MapPin className="h-4 w-4" />
              {location.city}, {location.country}
            </div>
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-8">
        {/* Current Weather */}
        <div className="bg-gradient-to-br from-blue-500 via-purple-500 to-indigo-600 text-white p-8 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-[1.02]">
          <h3 className="text-2xl font-bold mb-6 flex items-center gap-2">
            <div className="w-3 h-3 bg-yellow-400 rounded-full animate-pulse"></div>
            Current Conditions
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="flex items-center gap-4 p-4 bg-white/10 backdrop-blur-sm rounded-xl hover:bg-white/20 transition-all duration-300">
              <div className="p-3 bg-white/20 rounded-xl">
                <Thermometer className="h-8 w-8 animate-pulse" />
              </div>
              <div>
                <p className="text-sm opacity-90 font-medium">Temperature</p>
                <p className="text-3xl font-bold">{Math.round(weather.current.temp)}°C</p>
              </div>
            </div>
            <div className="flex items-center gap-4 p-4 bg-white/10 backdrop-blur-sm rounded-xl hover:bg-white/20 transition-all duration-300">
              <div className="p-3 bg-white/20 rounded-xl">
                <Droplets className="h-8 w-8 animate-pulse delay-200" />
              </div>
              <div>
                <p className="text-sm opacity-90 font-medium">Humidity</p>
                <p className="text-3xl font-bold">{weather.current.humidity}%</p>
              </div>
            </div>
            <div className="flex items-center gap-4 p-4 bg-white/10 backdrop-blur-sm rounded-xl hover:bg-white/20 transition-all duration-300">
              <div className="p-3 bg-white/20 rounded-xl">
                <Cloud className="h-8 w-8 animate-pulse delay-300" />
              </div>
              <div>
                <p className="text-sm opacity-90 font-medium">Conditions</p>
                <p className="text-lg font-semibold capitalize">{weather.current.description}</p>
              </div>
            </div>
          </div>
        </div>

        {/* 7-Day Forecast */}
        <div className="space-y-6">
          <h3 className="text-2xl font-bold flex items-center gap-3 text-gray-800">
            <div className="p-2 bg-gradient-to-br from-green-500 to-emerald-600 rounded-xl">
              <Calendar className="h-6 w-6 text-white" />
            </div>
            7-Day Forecast
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {weather.forecast.map((day, index) => (
              <div 
                key={index} 
                className="bg-gradient-to-br from-gray-50 to-white p-6 rounded-2xl border border-gray-100 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 hover:-translate-y-1"
                style={{animationDelay: `${index * 100}ms`}}
              >
                <div className="flex items-center justify-between mb-4">
                  <p className="font-bold text-gray-800 text-lg">{day.date}</p>
                  <div className="w-2 h-2 bg-gradient-to-r from-green-400 to-blue-500 rounded-full animate-pulse"></div>
                </div>
                <div className="space-y-3">
                  <div className="flex justify-between items-center p-2 bg-blue-50 rounded-lg">
                    <span className="text-sm font-medium text-gray-600">Temp Range</span>
                    <span className="font-bold text-blue-600">
                      {Math.round(day.temp_max)}°/{Math.round(day.temp_min)}°C
                    </span>
                  </div>
                  <div className="flex justify-between items-center p-2 bg-green-50 rounded-lg">
                    <span className="text-sm font-medium text-gray-600">Humidity</span>
                    <span className="font-bold text-green-600">{day.humidity}%</span>
                  </div>
                  {day.rain > 0 && (
                    <div className="flex justify-between items-center p-2 bg-cyan-50 rounded-lg">
                      <span className="text-sm font-medium text-gray-600">Rainfall</span>
                      <span className="font-bold text-cyan-600">{day.rain}mm</span>
                    </div>
                  )}
                  <p className="text-gray-600 capitalize bg-gray-50 p-2 rounded-lg text-center font-medium">
                    {day.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default WeatherDisplay;
