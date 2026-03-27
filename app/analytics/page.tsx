'use client'

import { BarChart3 } from 'lucide-react'
import { useFitnessData } from '@/lib/hooks/use-fitness-data'
import { WeeklyActivity } from '@/components/charts/weekly-activity'
import { CalorieChart } from '@/components/charts/calorie-chart'
import { WeightChart } from '@/components/charts/weight-chart'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, RadarChart, Radar, PolarGrid, PolarAngleAxis } from 'recharts'

export default function AnalyticsPage() {
  const { weeklyData } = useFitnessData()

  const radarData = [
    { metric: 'Calories', value: 75 },
    { metric: 'Steps', value: 65 },
    { metric: 'Water', value: 80 },
    { metric: 'Sleep', value: 87 },
    { metric: 'Workouts', value: 60 },
  ]

  return (
    <div className="p-6 space-y-6 max-w-6xl mx-auto">
      <div>
        <h1 className="text-3xl font-bold flex items-center gap-2">
          <BarChart3 className="h-8 w-8 text-blue-500" />
          Analytics
        </h1>
        <p className="text-muted-foreground mt-1">Detailed insights into your fitness journey</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <WeeklyActivity data={weeklyData} />
        <CalorieChart data={weeklyData} />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <WeightChart />

        <Card>
          <CardHeader>
            <CardTitle className="text-base">Goal Achievement</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={200}>
              <RadarChart data={radarData}>
                <PolarGrid />
                <PolarAngleAxis dataKey="metric" tick={{ fontSize: 12 }} />
                <Radar name="Achievement" dataKey="value" stroke="#10b981" fill="#10b981" fillOpacity={0.3} />
              </RadarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-base">Weekly Steps</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={weeklyData} margin={{ top: 5, right: 10, left: -20, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
              <XAxis dataKey="day" tick={{ fontSize: 12 }} />
              <YAxis tick={{ fontSize: 12 }} />
              <Tooltip contentStyle={{ backgroundColor: 'hsl(var(--card))', border: '1px solid hsl(var(--border))', borderRadius: '8px' }} />
              <Bar dataKey="steps" fill="#3b82f6" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  )
}
