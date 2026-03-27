'use client'

import { Flame, Footprints, Droplets, Moon, Dumbbell } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Progress } from '@/components/ui/progress'

interface StatCardProps {
  title: string
  value: string | number
  goal: number
  current: number
  unit: string
  icon: React.ReactNode
  color: string
  gradient: string
}

function StatCard({ title, value, goal, current, unit, icon, color, gradient }: StatCardProps) {
  const percentage = Math.min(Math.round((current / goal) * 100), 100)

  return (
    <Card className="relative overflow-hidden">
      <div className={`absolute inset-0 opacity-5 ${gradient}`} />
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-sm font-medium text-muted-foreground">{title}</CardTitle>
        <div className={`p-2 rounded-lg ${color}`}>
          {icon}
        </div>
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold mb-1">
          {value} <span className="text-sm font-normal text-muted-foreground">{unit}</span>
        </div>
        <div className="flex items-center gap-2 mt-3">
          <Progress value={percentage} className="flex-1 h-2" />
          <span className="text-xs text-muted-foreground">{percentage}%</span>
        </div>
        <p className="text-xs text-muted-foreground mt-1">Goal: {goal} {unit}</p>
      </CardContent>
    </Card>
  )
}

interface StatsGridProps {
  calories: number
  caloriesGoal: number
  steps: number
  stepsGoal: number
  water: number
  waterGoal: number
  sleep: number
  sleepGoal: number
  workouts: number
  workoutsGoal: number
}

export function StatsGrid({ calories, caloriesGoal, steps, stepsGoal, water, waterGoal, sleep, sleepGoal, workouts, workoutsGoal }: StatsGridProps) {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
      <StatCard
        title="Calories"
        value={calories.toLocaleString()}
        goal={caloriesGoal}
        current={calories}
        unit="kcal"
        icon={<Flame className="h-4 w-4 text-orange-500" />}
        color="bg-orange-100 dark:bg-orange-900/20"
        gradient="bg-gradient-to-br from-orange-400 to-red-400"
      />
      <StatCard
        title="Steps"
        value={steps.toLocaleString()}
        goal={stepsGoal}
        current={steps}
        unit="steps"
        icon={<Footprints className="h-4 w-4 text-blue-500" />}
        color="bg-blue-100 dark:bg-blue-900/20"
        gradient="bg-gradient-to-br from-blue-400 to-cyan-400"
      />
      <StatCard
        title="Water"
        value={water}
        goal={waterGoal}
        current={water}
        unit="glasses"
        icon={<Droplets className="h-4 w-4 text-cyan-500" />}
        color="bg-cyan-100 dark:bg-cyan-900/20"
        gradient="bg-gradient-to-br from-cyan-400 to-blue-400"
      />
      <StatCard
        title="Sleep"
        value={sleep}
        goal={sleepGoal}
        current={sleep}
        unit="hrs"
        icon={<Moon className="h-4 w-4 text-purple-500" />}
        color="bg-purple-100 dark:bg-purple-900/20"
        gradient="bg-gradient-to-br from-purple-400 to-pink-400"
      />
      <StatCard
        title="Workouts"
        value={workouts}
        goal={workoutsGoal}
        current={workouts}
        unit="sessions"
        icon={<Dumbbell className="h-4 w-4 text-emerald-500" />}
        color="bg-emerald-100 dark:bg-emerald-900/20"
        gradient="bg-gradient-to-br from-emerald-400 to-green-400"
      />
    </div>
  )
}
