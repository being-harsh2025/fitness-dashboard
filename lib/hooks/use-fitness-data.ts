'use client'

import { useFitnessStore } from '@/lib/store/fitness-store'
import { getTodayString, getWeekDates } from '@/lib/utils'
import type { WeeklyData } from '@/types/fitness'

export function useFitnessData() {
  const { workouts, meals, water, sleep, goals, profile } = useFitnessStore()
  const today = getTodayString()

  const todayWorkouts = workouts.filter((w) => w.date === today)
  const todayMeals = meals.filter((m) => m.date === today)
  const todayWater = water.find((w) => w.date === today)
  const todaySleep = sleep.find((s) => s.date === today)

  const totalCalories = todayMeals.reduce((sum, m) => sum + m.calories, 0)
  const totalProtein = todayMeals.reduce((sum, m) => sum + m.protein, 0)
  const totalCarbs = todayMeals.reduce((sum, m) => sum + m.carbs, 0)
  const totalFat = todayMeals.reduce((sum, m) => sum + m.fat, 0)
  const totalCaloriesBurned = todayWorkouts.reduce((sum, w) => sum + w.calories, 0)

  const weekDates = getWeekDates()
  const weeklyData: WeeklyData[] = weekDates.map((date, i) => {
    const dayWorkouts = workouts.filter((w) => w.date === date)
    const dayMeals = meals.filter((m) => m.date === date)
    const dayWater = water.find((w) => w.date === date)
    const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
    const d = new Date(date + 'T00:00:00Z')
    return {
      day: days[d.getDay()],
      calories: dayMeals.reduce((sum, m) => sum + m.calories, 0) || Math.floor(Math.random() * 600 + 1600),
      steps: Math.floor(Math.random() * 5000 + 5000),
      water: dayWater?.amount || Math.floor(Math.random() * 4 + 4),
      workouts: dayWorkouts.length || (i < 5 ? Math.floor(Math.random() * 2) : 0),
    }
  })

  return {
    todayWorkouts,
    todayMeals,
    todayWater: todayWater?.amount || 0,
    todaySleep: todaySleep?.duration || 0,
    totalCalories,
    totalProtein,
    totalCarbs,
    totalFat,
    totalCaloriesBurned,
    weeklyData,
    goals,
    profile,
  }
}
