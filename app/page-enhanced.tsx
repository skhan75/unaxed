import Link from "next/link"
import { ArrowRight, BookOpen, Compass, Sparkles, Users } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { PublicationCard } from "@/components/publications/publication-card"
import { TrendingPosts } from "@/components/trending-posts"

// Mock data for trending posts
const trendingPosts = [
  {
    id: "1",
    title: "The Future of JavaScript: What's Coming in 2025",
    excerpt: "Exploring the upcoming features and improvements in JavaScript.",
    author: {
      name: "Alex Johnson",
      id: "alex",
    },
    publication: {
      name: "Technology Insights",
      id: "technology",
    },
    likes: 243,
    comments: 57,
  },
  {
    id: "2",
    title: "Mastering React Hooks: Advanced Patterns",
    excerpt: "Learn how to leverage React Hooks for cleaner, more maintainable code.",
    author: {
      name: "Sarah Chen",
      id: "sarah",
    },
    publication: {
      name: "Technology Insights",
      id: "technology",
    },
    likes: 189,
    comments: 42,
  },
  {
    id: "3",
    title: "The Psychology of Color in UI Design",
    excerpt: "How color choices affect user perception and behavior.",
    author: {
      name: "Michael Rodriguez",
      id: "michael",
    },
    publication: {
      name: "Creative Canvas",
      id: "art",
    },
    likes: 176,
    comments: 38,
  },
  {
    id: "4",
    title: "Investing for Beginners: Building Your First Portfolio",
    excerpt: "A step-by-step guide to starting your investment journey.",
    author: {
      name: "Emily Wong",
      id: "emily",
    },
    publication: {
      name: "Financial Freedom",
      id: "finance",
    },
    likes: 152,
    comments: 29,
  },
  {
    id: "5",
    title: "The Rise of AI in Content Creation",
    excerpt: "How artificial intelligence is transforming the way we create content.",
    author: {
      name: "David Kim",
      id: "david",
    },
    likes: 134,
    comments: 31,
  },
  {
    id: "6",
    title: "Remote Work Culture: Building Connection Across Distances",
    excerpt: "Strategies for maintaining team cohesion in distributed teams.",
    author: {
      name: "Lisa Patel",
      id: "lisa",
    },
    likes: 128,
    comments: 24,
  },
]

// Mock data for featured publications
const featuredPublications = [
  {
    id: "technology",
    name: "Technology Insights",
    description: "The latest in tech, programming, and digital innovation",
    image: "/placeholder.svg?height=400&width=800",
    postCount: 156,
    followerCount: 2450,
    tags: ["Technology", "Programming", "AI", "Web Development"],
  },
  {
    id: "finance",
    name: "Financial Freedom",
    description: "Personal finance, investing strategies, and economic analysis",
    image: "/placeholder.svg?height=400&width=800",
    postCount: 89,
    followerCount: 1820,
    tags: ["Finance", "Investing", "Economics", "Cryptocurrency"],
  },
  {
    id: "art",
    name: "Creative Canvas",
    description: "Art, design, and creative expression in all forms",
    image: "/placeholder.svg?height=400&width=800",
    postCount: 112,
    followerCount: 1650,
    tags: ["Art", "Design", "Creativity", "Illustration"],
  },
]

export default function HomePage() {
  return (
    <div className="container mx-auto py-8">
      {/* Hero section */}
      <div className="mb-16 text-center">
        <h1 className="mb-4 text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl">
          Discover, Connect, and Create
        </h1>
        <p className="mx-auto mb-8 max-w-2xl text-xl text-muted-foreground">
          A community-driven platform for writers and readers to share ideas, stories, and knowledge
        </p>
        <div className="flex flex-wrap justify-center gap-4">
          <Button asChild size="lg" className="gap-2">
            <Link href="/create">
              <BookOpen className="h-5 w-5" />
              Start Writing
            </Link>
          </Button>
          <Button asChild variant="outline" size="lg" className="gap-2">
            <Link href="/publications">
              <Compass className="h-5 w-5" />
              Explore Publications
            </Link>
          </Button>
        </div>
      </div>

      {/* Trending posts section */}
      <div className="mb-16">
        <TrendingPosts posts={trendingPosts} />
      </div>

      {/* Featured publications section */}
      <div className="mb-16">
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold">Featured Publications</h2>
            <p className="text-muted-foreground">Discover curated content from our top publications</p>
          </div>
          <Button asChild variant="outline" className="gap-2">
            <Link href="/publications">
              View All <ArrowRight className="h-4 w-4" />
            </Link>
          </Button>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {featuredPublications.map((publication) => (
            <PublicationCard key={publication.id} {...publication} />
          ))}
        </div>
      </div>

      {/* Features section */}
      <div className="mb-16">
        <div className="mb-8 text-center">
          <h2 className="text-2xl font-bold">Why Join Our Platform?</h2>
          <p className="text-muted-foreground">Discover the benefits of being part of our growing community</p>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          <Card>
            <CardHeader>
              <div className="mb-2 flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                <Users className="h-6 w-6 text-primary" />
              </div>
              <CardTitle>Build Your Audience</CardTitle>
              <CardDescription>Connect directly with readers and grow your subscriber base</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                Our platform makes it easy to build and maintain a direct relationship with your readers through
                newsletters, comments, and more.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <div className="mb-2 flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                <Sparkles className="h-6 w-6 text-primary" />
              </div>
              <CardTitle>AI-Powered Tools</CardTitle>
              <CardDescription>Enhance your writing with our suite of AI assistants</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                From headline generation to content analysis, our AI tools help you create high-quality content that
                resonates with your audience.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <div className="mb-2 flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                <BookOpen className="h-6 w-6 text-primary" />
              </div>
              <CardTitle>Monetize Your Content</CardTitle>
              <CardDescription>Earn from your writing through subscriptions and more</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                Create premium content for your subscribers and build a sustainable income stream from your writing
                passion.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* CTA section */}
      <div className="rounded-lg bg-gradient-to-r from-purple-500 to-pink-500 p-8 text-center text-white">
        <h2 className="mb-4 text-3xl font-bold">Ready to share your ideas with the world?</h2>
        <p className="mx-auto mb-6 max-w-2xl text-lg text-white/90">
          Join thousands of writers and readers in our growing community
        </p>
        <Button asChild size="lg" variant="secondary" className="gap-2">
          <Link href="/auth/signup">Get Started Today</Link>
        </Button>
      </div>
    </div>
  )
}

