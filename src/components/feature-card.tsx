import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import type { LucideIcon } from "lucide-react";

interface FeatureCardProps {
  title: string;
  icon: LucideIcon;
  children: React.ReactNode;
  className?: string;
}

export function FeatureCard({ title, icon: Icon, children, className }: FeatureCardProps) {
  return (
    <Card className={cn("w-full shadow-2xl bg-card/80 backdrop-blur-sm border-primary/20", className)}>
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-2xl font-headline font-semibold text-primary">{title}</CardTitle>
        <Icon className="h-8 w-8 text-accent" />
      </CardHeader>
      <CardContent>
        {children}
      </CardContent>
    </Card>
  );
}
