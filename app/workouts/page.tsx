'use client'

import { useState } from 'react'
import { Dumbbell, Clock, Flame, Trash2, Plus } from 'lucide-react'
import { toast } from 'sonner'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { useFitnessStore } from '@/lib/store/fitness-store'
import { getTodayString } from '@/lib/utils'

export default function WorkoutsPage() {
  const { workouts, addWorkout, removeWorkout } = useFitnessStore()
  const [name, setName] = useState('')
  const [type, setType] = useState('Cardio')
  const [duration, setDuration] = useState('30')
  const [caloriesBurned, setCaloriesBurned] = useState('200')

  const todayWorkouts = workouts.filter((w) => w.date === getTodayString())

  const handleAdd = () => {
    if (!name.trim()) return
    addWorkout({
      date: getTodayString(),
      name,
      type,
      duration: parseInt(duration) || 30,
      calories: parseInt(caloriesBurned) || 200,
    })
    setName('')
    toast.success('Workout added!')
  }

  const workoutTypes = ['Cardio', 'Strength', 'Flexibility', 'HIIT', 'Sports', 'Other']
  const typeColors: Record<string, string> = {
    Cardio: 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300',
    Strength: 'bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-300',
    Flexibility: 'bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-300',
    HIIT: 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-300',
    Sports: 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300',
    Other: 'bg-gray-100 text-gray-700 dark:bg-gray-900/30 dark:text-gray-300',
    General: 'bg-gray-100 text-gray-700 dark:bg-gray-900/30 dark:text-gray-300',
  }

  return (
    <div className="p-6 space-y-6 max-w-4xl mx-auto">
      <div>
        <h1 className="text-3xl font-bold flex items-center gap-2">
          <Dumbbell className="h-8 w-8 text-emerald-500" />
          Workouts
        </h1>
        <p className="text-muted-foreground mt-1">Track your exercise sessions</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-base flex items-center gap-2">
            <Plus className="h-4 w-4" />
            Log Workout
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 gap-3">
            <Input placeholder="Workout name" value={name} onChange={(e) => setName(e.target.value)} className="col-span-2" />
            <div className="col-span-2 flex flex-wrap gap-2">
              {workoutTypes.map((t) => (
                <button
                  key={t}
                  onClick={() => setType(t)}
                  className={`px-3 py-1 rounded-full text-sm font-medium transition-colors ${
                    type === t ? 'bg-primary text-primary-foreground' : 'bg-secondary text-secondary-foreground hover:bg-secondary/80'
                  }`}
                >
                  {t}
                </button>
              ))}
            </div>
            <Input type="number" placeholder="Duration (min)" value={duration} onChange={(e) => setDuration(e.target.value)} />
            <Input type="number" placeholder="Calories burned" value={caloriesBurned} onChange={(e) => setCaloriesBurned(e.target.value)} />
          </div>
          <Button onClick={handleAdd} className="w-full gap-2">
            <Plus className="h-4 w-4" />
            Add Workout
          </Button>
        </CardContent>
      </Card>

      <div>
        <h2 className="text-lg font-semibold mb-3">Today&apos;s Workouts</h2>
        {todayWorkouts.length === 0 ? (
          <Card>
            <CardContent className="py-12 text-center text-muted-foreground">
              <Dumbbell className="h-12 w-12 mx-auto mb-3 opacity-30" />
              <p>No workouts logged today. Add one above!</p>
            </CardContent>
          </Card>
        ) : (
          <div className="space-y-3">
            {todayWorkouts.map((workout) => (
              <Card key={workout.id}>
                <CardContent className="flex items-center justify-between py-4">
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-lg bg-emerald-50 dark:bg-emerald-900/20">
                      <Dumbbell className="h-5 w-5 text-emerald-500" />
                    </div>
                    <div>
                      <p className="font-medium">{workout.name}</p>
                      <div className="flex items-center gap-3 mt-1">
                        <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${typeColors[workout.type] || typeColors.Other}`}>
                          {workout.type}
                        </span>
                        <span className="text-xs text-muted-foreground flex items-center gap-1">
                          <Clock className="h-3 w-3" />{workout.duration} min
                        </span>
                        <span className="text-xs text-muted-foreground flex items-center gap-1">
                          <Flame className="h-3 w-3" />{workout.calories} kcal
                        </span>
                      </div>
                    </div>
                  </div>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => { removeWorkout(workout.id); toast.success('Workout removed') }}
                    className="text-muted-foreground hover:text-destructive"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>

      {workouts.length > todayWorkouts.length && (
        <div>
          <h2 className="text-lg font-semibold mb-3">Recent Workouts</h2>
          <div className="space-y-2">
            {workouts.filter((w) => w.date !== getTodayString()).slice(0, 5).map((workout) => (
              <Card key={workout.id} className="opacity-75">
                <CardContent className="flex items-center justify-between py-3">
                  <div>
                    <p className="text-sm font-medium">{workout.name}</p>
                    <p className="text-xs text-muted-foreground">{workout.date} · {workout.duration} min · {workout.calories} kcal</p>
                  </div>
                  <Badge variant="outline">{workout.type}</Badge>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
