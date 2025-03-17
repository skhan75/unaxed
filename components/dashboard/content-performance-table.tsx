"use client"

import Link from "next/link"
import { ArrowUpRight, Eye, Heart, Zap } from "lucide-react"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"

interface ContentItem {
  id: number
  title: string
  views: number
  engagement: number
  readTime: string
  completionRate: number
  date: string
  performance: "high" | "medium" | "low"
}

interface ContentPerformanceTableProps {
  content: ContentItem[]
  showDetailedMetrics?: boolean
}

export function ContentPerformanceTable({ content, showDetailedMetrics = false }: ContentPerformanceTableProps) {
  return (
    <div className="overflow-auto">
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b border-muted/30">
            <th className="text-left font-medium p-2 pl-0">Title</th>
            <th className="text-left font-medium p-2">Performance</th>
            <th className="text-left font-medium p-2">Views</th>
            <th className="text-left font-medium p-2">Engagement</th>
            {showDetailedMetrics && (
              <>
                <th className="text-left font-medium p-2">Read Time</th>
                <th className="text-left font-medium p-2">Completion</th>
              </>
            )}
            <th className="text-left font-medium p-2">Date</th>
            <th className="text-right font-medium p-2 pr-0">Actions</th>
          </tr>
        </thead>
        <tbody>
          {content.map((item) => (
            <tr key={item.id} className="border-b border-muted/20 hover:bg-muted/10">
              <td className="py-3 pl-0">
                <Link href={`/blog/${item.id}`} className="font-medium hover:text-primary transition-colors">
                  {item.title}
                </Link>
              </td>
              <td className="py-3">
                <Badge
                  variant="outline"
                  className={`
                    ${
                      item.performance === "high"
                        ? "border-green-500/30 text-green-500 bg-green-500/10"
                        : item.performance === "medium"
                          ? "border-yellow-500/30 text-yellow-500 bg-yellow-500/10"
                          : "border-red-500/30 text-red-500 bg-red-500/10"
                    }
                  `}
                >
                  {item.performance === "high" && <Zap className="mr-1 h-3 w-3" />}
                  {item.performance.charAt(0).toUpperCase() + item.performance.slice(1)}
                </Badge>
              </td>
              <td className="py-3">
                <div className="flex items-center gap-1">
                  <Eye className="h-3.5 w-3.5 text-muted-foreground" />
                  <span>{item.views.toLocaleString()}</span>
                </div>
              </td>
              <td className="py-3">
                <div className="flex items-center gap-1">
                  <Heart className="h-3.5 w-3.5 text-muted-foreground" />
                  <span>{item.engagement}</span>
                </div>
              </td>
              {showDetailedMetrics && (
                <>
                  <td className="py-3 text-muted-foreground">{item.readTime}</td>
                  <td className="py-3">
                    <div className="flex items-center gap-2">
                      <div className="w-16 h-2 bg-muted rounded-full overflow-hidden">
                        <div
                          className="h-full bg-primary rounded-full"
                          style={{ width: `${item.completionRate}%` }}
                        ></div>
                      </div>
                      <span className="text-xs">{item.completionRate}%</span>
                    </div>
                  </td>
                </>
              )}
              <td className="py-3 text-muted-foreground">{item.date}</td>
              <td className="py-3 text-right">
                <Button variant="ghost" size="sm" asChild className="h-8">
                  <Link href={`/dashboard/analytics/post/${item.id}`}>
                    Details
                    <ArrowUpRight className="ml-1 h-3 w-3" />
                  </Link>
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

