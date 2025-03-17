"use client"

import { useEffect, useState } from "react"
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts"

export function ContentGrowthChart() {
  const [mounted, setMounted] = useState(false)

  // Sample data - in a real app, this would come from an API
  const data = [
    { name: "Jan", posts: 2, views: 1200, engagement: 64 },
    { name: "Feb", posts: 3, views: 1900, engagement: 99 },
    { name: "Mar", posts: 4, views: 2400, engagement: 130 },
    { name: "Apr", posts: 3, views: 1800, engagement: 91 },
    { name: "May", posts: 5, views: 2800, engagement: 142 },
    { name: "Jun", posts: 6, views: 3600, engagement: 179 },
    { name: "Jul", posts: 5, views: 3200, engagement: 162 },
  ]

  // Ensure the component is mounted before rendering the chart to avoid hydration issues
  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  return (
    <ResponsiveContainer width="100%" height="100%">
      <AreaChart
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
        <Area
          type="monotone"
          dataKey="views"
          stroke="hsl(var(--primary))"
          fill="hsl(var(--primary))"
          fillOpacity={0.2}
          strokeWidth={2}
        />
        <Area
          type="monotone"
          dataKey="engagement"
          stroke="hsl(var(--chart-1))"
          fill="hsl(var(--chart-1))"
          fillOpacity={0.2}
          strokeWidth={2}
        />
        <Area
          type="monotone"
          dataKey="posts"
          stroke="hsl(var(--chart-2))"
          fill="hsl(var(--chart-2))"
          fillOpacity={0.2}
          strokeWidth={2}
        />
      </AreaChart>
    </ResponsiveContainer>
  )
}

