export interface WorkoutEntry {
  id: string
  date: string
  name: string
  type: string
  duration: number
  calories: number
  sets?: number
  reps?: number
  weight?: number
  notes?: string
}

export interface MealEntry {
  id: string
  date: string
  name: string
  calories: number
  protein: number
  carbs: number
  fat: number
  mealType: 'breakfast' | 'lunch' | 'dinner' | 'snack'
}

export interface WaterEntry {
  id: string
  date: string
  amount: number
}

export interface SleepEntry {
  id: string
  date: string
  duration: number
  quality: number
}

export interface DailyStats {
  date: string
  calories: number
  steps: number
  water: number
  sleep: number
  workouts: number
  weight?: number
}

export interface Goal {
  id: string
  name: string
  type: 'calories' | 'steps' | 'water' | 'sleep' | 'workouts' | 'weight'
  target: number
  current: number
  unit: string
  deadline?: string
}

export interface UserProfile {
  name: string
  age: number
  weight: number
  height: number
  activityLevel: 'sedentary' | 'light' | 'moderate' | 'active' | 'very_active'
  goals: {
    calories: number
    steps: number
    water: number
    sleep: number
    workouts: number
  }
}

export interface WeeklyData {
  day: string
  calories: number
  steps: number
  water: number
  workouts: number
  weight?: number
}
