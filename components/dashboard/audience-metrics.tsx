"use client"

import { useEffect, useState } from "react"
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer, Legend } from "recharts"

export function AudienceMetrics() {
  const [mounted, setMounted] = useState(false)

  // Sample data - in a real app, this would come from an API
  const ageData = [
    { name: "18-24", value: 15 },
    { name: "25-34", value: 35 },
    { name: "35-44", value: 25 },
    { name: "45-54", value: 15 },
    { name: "55+", value: 10 },
  ]

  const locationData = [
    { name: "United States", value: 45 },
    { name: "Europe", value: 25 },
    { name: "Asia", value: 20 },
    { name: "Other", value: 10 },
  ]

  const COLORS = [
    "hsl(var(--primary))",
    "hsl(var(--chart-1))",
    "hsl(var(--chart-2))",
    "hsl(var(--chart-3))",
    "hsl(var(--chart-4))",
  ]

  // Ensure the component is mounted before rendering the chart to avoid hydration issues
  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 h-full">
      <div>
        <h3 className="text-sm font-medium mb-4 text-center">Age Distribution</h3>
        <ResponsiveContainer width="100%" height={250}>
          <PieChart>
            <Pie data={ageData} cx="50%" cy="50%" labelLine={false} outerRadius={80} fill="#8884d8" dataKey="value">
              {ageData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip
              contentStyle={{
                backgroundColor: "hsl(var(--background))",
                borderColor: "hsl(var(--border))",
                borderRadius: "var(--radius)",
                fontSize: "12px",
              }}
              formatter={(value: number) => [`${value}%`, "Percentage"]}
            />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </div>

      <div>
        <h3 className="text-sm font-medium mb-4 text-center">Geographic Distribution</h3>
        <ResponsiveContainer width="100%" height={250}>
          <PieChart>
            <Pie
              data={locationData}
              cx="50%"
              cy="50%"
              labelLine={false}
              outerRadius={80}
              fill="#8884d8"
              dataKey="value"
            >
              {locationData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip
              contentStyle={{
                backgroundColor: "hsl(var(--background))",
                borderColor: "hsl(var(--border))",
                borderRadius: "var(--radius)",
                fontSize: "12px",
              }}
              formatter={(value: number) => [`${value}%`, "Percentage"]}
            />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}

