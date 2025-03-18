import Link from "next/link"
import { ArrowLeft, Users, Bell, Share2, BookOpen, Clock, TrendingUp, ThumbsUp, ArrowRight } from "lucide-react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { PublicationCard } from "@/components/publications/publication-card"

// Mock publication data
const getPublicationData = (id: string) => {
  // This would be replaced with a real data fetch in a production app
  return {
    id,
    name: "Technology Insights",
    description: "The latest in tech, programming, and digital innovation",
    longDescription:
      "Technology Insights is a premier publication covering the latest developments in technology, programming, artificial intelligence, and digital innovation. Our expert writers provide in-depth analysis, tutorials, and thought leadership on the most important trends shaping the future of tech.",
    image: "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?q=80&w=1965&auto=format&fit=crop",
    coverImage: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=2072&auto=format&fit=crop",
    postCount: 156,
    followerCount: 2450,
    tags: ["Technology", "Programming", "AI", "Web Development", "Data Science"],
    editors: [
      {
        id: "editor1",
        name: "Alex Johnson",
        image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=2070&auto=format&fit=crop",
        role: "Editor-in-Chief",
      },
      {
        id: "editor2",
        name: "Samantha Lee",
        image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=2187&auto=format&fit=crop",
        role: "Senior Editor",
      },
      {
        id: "editor3",
        name: "Michael Chen",
        image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=2187&auto=format&fit=crop",
        role: "Contributing Editor",
      },
    ],
    posts: [
      {
        id: "post1",
        title: "The Future of AI: How Machine Learning is Transforming Industries",
        description: "An in-depth look at how artificial intelligence is revolutionizing various sectors",
        image: "https://images.unsplash.com/photo-1677442135136-760c813028c0?q=80&w=2070&auto=format&fit=crop",
        readTime: "8m read",
        date: "Mar 15, 2025",
        author: {
          name: "Alex Johnson",
          image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=2070&auto=format&fit=crop",
        },
      },
      {
        id: "post2",
        title: "Web3 and the Decentralized Internet: What You Need to Know",
        description: "Understanding the next evolution of the internet and its implications",
        image: "https://images.unsplash.com/photo-1639762681057-408e52192e55?q=80&w=2232&auto=format&fit=crop",
        readTime: "6m read",
        date: "Mar 12, 2025",
        author: {
          name: "Samantha Lee",
          image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=2187&auto=format&fit=crop",
        },
      },
      {
        id: "post3",
        title: "The Rise of No-Code Development: Democratizing Software Creation",
        description: "How no-code platforms are changing who can build software",
        image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2070&auto=format&fit=crop",
        readTime: "5m read",
        date: "Mar 10, 2025",
        author: {
          name: "Michael Chen",
          image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=2187&auto=format&fit=crop",
        },
      },
    ],
    relatedPublications: [
      {
        id: "ai-frontier",
        name: "AI Frontier",
        description: "Exploring the Cutting Edge of Artificial Intelligence Research",
        image: "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?q=80&w=1965&auto=format&fit=crop",
        postCount: 78,
        followerCount: 1340,
        tags: ["AI", "Machine Learning", "Research"],
        readTime: "6m read",
      },
      {
        id: "dev-chronicles",
        name: "Developer Chronicles",
        description: "Stories and Insights from the World of Software Development",
        image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=2070&auto=format&fit=crop",
        postCount: 112,
        followerCount: 1650,
        tags: ["Programming", "Development", "Coding"],
        readTime: "4m read",
      },
    ],
  }
}

export default function PublicationPage({ params }: { params: { id: string } }) {
  const publication = getPublicationData(params.id)

  return (
    <div className="min-h-screen">
      {/* Hero Section with Cover Image */}
      <div className="relative h-[40vh] min-h-[300px] w-full">
        <img
          src={publication.coverImage || "/placeholder.svg"}
          alt={publication.name}
          className="h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/80 to-transparent" />

        <div className="absolute bottom-0 left-0 right-0 p-6 container mx-auto">
          <Link href="/publications" className="inline-flex items-center text-sm text-primary mb-4 hover:underline">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Publications
          </Link>

          <div className="flex flex-col md:flex-row md:items-end gap-6">
            <div className="relative h-24 w-24 md:h-32 md:w-32 rounded-lg overflow-hidden border-4 border-background shadow-lg">
              <img
                src={publication.image || "/placeholder.svg"}
                alt={publication.name}
                className="h-full w-full object-cover"
              />
            </div>

            <div className="flex-1">
              <h1 className="text-3xl md:text-4xl font-bold mb-2">{publication.name}</h1>
              <p className="text-lg text-muted-foreground mb-4 max-w-2xl">{publication.description}</p>

              <div className="flex flex-wrap gap-2 mb-4">
                {publication.tags.map((tag) => (
                  <Badge key={tag} variant="secondary">
                    {tag}
                  </Badge>
                ))}
              </div>

              <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
                <div className="flex items-center gap-1">
                  <BookOpen className="h-4 w-4" />
                  <span>{publication.postCount} posts</span>
                </div>
                <div className="flex items-center gap-1">
                  <Users className="h-4 w-4" />
                  <span>{publication.followerCount} followers</span>
                </div>
              </div>
            </div>

            <div className="flex gap-2 mt-4 md:mt-0">
              <Button className="gap-2">
                <Bell className="h-4 w-4" />
                Subscribe
              </Button>
              <Button variant="outline" size="icon" className="border-primary/20">
                <Share2 className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto py-8 px-4 sm:px-6">
        {/* About Section */}
        <div className="mb-12">
          <h2 className="text-2xl font-semibold mb-4">About</h2>
          <p className="text-muted-foreground mb-6">{publication.longDescription}</p>

          <div className="flex flex-col sm:flex-row gap-6">
            <div className="flex-1">
              <h3 className="text-lg font-medium mb-3">Editorial Team</h3>
              <div className="space-y-3">
                {publication.editors.map((editor) => (
                  <div key={editor.id} className="flex items-center gap-3">
                    <Avatar>
                      <AvatarImage src={editor.image} alt={editor.name} />
                      <AvatarFallback>{editor.name.substring(0, 2)}</AvatarFallback>
                    </Avatar>
                    <div>
                      <div className="font-medium">{editor.name}</div>
                      <div className="text-sm text-muted-foreground">{editor.role}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex-1">
              <h3 className="text-lg font-medium mb-3">Publication Details</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>Founded: January 2023</li>
                <li>Publication Frequency: Weekly</li>
                <li>Languages: English</li>
                <li>Contact: editors@techinsights.example.com</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Articles Section */}
        <div className="mb-12">
          <Tabs defaultValue="latest">
            <div className="flex items-center justify-between mb-6">
              <TabsList className="bg-background/80 backdrop-blur-sm border border-primary/10">
                <TabsTrigger value="latest" className="flex items-center gap-1.5">
                  <Clock className="h-4 w-4" />
                  <span>Latest</span>
                </TabsTrigger>
                <TabsTrigger value="trending" className="flex items-center gap-1.5">
                  <TrendingUp className="h-4 w-4" />
                  <span>Trending</span>
                </TabsTrigger>
                <TabsTrigger value="popular" className="flex items-center gap-1.5">
                  <ThumbsUp className="h-4 w-4" />
                  <span>Most Popular</span>
                </TabsTrigger>
              </TabsList>
            </div>

            <TabsContent value="latest" className="mt-0">
              <div className="space-y-6">
                {publication.posts.map((post) => (
                  <div key={post.id} className="flex flex-col md:flex-row gap-6 border-b border-primary/10 pb-6">
                    <div className="md:w-1/3 aspect-video rounded-lg overflow-hidden">
                      <img
                        src={post.image || "/placeholder.svg"}
                        alt={post.title}
                        className="h-full w-full object-cover"
                      />
                    </div>

                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <Avatar className="h-6 w-6">
                          <AvatarImage src={post.author.image} alt={post.author.name} />
                          <AvatarFallback>{post.author.name.substring(0, 2)}</AvatarFallback>
                        </Avatar>
                        <span className="text-sm">{post.author.name}</span>
                        <span className="text-sm text-muted-foreground">·</span>
                        <span className="text-sm text-muted-foreground">{post.date}</span>
                      </div>

                      <Link href={`/blog/${post.id}`} className="group">
                        <h3 className="text-xl font-semibold mb-2 group-hover:text-primary transition-colors">
                          {post.title}
                        </h3>
                      </Link>

                      <p className="text-muted-foreground mb-4">{post.description}</p>

                      <div className="flex items-center gap-4">
                        <div className="flex items-center gap-1 text-sm text-muted-foreground">
                          <Clock className="h-3.5 w-3.5" />
                          <span>{post.readTime}</span>
                        </div>

                        <Button variant="ghost" size="sm" className="gap-1 text-primary">
                          Read more
                          <ArrowRight className="h-3.5 w-3.5" />
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="trending" className="mt-0">
              <div className="space-y-6">
                {[...publication.posts]
                  .sort(() => Math.random() - 0.5)
                  .map((post) => (
                    <div key={post.id} className="flex flex-col md:flex-row gap-6 border-b border-primary/10 pb-6">
                      <div className="md:w-1/3 aspect-video rounded-lg overflow-hidden">
                        <img
                          src={post.image || "/placeholder.svg"}
                          alt={post.title}
                          className="h-full w-full object-cover"
                        />
                      </div>

                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <Avatar className="h-6 w-6">
                            <AvatarImage src={post.author.image} alt={post.author.name} />
                            <AvatarFallback>{post.author.name.substring(0, 2)}</AvatarFallback>
                          </Avatar>
                          <span className="text-sm">{post.author.name}</span>
                          <span className="text-sm text-muted-foreground">·</span>
                          <span className="text-sm text-muted-foreground">{post.date}</span>
                        </div>

                        <Link href={`/blog/${post.id}`} className="group">
                          <h3 className="text-xl font-semibold mb-2 group-hover:text-primary transition-colors">
                            {post.title}
                          </h3>
                        </Link>

                        <p className="text-muted-foreground mb-4">{post.description}</p>

                        <div className="flex items-center gap-4">
                          <div className="flex items-center gap-1 text-sm text-muted-foreground">
                            <Clock className="h-3.5 w-3.5" />
                            <span>{post.readTime}</span>
                          </div>

                          <Button variant="ghost" size="sm" className="gap-1 text-primary">
                            Read more
                            <ArrowRight className="h-3.5 w-3.5" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
              </div>
            </TabsContent>

            <TabsContent value="popular" className="mt-0">
              <div className="space-y-6">
                {[...publication.posts]
                  .sort(() => Math.random() - 0.5)
                  .map((post) => (
                    <div key={post.id} className="flex flex-col md:flex-row gap-6 border-b border-primary/10 pb-6">
                      <div className="md:w-1/3 aspect-video rounded-lg overflow-hidden">
                        <img
                          src={post.image || "/placeholder.svg"}
                          alt={post.title}
                          className="h-full w-full object-cover"
                        />
                      </div>

                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <Avatar className="h-6 w-6">
                            <AvatarImage src={post.author.image} alt={post.author.name} />
                            <AvatarFallback>{post.author.name.substring(0, 2)}</AvatarFallback>
                          </Avatar>
                          <span className="text-sm">{post.author.name}</span>
                          <span className="text-sm text-muted-foreground">·</span>
                          <span className="text-sm text-muted-foreground">{post.date}</span>
                        </div>

                        <Link href={`/blog/${post.id}`} className="group">
                          <h3 className="text-xl font-semibold mb-2 group-hover:text-primary transition-colors">
                            {post.title}
                          </h3>
                        </Link>

                        <p className="text-muted-foreground mb-4">{post.description}</p>

                        <div className="flex items-center gap-4">
                          <div className="flex items-center gap-1 text-sm text-muted-foreground">
                            <Clock className="h-3.5 w-3.5" />
                            <span>{post.readTime}</span>
                          </div>

                          <Button variant="ghost" size="sm" className="gap-1 text-primary">
                            Read more
                            <ArrowRight className="h-3.5 w-3.5" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
              </div>
            </TabsContent>
          </Tabs>
        </div>

        {/* Related Publications */}
        <div className="mb-12">
          <h2 className="text-2xl font-semibold mb-6">Related Publications</h2>
          <div className="grid gap-4 sm:grid-cols-2">
            {publication.relatedPublications.map((pub) => (
              <PublicationCard key={pub.id} {...pub} />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

