"use client"

import { useEffect, useState } from "react"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts"

export function ReadingTimeChart() {
  const [mounted, setMounted] = useState(false)

  // Sample data - in a real app, this would come from an API
  const data = [
    { name: "Post 1", avgTime: 4.2, completionRate: 78 },
    { name: "Post 2", avgTime: 3.8, completionRate: 82 },
    { name: "Post 3", avgTime: 5.1, completionRate: 71 },
    { name: "Post 4", avgTime: 2.9, completionRate: 85 },
    { name: "Post 5", avgTime: 6.3, completionRate: 68 },
  ]

  // Ensure the component is mounted before rendering the chart to avoid hydration issues
  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  return (
    <ResponsiveContainer width="100%" height="100%">
      <BarChart
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
          formatter={(value: number, name: string) => {
            if (name === "avgTime") return [`${value} min`, "Avg. Reading Time"]
            if (name === "completionRate") return [`${value}%`, "Completion Rate"]
            return [value, name]
          }}
        />
        <Bar dataKey="avgTime" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} />
        <Bar dataKey="completionRate" fill="hsl(var(--chart-1))" radius={[4, 4, 0, 0]} />
      </BarChart>
    </ResponsiveContainer>
  )
}

