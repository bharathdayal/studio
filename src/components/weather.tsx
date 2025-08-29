"use client";

import { useState, useEffect } from "react";
import { MapPin } from "lucide-react";
import {
  getWeatherDescriptionFromLocation,
  type WeatherDescriptionFromLocationOutput,
} from "@/ai/flows/weather-description-from-location";
import { useToast } from "@/hooks/use-toast";
import { FeatureCard } from "./feature-card";
import { Skeleton } from "./ui/skeleton";
import { WeatherIcon } from "./weather-icon";

export function Weather() {
  const [weather, setWeather] = useState<WeatherDescriptionFromLocationOutput | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();

  useEffect(() => {
    if (!navigator.geolocation) {
      setError("Geolocation is not supported by your browser.");
      setLoading(false);
      return;
    }

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        try {
          const { latitude, longitude } = position.coords;
          const weatherData = await getWeatherDescriptionFromLocation({ latitude, longitude });
          setWeather(weatherData);
        } catch (e) {
          setError("Failed to fetch weather data.");
          toast({
            variant: "destructive",
            title: "Error",
            description: "Could not retrieve weather information.",
          });
        } finally {
          setLoading(false);
        }
      },
      () => {
        setError("Unable to retrieve your location.");
        toast({
            variant: "destructive",
            title: "Location Error",
            description: "Please enable location services in your browser to see the weather.",
          });
        setLoading(false);
      }
    );
  }, [toast]);

  return (
    <FeatureCard title="Weather Today" icon={MapPin}>
      {loading && (
        <div className="space-y-4 py-8 text-center">
          <Skeleton className="h-24 w-24 rounded-full mx-auto" />
          <Skeleton className="h-8 w-3/4 mx-auto mt-4" />
          <Skeleton className="h-6 w-1/2 mx-auto mt-2" />
        </div>
      )}
      {error && !loading && (
        <div className="text-center py-8 text-destructive font-body">
          <p>{error}</p>
        </div>
      )}
      {!loading && !error && weather && (
        <div className="text-center py-8">
          <WeatherIcon iconName={weather.icon} className="h-24 w-24 mx-auto text-accent" />
          <p className="font-headline text-5xl font-bold text-primary mt-4">{weather.temperature}°C</p>
          <p className="text-muted-foreground text-lg mt-2 font-body capitalize">{weather.description}</p>
          <div className="flex items-center justify-center gap-2 mt-4 text-muted-foreground font-body">
            <WeatherIcon iconName={weather.windIcon} className="h-5 w-5" />
            <span className="capitalize">{weather.windIcon}</span>
          </div>
        </div>
      )}
    </FeatureCard>
  );
}
