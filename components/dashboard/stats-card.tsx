import type { ReactNode } from "react"
import { ArrowDown, ArrowUp } from "lucide-react"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

interface StatsCardProps {
  title: string
  value: string
  icon: ReactNode
  description?: string
  trend?: "up" | "down" | "neutral"
  trendValue?: string
}

export function StatsCard({ title, value, icon, description, trend, trendValue }: StatsCardProps) {
  return (
    <Card className="bg-zinc-900/90">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        {icon}
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value}</div>
        {(description || trendValue) && (
          <div className="flex items-center justify-between">
            {description && <p className="text-xs text-muted-foreground">{description}</p>}
            {trend && trendValue && (
              <div
                className={`flex items-center text-xs ${
                  trend === "up" ? "text-green-500" : trend === "down" ? "text-red-500" : "text-muted-foreground"
                }`}
              >
                {trend === "up" ? (
                  <ArrowUp className="mr-1 h-3 w-3" />
                ) : trend === "down" ? (
                  <ArrowDown className="mr-1 h-3 w-3" />
                ) : null}
                <span>{trendValue}</span>
              </div>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  )
}

