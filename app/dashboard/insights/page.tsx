import Link from "next/link"
import { ArrowUpRight, Calendar, Download, TrendingUp, Clock } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { DashboardHeader } from "@/components/dashboard/dashboard-header"
import { DashboardShell } from "@/components/dashboard/dashboard-shell"
import { DateRangePicker } from "@/components/dashboard/date-range-picker"
import { ContentGrowthChart } from "@/components/dashboard/content-growth-chart"
import { AudienceGrowthChart } from "@/components/dashboard/audience-growth-chart"
import { ContentPerformanceTable } from "@/components/dashboard/content-performance-table"
import { InsightCard } from "@/components/dashboard/insight-card"
import { Badge } from "@/components/ui/badge"

export default function InsightsPage() {
  // Sample data for insights
  const insights = [
    {
      id: 1,
      title: "Your audience is growing faster than 85% of writers",
      description:
        "You've gained 32 new followers in the last 7 days, which is a 12% increase from the previous period.",
      type: "growth",
      metric: "+12%",
      date: "Last 7 days",
    },
    {
      id: 2,
      title: "Your most engaged readers are from the tech industry",
      description: "Readers with tech backgrounds spend 2.3x more time on your content compared to other industries.",
      type: "audience",
      metric: "2.3x",
      date: "Last 30 days",
    },
    {
      id: 3,
      title: "Posts with images get 34% more engagement",
      description: "Your posts that include at least 3 images receive significantly more likes and comments.",
      type: "content",
      metric: "+34%",
      date: "Last 90 days",
    },
    {
      id: 4,
      title: "Your earnings potential is increasing",
      description: "Based on your current growth trajectory, you could increase earnings by 45% in the next quarter.",
      type: "earnings",
      metric: "+45%",
      date: "Projection",
    },
  ]

  // Sample data for top performing content
  const topContent = [
    {
      id: 1,
      title: "The Future of Web Development",
      views: 1243,
      engagement: 87,
      readTime: "5 min",
      completionRate: 78,
      date: "Mar 15, 2025",
      performance: "high",
    },
    {
      id: 2,
      title: "Minimalism in UI Design",
      views: 982,
      engagement: 64,
      readTime: "4 min",
      completionRate: 82,
      date: "Mar 10, 2025",
      performance: "high",
    },
    {
      id: 3,
      title: "The Art of Digital Photography",
      views: 756,
      engagement: 52,
      readTime: "6 min",
      completionRate: 71,
      date: "Mar 5, 2025",
      performance: "medium",
    },
    {
      id: 4,
      title: "Building Accessible Web Applications",
      views: 543,
      engagement: 42,
      readTime: "7 min",
      completionRate: 68,
      date: "Feb 28, 2025",
      performance: "medium",
    },
    {
      id: 5,
      title: "The Psychology of Color in Design",
      views: 487,
      engagement: 38,
      readTime: "5 min",
      completionRate: 74,
      date: "Feb 20, 2025",
      performance: "medium",
    },
  ]

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <SiteHeader />
      <DashboardShell>
        <DashboardHeader heading="Insights" text="Advanced analytics and personalized insights about your content">
          <div className="flex items-center gap-2">
            <DateRangePicker />
            <Button variant="outline" size="icon">
              <Download className="h-4 w-4" />
              <span className="sr-only">Download data</span>
            </Button>
          </div>
        </DashboardHeader>

        <Tabs defaultValue="overview" className="space-y-4">
          <TabsList>
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="content">Content</TabsTrigger>
            <TabsTrigger value="audience">Audience</TabsTrigger>
            <TabsTrigger value="growth">Growth</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-4">
            {/* AI-Generated Insights */}
            <div className="grid gap-4 md:grid-cols-2">
              {insights.map((insight) => (
                <InsightCard
                  key={insight.id}
                  title={insight.title}
                  description={insight.description}
                  type={insight.type}
                  metric={insight.metric}
                  date={insight.date}
                />
              ))}
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <div>
                    <CardTitle className="text-base">Content Growth</CardTitle>
                    <CardDescription>Posts, views, and engagement over time</CardDescription>
                  </div>
                  <Badge variant="outline" className="font-normal">
                    <TrendingUp className="mr-1 h-3 w-3 text-green-500" />
                    Growing
                  </Badge>
                </CardHeader>
                <CardContent className="h-[300px]">
                  <ContentGrowthChart />
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <div>
                    <CardTitle className="text-base">Audience Growth</CardTitle>
                    <CardDescription>Followers and reader engagement</CardDescription>
                  </div>
                  <Badge variant="outline" className="font-normal">
                    <TrendingUp className="mr-1 h-3 w-3 text-green-500" />
                    +12% MoM
                  </Badge>
                </CardHeader>
                <CardContent className="h-[300px]">
                  <AudienceGrowthChart />
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>Content Performance</CardTitle>
                    <CardDescription>How your content is performing across different metrics</CardDescription>
                  </div>
                  <Button variant="outline" size="sm" asChild>
                    <Link href="/dashboard/analytics">
                      Detailed Analytics
                      <ArrowUpRight className="ml-1 h-3 w-3" />
                    </Link>
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <ContentPerformanceTable content={topContent} />
              </CardContent>
            </Card>

            <div className="grid gap-4 md:grid-cols-3">
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-base">Optimal Posting Time</CardTitle>
                  <CardDescription>When your audience is most active</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Calendar className="h-4 w-4 text-muted-foreground" />
                        <span className="text-sm font-medium">Best day</span>
                      </div>
                      <span className="font-semibold">Wednesday</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Clock className="h-4 w-4 text-muted-foreground" />
                        <span className="text-sm font-medium">Best time</span>
                      </div>
                      <span className="font-semibold">9:00 AM - 11:00 AM</span>
                    </div>
                    <div className="pt-2">
                      <p className="text-xs text-muted-foreground">
                        Posts published during these times receive 28% more engagement on average.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-base">Audience Interests</CardTitle>
                  <CardDescription>What your readers care about</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex flex-wrap gap-2">
                      <Badge className="bg-primary/20 text-primary hover:bg-primary/30 border-primary/10">
                        Web Development
                      </Badge>
                      <Badge className="bg-primary/20 text-primary hover:bg-primary/30 border-primary/10">
                        UI Design
                      </Badge>
                      <Badge className="bg-primary/20 text-primary hover:bg-primary/30 border-primary/10">
                        JavaScript
                      </Badge>
                      <Badge className="bg-primary/20 text-primary hover:bg-primary/30 border-primary/10">React</Badge>
                      <Badge className="bg-primary/20 text-primary hover:bg-primary/30 border-primary/10">UX</Badge>
                    </div>
                    <div className="pt-2">
                      <p className="text-xs text-muted-foreground">
                        Content about these topics performs 35% better with your audience.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-base">Content Length</CardTitle>
                  <CardDescription>Optimal content length for engagement</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium">Optimal length</span>
                      <span className="font-semibold">1,200 - 1,800 words</span>
                    </div>
                    <div className="w-full h-2 bg-muted rounded-full overflow-hidden">
                      <div className="h-full bg-primary rounded-full" style={{ width: "65%" }}></div>
                    </div>
                    <div className="pt-2">
                      <p className="text-xs text-muted-foreground">
                        Posts within this range have 65% higher completion rates and 42% more engagement.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="content" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Content Performance</CardTitle>
                <CardDescription>Detailed metrics for all your posts</CardDescription>
              </CardHeader>
              <CardContent>
                <ContentPerformanceTable content={topContent} showDetailedMetrics={true} />
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="audience" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Audience Demographics</CardTitle>
                <CardDescription>Detailed information about your readers</CardDescription>
              </CardHeader>
              <CardContent className="h-[400px]">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 h-full">
                  <div>
                    <h3 className="text-sm font-medium mb-4 text-center">Age Distribution</h3>
                    <div className="h-[300px] flex items-center justify-center">
                      <div className="text-center text-muted-foreground">Age distribution chart</div>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-sm font-medium mb-4 text-center">Geographic Distribution</h3>
                    <div className="h-[300px] flex items-center justify-center">
                      <div className="text-center text-muted-foreground">Geographic distribution chart</div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="growth" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Growth Trends</CardTitle>
                <CardDescription>How your audience and content are growing over time</CardDescription>
              </CardHeader>
              <CardContent className="h-[400px]">
                <div className="h-full flex items-center justify-center">
                  <div className="text-center text-muted-foreground">Growth trends chart</div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </DashboardShell>
      <SiteFooter />
    </div>
  )
}

