"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import {
  Calendar,
  Eye,
  Hash,
  TrendingUp,
  Zap,
  Users,
  Clock,
  LayoutGrid,
  List,
  Rows,
  ChevronDown,
  BookOpen,
} from "lucide-react"

import { Button } from "@/components/ui/button"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { UserAvatar } from "@/components/user-avatar"
import { useAuth } from "@/components/site-header"
import { Badge } from "@/components/ui/badge"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { PostReactions } from "@/components/post-reactions"
import { CommentSection } from "@/components/comment-section"
import { NaturalLanguageSearch } from "@/components/ai/natural-language-search"
import { FeaturedStories } from "@/components/featured-stories"
import { ContentCard } from "@/components/ui/content-card"

// Import our centralized mock data
import { POSTS, USERS } from "@/lib/data/mock-data"

export default function Home() {
  const { currentUser, isLoaded } = useAuth()
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (isLoaded) {
      setLoading(false)
    }
  }, [isLoaded])

  // Use the first 3 posts from our mock data for non-logged-in users
  const posts = POSTS.slice(0, 3)

  if (loading) {
    return (
      <div className="flex min-h-screen flex-col bg-background">
        <SiteHeader />
        <main className="flex-1 flex items-center justify-center">
          <p>Loading...</p>
        </main>
        <SiteFooter />
      </div>
    )
  }

  // Render different home pages based on authentication status
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <SiteHeader />
      {currentUser ? (
        // Logged-in user view - full content
        <LoggedInHomePage />
      ) : (
        // Non-logged-in user view - limited preview
        <NonLoggedInHomePage posts={posts} />
      )}
      <SiteFooter />
    </div>
  )
}

function LoggedInHomePage() {
  // Add view state
  const [viewMode, setViewMode] = useState<"expanded" | "compact" | "list" | "grid">("expanded")
  // Add sort state
  const [sortMode, setSortMode] = useState<"recent" | "popular" | "staff-picks">("recent")
  // Add state for expanded comment sections
  const [expandedCommentPosts, setExpandedCommentPosts] = useState<number[]>([])

  // Toggle comment section for a post
  const toggleCommentSection = (postId: number) => {
    setExpandedCommentPosts((prev) => (prev.includes(postId) ? prev.filter((id) => id !== postId) : [...prev, postId]))
  }

  // Get all posts from our centralized mock data
  const allPosts = POSTS

  // Sort posts based on selected sort mode
  const sortedPosts = [...allPosts].sort((a, b) => {
    if (sortMode === "recent") {
      return b.timestamp - a.timestamp // Most recent first
    } else if (sortMode === "popular") {
      return b.views - a.views // Most views first
    } else if (sortMode === "staff-picks") {
      return (b.staffPick ? 1 : 0) - (a.staffPick ? 1 : 0) // Staff picks first
    }
    return 0
  })

  // Sample popular posts data - use the most viewed posts from our mock data
  const popularPosts = [...POSTS]
    .sort((a, b) => b.views - a.views)
    .slice(0, 4)
    .map((post) => ({
      id: post.id,
      title: post.title,
      author: post.author,
      date: post.date,
      views: post.views,
      category: post.category,
    }))

  // Sample recent posts data - use the most recent posts from our mock data
  const recentPosts = [...POSTS]
    .sort((a, b) => b.timestamp - a.timestamp)
    .slice(0, 2)
    .map((post) => ({
      id: post.id,
      title: post.title,
      author: post.author,
      date: post.date,
      category: post.category,
    }))

  // Sample tags data with counts
  const tags = [
    { name: "webdev", count: 5 },
    { name: "design", count: 4 },
    { name: "future", count: 2 },
    { name: "ai", count: 2 },
    { name: "accessibility", count: 2 },
    { name: "a11y", count: 2 },
    { name: "inclusion", count: 2 },
    { name: "frontend", count: 2 },
    { name: "wasm", count: 1 },
    { name: "minimalism", count: 1 },
    { name: "ui", count: 1 },
    { name: "ux", count: 1 },
    { name: "photography", count: 1 },
    { name: "digital", count: 1 },
    { name: "composition", count: 1 },
    { name: "editing", count: 1 },
    { name: "psychology", count: 1 },
    { name: "color", count: 1 },
    { name: "branding", count: 1 },
    { name: "react", count: 1 },
    { name: "performance", count: 1 },
    { name: "optimization", count: 1 },
  ]

  // Updated tag color function to use theme-aware styling
  const getTagColor = (name: string, count: number) => {
    // Return theme-aware styling for all tags
    return "dark:bg-white dark:text-black dark:border-zinc-200 dark:hover:bg-zinc-100 bg-zinc-100 text-zinc-900 border border-zinc-200 hover:bg-zinc-200 reading:bg-tag-background reading:text-tag-foreground reading:border-tag-border reading:hover:bg-tag-hover"
  }

  // Get sort mode display text
  const getSortModeText = () => {
    switch (sortMode) {
      case "recent":
        return "Most Recent"
      case "popular":
        return "Most Popular"
      case "staff-picks":
        return "Staff Picks"
      default:
        return "Most Recent"
    }
  }

  return (
    <main className="flex-1 bg-background relative pt-0">
      {/* Grid background for retro-futuristic feel */}
      <div className="absolute inset-0 grid grid-cols-[repeat(40,1fr)] grid-rows-[repeat(40,1fr)] gap-px opacity-[0.03] pointer-events-none z-0">
        {Array.from({ length: 1600 }).map((_, i) => (
          <div key={i} className="bg-primary/40"></div>
        ))}
      </div>

      {/* Scanline effect */}
      <div className="absolute inset-0 bg-[linear-gradient(to_bottom,transparent_50%,rgba(0,0,0,0.02)_50%)] bg-[length:100%_4px] pointer-events-none z-0"></div>

      {/* Search Bar - Moved from header to body top */}
      <div className="w-full bg-background py-4 border-b border-border/40 relative z-10">
        <div className="container max-w-screen-2xl mx-auto px-4 md:px-6 lg:px-8">
          <NaturalLanguageSearch />
        </div>
      </div>

      {/* Featured Stories Section */}
      <FeaturedStories />

      <div className="container px-4 sm:px-6 lg:px-8 max-w-screen-2xl mx-auto pb-16 relative z-10 pt-8">
        <div className="grid gap-12 md:grid-cols-[1fr_350px]">
          {/* Left Column - Feed */}
          <div className="space-y-10">
            {/* Featured Posts Section */}
            <section>
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-2">
                  <div className="h-px w-6 bg-primary"></div>
                  <Zap className="h-5 w-5 text-primary" />
                  <h2 className="text-xl font-bold font-mono">HOME_FEED</h2>
                </div>
                <div className="flex items-center gap-4">
                  {/* Sort dropdown */}
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button
                        variant="outline"
                        size="sm"
                        className="gap-1 border-primary/20 bg-background/80 backdrop-blur-sm reading:text-foreground reading:border-border"
                      >
                        <Clock className="h-3.5 w-3.5 mr-1" />
                        {getSortModeText()}
                        <ChevronDown className="h-3.5 w-3.5 ml-1 opacity-70" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent
                      align="end"
                      className="border-primary/20 bg-background/80 backdrop-blur-sm reading:text-foreground reading:border-border"
                    >
                      <DropdownMenuItem
                        onClick={() => setSortMode("recent")}
                        className={sortMode === "recent" ? "bg-primary/20 text-primary" : ""}
                      >
                        <Clock className="h-4 w-4 mr-2" />
                        Most Recent
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        onClick={() => setSortMode("popular")}
                        className={sortMode === "popular" ? "bg-primary/20 text-primary" : ""}
                      >
                        <TrendingUp className="h-4 w-4 mr-2" />
                        Most Popular
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        onClick={() => setSortMode("staff-picks")}
                        className={sortMode === "staff-picks" ? "bg-primary/20 text-primary" : ""}
                      >
                        <Zap className="h-4 w-4 mr-2" />
                        Staff Picks
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>

                  {/* View mode toggle */}
                  <div className="flex items-center border border-primary/20 rounded-md overflow-hidden reading:border-border">
                    <button
                      onClick={() => setViewMode("expanded")}
                      className={`p-1.5 ${viewMode === "expanded" ? "bg-primary/20 text-primary" : "text-muted-foreground hover:text-primary hover:bg-primary/10"} reading:text-foreground`}
                      title="Expanded view"
                    >
                      <LayoutGrid className="h-4 w-4" />
                    </button>
                    <button
                      onClick={() => setViewMode("compact")}
                      className={`p-1.5 ${viewMode === "compact" ? "bg-primary/20 text-primary" : "text-muted-foreground hover:text-primary hover:bg-primary/10"} reading:text-foreground`}
                      title="Compact view"
                    >
                      <Rows className="h-4 w-4" />
                    </button>
                    <button
                      onClick={() => setViewMode("list")}
                      className={`p-1.5 ${viewMode === "list" ? "bg-primary/20 text-primary" : "text-muted-foreground hover:text-primary hover:bg-primary/10"} reading:text-foreground`}
                      title="List view"
                    >
                      <List className="h-4 w-4" />
                    </button>
                    <button
                      onClick={() => setViewMode("grid")}
                      className={`p-1.5 ${viewMode === "grid" ? "bg-primary/20 text-primary" : "text-muted-foreground hover:text-primary hover:bg-primary/10"} reading:text-foreground`}
                      title="Grid view"
                    >
                      <LayoutGrid className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              </div>

              <div
                className={`${
                  viewMode === "list"
                    ? "space-y-2"
                    : viewMode === "grid"
                      ? "grid grid-cols-1 md:grid-cols-2 gap-6"
                      : "space-y-6"
                }`}
              >
                {sortedPosts.map((post) => (
                  <ContentCard
                    key={post.id}
                    className={`${viewMode === "list" ? "flex items-center" : ""}`}
                    headerContent={
                      viewMode === "expanded" && (
                        <div className="flex items-center gap-3">
                          <UserAvatar user={post.author} className="h-10 w-10" />
                          <div>
                            <Link
                              href={`/profile/${post.author.username}`}
                              className="font-medium hover:text-primary transition-colors reading:text-foreground"
                            >
                              {post.author.name}
                            </Link>
                            <div className="text-xs text-muted-foreground flex items-center gap-2 reading:text-muted-foreground">
                              <span>{post.date}</span>
                              <span className="inline-block h-1 w-1 rounded-full bg-muted-foreground/50"></span>
                              <span>{post.category}</span>
                            </div>
                          </div>
                        </div>
                      )
                    }
                    footerContent={
                      viewMode === "expanded" && (
                        <>
                          <PostReactions
                            postId={post.id}
                            initialLikes={post.likes}
                            initialStandingOvations={post.standingOvations}
                            initialComments={post.comments}
                            size="sm"
                            showLabels={true}
                            showShare={true}
                            onCommentClick={() => toggleCommentSection(post.id)}
                          />

                          {/* Comment section (expandable) */}
                          {expandedCommentPosts.includes(post.id) && (
                            <div className="mt-4">
                              <CommentSection postId={post.id} compact={true} maxComments={3} showViewAll={true} />
                            </div>
                          )}
                        </>
                      )
                    }
                  >
                    {viewMode === "expanded" && (
                      <div className="p-6 relative">
                        {/* Add image rendering for expanded view */}
                        {post.image && (
                          <div className="float-right ml-4 mb-2 w-1/3 rounded-lg overflow-hidden">
                            <img
                              src={post.image || "/placeholder.svg"}
                              alt={post.title}
                              className="w-full h-40 object-cover transition-transform hover:scale-105 duration-300"
                            />
                          </div>
                        )}

                        <Link href={`/blog/${post.id}`}>
                          <h3 className="text-xl font-bold mb-2 hover:text-primary transition-colors reading:text-foreground">
                            {post.title}
                          </h3>
                        </Link>
                        <p className="text-muted-foreground mb-4 text-sm reading:text-muted-foreground">
                          {post.excerpt}
                        </p>

                        {/* Post tags - Updated to use white background with black text */}
                        <div className="flex flex-wrap gap-1 mb-4">
                          {post.tags.map((tag) => (
                            <Link key={tag} href={`/tags/${tag}`}>
                              <Badge className={`${getTagColor(tag, 1)} tag`}>#{tag}</Badge>
                            </Link>
                          ))}
                        </div>
                      </div>
                    )}

                    {viewMode === "compact" && (
                      <div className="p-4 relative">
                        <div className="flex items-center justify-between mb-2">
                          <div className="flex items-center gap-2">
                            <UserAvatar user={post.author} className="h-6 w-6" />
                            <span className="text-sm font-medium reading:text-foreground">{post.author.name}</span>
                            <span className="text-xs text-muted-foreground reading:text-muted-foreground">
                              {post.date}
                            </span>
                          </div>
                          <Badge className={`${getTagColor("category", 1)} text-xs tag`}>{post.category}</Badge>
                        </div>

                        <div className="flex gap-3">
                          {post.image && (
                            <div className="flex-shrink-0 w-20 h-20 rounded overflow-hidden">
                              <img
                                src={post.image || "/placeholder.svg"}
                                alt={post.title}
                                className="w-full h-full object-cover"
                              />
                            </div>
                          )}

                          <div className="flex-1">
                            <Link href={`/blog/${post.id}`}>
                              <h3 className="text-lg font-bold mb-1 hover:text-primary transition-colors line-clamp-2 reading:text-foreground">
                                {post.title}
                              </h3>
                            </Link>

                            <p className="text-xs text-muted-foreground mb-2 line-clamp-2 reading:text-muted-foreground">
                              {post.excerpt}
                            </p>

                            <div className="flex flex-wrap gap-1 mt-2 mb-3">
                              {post.tags.slice(0, 3).map((tag) => (
                                <Link key={tag} href={`/tags/${tag}`}>
                                  <Badge className={`${getTagColor(tag, 1)} text-xs tag`}>#{tag}</Badge>
                                </Link>
                              ))}
                              {post.tags.length > 3 && (
                                <Badge className={`${getTagColor("more", 1)} text-xs tag`}>
                                  +{post.tags.length - 3}
                                </Badge>
                              )}
                            </div>
                          </div>
                        </div>

                        {/* Post reactions */}
                        <PostReactions
                          postId={post.id}
                          initialLikes={post.likes}
                          initialStandingOvations={post.standingOvations}
                          initialComments={post.comments}
                          size="sm"
                          showLabels={false}
                          showShare={false}
                          onCommentClick={() => toggleCommentSection(post.id)}
                        />

                        {/* Comment section (expandable) */}
                        {expandedCommentPosts.includes(post.id) && (
                          <div className="mt-3">
                            <CommentSection postId={post.id} compact={true} maxComments={2} showViewAll={true} />
                          </div>
                        )}
                      </div>
                    )}

                    {viewMode === "list" && (
                      <div className="flex items-center w-full px-4 py-2">
                        <div className="flex-shrink-0 mr-3">
                          <UserAvatar user={post.author} className="h-8 w-8" />
                        </div>
                        <div className="flex-grow min-w-0">
                          <Link href={`/blog/${post.id}`}>
                            <h3 className="font-medium text-base truncate hover:text-primary transition-colors reading:text-foreground">
                              {post.title}
                            </h3>
                          </Link>
                          <div className="flex items-center gap-2 text-xs text-muted-foreground reading:text-muted-foreground">
                            <span>{post.author.name}</span>
                            <span>•</span>
                            <span>{post.date}</span>
                            <span>•</span>
                            <span>{post.category}</span>
                          </div>
                        </div>
                        <div className="flex-shrink-0 ml-4 flex items-center gap-2">
                          <PostReactions
                            postId={post.id}
                            initialLikes={post.likes}
                            initialStandingOvations={post.standingOvations}
                            initialComments={post.comments}
                            size="sm"
                            showLabels={false}
                            showShare={false}
                            onCommentClick={() => toggleCommentSection(post.id)}
                          />
                        </div>
                      </div>
                    )}
                  </ContentCard>
                ))}
              </div>

              {/* Load more button */}
              <div className="mt-8 text-center">
                <Button
                  variant="outline"
                  className="border-primary/20 bg-background/80 backdrop-blur-sm reading:text-foreground reading:border-border reading:bg-button-background reading:text-button-foreground reading:hover:bg-button-hover"
                >
                  Load More
                </Button>
              </div>
            </section>
          </div>

          {/* Right Column - Tags and Trending */}
          <div className="space-y-8">
            {/* Tags Section */}
            <ContentCard className="p-6">
              <div className="flex items-center gap-2 mb-6">
                <div className="h-px w-6 bg-primary"></div>
                <Hash className="h-5 w-5 text-primary" />
                <h2 className="text-xl font-bold font-mono reading:text-foreground">TAGS</h2>
              </div>

              <div className="flex flex-wrap gap-2">
                {tags.map((tag) => (
                  <Link key={tag.name} href={`/tags/${tag.name}`}>
                    <Badge className={`${getTagColor(tag.name, tag.count)} tag`}>
                      #{tag.name} {tag.count > 1 && <span className="ml-1 text-xs opacity-70">{tag.count}</span>}
                    </Badge>
                  </Link>
                ))}
              </div>
            </ContentCard>

            {/* Popular Posts Section */}
            <ContentCard className="p-6">
              <div className="flex items-center gap-2 mb-6">
                <div className="h-px w-6 bg-primary"></div>
                <TrendingUp className="h-5 w-5 text-primary" />
                <h2 className="text-xl font-bold font-mono reading:text-foreground">TRENDING</h2>
              </div>

              <div className="space-y-4">
                {popularPosts.map((post) => (
                  <div
                    key={post.id}
                    className="border-b border-border/30 pb-4 last:border-0 last:pb-0 reading:border-border"
                  >
                    <Link href={`/blog/${post.id}`}>
                      <h3 className="font-medium hover:text-primary transition-colors mb-2 reading:text-foreground">
                        {post.title}
                      </h3>
                    </Link>
                    <div className="flex items-center justify-between text-xs text-muted-foreground reading:text-muted-foreground">
                      <div className="flex items-center gap-2">
                        <UserAvatar user={post.author} className="h-5 w-5" />
                        <span>{post.author.name}</span>
                      </div>
                      <Badge className={`${getTagColor("category", 1)} text-xs font-normal tag`}>{post.category}</Badge>
                    </div>
                    <div className="flex items-center gap-4 mt-2 text-xs text-muted-foreground reading:text-muted-foreground">
                      <div className="flex items-center gap-1">
                        <Calendar className="h-3 w-3" />
                        <span>{post.date}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Eye className="h-3 w-3" />
                        <span>{post.views}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </ContentCard>

            {/* Who to Follow Section */}
            <ContentCard className="p-6">
              <div className="flex items-center gap-2 mb-6">
                <div className="h-px w-6 bg-primary"></div>
                <Users className="h-5 w-5 text-primary" />
                <h2 className="text-xl font-bold font-mono reading:text-foreground">WHO_TO_FOLLOW</h2>
              </div>

              <div className="space-y-4">
                {USERS.slice(0, 3).map((user) => (
                  <div key={user.id} className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <UserAvatar user={user} className="h-8 w-8" />
                      <div>
                        <Link
                          href={`/profile/${user.username}`}
                          className="font-medium text-sm hover:text-primary transition-colors reading:text-foreground"
                        >
                          {user.name}
                        </Link>
                        <p className="text-xs text-muted-foreground reading:text-muted-foreground">{user.role}</p>
                      </div>
                    </div>
                    <Button
                      variant="outline"
                      size="sm"
                      className="h-8 text-xs border-primary/30 dark:bg-white dark:text-black dark:hover:bg-zinc-100 bg-zinc-100 text-zinc-900 hover:bg-zinc-200 reading:bg-button-background reading:text-button-foreground reading:hover:bg-button-hover reading:border-border"
                    >
                      Follow
                    </Button>
                  </div>
                ))}
              </div>
            </ContentCard>

            {/* Publications Section */}
            <ContentCard className="p-6">
              <div className="flex items-center gap-2 mb-6">
                <div className="h-px w-6 bg-primary"></div>
                <BookOpen className="h-5 w-5 text-primary" />
                <h2 className="text-xl font-bold font-mono reading:text-foreground">PUBLICATIONS</h2>
              </div>

              <div className="space-y-4">
                <p className="text-sm text-muted-foreground reading:text-muted-foreground">
                  Discover content organized by topic and interest
                </p>
                <Button
                  asChild
                  variant="outline"
                  className="w-full dark:bg-white dark:text-black dark:hover:bg-zinc-100 bg-zinc-100 text-zinc-900 hover:bg-zinc-200 reading:bg-button-background reading:text-button-foreground reading:hover:bg-button-hover reading:border-border"
                >
                  <Link href="/publications">
                    <BookOpen className="mr-2 h-4 w-4" />
                    Browse Publications
                  </Link>
                </Button>
              </div>
            </ContentCard>
          </div>
        </div>
      </div>
    </main>
  )
}

// Component for non-logged-in users - limited preview
function NonLoggedInHomePage({ posts }: { posts: any[] }) {
  // Updated tag color function to use theme-aware styling
  const getTagColor = (name: string, count: number) => {
    // Return theme-aware styling for all tags
    return "dark:bg-white dark:text-black dark:border-zinc-200 dark:hover:bg-zinc-100 bg-zinc-100 text-zinc-900 border border-zinc-200 hover:bg-zinc-200 reading:bg-tag-background reading:text-tag-foreground reading:border-tag-border reading:hover:bg-tag-hover"
  }

  return (
    <main className="flex-1 bg-background relative">
      {/* Grid background for retro-futuristic feel */}
      <div className="absolute inset-0 grid grid-cols-[repeat(40,1fr)] grid-rows-[repeat(40,1fr)] gap-px opacity-[0.03] pointer-events-none z-0">
        {Array.from({ length: 1600 }).map((_, i) => (
          <div key={i} className="bg-primary/40"></div>
        ))}
      </div>

      {/* Scanline effect */}
      <div className="absolute inset-0 bg-[linear-gradient(to_bottom,transparent_50%,rgba(0,0,0,0.02)_50%)] bg-[length:100%_4px] pointer-events-none z-0"></div>

      {/* Hero Section */}
      <section className="py-20 md:py-32 flex flex-col items-center justify-center text-center relative z-10">
        <div className="container px-4 sm:px-6 lg:px-8 max-w-4xl space-y-6 md:space-y-8">
          <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-pink-300 via-purple-300 to-indigo-300 bg-clip-text text-transparent">
            UNAXED_
          </h1>
          <p className="text-base md:text-lg text-muted-foreground font-mono reading:text-muted-foreground">
            &gt; A community of creators sharing authentic, unfiltered content
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-3 md:gap-4 pt-2 md:pt-4">
            <Button
              asChild
              size="lg"
              className="w-full sm:w-auto sm:min-w-[180px] dark:bg-white dark:text-black dark:hover:bg-zinc-100 bg-zinc-100 text-zinc-900 hover:bg-zinc-200 reading:bg-button-background reading:text-button-foreground reading:hover:bg-button-hover"
            >
              <Link href="/auth/signup">Start Writing</Link>
            </Button>
            <Button
              variant="outline"
              size="lg"
              className="w-full sm:w-auto sm:min-w-[180px] border-white/20 text-white hover:bg-white/10 reading:text-foreground reading:border-border"
            >
              <Link href="/auth/login">Explore Content</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Trending Section */}
      <section className="py-16 relative z-10">
        <div className="container px-4 sm:px-6 lg:px-8 max-w-6xl">
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-2">
              <div className="h-px w-6 bg-primary"></div>
              <Zap className="h-5 w-5 text-primary" />
              <h2 className="text-xl font-bold font-mono reading:text-foreground">FEATURED_POSTS</h2>
            </div>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {posts.map((post) => (
              <ContentCard
                key={post.id}
                headerContent={
                  <div className="flex items-center gap-3">
                    <UserAvatar user={post.author} className="h-10 w-10" />
                    <div>
                      <Link
                        href={`/profile/${post.author.username}`}
                        className="font-medium hover:text-primary transition-colors reading:text-foreground"
                      >
                        {post.author.name}
                      </Link>
                      <div className="text-xs text-muted-foreground flex items-center gap-2 reading:text-muted-foreground">
                        <span>{post.date}</span>
                        <span className="inline-block h-1 w-1 rounded-full bg-muted-foreground/50"></span>
                        <span>{post.category}</span>
                      </div>
                    </div>
                  </div>
                }
                footerContent={
                  <div className="flex items-center gap-4 text-xs text-muted-foreground reading:text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <Eye className="h-3.5 w-3.5" />
                      <span>{post.views} views</span>
                    </div>
                    <Link href="/auth/login" className="hover:text-primary transition-colors reading:text-foreground">
                      <span>Sign in to comment</span>
                    </Link>
                  </div>
                }
              >
                <div className="p-6">
                  <Link href={`/blog/${post.id}`}>
                    <h3 className="text-xl font-bold mb-2 hover:text-primary transition-colors reading:text-foreground">
                      {post.title}
                    </h3>
                  </Link>
                  <p className="text-muted-foreground mb-4 reading:text-muted-foreground">{post.excerpt}</p>

                  {/* Post tags - Updated to use white background with black text */}
                  <div className="flex flex-wrap gap-1 mb-4">
                    {post.tags.map((tag) => (
                      <Link key={tag} href={`/tags/${tag}`}>
                        <Badge className={`${getTagColor(tag, 1)} tag`}>#{tag}</Badge>
                      </Link>
                    ))}
                  </div>
                </div>
              </ContentCard>
            ))}
          </div>
        </div>
      </section>

      {/* Join CTA Section */}
      <section className="py-16 relative z-10">
        <div className="container px-4 sm:px-6 lg:px-8 max-w-4xl text-center">
          <h2 className="text-2xl font-bold mb-4 reading:text-foreground font-mono">JOIN_THE_COMMUNITY</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto mb-8 reading:text-muted-foreground">
            Sign up to access the full platform, follow your favorite writers, and start publishing your own content.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-3 mb-6">
            <Button
              asChild
              size="lg"
              className="w-full sm:w-auto sm:min-w-[180px] dark:bg-white dark:text-black dark:hover:bg-zinc-100 bg-zinc-100 text-zinc-900 hover:bg-zinc-200 reading:bg-button-background reading:text-button-foreground reading:hover:bg-button-hover"
            >
              <Link href="/auth/signup">Start Writing</Link>
            </Button>
            <Button
              variant="outline"
              size="lg"
              className="w-full sm:w-auto sm:min-w-[180px] border-white/20 text-white hover:bg-white/10 reading:text-foreground reading:border-border"
            >
              <Link href="/auth/login">Sign In</Link>
            </Button>
          </div>
          <div className="flex justify-center">
            <Button variant="ghost" asChild className="reading:text-foreground">
              <Link href="/publications" className="flex items-center">
                <BookOpen className="mr-2 h-4 w-4" />
                Browse Publications
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </main>
  )
}

