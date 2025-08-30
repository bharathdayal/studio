"use client";

import { useOrientation } from "@/hooks/use-orientation";
import { AlarmClock } from "@/components/alarm-clock";
import { Stopwatch } from "@/components/stopwatch";
import { Timer } from "@/components/timer";
import { Weather } from "@/components/weather";
import { Smartphone, RotateCw } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";

export default function Home() {
  const orientation = useOrientation();

  const renderContent = () => {
    switch (orientation) {
      case "portrait-primary":
        return <AlarmClock />;
      case "landscape-primary":
        return <Stopwatch />;
      case "portrait-secondary":
        return <Timer />;
      case "landscape-secondary":
        return <Weather />;
      default:
        return (
          <div className="text-center p-8 rounded-lg bg-card/80 backdrop-blur-sm border-primary/20 max-w-md shadow-2xl">
            <Smartphone className="mx-auto h-24 w-24 text-primary" />
            <h2 className="mt-6 text-2xl font-headline font-semibold">Welcome to Bharath Oriento!</h2>
            <p className="mt-2 text-muted-foreground font-body">
              Flip the phone, switch the mode.
            </p>
            <div className="mt-4 text-muted-foreground font-body flex items-center justify-center gap-2">
                <RotateCw className="h-5 w-5 animate-spin-slow" />
                <p>Try rotating your device to discover different tools.</p>
            </div>
          </div>
        );
    }
  };

  return (
    <main className="flex min-h-screen w-full flex-col items-center justify-center p-4 bg-background relative overflow-hidden">
        <div className="absolute inset-0 z-0">
            <div className="absolute -top-1/4 -left-1/4 w-1/2 h-1/2 bg-primary/10 rounded-full filter blur-3xl opacity-50 animate-blob"></div>
            <div className="absolute -bottom-1/4 -right-1/4 w-1/2 h-1/2 bg-accent/10 rounded-full filter blur-3xl opacity-50 animate-blob animation-delay-2000"></div>
        </div>
        <div className="z-10 w-full flex flex-col items-center">
            <h1 className="text-4xl md:text-5xl font-headline font-bold text-center mb-2 text-primary/80">
              Bharath Oriento
            </h1>
            <p className="text-muted-foreground font-body mb-8">Flip the phone, switch the mode</p>
            <AnimatePresence mode="wait">
              <motion.div
                key={orientation || 'default'}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
                className="w-full max-w-md"
              >
                {renderContent()}
              </motion.div>
            </AnimatePresence>
        </div>
    </main>
  );
}
