'use client'

import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'

const mockWeightData = [
  { week: 'W1', weight: 77.2 },
  { week: 'W2', weight: 76.8 },
  { week: 'W3', weight: 76.5 },
  { week: 'W4', weight: 75.9 },
  { week: 'W5', weight: 75.4 },
  { week: 'W6', weight: 75.1 },
  { week: 'W7', weight: 74.8 },
]

export function WeightChart() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-base">Weight Progress</CardTitle>
        <CardDescription>Weekly weight tracking</CardDescription>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={200}>
          <LineChart data={mockWeightData} margin={{ top: 5, right: 10, left: -20, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
            <XAxis dataKey="week" tick={{ fontSize: 12 }} />
            <YAxis domain={['dataMin - 1', 'dataMax + 1']} tick={{ fontSize: 12 }} />
            <Tooltip
              contentStyle={{
                backgroundColor: 'hsl(var(--card))',
                border: '1px solid hsl(var(--border))',
                borderRadius: '8px',
              }}
            />
            <Line type="monotone" dataKey="weight" stroke="#10b981" strokeWidth={2} dot={{ fill: '#10b981' }} />
          </LineChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  )
}
