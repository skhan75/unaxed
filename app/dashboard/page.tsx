import Link from "next/link"
import { BarChart3, BookOpen, Edit, Eye, Heart, MessageSquare, Plus, Settings, TrendingUp, Users } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { DashboardHeader } from "@/components/dashboard/dashboard-header"
import { DashboardShell } from "@/components/dashboard/dashboard-shell"
import { StatsCard } from "@/components/dashboard/stats-card"
import { RecentPostsTable } from "@/components/dashboard/recent-posts-table"
import { EngagementChart } from "@/components/dashboard/engagement-chart"

export default function DashboardPage() {
  // Sample data for dashboard
  const stats = {
    posts: 12,
    views: 8432,
    likes: 347,
    comments: 89,
    followers: 156,
  }

  const recentPosts = [
    {
      id: 1,
      title: "The Future of Web Development",
      status: "published",
      date: "Mar 15, 2025",
      views: 1243,
      likes: 87,
      comments: 23,
    },
    {
      id: 2,
      title: "Minimalism in UI Design",
      status: "published",
      date: "Mar 10, 2025",
      views: 982,
      likes: 64,
      comments: 18,
    },
    {
      id: 3,
      title: "The Art of Digital Photography",
      status: "published",
      date: "Mar 5, 2025",
      views: 756,
      likes: 52,
      comments: 14,
    },
    {
      id: 4,
      title: "Building Accessible Web Applications",
      status: "draft",
      date: "Mar 18, 2025",
      views: 0,
      likes: 0,
      comments: 0,
    },
  ]

  const earnings = {
    total: 1247.89,
    thisMonth: 342.5,
    pending: 128.75,
  }

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <SiteHeader />
      <DashboardShell>
        <DashboardHeader heading="Dashboard" text="Overview of your content and performance">
          <Button asChild>
            <Link href="/create">
              <Plus className="mr-2 h-4 w-4" />
              New Post
            </Link>
          </Button>
        </DashboardHeader>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <StatsCard
            title="Total Posts"
            value={stats.posts.toString()}
            icon={<BookOpen className="h-4 w-4 text-muted-foreground" />}
            description="All time"
            trend="up"
            trendValue="2 new this week"
          />
          <StatsCard
            title="Total Views"
            value={stats.views.toLocaleString()}
            icon={<Eye className="h-4 w-4 text-muted-foreground" />}
            description="All time"
            trend="up"
            trendValue="12% increase"
          />
          <StatsCard
            title="Engagement"
            value={(stats.likes + stats.comments).toLocaleString()}
            icon={<Heart className="h-4 w-4 text-muted-foreground" />}
            description="Likes & comments"
            trend="up"
            trendValue="8% increase"
          />
          <StatsCard
            title="Followers"
            value={stats.followers.toString()}
            icon={<Users className="h-4 w-4 text-muted-foreground" />}
            description="People following you"
            trend="up"
            trendValue="5 new this week"
          />
        </div>

        <Tabs defaultValue="overview" className="space-y-4">
          <TabsList>
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
            <TabsTrigger value="earnings">Earnings</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
              <Card className="lg:col-span-4">
                <CardHeader>
                  <CardTitle>Recent Posts</CardTitle>
                  <CardDescription>Your recently published and drafted content</CardDescription>
                </CardHeader>
                <CardContent>
                  <RecentPostsTable posts={recentPosts} />
                </CardContent>
                <CardFooter>
                  <Button variant="outline" asChild className="w-full">
                    <Link href="/dashboard/posts">View all posts</Link>
                  </Button>
                </CardFooter>
              </Card>

              <Card className="lg:col-span-3">
                <CardHeader>
                  <CardTitle>Engagement</CardTitle>
                  <CardDescription>Views, likes and comments over time</CardDescription>
                </CardHeader>
                <CardContent>
                  <EngagementChart />
                </CardContent>
                <CardFooter>
                  <Button variant="outline" asChild className="w-full">
                    <Link href="/dashboard/analytics">View detailed analytics</Link>
                  </Button>
                </CardFooter>
              </Card>
            </div>

            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Quick Actions</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 gap-4">
                    <Button variant="outline" asChild className="justify-start">
                      <Link href="/create">
                        <Edit className="mr-2 h-4 w-4" />
                        New Post
                      </Link>
                    </Button>
                    <Button variant="outline" asChild className="justify-start">
                      <Link href="/dashboard/analytics">
                        <BarChart3 className="mr-2 h-4 w-4" />
                        Analytics
                      </Link>
                    </Button>
                    <Button variant="outline" asChild className="justify-start">
                      <Link href="/dashboard/posts">
                        <BookOpen className="mr-2 h-4 w-4" />
                        My Posts
                      </Link>
                    </Button>
                    <Button variant="outline" asChild className="justify-start">
                      <Link href="/dashboard/settings">
                        <Settings className="mr-2 h-4 w-4" />
                        Settings
                      </Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Top Performing Post</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <Link href="/blog/1" className="text-base font-medium hover:text-primary transition-colors">
                      The Future of Web Development
                    </Link>
                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                      <div className="flex items-center gap-1">
                        <Eye className="h-3.5 w-3.5" />
                        <span>1,243</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Heart className="h-3.5 w-3.5" />
                        <span>87</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <MessageSquare className="h-3.5 w-3.5" />
                        <span>23</span>
                      </div>
                    </div>
                    <div className="text-sm text-muted-foreground">Published on Mar 15, 2025</div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Earnings Overview</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <div className="text-sm font-medium text-muted-foreground">Total Earnings</div>
                      <div className="text-2xl font-bold">${earnings.total.toFixed(2)}</div>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <div className="text-sm font-medium text-muted-foreground">This Month</div>
                        <div className="text-lg font-semibold">${earnings.thisMonth.toFixed(2)}</div>
                      </div>
                      <div>
                        <div className="text-sm font-medium text-muted-foreground">Pending</div>
                        <div className="text-lg font-semibold">${earnings.pending.toFixed(2)}</div>
                      </div>
                    </div>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button variant="outline" asChild className="w-full">
                    <Link href="/dashboard/earnings">View earnings details</Link>
                  </Button>
                </CardFooter>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="analytics" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Analytics Preview</CardTitle>
                <CardDescription>View detailed analytics on the Analytics page</CardDescription>
              </CardHeader>
              <CardContent className="h-[300px] flex items-center justify-center">
                <Button asChild>
                  <Link href="/dashboard/analytics">
                    <BarChart3 className="mr-2 h-4 w-4" />
                    Go to Analytics
                  </Link>
                </Button>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="earnings" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Earnings Preview</CardTitle>
                <CardDescription>View detailed earnings on the Earnings page</CardDescription>
              </CardHeader>
              <CardContent className="h-[300px] flex items-center justify-center">
                <Button asChild>
                  <Link href="/dashboard/earnings">
                    <TrendingUp className="mr-2 h-4 w-4" />
                    Go to Earnings
                  </Link>
                </Button>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </DashboardShell>
      <SiteFooter />
    </div>
  )
}

