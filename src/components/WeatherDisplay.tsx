
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Cloud, Droplets, Thermometer, Calendar } from 'lucide-react';
import type { WeatherData, Location } from '@/pages/Index';

interface WeatherDisplayProps {
  weather: WeatherData;
  location: Location;
}

const WeatherDisplay = ({ weather, location }: WeatherDisplayProps) => {
  return (
    <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Cloud className="h-5 w-5 text-blue-600" />
          Weather Information - {location.city}, {location.country}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Current Weather */}
        <div className="bg-gradient-to-r from-blue-500 to-purple-600 text-white p-6 rounded-lg">
          <h3 className="text-xl font-semibold mb-4">Current Conditions</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="flex items-center gap-3">
              <Thermometer className="h-6 w-6" />
              <div>
                <p className="text-sm opacity-90">Temperature</p>
                <p className="text-2xl font-bold">{Math.round(weather.current.temp)}°C</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Droplets className="h-6 w-6" />
              <div>
                <p className="text-sm opacity-90">Humidity</p>
                <p className="text-2xl font-bold">{weather.current.humidity}%</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Cloud className="h-6 w-6" />
              <div>
                <p className="text-sm opacity-90">Conditions</p>
                <p className="text-lg font-semibold capitalize">{weather.current.description}</p>
              </div>
            </div>
          </div>
        </div>

        {/* 7-Day Forecast */}
        <div>
          <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
            <Calendar className="h-5 w-5 text-green-600" />
            7-Day Forecast
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {weather.forecast.map((day, index) => (
              <div key={index} className="bg-gray-50 p-4 rounded-lg border">
                <p className="font-medium text-gray-800 mb-2">{day.date}</p>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span>High/Low:</span>
                    <span className="font-medium">
                      {Math.round(day.temp_max)}°/{Math.round(day.temp_min)}°C
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span>Humidity:</span>
                    <span className="font-medium">{day.humidity}%</span>
                  </div>
                  {day.rain > 0 && (
                    <div className="flex justify-between">
                      <span>Rain:</span>
                      <span className="font-medium text-blue-600">{day.rain}mm</span>
                    </div>
                  )}
                  <p className="text-gray-600 capitalize">{day.description}</p>
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
