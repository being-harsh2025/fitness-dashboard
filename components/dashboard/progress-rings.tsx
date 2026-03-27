'use client'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

interface ProgressRingProps {
  value: number
  max: number
  color: string
  label: string
  size?: number
}

function ProgressRing({ value, max, color, label, size = 80 }: ProgressRingProps) {
  const percentage = Math.min((value / max) * 100, 100)
  const radius = (size - 10) / 2
  const circumference = 2 * Math.PI * radius
  const strokeDashoffset = circumference - (percentage / 100) * circumference

  return (
    <div className="flex flex-col items-center gap-2">
      <svg width={size} height={size} className="-rotate-90">
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke="currentColor"
          strokeWidth="8"
          className="text-muted/30"
        />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke={color}
          strokeWidth="8"
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
          strokeLinecap="round"
          style={{ transition: 'stroke-dashoffset 0.5s ease' }}
        />
      </svg>
      <div className="text-center">
        <div className="text-sm font-semibold">{Math.round(percentage)}%</div>
        <div className="text-xs text-muted-foreground">{label}</div>
      </div>
    </div>
  )
}

interface ProgressRingsProps {
  calories: number
  caloriesGoal: number
  steps: number
  stepsGoal: number
  water: number
  waterGoal: number
  sleep: number
  sleepGoal: number
}

export function ProgressRings({ calories, caloriesGoal, steps, stepsGoal, water, waterGoal, sleep, sleepGoal }: ProgressRingsProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-base">Today&apos;s Progress</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex items-center justify-around flex-wrap gap-4">
          <ProgressRing value={calories} max={caloriesGoal} color="#f97316" label="Calories" />
          <ProgressRing value={steps} max={stepsGoal} color="#3b82f6" label="Steps" />
          <ProgressRing value={water} max={waterGoal} color="#06b6d4" label="Water" />
          <ProgressRing value={sleep} max={sleepGoal} color="#a855f7" label="Sleep" />
        </div>
      </CardContent>
    </Card>
  )
}
