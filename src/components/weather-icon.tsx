"use client";

import { Sun, Cloud, CloudRain, Snowflake, Wind, Thermometer, CloudLightning, Cloudy, CloudDrizzle, Tornado, Haze } from "lucide-react";
import type { LucideProps } from "lucide-react";

interface WeatherIconProps extends LucideProps {
  iconName: string;
}

export function WeatherIcon({ iconName, ...props }: WeatherIconProps) {
  const normalizedIconName = iconName.toLowerCase();

  if (normalizedIconName.includes("sun") || normalizedIconName.includes("clear")) {
    return <Sun {...props} />;
  }
  if (normalizedIconName.includes("partly cloudy")) {
    return <Cloudy {...props} />;
  }
  if (normalizedIconName.includes("cloud")) {
    return <Cloud {...props} />;
  }
  if (normalizedIconName.includes("drizzle")) {
    return <CloudDrizzle {...props} />;
  }
  if (normalizedIconName.includes("rain")) {
    return <CloudRain {...props} />;
  }
  if (normalizedIconName.includes("thunderstorm")) {
    return <CloudLightning {...props} />;
  }
  if (normalizedIconName.includes("snow")) {
    return <Snowflake {...props} />;
  }
  if (normalizedIconName.includes("wind") || normalizedIconName.includes("breeze")) {
    return <Wind {...props} />;
  }
  if (normalizedIconName.includes("tornado")) {
    return <Tornado {...props} />;
  }
  if (normalizedIconName.includes("mist") || normalizedIconName.includes("haze") || normalizedIconName.includes("fog")) {
    return <Haze {...props} />;
  }

  return <Thermometer {...props} />;
}
