"use client";

import { useState, useEffect } from "react";
import { AlarmClock as AlarmClockIcon } from "lucide-react";
import { FeatureCard } from "./feature-card";

export function AlarmClock() {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timerId = setInterval(() => {
      setTime(new Date());
    }, 1000);
    return () => clearInterval(timerId);
  }, []);

  return (
    <FeatureCard title="Alarm Clock" icon={AlarmClockIcon}>
      <div className="text-center py-8">
        <p className="font-headline font-bold text-7xl md:text-8xl text-primary tabular-nums">
          {time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' })}
        </p>
        <p className="text-muted-foreground mt-2 font-body">
          {time.toLocaleDateString([], { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
        </p>
      </div>
    </FeatureCard>
  );
}
