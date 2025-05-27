
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { MapPin, Loader2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import type { Location, WeatherData } from '@/pages/Index';

interface LocationDetectorProps {
  onLocationDetected: (location: Location) => void;
  onWeatherFetched: (weather: WeatherData) => void;
  loading: boolean;
  setLoading: (loading: boolean) => void;
}

const LocationDetector = ({ 
  onLocationDetected, 
  onWeatherFetched, 
  loading, 
  setLoading 
}: LocationDetectorProps) => {
  const { toast } = useToast();
  const [locationStatus, setLocationStatus] = useState<string>('');

  const detectLocation = () => {
    if (!navigator.geolocation) {
      toast({
        variant: "destructive",
        title: "Geolocation not supported",
        description: "Your browser doesn't support location detection."
      });
      return;
    }

    setLoading(true);
    setLocationStatus('Detecting your location...');

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const { latitude, longitude } = position.coords;
        
        try {
          // Get city name from reverse geocoding
          setLocationStatus('Getting location details...');
          const geoResponse = await fetch(
            `https://api.openweathermap.org/geo/1.0/reverse?lat=${latitude}&lon=${longitude}&limit=1&appid=13678d0932eb87d333284671e39179ee`
          );
          
          let city = 'Unknown';
          let country = 'Unknown';
          
          if (geoResponse.ok) {
            const geoData = await geoResponse.json();
            if (geoData.length > 0) {
              city = geoData[0].name;
              country = geoData[0].country;
            }
          }

          const location: Location = { latitude, longitude, city, country };
          onLocationDetected(location);

          // Fetch weather data
          setLocationStatus('Fetching weather data...');
          await fetchWeatherData(latitude, longitude);

          toast({
            title: "Location detected successfully!",
            description: `Found your location: ${city}, ${country}`
          });

        } catch (error) {
          console.error('Error fetching location data:', error);
          toast({
            variant: "destructive",
            title: "Error",
            description: "Failed to fetch location or weather data. Please check your API key."
          });
        } finally {
          setLoading(false);
          setLocationStatus('');
        }
      },
      (error) => {
        setLoading(false);
        setLocationStatus('');
        
        let errorMessage = 'Failed to detect location.';
        switch (error.code) {
          case error.PERMISSION_DENIED:
            errorMessage = 'Location access denied. Please enable location permissions.';
            break;
          case error.POSITION_UNAVAILABLE:
            errorMessage = 'Location information unavailable.';
            break;
          case error.TIMEOUT:
            errorMessage = 'Location request timed out.';
            break;
        }

        toast({
          variant: "destructive",
          title: "Location Error",
          description: errorMessage
        });
      },
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 300000
      }
    );
  };

  const fetchWeatherData = async (lat: number, lon: number) => {
    // Note: Replace YOUR_API_KEY with actual OpenWeatherMap API key
    const API_KEY = '13678d0932eb87d333284671e39179ee';
    
    // Fetch current weather
    const currentResponse = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`
    );
    
    // Fetch 7-day forecast
    const forecastResponse = await fetch(
      `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`
    );

    if (!currentResponse.ok || !forecastResponse.ok) {
      throw new Error('Failed to fetch weather data');
    }

    const currentData = await currentResponse.json();
    const forecastData = await forecastResponse.json();

    // Process forecast data to get daily summaries
    const dailyForecast = forecastData.list
      .filter((_: any, index: number) => index % 8 === 0) // Every 8th item (24 hours)
      .slice(0, 7)
      .map((item: any) => ({
        date: new Date(item.dt * 1000).toLocaleDateString(),
        temp_max: item.main.temp_max,
        temp_min: item.main.temp_min,
        humidity: item.main.humidity,
        rain: item.rain?.['3h'] || 0,
        description: item.weather[0].description,
        icon: item.weather[0].icon
      }));

    const weatherData: WeatherData = {
      current: {
        temp: currentData.main.temp,
        humidity: currentData.main.humidity,
        description: currentData.weather[0].description,
        icon: currentData.weather[0].icon
      },
      forecast: dailyForecast
    };

    onWeatherFetched(weatherData);
  };

  return (
    <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <MapPin className="h-5 w-5 text-blue-600" />
          Location Detection
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <p className="text-gray-600">
          Click the button below to detect your current location and get personalized crop recommendations.
        </p>
        
        <Button 
          onClick={detectLocation} 
          disabled={loading}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white"
        >
          {loading ? (
            <>
              <Loader2 className="h-4 w-4 mr-2 animate-spin" />
              {locationStatus || 'Detecting...'}
            </>
          ) : (
            <>
              <MapPin className="h-4 w-4 mr-2" />
              Detect My Location
            </>
          )}
        </Button>

        <div className="text-sm text-gray-500 bg-blue-50 p-3 rounded-lg">
          <strong>Note:</strong> To use weather features, you'll need to:
          <ol className="list-decimal list-inside mt-2 space-y-1">
            <li>Get a free API key from <a href="https://openweathermap.org/api" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">OpenWeatherMap</a></li>
            <li>Replace 'YOUR_API_KEY' in the code with your actual API key</li>
          </ol>
        </div>
      </CardContent>
    </Card>
  );
};

export default LocationDetector;
