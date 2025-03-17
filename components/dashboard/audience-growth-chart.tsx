"use client"

import { useEffect, useState } from "react"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts"

export function AudienceGrowthChart() {
  const [mounted, setMounted] = useState(false)

  // Sample data - in a real app, this would come from an API
  const data = [
    { name: "Jan", followers: 45, returning: 22 },
    { name: "Feb", followers: 67, returning: 35 },
    { name: "Mar", followers: 89, returning: 48 },
    { name: "Apr", followers: 102, returning: 57 },
    { name: "May", followers: 128, returning: 72 },
    { name: "Jun", followers: 156, returning: 89 },
    { name: "Jul", followers: 187, returning: 105 },
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
        <Line
          type="monotone"
          dataKey="followers"
          stroke="hsl(var(--primary))"
          strokeWidth={2}
          dot={{ r: 3 }}
          activeDot={{ r: 5 }}
        />
        <Line
          type="monotone"
          dataKey="returning"
          stroke="hsl(var(--chart-1))"
          strokeWidth={2}
          dot={{ r: 3 }}
          activeDot={{ r: 5 }}
        />
      </LineChart>
    </ResponsiveContainer>
  )
}

