"use client";

import { useState, useEffect, useRef } from "react";
import { Hourglass, Play, Pause, RotateCcw } from "lucide-react";
import { FeatureCard } from "./feature-card";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { useToast } from "@/hooks/use-toast";

const formatTime = (time: number) => {
  const minutes = Math.floor(time / 60).toString().padStart(2, "0");
  const seconds = (time % 60).toString().padStart(2, "0");
  return `${minutes}:${seconds}`;
};

export function Timer() {
  const [duration, setDuration] = useState(300); // 5 minutes in seconds
  const [timeLeft, setTimeLeft] = useState(duration);
  const [isActive, setIsActive] = useState(false);
  const { toast } = useToast();
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (isActive && timeLeft > 0) {
      timerRef.current = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);
    } else if (timeLeft === 0 && isActive) {
      setIsActive(false);
      toast({
        title: "Timer Finished!",
        description: "Your countdown is complete.",
      });
      if (timerRef.current) clearInterval(timerRef.current);
    }
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isActive, timeLeft, toast]);

  const handleStartPause = () => {
    if (timeLeft > 0) {
      setIsActive(!isActive);
    }
  };

  const handleReset = () => {
    setIsActive(false);
    setTimeLeft(duration);
  };
  
  const handleDurationChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newDuration = parseInt(e.target.value, 10) * 60;
    if (!isNaN(newDuration) && newDuration > 0) {
        setDuration(newDuration);
        if(!isActive) {
            setTimeLeft(newDuration);
        }
    } else if (e.target.value === '') {
        setDuration(0);
        if(!isActive) {
            setTimeLeft(0);
        }
    }
  };

  return (
    <FeatureCard title="Timer" icon={Hourglass}>
      <div className="text-center py-8">
        <p className="font-headline font-bold text-7xl md:text-8xl text-primary tabular-nums">
          {formatTime(timeLeft)}
        </p>
      </div>
      <div className="flex flex-col items-center gap-4 mt-4">
        <div className="flex items-center gap-2">
            <label htmlFor="timer-minutes" className="sr-only">Minutes</label>
            <Input 
                id="timer-minutes"
                type="number"
                value={duration / 60}
                onChange={handleDurationChange}
                className="w-24 text-center"
                disabled={isActive}
                min="1"
            />
            <span className="text-muted-foreground font-body">minutes</span>
        </div>
        <div className="flex justify-center gap-4">
            <Button onClick={handleStartPause} size="lg" className="bg-accent hover:bg-accent/90" disabled={timeLeft === 0}>
                {isActive ? <Pause className="mr-2 h-5 w-5" /> : <Play className="mr-2 h-5 w-5" />}
                {isActive ? "Pause" : "Start"}
            </Button>
            <Button onClick={handleReset} size="lg" variant="outline">
                <RotateCcw className="mr-2 h-5 w-5" /> Reset
            </Button>
        </div>
      </div>
    </FeatureCard>
  );
}
