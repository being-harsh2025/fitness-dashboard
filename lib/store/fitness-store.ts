import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import type { WorkoutEntry, MealEntry, WaterEntry, SleepEntry, Goal, UserProfile } from '@/types/fitness'
import { generateId, getTodayString } from '@/lib/utils'

interface FitnessState {
  profile: UserProfile
  workouts: WorkoutEntry[]
  meals: MealEntry[]
  water: WaterEntry[]
  sleep: SleepEntry[]
  goals: Goal[]

  // Actions
  addWorkout: (workout: Omit<WorkoutEntry, 'id'>) => void
  removeWorkout: (id: string) => void
  addMeal: (meal: Omit<MealEntry, 'id'>) => void
  removeMeal: (id: string) => void
  addWater: (amount: number) => void
  addSleep: (sleep: Omit<SleepEntry, 'id'>) => void
  updateGoal: (id: string, current: number) => void
  updateProfile: (profile: Partial<UserProfile>) => void
}

const mockWorkouts: WorkoutEntry[] = [
  { id: '1', date: getTodayString(), name: 'Morning Run', type: 'Cardio', duration: 45, calories: 380, notes: 'Great pace!' },
  { id: '2', date: getTodayString(), name: 'Bench Press', type: 'Strength', duration: 30, calories: 220, sets: 4, reps: 10, weight: 80 },
]

const mockMeals: MealEntry[] = [
  { id: '1', date: getTodayString(), name: 'Oatmeal with berries', calories: 350, protein: 12, carbs: 58, fat: 7, mealType: 'breakfast' },
  { id: '2', date: getTodayString(), name: 'Grilled chicken salad', calories: 420, protein: 38, carbs: 25, fat: 18, mealType: 'lunch' },
  { id: '3', date: getTodayString(), name: 'Protein shake', calories: 180, protein: 25, carbs: 15, fat: 5, mealType: 'snack' },
]

const defaultProfile: UserProfile = {
  name: 'Alex',
  age: 28,
  weight: 75,
  height: 178,
  activityLevel: 'moderate',
  goals: {
    calories: 2200,
    steps: 10000,
    water: 8,
    sleep: 8,
    workouts: 5,
  },
}

const defaultGoals: Goal[] = [
  { id: '1', name: 'Daily Calories', type: 'calories', target: 2200, current: 950, unit: 'kcal' },
  { id: '2', name: 'Daily Steps', type: 'steps', target: 10000, current: 6543, unit: 'steps' },
  { id: '3', name: 'Water Intake', type: 'water', target: 8, current: 5, unit: 'glasses' },
  { id: '4', name: 'Sleep', type: 'sleep', target: 8, current: 7, unit: 'hours' },
  { id: '5', name: 'Weekly Workouts', type: 'workouts', target: 5, current: 3, unit: 'sessions' },
]

export const useFitnessStore = create<FitnessState>()(
  persist(
    (set) => ({
      profile: defaultProfile,
      workouts: mockWorkouts,
      meals: mockMeals,
      water: [{ id: '1', date: getTodayString(), amount: 5 }],
      sleep: [{ id: '1', date: getTodayString(), duration: 7, quality: 4 }],
      goals: defaultGoals,

      addWorkout: (workout) =>
        set((state) => ({
          workouts: [...state.workouts, { ...workout, id: generateId() }],
        })),

      removeWorkout: (id) =>
        set((state) => ({
          workouts: state.workouts.filter((w) => w.id !== id),
        })),

      addMeal: (meal) =>
        set((state) => ({
          meals: [...state.meals, { ...meal, id: generateId() }],
        })),

      removeMeal: (id) =>
        set((state) => ({
          meals: state.meals.filter((m) => m.id !== id),
        })),

      addWater: (amount) =>
        set((state) => {
          const today = getTodayString()
          const existing = state.water.find((w) => w.date === today)
          if (existing) {
            return {
              water: state.water.map((w) =>
                w.date === today ? { ...w, amount: w.amount + amount } : w
              ),
            }
          }
          return {
            water: [...state.water, { id: generateId(), date: today, amount }],
          }
        }),

      addSleep: (sleep) =>
        set((state) => ({
          sleep: [...state.sleep, { ...sleep, id: generateId() }],
        })),

      updateGoal: (id, current) =>
        set((state) => ({
          goals: state.goals.map((g) => (g.id === id ? { ...g, current } : g)),
        })),

      updateProfile: (profile) =>
        set((state) => ({
          profile: { ...state.profile, ...profile },
        })),
    }),
    {
      name: 'fitness-store',
    }
  )
)
