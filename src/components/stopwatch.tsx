"use client";

import { useState, useRef, useCallback, useEffect } from "react";
import { Timer as TimerIcon, Play, Pause, RotateCcw } from "lucide-react";
import { FeatureCard } from "./feature-card";
import { Button } from "./ui/button";

const formatTime = (time: number) => {
  const minutes = Math.floor(time / 60000).toString().padStart(2, "0");
  const seconds = Math.floor((time % 60000) / 1000).toString().padStart(2, "0");
  const milliseconds = (time % 1000).toString().padStart(3, "0").slice(0, 2);
  return `${minutes}:${seconds}.${milliseconds}`;
};

export function Stopwatch() {
  const [time, setTime] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const animationFrameRef = useRef<number>();
  const startTimeRef = useRef<number>(0);

  const animate = useCallback((timestamp: number) => {
    if (!startTimeRef.current) {
        startTimeRef.current = timestamp - time;
    }
    setTime(timestamp - startTimeRef.current);
    animationFrameRef.current = requestAnimationFrame(animate);
  }, [time]);

  const startTimer = useCallback(() => {
    if (isRunning) return;
    setIsRunning(true);
    startTimeRef.current = performance.now() - time;
    animationFrameRef.current = requestAnimationFrame(animate);
  }, [isRunning, time, animate]);

  const stopTimer = useCallback(() => {
    if (!isRunning || !animationFrameRef.current) return;
    setIsRunning(false);
    cancelAnimationFrame(animationFrameRef.current);
  }, [isRunning]);

  const resetTimer = useCallback(() => {
    if(animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
    }
    setIsRunning(false);
    setTime(0);
    startTimeRef.current = 0;
  }, []);

  useEffect(() => {
    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, []);
  
  return (
    <FeatureCard title="Stopwatch" icon={TimerIcon}>
      <div className="text-center py-8">
        <p className="font-headline font-bold text-7xl md:text-8xl text-primary tabular-nums">
          {formatTime(time)}
        </p>
      </div>
      <div className="flex justify-center gap-4 mt-4">
        {!isRunning ? (
          <Button onClick={startTimer} size="lg" className="bg-accent hover:bg-accent/90 w-32">
            <Play className="mr-2 h-5 w-5" /> Start
          </Button>
        ) : (
          <Button onClick={stopTimer} size="lg" variant="secondary" className="w-32">
            <Pause className="mr-2 h-5 w-5" /> Pause
          </Button>
        )}
        <Button onClick={resetTimer} size="lg" variant="outline" className="w-32">
          <RotateCcw className="mr-2 h-5 w-5" /> Reset
        </Button>
      </div>
    </FeatureCard>
  );
}
