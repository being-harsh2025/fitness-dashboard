'use client'

import { Target, TrendingUp, Edit2, Check } from 'lucide-react'
import { useState } from 'react'
import { toast } from 'sonner'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Progress } from '@/components/ui/progress'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { useFitnessStore } from '@/lib/store/fitness-store'

export default function GoalsPage() {
  const { goals, updateGoal } = useFitnessStore()
  const [editingId, setEditingId] = useState<string | null>(null)
  const [editValue, setEditValue] = useState('')

  const goalColors: Record<string, string> = {
    calories: 'text-orange-500',
    steps: 'text-blue-500',
    water: 'text-cyan-500',
    sleep: 'text-purple-500',
    workouts: 'text-emerald-500',
    weight: 'text-red-500',
  }

  const goalBg: Record<string, string> = {
    calories: 'from-orange-500 to-red-500',
    steps: 'from-blue-500 to-cyan-500',
    water: 'from-cyan-500 to-blue-500',
    sleep: 'from-purple-500 to-pink-500',
    workouts: 'from-emerald-500 to-green-500',
    weight: 'from-red-500 to-pink-500',
  }

  const handleSave = (id: string) => {
    const val = parseFloat(editValue)
    if (!isNaN(val)) {
      updateGoal(id, val)
      toast.success('Progress updated!')
    }
    setEditingId(null)
  }

  return (
    <div className="p-6 space-y-6 max-w-4xl mx-auto">
      <div>
        <h1 className="text-3xl font-bold flex items-center gap-2">
          <Target className="h-8 w-8 text-emerald-500" />
          Goals
        </h1>
        <p className="text-muted-foreground mt-1">Track and manage your fitness goals</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {goals.map((goal) => {
          const percentage = Math.min(Math.round((goal.current / goal.target) * 100), 100)
          const isEditing = editingId === goal.id
          return (
            <Card key={goal.id} className="relative overflow-hidden">
              <div className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${goalBg[goal.type] || 'from-gray-400 to-gray-600'}`} />
              <CardHeader className="pb-2">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-base flex items-center gap-2">
                    <TrendingUp className={`h-4 w-4 ${goalColors[goal.type]}`} />
                    {goal.name}
                  </CardTitle>
                  <Button variant="ghost" size="icon" className="h-7 w-7" onClick={() => {
                    setEditingId(goal.id)
                    setEditValue(goal.current.toString())
                  }}>
                    <Edit2 className="h-3.5 w-3.5" />
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="flex items-end justify-between mb-3">
                  {isEditing ? (
                    <div className="flex items-center gap-2">
                      <Input
                        type="number"
                        value={editValue}
                        onChange={(e) => setEditValue(e.target.value)}
                        className="w-24 h-8 text-sm"
                        autoFocus
                      />
                      <Button size="sm" className="h-8" onClick={() => handleSave(goal.id)}>
                        <Check className="h-3.5 w-3.5" />
                      </Button>
                    </div>
                  ) : (
                    <div>
                      <span className={`text-2xl font-bold ${goalColors[goal.type]}`}>{goal.current}</span>
                      <span className="text-muted-foreground text-sm"> / {goal.target} {goal.unit}</span>
                    </div>
                  )}
                  <span className={`text-sm font-semibold ${percentage >= 100 ? 'text-emerald-500' : 'text-muted-foreground'}`}>
                    {percentage}%
                  </span>
                </div>
                <Progress value={percentage} className="h-2" />
                {percentage >= 100 && (
                  <p className="text-xs text-emerald-500 font-medium mt-2">🎉 Goal achieved!</p>
                )}
              </CardContent>
            </Card>
          )
        })}
      </div>
    </div>
  )
}
