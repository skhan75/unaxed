"use client"

import { useEffect, useState } from "react"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts"

interface EngagementChartProps {
  detailed?: boolean
}

export function EngagementChart({ detailed = false }: EngagementChartProps) {
  const [mounted, setMounted] = useState(false)

  // Sample data - in a real app, this would come from an API
  const data = [
    { name: "Jan", views: 1200, likes: 40, comments: 24, shares: 18 },
    { name: "Feb", views: 1900, likes: 67, comments: 32, shares: 27 },
    { name: "Mar", views: 2400, likes: 87, comments: 43, shares: 36 },
    { name: "Apr", views: 1800, likes: 63, comments: 28, shares: 24 },
    { name: "May", views: 2800, likes: 94, comments: 48, shares: 41 },
    { name: "Jun", views: 3600, likes: 112, comments: 67, shares: 52 },
    { name: "Jul", views: 3200, likes: 103, comments: 59, shares: 48 },
  ]

  // Ensure the component is mounted before rendering the chart to avoid hydration issues
  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  return (
    <ResponsiveContainer width="100%" height="100%">
      <LineChart
        data={data}
        margin={{
          top: 5,
          right: 10,
          left: 10,
          bottom: 5,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--muted))" opacity={0.3} />
        <XAxis dataKey="name" stroke="hsl(var(--muted-foreground))" fontSize={12} tickLine={false} axisLine={false} />
        <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} tickLine={false} axisLine={false} />
        <Tooltip
          contentStyle={{
            backgroundColor: "hsl(var(--background))",
            borderColor: "hsl(var(--border))",
            borderRadius: "var(--radius)",
            fontSize: "12px",
          }}
        />
        <Legend />
        <Line
          type="monotone"
          dataKey="likes"
          stroke="hsl(var(--primary))"
          strokeWidth={2}
          dot={{ r: 3 }}
          activeDot={{ r: 5 }}
        />
        <Line
          type="monotone"
          dataKey="comments"
          stroke="hsl(var(--chart-1))"
          strokeWidth={2}
          dot={{ r: 3 }}
          activeDot={{ r: 5 }}
        />
        {detailed && (
          <Line
            type="monotone"
            dataKey="shares"
            stroke="hsl(var(--chart-2))"
            strokeWidth={2}
            dot={{ r: 3 }}
            activeDot={{ r: 5 }}
          />
        )}
      </LineChart>
    </ResponsiveContainer>
  )
}

