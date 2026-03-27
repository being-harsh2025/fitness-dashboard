'use client'

import { useState } from 'react'
import { Plus, Dumbbell, Apple, Droplets } from 'lucide-react'
import { toast } from 'sonner'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { useFitnessStore } from '@/lib/store/fitness-store'
import { getTodayString } from '@/lib/utils'

export function QuickAdd() {
  const { addWorkout, addMeal, addWater } = useFitnessStore()
  const [workoutName, setWorkoutName] = useState('')
  const [mealName, setMealName] = useState('')
  const [calories, setCalories] = useState('')

  const handleAddWorkout = () => {
    if (!workoutName.trim()) return
    addWorkout({
      date: getTodayString(),
      name: workoutName,
      type: 'General',
      duration: 30,
      calories: 250,
    })
    setWorkoutName('')
    toast.success('Workout logged!', { description: workoutName })
  }

  const handleAddMeal = () => {
    if (!mealName.trim() || !calories) return
    addMeal({
      date: getTodayString(),
      name: mealName,
      calories: parseInt(calories),
      protein: 20,
      carbs: 40,
      fat: 10,
      mealType: 'snack',
    })
    setMealName('')
    setCalories('')
    toast.success('Meal logged!', { description: `${mealName} - ${calories} kcal` })
  }

  const handleAddWater = () => {
    addWater(1)
    toast.success('Water logged!', { description: '+1 glass of water' })
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-base flex items-center gap-2">
          <Plus className="h-4 w-4" />
          Quick Add
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex gap-2">
          <div className="flex items-center gap-2 p-2 rounded-lg bg-emerald-50 dark:bg-emerald-900/20">
            <Dumbbell className="h-4 w-4 text-emerald-500" />
          </div>
          <Input
            placeholder="Workout name..."
            value={workoutName}
            onChange={(e) => setWorkoutName(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleAddWorkout()}
            className="flex-1"
          />
          <Button size="sm" onClick={handleAddWorkout}>Add</Button>
        </div>

        <div className="flex gap-2">
          <div className="flex items-center gap-2 p-2 rounded-lg bg-orange-50 dark:bg-orange-900/20">
            <Apple className="h-4 w-4 text-orange-500" />
          </div>
          <Input
            placeholder="Meal name..."
            value={mealName}
            onChange={(e) => setMealName(e.target.value)}
            className="flex-1"
          />
          <Input
            type="number"
            placeholder="kcal"
            value={calories}
            onChange={(e) => setCalories(e.target.value)}
            className="w-20"
          />
          <Button size="sm" onClick={handleAddMeal}>Add</Button>
        </div>

        <Button
          variant="outline"
          className="w-full gap-2 text-cyan-600 border-cyan-200 hover:bg-cyan-50 dark:hover:bg-cyan-900/20"
          onClick={handleAddWater}
        >
          <Droplets className="h-4 w-4" />
          Add Water Glass
        </Button>
      </CardContent>
    </Card>
  )
}
