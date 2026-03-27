'use client'

import { Settings, User, Bell, Palette, Download, Target } from 'lucide-react'
import { toast } from 'sonner'
import { useTheme } from 'next-themes'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { useFitnessStore } from '@/lib/store/fitness-store'

export default function SettingsPage() {
  const { theme, setTheme } = useTheme()
  const { profile, updateProfile } = useFitnessStore()

  const handleExport = () => {
    const data = localStorage.getItem('fitness-store')
    if (!data) return
    const blob = new Blob([data], { type: 'application/json' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = 'fitness-data.json'
    a.click()
    URL.revokeObjectURL(url)
    toast.success('Data exported!')
  }

  return (
    <div className="p-6 space-y-6 max-w-2xl mx-auto">
      <div>
        <h1 className="text-3xl font-bold flex items-center gap-2">
          <Settings className="h-8 w-8 text-gray-500" />
          Settings
        </h1>
        <p className="text-muted-foreground mt-1">Manage your preferences</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-base flex items-center gap-2">
            <User className="h-4 w-4" />
            Profile
          </CardTitle>
          <CardDescription>Update your personal information</CardDescription>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-sm font-medium">Name</label>
              <Input value={profile.name} onChange={(e) => updateProfile({ name: e.target.value })} className="mt-1" />
            </div>
            <div>
              <label className="text-sm font-medium">Age</label>
              <Input type="number" value={profile.age} onChange={(e) => { const v = parseInt(e.target.value); if (!isNaN(v)) updateProfile({ age: v }) }} className="mt-1" />
            </div>
            <div>
              <label className="text-sm font-medium">Weight (kg)</label>
              <Input type="number" value={profile.weight} onChange={(e) => { const v = parseFloat(e.target.value); if (!isNaN(v)) updateProfile({ weight: v }) }} className="mt-1" />
            </div>
            <div>
              <label className="text-sm font-medium">Height (cm)</label>
              <Input type="number" value={profile.height} onChange={(e) => { const v = parseFloat(e.target.value); if (!isNaN(v)) updateProfile({ height: v }) }} className="mt-1" />
            </div>
          </div>
          <Button onClick={() => toast.success('Profile saved!')} className="w-full">Save Profile</Button>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-base flex items-center gap-2">
            <Target className="h-4 w-4" />
            Daily Goals
          </CardTitle>
          <CardDescription>Set your daily fitness targets</CardDescription>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="grid grid-cols-2 gap-3">
            {[
              { key: 'calories', label: 'Calories (kcal)', value: profile.goals.calories },
              { key: 'steps', label: 'Steps', value: profile.goals.steps },
              { key: 'water', label: 'Water (glasses)', value: profile.goals.water },
              { key: 'sleep', label: 'Sleep (hours)', value: profile.goals.sleep },
              { key: 'workouts', label: 'Workouts/week', value: profile.goals.workouts },
            ].map(({ key, label, value }) => (
              <div key={key}>
                <label className="text-sm font-medium">{label}</label>
                <Input
                  type="number"
                  value={value}
                  onChange={(e) => { const v = parseFloat(e.target.value); if (!isNaN(v)) updateProfile({ goals: { ...profile.goals, [key]: v } }) }}
                  className="mt-1"
                />
              </div>
            ))}
          </div>
          <Button onClick={() => toast.success('Goals saved!')} className="w-full">Save Goals</Button>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-base flex items-center gap-2">
            <Palette className="h-4 w-4" />
            Appearance
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex gap-3">
            {['light', 'dark', 'system'].map((t) => (
              <button
                key={t}
                onClick={() => setTheme(t)}
                className={`flex-1 py-2 rounded-lg text-sm font-medium capitalize transition-colors border ${
                  theme === t ? 'bg-primary text-primary-foreground border-primary' : 'border-input hover:bg-accent'
                }`}
              >
                {t}
              </button>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-base flex items-center gap-2">
            <Download className="h-4 w-4" />
            Data Management
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Button variant="outline" onClick={handleExport} className="w-full gap-2">
            <Download className="h-4 w-4" />
            Export My Data (JSON)
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}
