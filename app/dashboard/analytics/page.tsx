import { Download } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { DashboardHeader } from "@/components/dashboard/dashboard-header"
import { DashboardShell } from "@/components/dashboard/dashboard-shell"
import { DateRangePicker } from "@/components/dashboard/date-range-picker"
import { ViewsChart } from "@/components/dashboard/views-chart"
import { EngagementChart } from "@/components/dashboard/engagement-chart"
import { ReferrersChart } from "@/components/dashboard/referrers-chart"
import { ReadingTimeChart } from "@/components/dashboard/reading-time-chart"
import { TopPostsTable } from "@/components/dashboard/top-posts-table"
import { AudienceMetrics } from "@/components/dashboard/audience-metrics"

export default function AnalyticsPage() {
  // Sample data for top posts
  const topPosts = [
    {
      id: 1,
      title: "The Future of Web Development",
      views: 1243,
      likes: 87,
      comments: 23,
      readTime: "5 min",
      readCompletionRate: 78,
      date: "Mar 15, 2025",
    },
    {
      id: 2,
      title: "Minimalism in UI Design",
      views: 982,
      likes: 64,
      comments: 18,
      readTime: "4 min",
      readCompletionRate: 82,
      date: "Mar 10, 2025",
    },
    {
      id: 3,
      title: "The Art of Digital Photography",
      views: 756,
      likes: 52,
      comments: 14,
      readTime: "6 min",
      readCompletionRate: 71,
      date: "Mar 5, 2025",
    },
    {
      id: 4,
      title: "Building Accessible Web Applications",
      views: 543,
      likes: 42,
      comments: 11,
      readTime: "7 min",
      readCompletionRate: 68,
      date: "Feb 28, 2025",
    },
    {
      id: 5,
      title: "The Psychology of Color in Design",
      views: 487,
      likes: 38,
      comments: 9,
      readTime: "5 min",
      readCompletionRate: 74,
      date: "Feb 20, 2025",
    },
  ]

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <SiteHeader />
      <DashboardShell>
        <DashboardHeader heading="Analytics" text="Detailed insights about your content performance">
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
            <TabsTrigger value="engagement">Engagement</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-2">
              <Card>
                <CardHeader>
                  <CardTitle>Views</CardTitle>
                  <CardDescription>Total views over time</CardDescription>
                </CardHeader>
                <CardContent className="h-[300px]">
                  <ViewsChart />
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Engagement</CardTitle>
                  <CardDescription>Likes and comments over time</CardDescription>
                </CardHeader>
                <CardContent className="h-[300px]">
                  <EngagementChart />
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Top Performing Posts</CardTitle>
                <CardDescription>Your most viewed and engaged content</CardDescription>
              </CardHeader>
              <CardContent>
                <TopPostsTable posts={topPosts} />
              </CardContent>
            </Card>

            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-2">
              <Card>
                <CardHeader>
                  <CardTitle>Traffic Sources</CardTitle>
                  <CardDescription>Where your readers are coming from</CardDescription>
                </CardHeader>
                <CardContent className="h-[300px]">
                  <ReferrersChart />
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Reading Time</CardTitle>
                  <CardDescription>Average time spent on your posts</CardDescription>
                </CardHeader>
                <CardContent className="h-[300px]">
                  <ReadingTimeChart />
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
                <TopPostsTable posts={topPosts} showReadingMetrics={true} />
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="audience" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Audience Demographics</CardTitle>
                <CardDescription>Information about your readers</CardDescription>
              </CardHeader>
              <CardContent className="h-[400px]">
                <AudienceMetrics />
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="engagement" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Engagement Metrics</CardTitle>
                <CardDescription>How readers interact with your content</CardDescription>
              </CardHeader>
              <CardContent className="h-[300px]">
                <EngagementChart detailed={true} />
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </DashboardShell>
      <SiteFooter />
    </div>
  )
}

