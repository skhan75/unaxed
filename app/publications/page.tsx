import type { Metadata } from "next"
import Link from "next/link"
import { TrendingUp, Clock, ThumbsUp, Users, Bookmark, Plus } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { PublicationCard } from "@/components/publications/publication-card"
import { PublicationsSearch } from "@/components/publications/publications-search"

export const metadata: Metadata = {
  title: "Publications | Blog Platform",
  description: "Discover and follow publications on various topics",
}

// Featured publications with images matching the screenshot
const featuredPublications = [
  {
    id: "zants-newsletter-1",
    name: "zant's Newsletter",
    description: "Mastering the Climb: Support for Founders on the Rise",
    image: "https://images.unsplash.com/photo-1620321023374-d1a68fbc720d?q=80&w=1974&auto=format&fit=crop",
    postCount: 42,
    followerCount: 3250,
    tags: ["Startups", "Founders", "Growth"],
    readTime: "5m read",
  },
  {
    id: "founder-focus",
    name: "zant's Newsletter",
    description: "Founder Focus: Unlocking Growth with Coaching and Mentorship",
    image: "https://images.unsplash.com/photo-1552664730-d307ca884978?q=80&w=2070&auto=format&fit=crop",
    postCount: 36,
    followerCount: 2980,
    tags: ["Coaching", "Mentorship", "Founders"],
    readTime: "4m read",
  },
  {
    id: "entreconnect-1",
    name: "EntreConnect Newsletter",
    description: "Event Recap: How AI is Reshaping Growth & Scaling Strategies",
    image: "https://images.unsplash.com/photo-1591115765373-5207764f72e4?q=80&w=2070&auto=format&fit=crop",
    postCount: 58,
    followerCount: 4120,
    tags: ["AI", "Growth", "Scaling"],
    readTime: "7m read",
  },
  {
    id: "zants-newsletter-2",
    name: "zant's Newsletter",
    description: "Unlocking Your Potential: For Our Founders",
    image: "https://images.unsplash.com/photo-1579547945413-497e1b99dac0?q=80&w=2039&auto=format&fit=crop",
    postCount: 39,
    followerCount: 3050,
    tags: ["Potential", "Growth", "Founders"],
    readTime: "4m read",
  },
  {
    id: "entreconnect-2",
    name: "EntreConnect Newsletter",
    description: "Event Recap: From Founder Spotlights to Cracking the B2B Market",
    image: "https://images.unsplash.com/photo-1540317580384-e5d43867caa6?q=80&w=2070&auto=format&fit=crop",
    postCount: 45,
    followerCount: 3850,
    tags: ["B2B", "Founders", "Market"],
    readTime: "8m read",
  },
]

// Mock data for other publications with real images
const publications = [
  {
    id: "technology-insights",
    name: "Technology Insights",
    description: "The Future of AI: How Machine Learning is Transforming Industries",
    image: "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?q=80&w=1965&auto=format&fit=crop",
    postCount: 156,
    followerCount: 2450,
    tags: ["Technology", "AI", "Machine Learning"],
    readTime: "5m read",
  },
  {
    id: "financial-freedom",
    name: "Financial Freedom",
    description: "Investing Strategies for Uncertain Markets: Building Resilient Portfolios",
    image: "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?q=80&w=2070&auto=format&fit=crop",
    postCount: 89,
    followerCount: 1820,
    tags: ["Finance", "Investing", "Markets"],
    readTime: "7m read",
  },
  {
    id: "creative-canvas",
    name: "Creative Canvas",
    description: "The Renaissance of Digital Art: NFTs and the Creator Economy",
    image: "https://images.unsplash.com/photo-1547891654-e66ed7ebb968?q=80&w=2070&auto=format&fit=crop",
    postCount: 112,
    followerCount: 1650,
    tags: ["Art", "Digital", "NFTs"],
    readTime: "4m read",
  },
  {
    id: "wellness-journal",
    name: "Wellness Journal",
    description: "Mindfulness in the Digital Age: Finding Balance in a Connected World",
    image: "https://images.unsplash.com/photo-1545205597-3d9d02c29597?q=80&w=2070&auto=format&fit=crop",
    postCount: 134,
    followerCount: 2100,
    tags: ["Health", "Mindfulness", "Wellness"],
    readTime: "6m read",
  },
  {
    id: "scientific-frontiers",
    name: "Scientific Frontiers",
    description: "Quantum Computing Breakthrough: What It Means for the Future of Technology",
    image: "https://images.unsplash.com/photo-1635070041078-e363dbe005cb?q=80&w=2070&auto=format&fit=crop",
    postCount: 78,
    followerCount: 1340,
    tags: ["Science", "Quantum", "Research"],
    readTime: "8m read",
  },
  {
    id: "wanderlust",
    name: "Wanderlust",
    description: "Hidden Gems: Exploring the World's Most Underrated Travel Destinations",
    image: "https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?q=80&w=2070&auto=format&fit=crop",
    postCount: 95,
    followerCount: 1780,
    tags: ["Travel", "Adventure", "Destinations"],
    readTime: "5m read",
  },
]

// Trending publications (different order for demonstration)
const trendingPublications = [...publications].sort(() => Math.random() - 0.5).slice(0, 6)

// New publications
const newPublications = [...publications].sort(() => Math.random() - 0.5).slice(0, 6)

export default function PublicationsPage() {
  return (
    <div className="container mx-auto py-8 px-4 sm:px-6">
      {/* Navigation Categories */}
      <div className="mb-8 overflow-x-auto pb-2 -mx-4 px-4">
        <div className="flex gap-2 min-w-max">
          {[
            "Home",
            "Following",
            "Featured",
            "Culture",
            "Technology",
            "Business",
            "U.S. Politics",
            "Finance",
            "Food & Drink",
            "Sports",
            "Art & Illustration",
            "World Politics",
            "Health Politics",
            "News",
          ].map((category) => (
            <Button
              key={category}
              variant={category === "Home" ? "default" : "outline"}
              size="sm"
              className={category === "Home" ? "" : "bg-background/80 border-primary/10"}
            >
              {category}
            </Button>
          ))}
        </div>
      </div>

      {/* Featured Publications - Horizontal Scrolling */}
      <div className="mb-12">
        <div className="overflow-x-auto pb-4 -mx-4 px-4">
          <div className="flex gap-4 min-w-max">
            {featuredPublications.map((publication) => (
              <div key={publication.id} className="w-[240px] h-[320px]">
                <PublicationCard {...publication} />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Search Bar */}
      <div className="mb-12 relative">
        <div className="absolute inset-0 bg-gradient-to-r from-primary/5 via-secondary/5 to-primary/5 rounded-lg -z-10" />
        <div className="bg-background/80 backdrop-blur-sm rounded-lg border border-primary/10 p-6">
          <h2 className="text-2xl font-semibold mb-4 text-center">Find Your Perfect Publication</h2>
          <PublicationsSearch />
        </div>
      </div>

      {/* Tabs for different publication views */}
      <Tabs defaultValue="trending" className="mb-12">
        <div className="flex items-center justify-between mb-6">
          <TabsList className="bg-background/80 backdrop-blur-sm border border-primary/10">
            <TabsTrigger value="trending" className="flex items-center gap-1.5">
              <TrendingUp className="h-4 w-4" />
              <span className="hidden sm:inline">Trending</span>
            </TabsTrigger>
            <TabsTrigger value="newest" className="flex items-center gap-1.5">
              <Clock className="h-4 w-4" />
              <span className="hidden sm:inline">Newest</span>
            </TabsTrigger>
            <TabsTrigger value="popular" className="flex items-center gap-1.5">
              <ThumbsUp className="h-4 w-4" />
              <span className="hidden sm:inline">Most Popular</span>
            </TabsTrigger>
            <TabsTrigger value="following" className="flex items-center gap-1.5">
              <Users className="h-4 w-4" />
              <span className="hidden sm:inline">Following</span>
            </TabsTrigger>
            <TabsTrigger value="saved" className="flex items-center gap-1.5">
              <Bookmark className="h-4 w-4" />
              <span className="hidden sm:inline">Saved</span>
            </TabsTrigger>
          </TabsList>

          <Button variant="outline" size="sm" className="gap-1.5 border-primary/20">
            <Plus className="h-4 w-4" />
            <span>Create Publication</span>
          </Button>
        </div>

        <TabsContent value="trending" className="mt-0">
          <div className="grid gap-4 grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
            {trendingPublications.map((publication) => (
              <div key={publication.id} className="h-[320px]">
                <PublicationCard {...publication} />
              </div>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="newest" className="mt-0">
          <div className="grid gap-4 grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
            {newPublications.map((publication) => (
              <div key={publication.id} className="h-[320px]">
                <PublicationCard {...publication} />
              </div>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="popular" className="mt-0">
          <div className="grid gap-4 grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
            {[...publications]
              .sort((a, b) => b.followerCount - a.followerCount)
              .slice(0, 10)
              .map((publication) => (
                <div key={publication.id} className="h-[320px]">
                  <PublicationCard {...publication} />
                </div>
              ))}
          </div>
        </TabsContent>

        <TabsContent value="following" className="mt-0">
          <div className="flex flex-col items-center justify-center py-12 text-center">
            <Users className="h-12 w-12 text-muted-foreground mb-4" />
            <h3 className="text-xl font-medium mb-2">You're not following any publications yet</h3>
            <p className="text-muted-foreground mb-6 max-w-md">
              Follow publications to see their content in your personalized feed
            </p>
            <Button asChild>
              <Link href="#trending">Discover Publications</Link>
            </Button>
          </div>
        </TabsContent>

        <TabsContent value="saved" className="mt-0">
          <div className="flex flex-col items-center justify-center py-12 text-center">
            <Bookmark className="h-12 w-12 text-muted-foreground mb-4" />
            <h3 className="text-xl font-medium mb-2">No saved publications</h3>
            <p className="text-muted-foreground mb-6 max-w-md">Bookmark publications to easily find them later</p>
            <Button asChild>
              <Link href="#trending">Browse Publications</Link>
            </Button>
          </div>
        </TabsContent>
      </Tabs>

      {/* Start Your Own Publication CTA */}
      <div className="rounded-lg border border-primary/10 bg-gradient-to-r from-primary/5 via-background to-secondary/5 p-8 text-center">
        <h2 className="text-2xl font-semibold mb-2">Start Your Own Publication</h2>
        <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
          Create a home for your writing, build an audience, and monetize your expertise. Our platform provides all the
          tools you need to succeed.
        </p>
        <Button size="lg" className="gap-2">
          <Plus className="h-4 w-4" />
          Create a Publication
        </Button>
      </div>
    </div>
  )
}

