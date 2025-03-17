import Link from "next/link"
import { ArrowLeft, Calendar, Eye, Hash, User } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { Badge } from "@/components/ui/badge"

// Update the allPosts array to use real images
const allPosts = [
  {
    id: 1,
    title: "The Future of Web Development",
    excerpt: "Exploring the latest trends and technologies shaping the future of web development.",
    date: "Mar 15, 2025",
    readTime: "5 min read",
    author: "Alex Johnson",
    category: "Technology",
    views: 1243,
    featured: true,
    tags: ["webdev", "future", "ai", "wasm", "edge"],
    image: "https://images.unsplash.com/photo-1571171637578-41bc2dd41cd2?q=80&w=1200&auto=format&fit=crop",
  },
  {
    id: 2,
    title: "Minimalism in UI Design",
    excerpt: "How embracing minimalism can create more effective and beautiful user interfaces.",
    date: "Mar 10, 2025",
    readTime: "4 min read",
    author: "Sam Chen",
    category: "Design",
    views: 982,
    featured: true,
    tags: ["design", "minimalism", "ui", "ux", "typography"],
    image: "https://images.unsplash.com/photo-1545235617-9465d2a55698?q=80&w=1200&auto=format&fit=crop",
  },
  {
    id: 3,
    title: "The Art of Digital Photography",
    excerpt: "Tips and techniques for capturing stunning digital photographs in any environment.",
    date: "Mar 5, 2025",
    readTime: "6 min read",
    author: "Jamie Smith",
    category: "Photography",
    views: 756,
    featured: true,
    tags: ["photography", "digital", "composition", "lighting", "editing"],
    image: "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?q=80&w=1200&auto=format&fit=crop",
  },
  {
    id: 4,
    title: "Building Accessible Web Applications",
    excerpt: "Essential practices for creating inclusive web experiences for all users.",
    date: "Feb 28, 2025",
    readTime: "7 min read",
    author: "Taylor Kim",
    category: "Development",
    views: 2341,
    featured: false,
    tags: ["accessibility", "a11y", "webdev", "inclusion"],
    image: "https://images.unsplash.com/photo-1551650975-87deedd944c3?q=80&w=1200&auto=format&fit=crop",
  },
  {
    id: 5,
    title: "The Psychology of Color in Design",
    excerpt: "How color choices influence user perception and behavior in digital interfaces.",
    date: "Feb 20, 2025",
    readTime: "5 min read",
    author: "Jordan Lee",
    category: "Design",
    views: 1987,
    featured: false,
    tags: ["design", "psychology", "color", "branding"],
    image: "https://images.unsplash.com/photo-1550859492-d5da9d8e45f3?q=80&w=1200&auto=format&fit=crop",
  },
  {
    id: 6,
    title: "Getting Started with React Hooks",
    excerpt: "A beginner's guide to understanding and implementing React Hooks effectively.",
    date: "Feb 15, 2025",
    readTime: "8 min read",
    author: "Alex Johnson",
    category: "Development",
    views: 1854,
    featured: false,
    tags: ["react", "hooks", "javascript", "frontend"],
    image: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?q=80&w=1200&auto=format&fit=crop",
  },
  {
    id: 7,
    title: "Optimizing Website Performance",
    excerpt: "Techniques to improve loading times and overall performance of your web applications.",
    date: "Feb 10, 2025",
    readTime: "6 min read",
    author: "Sam Chen",
    category: "Performance",
    views: 1632,
    featured: false,
    tags: ["performance", "optimization", "speed", "webdev"],
    image: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?q=80&w=1200&auto=format&fit=crop",
  },
  {
    id: 8,
    title: "The Rise of AI in Content Creation",
    excerpt: "How artificial intelligence is transforming the way we create and consume content.",
    date: "Mar 16, 2025",
    readTime: "4 min read",
    author: "Alex Johnson",
    category: "Technology",
    views: 543,
    featured: false,
    tags: ["ai", "content", "future", "writing"],
    image: "https://images.unsplash.com/photo-1677442135136-760c813028c0?q=80&w=1200&auto=format&fit=crop",
  },
  {
    id: 9,
    title: "Responsive Design Best Practices",
    excerpt: "Creating seamless experiences across all device sizes and screen resolutions.",
    date: "Mar 14, 2025",
    readTime: "5 min read",
    author: "Sam Chen",
    category: "Design",
    views: 421,
    featured: false,
    tags: ["responsive", "design", "mobile", "webdev"],
    image: "https://images.unsplash.com/photo-1508921340878-ba53e1f016ec?q=80&w=1200&auto=format&fit=crop",
  },
  {
    id: 10,
    title: "Understanding Web Accessibility",
    excerpt: "Why accessibility matters and how to implement it in your web projects.",
    date: "Mar 12, 2025",
    readTime: "7 min read",
    author: "Taylor Kim",
    category: "Development",
    views: 387,
    featured: false,
    tags: ["accessibility", "a11y", "inclusion", "webdev"],
    image: "https://images.unsplash.com/photo-1551650975-87deedd944c3?q=80&w=1200&auto=format&fit=crop",
  },
  {
    id: 11,
    title: "The Future of CSS",
    excerpt: "Exploring upcoming CSS features and how they will change web styling.",
    date: "Mar 11, 2025",
    readTime: "6 min read",
    author: "Jordan Lee",
    category: "Development",
    views: 352,
    featured: false,
    tags: ["css", "frontend", "webdev", "design"],
    image: "https://images.unsplash.com/photo-1507721999472-8ed4421c4af2?q=80&w=1200&auto=format&fit=crop",
  },
]

export default function TagPage({ params }: { params: { tag: string } }) {
  const { tag } = params
  const decodedTag = decodeURIComponent(tag)

  // Filter posts by tag
  const filteredPosts = allPosts.filter((post) => post.tags.some((t) => t.toLowerCase() === decodedTag.toLowerCase()))

  // Sort by date (most recent first)
  const sortedPosts = [...filteredPosts].sort((a, b) => {
    return new Date(b.date).getTime() - new Date(a.date).getTime()
  })

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <SiteHeader />
      <main className="flex-1 relative">
        {/* Grid background for retro-futuristic feel */}
        <div className="absolute inset-0 grid grid-cols-[repeat(40,1fr)] grid-rows-[repeat(40,1fr)] gap-px opacity-[0.02] pointer-events-none z-0">
          {Array.from({ length: 1600 }).map((_, i) => (
            <div key={i} className="bg-primary/40"></div>
          ))}
        </div>

        {/* Scanline effect */}
        <div className="absolute inset-0 bg-[linear-gradient(to_bottom,transparent_50%,rgba(0,0,0,0.02)_50%)] bg-[length:100%_4px] pointer-events-none z-0"></div>

        <div className="container py-12 relative z-10">
          <Button variant="ghost" size="sm" asChild className="mb-6 group">
            <Link href="/">
              <ArrowLeft className="mr-2 h-4 w-4 group-hover:-translate-x-1 transition-transform" />
              Back to Home
            </Link>
          </Button>

          <div className="flex items-center gap-3 mb-8">
            <Hash className="h-8 w-8 text-primary" />
            <h1 className="text-3xl font-bold font-mono bg-gradient-to-r from-pink-300 via-purple-300 to-indigo-300 bg-clip-text text-transparent">
              {decodedTag}
            </h1>
            <Badge variant="outline" className="ml-2">
              {filteredPosts.length} posts
            </Badge>
          </div>

          {filteredPosts.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-muted-foreground">No posts found with this tag.</p>
            </div>
          ) : (
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {sortedPosts.map((post) => (
                <Card
                  key={post.id}
                  className="flex flex-col overflow-hidden border border-muted/50 bg-card/90 backdrop-blur-sm transition-all hover:shadow-md hover:shadow-primary/5 group"
                >
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <div className="text-sm font-medium text-primary/70">{post.category}</div>
                  </CardHeader>

                  {post.image && (
                    <div className="px-6 pb-2">
                      <div className="rounded-md overflow-hidden">
                        <img
                          src={post.image || "/placeholder.svg"}
                          alt={post.title}
                          className="w-full h-40 object-cover transition-transform group-hover:scale-105 duration-300"
                        />
                      </div>
                    </div>
                  )}

                  <CardContent className="flex flex-1 flex-col justify-between">
                    <div>
                      <Link href={`/blog/${post.id}`}>
                        <h3 className="text-xl font-bold leading-tight tracking-tight group-hover:text-primary/90 transition-colors">
                          {post.title}
                        </h3>
                      </Link>
                      <p className="mt-2 line-clamp-3 text-muted-foreground">{post.excerpt}</p>
                      <div className="flex flex-wrap gap-1 mt-3">
                        {post.tags.map((t) => (
                          <Link href={`/tags/${t}`} key={t}>
                            <Badge
                              variant="outline"
                              className={`text-xs hover:bg-primary/10 transition-colors ${
                                t.toLowerCase() === decodedTag.toLowerCase() ? "bg-primary/20 border-primary" : ""
                              }`}
                            >
                              #{t}
                            </Badge>
                          </Link>
                        ))}
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter className="border-t bg-muted/20 px-6 py-4">
                    <div className="flex items-center justify-between w-full text-xs text-muted-foreground">
                      <div className="flex items-center gap-2">
                        <User className="h-3 w-3" />
                        <span>{post.author}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Calendar className="h-3 w-3" />
                        <span>{post.date}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Eye className="h-3 w-3" />
                        <span>{post.views}</span>
                      </div>
                    </div>
                  </CardFooter>
                </Card>
              ))}
            </div>
          )}
        </div>
      </main>
      <SiteFooter />
    </div>
  )
}

