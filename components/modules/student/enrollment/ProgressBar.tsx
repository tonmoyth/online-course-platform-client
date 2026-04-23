"use client";

interface ProgressBarProps {
  progressPercent: number;
}

export default function ProgressBar({ progressPercent }: ProgressBarProps) {
  // Ensure the percentage is between 0 and 100
  const clampedProgress = Math.min(Math.max(progressPercent, 0), 100);

  return (
    <div className="w-full">
      <div className="flex justify-between items-center mb-1">
        <span className="text-sm font-medium text-muted-foreground">Course Progress</span>
        <span className="text-sm font-bold text-primary">{Math.round(clampedProgress)}%</span>
      </div>
      <div className="w-full bg-muted rounded-full h-2.5 overflow-hidden">
        <div
          className="bg-green-500 h-2.5 rounded-full transition-all duration-500 ease-out"
          style={{ width: `${clampedProgress}%` }}
        />
      </div>
    </div>
  );
}
