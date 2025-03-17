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
  Heart,
  MessageSquare,
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

// Define a base avatar URL to use consistently throughout the application
const DEFAULT_AVATAR = "https://images.unsplash.com/photo-1568602471122-7832951cc4c5?q=80&w=250&auto=format&fit=crop"

export default function Home() {
  const { currentUser, isLoaded } = useAuth()
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (isLoaded) {
      setLoading(false)
    }
  }, [isLoaded])

  // Sample blog posts data with consistent avatar
  const posts = [
    {
      id: 1,
      title: "The Future of Web Development",
      excerpt: "Exploring the latest trends and technologies shaping the future of web development.",
      date: "Mar 15, 2025",
      timestamp: new Date("2025-03-15").getTime(),
      author: {
        id: 1,
        username: "alexjohnson",
        name: "Alex Johnson",
        avatar: DEFAULT_AVATAR,
      },
      category: "Technology",
      views: 1243,
      likes: 87,
      standingOvations: 12,
      comments: 23,
      featured: true,
      staffPick: false,
      tags: ["webdev", "future", "ai", "wasm"],
    },
    {
      id: 2,
      title: "Minimalism in UI Design",
      excerpt: "How embracing minimalism can create more effective and beautiful user interfaces.",
      date: "Mar 10, 2025",
      timestamp: new Date("2025-03-10").getTime(),
      author: {
        id: 2,
        username: "samchen",
        name: "Sam Chen",
        avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=250&auto=format&fit=crop",
      },
      category: "Design",
      views: 982,
      likes: 64,
      standingOvations: 8,
      comments: 18,
      featured: true,
      staffPick: true,
      tags: ["design", "minimalism", "ui", "ux"],
    },
    {
      id: 3,
      title: "The Art of Digital Photography",
      excerpt: "Tips and techniques for capturing stunning digital photographs in any environment.",
      date: "Mar 5, 2025",
      timestamp: new Date("2025-03-05").getTime(),
      author: {
        id: 3,
        username: "jamiesmith",
        name: "Jamie Smith",
        avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=250&auto=format&fit=crop",
      },
      category: "Photography",
      views: 756,
      likes: 52,
      standingOvations: 5,
      comments: 14,
      featured: true,
      staffPick: false,
      tags: ["photography", "digital", "composition", "editing"],
    },
  ]

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

  // Define a base avatar URL to use consistently throughout the application
  const DEFAULT_AVATAR = "https://images.unsplash.com/photo-1568602471122-7832951cc4c5?q=80&w=250&auto=format&fit=crop"

  // Alternative avatars
  const AVATAR_SAM = "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=250&auto=format&fit=crop"
  const AVATAR_JAMIE = "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=250&auto=format&fit=crop"
  const AVATAR_JAMES = "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=250&auto=format&fit=crop"

  // Sample featured posts data
  const featuredPosts = [
    {
      id: 1,
      title: "The Future of Web Development",
      excerpt: "Exploring the latest trends and technologies shaping the future of web development.",
      date: "Mar 15, 2025",
      timestamp: new Date("2025-03-15").getTime(),
      author: {
        id: 1,
        username: "alexjohnson",
        name: "Alex Johnson",
        avatar: DEFAULT_AVATAR,
      },
      category: "Technology",
      views: 1243,
      likes: 87,
      standingOvations: 12,
      comments: 23,
      featured: true,
      tags: ["webdev", "future", "ai", "wasm"],
      image: "https://images.unsplash.com/photo-1571171637578-41bc2dd41cd2?q=80&w=1200&auto=format&fit=crop",
    },
    {
      id: 2,
      title: "Minimalism in UI Design",
      excerpt: "How embracing minimalism can create more effective and beautiful user interfaces.",
      date: "Mar 10, 2025",
      timestamp: new Date("2025-03-10").getTime(),
      author: {
        id: 2,
        username: "samchen",
        name: "Sam Chen",
        avatar: AVATAR_SAM,
      },
      category: "Design",
      views: 982,
      likes: 64,
      standingOvations: 8,
      comments: 18,
      featured: true,
      tags: ["design", "minimalism", "ui", "ux"],
      image: "https://images.unsplash.com/photo-1545235617-9465d2a55698?q=80&w=1200&auto=format&fit=crop",
    },
    {
      id: 3,
      title: "The Art of Digital Photography",
      excerpt: "Tips and techniques for capturing stunning digital photographs in any environment.",
      date: "Mar 5, 2025",
      timestamp: new Date("2025-03-05").getTime(),
      author: {
        id: 3,
        username: "jamiesmith",
        name: "Jamie Smith",
        avatar: AVATAR_JAMIE,
      },
      category: "Photography",
      views: 756,
      likes: 52,
      standingOvations: 5,
      comments: 14,
      featured: true,
      tags: ["photography", "digital", "composition", "editing"],
      image: "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?q=80&w=1200&auto=format&fit=crop",
    },
    {
      id: 4,
      title: "Building Accessible Web Applications",
      excerpt: "Essential practices for creating inclusive web experiences for all users.",
      date: "Feb 28, 2025",
      timestamp: new Date("2025-02-28").getTime(),
      author: {
        id: 1,
        username: "alexjohnson",
        name: "Alex Johnson",
        avatar: DEFAULT_AVATAR,
      },
      category: "Development",
      views: 2341,
      likes: 112,
      standingOvations: 15,
      comments: 32,
      featured: false,
      tags: ["accessibility", "a11y", "webdev", "inclusion"],
      image: "https://images.unsplash.com/photo-1551650975-87deedd944c3?q=80&w=1200&auto=format&fit=crop",
    },
    {
      id: 5,
      title: "The Psychology of Color in Design",
      excerpt: "How color choices influence user perception and behavior in digital interfaces.",
      date: "Feb 20, 2025",
      timestamp: new Date("2025-02-20").getTime(),
      author: {
        id: 2,
        username: "samchen",
        name: "Sam Chen",
        avatar: AVATAR_SAM,
      },
      category: "Design",
      views: 1987,
      likes: 93,
      standingOvations: 7,
      comments: 21,
      featured: false,
      tags: ["design", "psychology", "color", "branding"],
      image: "https://images.unsplash.com/photo-1550859492-d5da9d8e45f3?q=80&w=1200&auto=format&fit=crop",
    },
  ]

  // Sort posts based on selected sort mode
  const sortedPosts = [...featuredPosts].sort((a, b) => {
    if (sortMode === "recent") {
      return b.timestamp - a.timestamp // Most recent first
    } else if (sortMode === "popular") {
      return b.views - a.views // Most views first
    } else if (sortMode === "staff-picks") {
      return (b.staffPick ? 1 : 0) - (a.staffPick ? 1 : 0) // Staff picks first
    }
    return 0
  })

  // Sample popular posts data
  const popularPosts = [
    {
      id: 6,
      title: "Getting Started with React Hooks",
      author: {
        id: 1,
        username: "alexjohnson",
        name: "Alex Johnson",
        avatar: DEFAULT_AVATAR,
      },
      date: "Feb 15, 2025",
      views: 1854,
      category: "Development",
    },
    {
      id: 7,
      title: "Optimizing Website Performance",
      author: {
        id: 4,
        username: "jamesmiller",
        name: "James Miller",
        avatar: AVATAR_JAMES,
      },
      date: "Feb 10, 2025",
      views: 1632,
      category: "Performance",
    },
    {
      id: 8,
      title: "The Rise of AI in Content Creation",
      author: {
        id: 1,
        username: "alexjohnson",
        name: "Alex Johnson",
        avatar: DEFAULT_AVATAR,
      },
      date: "Mar 16, 2025",
      category: "Technology",
      views: 543,
    },
    {
      id: 9,
      title: "Responsive Design Best Practices",
      author: {
        id: 2,
        username: "samchen",
        name: "Sam Chen",
        avatar: AVATAR_SAM,
      },
      date: "Mar 14, 2025",
      category: "Design",
      views: 421,
    },
  ]

  // Sample recent posts data
  const recentPosts = [
    {
      id: 10,
      title: "Understanding Web Accessibility",
      author: {
        id: 1,
        username: "alexjohnson",
        name: "Alex Johnson",
        avatar: DEFAULT_AVATAR,
      },
      date: "Mar 12, 2025",
      category: "Development",
    },
    {
      id: 11,
      title: "The Future of CSS",
      author: {
        id: 3,
        username: "jamiesmith",
        name: "Jamie Smith",
        avatar: AVATAR_JAMIE,
      },
      date: "Mar 11, 2025",
      category: "Development",
    },
  ]

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

  // Revert to original tag color function
  const getTagColor = (name: string, count: number) => {
    // Create a deterministic but varied color based on the tag name
    const colors = [
      "bg-purple-500/20 text-purple-500 border-purple-500/30",
      "bg-pink-500/20 text-pink-500 border-pink-500/30",
      "bg-blue-500/20 text-blue-500 border-blue-500/30",
      "bg-green-500/20 text-green-500 border-green-500/30",
      "bg-indigo-500/20 text-indigo-500 border-indigo-500/30",
      "bg-rose-500/20 text-rose-500 border-rose-500/30",
      "bg-cyan-500/20 text-cyan-500 border-cyan-500/30",
      "bg-amber-500/20 text-amber-500 border-amber-500/30",
    ]

    // Use the sum of character codes to determine color index
    const charSum = name.split("").reduce((sum, char) => sum + char.charCodeAt(0), 0)
    return colors[charSum % colors.length]
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
                        className="gap-1 border-primary/20 bg-background/80 backdrop-blur-sm"
                      >
                        <Clock className="h-3.5 w-3.5 mr-1" />
                        {getSortModeText()}
                        <ChevronDown className="h-3.5 w-3.5 ml-1 opacity-70" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="border-primary/20 bg-background/80 backdrop-blur-sm">
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
                  <div className="flex items-center border border-primary/20 rounded-md overflow-hidden">
                    <button
                      onClick={() => setViewMode("expanded")}
                      className={`p-1.5 ${viewMode === "expanded" ? "bg-primary/20 text-primary" : "text-muted-foreground hover:text-primary hover:bg-primary/10"}`}
                      title="Expanded view"
                    >
                      <LayoutGrid className="h-4 w-4" />
                    </button>
                    <button
                      onClick={() => setViewMode("compact")}
                      className={`p-1.5 ${viewMode === "compact" ? "bg-primary/20 text-primary" : "text-muted-foreground hover:text-primary hover:bg-primary/10"}`}
                      title="Compact view"
                    >
                      <Rows className="h-4 w-4" />
                    </button>
                    <button
                      onClick={() => setViewMode("list")}
                      className={`p-1.5 ${viewMode === "list" ? "bg-primary/20 text-primary" : "text-muted-foreground hover:text-primary hover:bg-primary/10"}`}
                      title="List view"
                    >
                      <List className="h-4 w-4" />
                    </button>
                    <button
                      onClick={() => setViewMode("grid")}
                      className={`p-1.5 ${viewMode === "grid" ? "bg-primary/20 text-primary" : "text-muted-foreground hover:text-primary hover:bg-primary/10"}`}
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
                  <div
                    key={post.id}
                    className={`border border-primary/20 bg-zinc-900/90 rounded-lg overflow-hidden transition-colors relative ${
                      viewMode === "list" ? "flex items-center" : ""
                    }`}
                    style={{
                      boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
                    }}
                  >
                    {viewMode === "expanded" && (
                      <>
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

                          <div className="flex items-center gap-3 mb-3">
                            <UserAvatar user={post.author} className="h-10 w-10" />
                            <div>
                              <Link
                                href={`/profile/${post.author.username}`}
                                className="font-medium hover:text-primary transition-colors"
                              >
                                {post.author.name}
                              </Link>
                              <div className="text-xs text-muted-foreground flex items-center gap-2">
                                <span>{post.date}</span>
                                <span className="inline-block h-1 w-1 rounded-full bg-muted-foreground/50"></span>
                                <span>{post.category}</span>
                              </div>
                            </div>
                          </div>

                          <Link href={`/blog/${post.id}`}>
                            <h3 className="text-xl font-bold mb-2 hover:text-primary transition-colors">
                              {post.title}
                            </h3>
                          </Link>
                          <p className="text-muted-foreground mb-4 text-sm">{post.excerpt}</p>

                          {/* Post tags */}
                          <div className="flex flex-wrap gap-1 mb-4">
                            {post.tags.map((tag) => (
                              <Link key={tag} href={`/tags/${tag}`}>
                                <Badge className={`${getTagColor(tag, 1)}`}>#{tag}</Badge>
                              </Link>
                            ))}
                          </div>
                        </div>

                        {/* Post reactions */}
                        <div className="border-t border-primary/10 bg-muted/10 px-6 py-3">
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
                        </div>
                      </>
                    )}

                    {viewMode === "compact" && (
                      <>
                        <div className="p-4 relative">
                          <div className="flex items-center justify-between mb-2">
                            <div className="flex items-center gap-2">
                              <UserAvatar user={post.author} className="h-6 w-6" />
                              <span className="text-sm font-medium">{post.author.name}</span>
                              <span className="text-xs text-muted-foreground">{post.date}</span>
                            </div>
                            <Badge variant="outline" className="text-xs">
                              {post.category}
                            </Badge>
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
                                <h3 className="text-lg font-bold mb-1 hover:text-primary transition-colors line-clamp-2">
                                  {post.title}
                                </h3>
                              </Link>

                              <p className="text-xs text-muted-foreground mb-2 line-clamp-2">{post.excerpt}</p>

                              <div className="flex flex-wrap gap-1 mt-2 mb-3">
                                {post.tags.slice(0, 3).map((tag) => (
                                  <Link key={tag} href={`/tags/${tag}`}>
                                    <Badge variant="secondary" className="text-xs">
                                      #{tag}
                                    </Badge>
                                  </Link>
                                ))}
                                {post.tags.length > 3 && (
                                  <Badge variant="secondary" className="text-xs">
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
                      </>
                    )}

                    {viewMode === "list" && (
                      <div className="flex items-center w-full px-4 py-2">
                        <div className="flex-shrink-0 mr-3">
                          <UserAvatar user={post.author} className="h-8 w-8" />
                        </div>
                        <div className="flex-grow min-w-0">
                          <Link href={`/blog/${post.id}`}>
                            <h3 className="font-medium text-base truncate hover:text-primary transition-colors">
                              {post.title}
                            </h3>
                          </Link>
                          <div className="flex items-center gap-2 text-xs text-muted-foreground">
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
                    {viewMode === "grid" && (
                      <div className="flex flex-col h-[500px] min-w-[300px] overflow-hidden">
                        {/* Image at the top */}
                        {post.image && (
                          <div className="relative w-full h-48 overflow-hidden">
                            <img
                              src={post.image || "/placeholder.svg"}
                              alt={post.title}
                              className="w-full h-full object-cover transition-transform hover:scale-105 duration-300"
                            />
                            <Badge className="absolute top-3 left-3 bg-white/90 text-black font-medium backdrop-blur-sm">
                              {post.category}
                            </Badge>
                          </div>
                        )}

                        {/* Content area */}
                        <div className="flex flex-col flex-grow p-5 overflow-hidden">
                          <Link href={`/blog/${post.id}`}>
                            <h3 className="text-xl font-bold mb-3 hover:text-primary transition-colors line-clamp-2">
                              {post.title}
                            </h3>
                          </Link>

                          <p className="text-sm text-muted-foreground mb-4 line-clamp-3 overflow-hidden">
                            {post.excerpt}
                          </p>

                          {/* Tags section with limited display */}
                          <div className="flex flex-wrap gap-1 mb-4">
                            {post.tags.slice(0, 3).map((tag) => (
                              <Link key={tag} href={`/tags/${tag}`}>
                                <Badge variant="secondary" className="text-xs">
                                  #{tag}
                                </Badge>
                              </Link>
                            ))}
                            {post.tags.length > 3 && (
                              <Badge variant="secondary" className="text-xs">
                                +{post.tags.length - 3}
                              </Badge>
                            )}
                          </div>

                          {/* Author and metrics at the bottom */}
                          <div className="mt-auto pt-4 border-t border-primary/10 flex items-center justify-between">
                            <div className="flex items-center gap-2">
                              <UserAvatar user={post.author} className="h-8 w-8" />
                              <div className="flex flex-col">
                                <span className="text-sm font-medium">{post.author.name}</span>
                                <span className="text-xs text-muted-foreground">{post.date}</span>
                              </div>
                            </div>

                            <div className="flex items-center gap-3 text-sm">
                              <div className="flex items-center gap-1">
                                <Eye className="h-4 w-4 text-muted-foreground" />
                                <span>{post.views}</span>
                              </div>
                              <div className="flex items-center gap-1">
                                <Heart className="h-4 w-4 text-muted-foreground" />
                                <span>{post.likes}</span>
                              </div>
                              <div className="flex items-center gap-1">
                                <MessageSquare className="h-4 w-4 text-muted-foreground" />
                                <span>{post.comments}</span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>

              {/* Load more button */}
              <div className="mt-8 text-center">
                <Button variant="outline" className="border-primary/20 bg-background/80 backdrop-blur-sm">
                  Load More
                </Button>
              </div>
            </section>
          </div>

          {/* Right Column - Tags and Trending */}
          <div className="space-y-8">
            {/* Tags Section */}
            <section
              className="border border-primary/20 bg-zinc-900/90 rounded-lg p-6"
              style={{
                boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
              }}
            >
              <div className="flex items-center gap-2 mb-6">
                <div className="h-px w-6 bg-primary"></div>
                <Hash className="h-5 w-5 text-primary" />
                <h2 className="text-xl font-bold font-mono">TAGS</h2>
              </div>

              <div className="flex flex-wrap gap-2">
                {tags.map((tag) => (
                  <Link key={tag.name} href={`/tags/${tag.name}`}>
                    <Badge className={`${getTagColor(tag.name, tag.count)}`}>
                      #{tag.name} {tag.count > 1 && <span className="ml-1 text-xs opacity-70">{tag.count}</span>}
                    </Badge>
                  </Link>
                ))}
              </div>
            </section>

            {/* Popular Posts Section */}
            <section
              className="border border-primary/20 bg-zinc-900/90 rounded-lg p-6"
              style={{
                boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
              }}
            >
              <div className="flex items-center gap-2 mb-6">
                <div className="h-px w-6 bg-primary"></div>
                <TrendingUp className="h-5 w-5 text-primary" />
                <h2 className="text-xl font-bold font-mono">TRENDING</h2>
              </div>

              <div className="space-y-4">
                {popularPosts.map((post) => (
                  <div key={post.id} className="border-b border-border/30 pb-4 last:border-0 last:pb-0">
                    <Link href={`/blog/${post.id}`}>
                      <h3 className="font-medium hover:text-primary transition-colors mb-2">{post.title}</h3>
                    </Link>
                    <div className="flex items-center justify-between text-xs text-muted-foreground">
                      <div className="flex items-center gap-2">
                        <UserAvatar user={post.author} className="h-5 w-5" />
                        <span>{post.author.name}</span>
                      </div>
                      <Badge className={`text-xs font-normal ${getTagColor(post.category.toLowerCase(), 1)}`}>
                        {post.category}
                      </Badge>
                    </div>
                    <div className="flex items-center gap-4 mt-2 text-xs text-muted-foreground">
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
            </section>

            {/* Who to Follow Section */}
            <section
              className="border border-primary/20 bg-zinc-900/90 rounded-lg p-6"
              style={{
                boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
              }}
            >
              <div className="flex items-center gap-2 mb-6">
                <div className="h-px w-6 bg-primary"></div>
                <Users className="h-5 w-5 text-primary" />
                <h2 className="text-xl font-bold font-mono">WHO_TO_FOLLOW</h2>
              </div>

              <div className="space-y-4">
                {[
                  {
                    id: 1,
                    name: "Alex Johnson",
                    username: "alexjohnson",
                    avatar: DEFAULT_AVATAR,
                    role: "Web Developer",
                  },
                  {
                    id: 2,
                    name: "Sam Chen",
                    username: "samchen",
                    avatar: AVATAR_SAM,
                    role: "UX Designer",
                  },
                  {
                    id: 3,
                    name: "Jamie Smith",
                    username: "jamiesmith",
                    avatar: AVATAR_JAMIE,
                    role: "Photographer",
                  },
                ].map((user) => (
                  <div key={user.id} className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <UserAvatar user={user} className="h-8 w-8" />
                      <div>
                        <Link
                          href={`/profile/${user.username}`}
                          className="font-medium text-sm hover:text-primary transition-colors"
                        >
                          {user.name}
                        </Link>
                        <p className="text-xs text-muted-foreground">{user.role}</p>
                      </div>
                    </div>
                    <Button variant="outline" size="sm" className="h-8 text-xs border-primary/30">
                      Follow
                    </Button>
                  </div>
                ))}
              </div>
            </section>
          </div>
        </div>
      </div>
    </main>
  )
}

// Component for non-logged-in users - limited preview
function NonLoggedInHomePage({ posts }: { posts: any[] }) {
  // Revert to original tag color function
  const getTagColor = (name: string, count: number) => {
    // Create a deterministic but varied color based on the tag name
    const colors = [
      "bg-purple-500/20 text-purple-500 border-purple-500/30",
      "bg-pink-500/20 text-pink-500 border-pink-500/30",
      "bg-blue-500/20 text-blue-500 border-blue-500/30",
      "bg-green-500/20 text-green-500 border-green-500/30",
      "bg-indigo-500/20 text-indigo-500 border-indigo-500/30",
      "bg-rose-500/20 text-rose-500 border-rose-500/30",
      "bg-cyan-500/20 text-cyan-500 border-cyan-500/30",
      "bg-amber-500/20 text-amber-500 border-amber-500/30",
    ]

    // Use the sum of character codes to determine color index
    const charSum = name.split("").reduce((sum, char) => sum + char.charCodeAt(0), 0)
    return colors[charSum % colors.length]
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
          <p className="text-base md:text-lg text-muted-foreground font-mono">
            &gt; A community of creators sharing authentic, unfiltered content
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-3 md:gap-4 pt-2 md:pt-4">
            <Button
              asChild
              size="lg"
              className="w-full sm:w-auto sm:min-w-[180px] bg-white text-black hover:bg-white/90"
            >
              <Link href="/auth/signup">Start Writing</Link>
            </Button>
            <Button
              variant="outline"
              size="lg"
              className="w-full sm:w-auto sm:min-w-[180px] border-white/20 text-white hover:bg-white/10"
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
              <h2 className="text-xl font-bold font-mono">FEATURED_POSTS</h2>
            </div>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {posts.map((post) => (
              <div
                key={post.id}
                className="border border-primary/20 bg-zinc-900/90 rounded-lg overflow-hidden transition-colors"
                style={{
                  boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
                }}
              >
                <div className="p-6">
                  <div className="flex items-center gap-3 mb-3">
                    <UserAvatar user={post.author} className="h-10 w-10" />
                    <div>
                      <Link
                        href={`/profile/${post.author.username}`}
                        className="font-medium hover:text-primary transition-colors"
                      >
                        {post.author.name}
                      </Link>
                      <div className="text-xs text-muted-foreground flex items-center gap-2">
                        <span>{post.date}</span>
                        <span className="inline-block h-1 w-1 rounded-full bg-muted-foreground/50"></span>
                        <span>{post.category}</span>
                      </div>
                    </div>
                  </div>

                  <Link href={`/blog/${post.id}`}>
                    <h3 className="text-xl font-bold mb-2 hover:text-primary transition-colors">{post.title}</h3>
                  </Link>
                  <p className="text-muted-foreground mb-4">{post.excerpt}</p>

                  {/* Post tags */}
                  <div className="flex flex-wrap gap-1 mb-4">
                    {post.tags.map((tag) => (
                      <Link key={tag} href={`/tags/${tag}`}>
                        <Badge className={`${getTagColor(tag, 1)}`}>#{tag}</Badge>
                      </Link>
                    ))}
                  </div>
                </div>

                {/* Footer with stats */}
                <div className="border-t border-primary/10 bg-muted/10 px-6 py-3">
                  <div className="flex items-center gap-4 text-xs text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <Eye className="h-3.5 w-3.5" />
                      <span>{post.views} views</span>
                    </div>
                    <Link href="/auth/login" className="hover:text-primary transition-colors">
                      <span>Sign in to comment</span>
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Join CTA Section */}
      <section className="py-16 relative z-10">
        <div className="container px-4 sm:px-6 lg:px-8 max-w-4xl text-center">
          <h2 className="text-2xl font-bold mb-4">Join the Unaxed community today</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto mb-8">
            Sign up to access the full platform, follow your favorite writers, and start publishing your own content.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-3">
            <Button
              asChild
              size="lg"
              className="w-full sm:w-auto sm:min-w-[180px] bg-white text-black hover:bg-white/90"
            >
              <Link href="/auth/signup">Start Writing</Link>
            </Button>
            <Button
              variant="outline"
              size="lg"
              className="w-full sm:w-auto sm:min-w-[180px] border-white/20 text-white hover:bg-white/10"
            >
              <Link href="/auth/login">Sign In</Link>
            </Button>
          </div>
        </div>
      </section>
    </main>
  )
}

