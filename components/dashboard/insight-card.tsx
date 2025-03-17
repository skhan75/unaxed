import { BarChart3, CreditCard, TrendingUp, Users, Zap } from "lucide-react"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

interface InsightCardProps {
  title: string
  description: string
  type: "growth" | "audience" | "content" | "earnings"
  metric: string
  date: string
}

export function InsightCard({ title, description, type, metric, date }: InsightCardProps) {
  const getIcon = () => {
    switch (type) {
      case "growth":
        return <TrendingUp className="h-5 w-5 text-green-500" />
      case "audience":
        return <Users className="h-5 w-5 text-blue-500" />
      case "content":
        return <BarChart3 className="h-5 w-5 text-purple-500" />
      case "earnings":
        return <CreditCard className="h-5 w-5 text-yellow-500" />
      default:
        return <Zap className="h-5 w-5 text-primary" />
    }
  }

  const getGradient = () => {
    switch (type) {
      case "growth":
        return "from-green-500/20 via-green-500/10 to-transparent"
      case "audience":
        return "from-blue-500/20 via-blue-500/10 to-transparent"
      case "content":
        return "from-purple-500/20 via-purple-500/10 to-transparent"
      case "earnings":
        return "from-yellow-500/20 via-yellow-500/10 to-transparent"
      default:
        return "from-primary/20 via-primary/10 to-transparent"
    }
  }

  return (
    <Card className="overflow-hidden bg-zinc-900/90">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-base font-medium">{getIcon()}</CardTitle>
        <div className="text-sm font-medium px-2 py-1 rounded-md bg-muted">{metric}</div>
      </CardHeader>
      <CardContent className="relative">
        <div
          className={`absolute top-0 left-0 w-full h-full bg-gradient-to-r ${getGradient()} opacity-50 pointer-events-none`}
        ></div>
        <div className="relative z-10">
          <h3 className="text-lg font-semibold mb-2">{title}</h3>
          <p className="text-sm text-muted-foreground">{description}</p>
          <div className="text-xs text-muted-foreground mt-4">Based on data from {date}</div>
        </div>
      </CardContent>
    </Card>
  )
}

