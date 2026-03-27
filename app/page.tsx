'use client'

import { useFitnessData } from '@/lib/hooks/use-fitness-data'
import { getGreeting } from '@/lib/utils'
import { StatsGrid } from '@/components/dashboard/stats-grid'
import { ProgressRings } from '@/components/dashboard/progress-rings'
import { QuickAdd } from '@/components/dashboard/quick-add'
import { WeeklyActivity } from '@/components/charts/weekly-activity'
import { CalorieChart } from '@/components/charts/calorie-chart'
import { WeightChart } from '@/components/charts/weight-chart'

export default function DashboardPage() {
  const {
    todayWorkouts,
    totalCalories,
    todayWater,
    todaySleep,
    weeklyData,
    profile,
  } = useFitnessData()

  return (
    <div className="p-6 space-y-6 max-w-7xl mx-auto">
      <div>
        <h1 className="text-3xl font-bold">
          {getGreeting()}, {profile.name}! 👋
        </h1>
        <p className="text-muted-foreground mt-1">
          Here&apos;s your fitness overview for today
        </p>
      </div>

      <StatsGrid
        calories={totalCalories}
        caloriesGoal={profile.goals.calories}
        steps={6543}
        stepsGoal={profile.goals.steps}
        water={todayWater}
        waterGoal={profile.goals.water}
        sleep={todaySleep}
        sleepGoal={profile.goals.sleep}
        workouts={todayWorkouts.length}
        workoutsGoal={profile.goals.workouts}
      />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <WeeklyActivity data={weeklyData} />
          <CalorieChart data={weeklyData} />
        </div>
        <div className="space-y-6">
          <ProgressRings
            calories={totalCalories}
            caloriesGoal={profile.goals.calories}
            steps={6543}
            stepsGoal={profile.goals.steps}
            water={todayWater}
            waterGoal={profile.goals.water}
            sleep={todaySleep}
            sleepGoal={profile.goals.sleep}
          />
          <QuickAdd />
        </div>
      </div>

      <WeightChart />
    </div>
  )
}
