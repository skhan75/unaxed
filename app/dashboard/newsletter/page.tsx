import type { Metadata } from "next"
import Link from "next/link"
import { ArrowUpRight, Download, Mail, Send, Settings, Upload, Users } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Separator } from "@/components/ui/separator"
import { Badge } from "@/components/ui/badge"

export const metadata: Metadata = {
  title: "Newsletter Management | Dashboard",
  description: "Manage your newsletter subscribers and campaigns",
}

export default function NewsletterPage() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col justify-between gap-4 md:flex-row md:items-center">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Newsletter</h2>
          <p className="text-muted-foreground">Manage your subscribers and send newsletters to your audience</p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" className="gap-2">
            <Settings className="h-4 w-4" />
            Settings
          </Button>
          <Button className="gap-2">
            <Send className="h-4 w-4" />
            New Campaign
          </Button>
        </div>
      </div>

      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="subscribers">Subscribers</TabsTrigger>
          <TabsTrigger value="campaigns">Campaigns</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Subscribers</CardTitle>
                <Users className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">1,248</div>
                <p className="text-xs text-muted-foreground">+24 this week</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Open Rate</CardTitle>
                <Mail className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">42.8%</div>
                <p className="text-xs text-muted-foreground">+2.4% from last month</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Click Rate</CardTitle>
                <ArrowUpRight className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">12.5%</div>
                <p className="text-xs text-muted-foreground">+0.8% from last month</p>
              </CardContent>
            </Card>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <Card className="col-span-1">
              <CardHeader>
                <CardTitle>Recent Subscribers</CardTitle>
                <CardDescription>Your newest newsletter subscribers</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {/* This would be populated with actual subscriber data */}
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">sarah@example.com</p>
                      <p className="text-sm text-muted-foreground">2 hours ago</p>
                    </div>
                    <Badge>New</Badge>
                  </div>
                  <Separator />
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">john@example.com</p>
                      <p className="text-sm text-muted-foreground">Yesterday</p>
                    </div>
                    <Badge>New</Badge>
                  </div>
                  <Separator />
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">alex@example.com</p>
                      <p className="text-sm text-muted-foreground">2 days ago</p>
                    </div>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button variant="outline" className="w-full" asChild>
                  <Link href="/dashboard/newsletter/subscribers">View all subscribers</Link>
                </Button>
              </CardFooter>
            </Card>

            <Card className="col-span-1">
              <CardHeader>
                <CardTitle>Recent Campaigns</CardTitle>
                <CardDescription>Your latest newsletter campaigns</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {/* This would be populated with actual campaign data */}
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">Weekly Roundup: March Edition</p>
                      <p className="text-sm text-muted-foreground">Sent 3 days ago • 42% open rate</p>
                    </div>
                  </div>
                  <Separator />
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">New Feature Announcement</p>
                      <p className="text-sm text-muted-foreground">Sent 1 week ago • 38% open rate</p>
                    </div>
                  </div>
                  <Separator />
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">February Newsletter</p>
                      <p className="text-sm text-muted-foreground">Sent 2 weeks ago • 45% open rate</p>
                    </div>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button variant="outline" className="w-full" asChild>
                  <Link href="/dashboard/newsletter/campaigns">View all campaigns</Link>
                </Button>
              </CardFooter>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
              <CardDescription>Common tasks for managing your newsletter</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-4">
                <Button variant="outline" className="h-auto flex-col items-start gap-1 p-4 text-left">
                  <Send className="h-5 w-5" />
                  <div>
                    <p className="font-medium">Create Campaign</p>
                    <p className="text-xs text-muted-foreground">Draft and send a new newsletter</p>
                  </div>
                </Button>
                <Button variant="outline" className="h-auto flex-col items-start gap-1 p-4 text-left">
                  <Upload className="h-5 w-5" />
                  <div>
                    <p className="font-medium">Import Subscribers</p>
                    <p className="text-xs text-muted-foreground">Upload a CSV of email addresses</p>
                  </div>
                </Button>
                <Button variant="outline" className="h-auto flex-col items-start gap-1 p-4 text-left">
                  <Download className="h-5 w-5" />
                  <div>
                    <p className="font-medium">Export Subscribers</p>
                    <p className="text-xs text-muted-foreground">Download your subscriber list</p>
                  </div>
                </Button>
                <Button variant="outline" className="h-auto flex-col items-start gap-1 p-4 text-left">
                  <Settings className="h-5 w-5" />
                  <div>
                    <p className="font-medium">Newsletter Settings</p>
                    <p className="text-xs text-muted-foreground">Customize your newsletter appearance</p>
                  </div>
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="subscribers" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Subscriber Management</CardTitle>
              <CardDescription>View and manage your newsletter subscribers</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="rounded-md border p-8 text-center">
                <p className="text-muted-foreground">
                  The subscriber management interface would be implemented here, showing a table of subscribers with
                  options to filter, search, and manage them.
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="campaigns" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Campaign Management</CardTitle>
              <CardDescription>Create and manage your newsletter campaigns</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="rounded-md border p-8 text-center">
                <p className="text-muted-foreground">
                  The campaign management interface would be implemented here, showing a list of past campaigns and
                  options to create new ones.
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="analytics" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Newsletter Analytics</CardTitle>
              <CardDescription>Track the performance of your newsletters</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="rounded-md border p-8 text-center">
                <p className="text-muted-foreground">
                  The analytics dashboard would be implemented here, showing charts and metrics for open rates, click
                  rates, subscriber growth, and more.
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

