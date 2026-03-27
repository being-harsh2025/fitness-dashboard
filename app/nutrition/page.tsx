'use client'

import { useState } from 'react'
import { Apple, Trash2, Plus } from 'lucide-react'
import { toast } from 'sonner'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Progress } from '@/components/ui/progress'
import { useFitnessStore } from '@/lib/store/fitness-store'
import { useFitnessData } from '@/lib/hooks/use-fitness-data'
import { getTodayString } from '@/lib/utils'

export default function NutritionPage() {
  const { addMeal, removeMeal } = useFitnessStore()
  const { todayMeals, totalCalories, totalProtein, totalCarbs, totalFat, profile } = useFitnessData()
  const [name, setName] = useState('')
  const [calories, setCalories] = useState('')
  const [protein, setProtein] = useState('')
  const [carbs, setCarbs] = useState('')
  const [fat, setFat] = useState('')
  const [mealType, setMealType] = useState<'breakfast' | 'lunch' | 'dinner' | 'snack'>('snack')

  const mealTypes = ['breakfast', 'lunch', 'dinner', 'snack'] as const

  const handleAdd = () => {
    if (!name.trim() || !calories) return
    addMeal({
      date: getTodayString(),
      name,
      calories: parseInt(calories),
      protein: parseInt(protein) || 0,
      carbs: parseInt(carbs) || 0,
      fat: parseInt(fat) || 0,
      mealType,
    })
    setName(''); setCalories(''); setProtein(''); setCarbs(''); setFat('')
    toast.success('Meal logged!')
  }

  const mealTypeColors: Record<string, string> = {
    breakfast: 'bg-yellow-100 text-yellow-700',
    lunch: 'bg-green-100 text-green-700',
    dinner: 'bg-blue-100 text-blue-700',
    snack: 'bg-purple-100 text-purple-700',
  }

  const caloriesGoal = profile.goals.calories

  return (
    <div className="p-6 space-y-6 max-w-4xl mx-auto">
      <div>
        <h1 className="text-3xl font-bold flex items-center gap-2">
          <Apple className="h-8 w-8 text-orange-500" />
          Nutrition
        </h1>
        <p className="text-muted-foreground mt-1">Track your meals and calories</p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: 'Calories', value: totalCalories, goal: caloriesGoal, unit: 'kcal', color: 'text-orange-500' },
          { label: 'Protein', value: totalProtein, goal: 150, unit: 'g', color: 'text-red-500' },
          { label: 'Carbs', value: totalCarbs, goal: 250, unit: 'g', color: 'text-yellow-500' },
          { label: 'Fat', value: totalFat, goal: 65, unit: 'g', color: 'text-blue-500' },
        ].map(({ label, value, goal, unit, color }) => (
          <Card key={label}>
            <CardContent className="pt-4">
              <p className="text-sm text-muted-foreground">{label}</p>
              <p className={`text-2xl font-bold ${color}`}>{value}<span className="text-sm font-normal text-muted-foreground ml-1">{unit}</span></p>
              <Progress value={Math.min((value / goal) * 100, 100)} className="mt-2 h-1.5" />
              <p className="text-xs text-muted-foreground mt-1">of {goal}{unit}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-base flex items-center gap-2">
            <Plus className="h-4 w-4" />Log Meal
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="flex flex-wrap gap-2">
            {mealTypes.map((t) => (
              <button key={t} onClick={() => setMealType(t)}
                className={`px-3 py-1 rounded-full text-sm font-medium capitalize transition-colors ${mealType === t ? 'bg-primary text-primary-foreground' : 'bg-secondary text-secondary-foreground'}`}>
                {t}
              </button>
            ))}
          </div>
          <Input placeholder="Meal name" value={name} onChange={(e) => setName(e.target.value)} />
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            <Input type="number" placeholder="Calories" value={calories} onChange={(e) => setCalories(e.target.value)} />
            <Input type="number" placeholder="Protein (g)" value={protein} onChange={(e) => setProtein(e.target.value)} />
            <Input type="number" placeholder="Carbs (g)" value={carbs} onChange={(e) => setCarbs(e.target.value)} />
            <Input type="number" placeholder="Fat (g)" value={fat} onChange={(e) => setFat(e.target.value)} />
          </div>
          <Button onClick={handleAdd} className="w-full gap-2">
            <Plus className="h-4 w-4" />Add Meal
          </Button>
        </CardContent>
      </Card>

      <div>
        <h2 className="text-lg font-semibold mb-3">Today&apos;s Meals</h2>
        {todayMeals.length === 0 ? (
          <Card><CardContent className="py-12 text-center text-muted-foreground">
            <Apple className="h-12 w-12 mx-auto mb-3 opacity-30" />
            <p>No meals logged today. Add one above!</p>
          </CardContent></Card>
        ) : (
          <div className="space-y-3">
            {todayMeals.map((meal) => (
              <Card key={meal.id}>
                <CardContent className="flex items-center justify-between py-4">
                  <div className="flex items-center gap-3">
                    <div className={`px-2 py-1 rounded-md text-xs font-medium capitalize ${mealTypeColors[meal.mealType]}`}>
                      {meal.mealType}
                    </div>
                    <div>
                      <p className="font-medium">{meal.name}</p>
                      <p className="text-sm text-muted-foreground">
                        {meal.calories} kcal · P: {meal.protein}g · C: {meal.carbs}g · F: {meal.fat}g
                      </p>
                    </div>
                  </div>
                  <Button variant="ghost" size="icon"
                    onClick={() => { removeMeal(meal.id); toast.success('Meal removed') }}
                    className="text-muted-foreground hover:text-destructive">
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
