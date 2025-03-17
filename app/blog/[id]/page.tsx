"use client"

import Link from "next/link"
import { ArrowLeft, Calendar, Clock, Eye, User } from "lucide-react"
import { useState, useRef, useEffect } from "react"

import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { Badge } from "@/components/ui/badge"
import { ArticleSummary } from "@/components/ai/article-summary"
import { ContentRecommendations } from "@/components/ai/content-recommendations"
import { PostReactions } from "@/components/post-reactions"
import { CommentSection } from "@/components/comment-section"
import { useAuth } from "@/components/site-header"
import { Card } from "@/components/ui/card"

// Update the posts data structure to include images
// Find the posts array and add image properties

// Update the posts array to use real images
const posts = [
  {
    id: 1,
    title: "The Future of Web Development",
    content: `
  <p>The landscape of web development is constantly evolving, with new technologies and methodologies emerging at a rapid pace. As we look to the future, several key trends are shaping how we build and interact with the web.</p>
  
  <h2>AI-Driven Development</h2>
  <p>Artificial intelligence is revolutionizing how we approach web development. From code generation to automated testing, AI tools are enhancing developer productivity and enabling more sophisticated applications.</p>
  
  <h2>WebAssembly</h2>
  <p>WebAssembly (Wasm) continues to gain traction, allowing high-performance applications to run in the browser. This technology bridges the gap between web and native applications, opening new possibilities for web-based software.</p>
  
  <h2>Edge Computing</h2>
  <p>The shift toward edge computing is changing how we architect web applications. By moving computation closer to the user, we can achieve lower latency and better performance, especially for global applications.</p>
  
  <h2>Conclusion</h2>
  <p>The future of web development is bright, with technologies that enable more powerful, accessible, and performant applications. By staying informed about these trends, developers can position themselves at the forefront of innovation.</p>
`,
    date: "Mar 15, 2025",
    readTime: "5 min read",
    author: "Alex Johnson",
    category: "Technology",
    views: 1243,
    likes: 87,
    standingOvations: 12,
    comments: 23,
    tags: ["webdev", "future", "ai", "wasm", "edge"],
    readingLevel: "Intermediate",
    lastUpdated: "Mar 16, 2025",
    relatedPosts: [2, 6, 7],
    image: "https://images.unsplash.com/photo-1571171637578-41bc2dd41cd2?q=80&w=1200&auto=format&fit=crop",
  },
  {
    id: 2,
    title: "Minimalism in UI Design",
    content: `
  <p>Minimalism has become a dominant force in UI design, emphasizing simplicity, clarity, and functionality. This approach strips away unnecessary elements to focus on what truly matters to users.</p>
  
  <h2>The Power of White Space</h2>
  <p>White space, or negative space, is a fundamental element of minimalist design. It gives content room to breathe, improves readability, and creates a sense of elegance and sophistication.</p>
  
  <h2>Typography as a Design Element</h2>
  <p>In minimalist interfaces, typography often takes center stage. Careful selection of fonts, sizes, and spacing can communicate hierarchy and guide users through an interface without relying on decorative elements.</p>
  
  <h2>Color with Purpose</h2>
  <p>Minimalist color palettes are typically restrained, using color strategically to highlight important elements or convey meaning. This focused approach to color enhances usability and aesthetic appeal.</p>
  
  <h2>Conclusion</h2>
  <p>Embracing minimalism in UI design leads to interfaces that are not only visually appealing but also more functional and user-friendly. By focusing on what's essential, designers can create experiences that truly resonate with users.</p>
`,
    date: "Mar 10, 2025",
    readTime: "4 min read",
    author: "Sam Chen",
    category: "Design",
    views: 982,
    likes: 64,
    standingOvations: 8,
    comments: 18,
    tags: ["design", "minimalism", "ui", "ux", "typography"],
    readingLevel: "Beginner",
    lastUpdated: "Mar 12, 2025",
    relatedPosts: [5, 9, 11],
    image: "https://images.unsplash.com/photo-1545235617-9465d2a55698?q=80&w=1200&auto=format&fit=crop",
  },
  {
    id: 3,
    title: "The Art of Digital Photography",
    content: `
  <p>Digital photography has democratized image creation, allowing anyone with a camera or smartphone to capture moments. However, mastering this art form requires understanding both technical aspects and creative principles.</p>
  
  <h2>Understanding Light</h2>
  <p>Light is the essence of photography. Learning to observe and work with different lighting conditions—natural, artificial, harsh, or diffused—is fundamental to creating compelling images.</p>
  
  <h2>Composition Techniques</h2>
  <p>Composition is how elements are arranged within a frame. Techniques like the rule of thirds, leading lines, and framing can transform an ordinary scene into a powerful photograph.</p>
  
  <h2>Post-  and framing can transform an ordinary scene into a powerful photograph.</p>
  
  <h2>Post-Processing</h2>
  <p>Digital editing is an integral part of modern photography. Thoughtful post-processing can enhance images, correct issues, and express your creative vision without appearing artificial or overdone.</p>
  
  <h2>Conclusion</h2>
  <p>Digital photography is both a technical skill and an art form. By developing your understanding of light, composition, and post-processing, you can create images that not only document moments but also convey emotion and tell stories.</p>
`,
    date: "Mar 5, 2025",
    readTime: "6 min read",
    author: "Jamie Smith",
    category: "Photography",
    views: 756,
    likes: 52,
    standingOvations: 5,
    comments: 14,
    tags: ["photography", "digital", "composition", "lighting", "editing"],
    readingLevel: "Intermediate",
    lastUpdated: "Mar 8, 2025",
    relatedPosts: [4, 8, 10],
    image: "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?q=80&w=1200&auto=format&fit=crop",
  },
]

// Add more posts to match the IDs from the homepage
for (let i = 4; i <= 11; i++) {
  posts.push({
    id: i,
    title: `Sample Blog Post ${i}`,
    content: `<p>This is sample content for blog post ${i}.</p>`,
    date: "Mar 1, 2025",
    readTime: "3 min read",
    author: "Alex Johnson",
    category: "Technology",
    views: 500,
    likes: 30,
    standingOvations: 2,
    comments: 5,
    tags: ["sample", "test", "webdev"],
    readingLevel: "Beginner",
    lastUpdated: "Mar 2, 2025",
    relatedPosts: [1, 2, 3],
    image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?q=80&w=1200&auto=format&fit=crop",
  })
}

// Keep the authentication check for the "Join the conversation" section
export default function BlogPost({ params }: { params: { id: string } }) {
  const post = posts.find((post) => post.id === Number.parseInt(params.id)) || posts[0]
  const relatedPostsData = post.relatedPosts.map((id) => posts.find((p) => p.id === id)).filter(Boolean)
  const { currentUser } = useAuth()
  const [showAuthPrompt, setShowAuthPrompt] = useState(!currentUser)
  const commentSectionRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    setShowAuthPrompt(!currentUser)
  }, [currentUser])

  const scrollToComments = () => {
    if (commentSectionRef.current) {
      commentSectionRef.current.scrollIntoView({ behavior: "smooth" })
    }
  }

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <SiteHeader />
      <main className="flex-1 container max-w-5xl py-12 relative">
        {/* Grid background for retro-futuristic feel */}
        <div className="absolute inset-0 grid grid-cols-[repeat(40,1fr)] grid-rows-[repeat(40,1fr)] gap-px opacity-[0.02] pointer-events-none z-0">
          {Array.from({ length: 1600 }).map((_, i) => (
            <div key={i} className="bg-primary/40"></div>
          ))}
        </div>

        {/* Scanline effect */}
        <div className="absolute inset-0 bg-[linear-gradient(to_bottom,transparent_50%,rgba(0,0,0,0.02)_50%)] bg-[length:100%_4px] pointer-events-none z-0"></div>

        <div className="relative z-10">
          <Button variant="ghost" size="sm" asChild className="mb-6 group">
            <Link href="/">
              <ArrowLeft className="mr-2 h-4 w-4 group-hover:-translate-x-1 transition-transform" />
              Back to Home
            </Link>
          </Button>

          {/* Now add the hero image to the blog post page
// Find the article section and add the image before the title */}

          <article className="prose prose-invert max-w-none">
            <div className="space-y-4 mb-8">
              <div className="flex flex-wrap gap-2">
                <Badge className="border border-primary/20 bg-background/80 backdrop-blur-sm">{post.category}</Badge>
                <Badge variant="outline" className="text-xs border-primary/20 bg-background/80 backdrop-blur-sm">
                  {post.readingLevel}
                </Badge>
              </div>

              {post.image && (
                <div className="rounded-lg overflow-hidden mb-6 mt-4">
                  <img src={post.image || "/placeholder.svg"} alt={post.title} className="w-full h-auto object-cover" />
                </div>
              )}

              <div className="inline-block">
                <h1 className="text-3xl font-bold leading-tight tracking-tighter md:text-4xl lg:text-5xl bg-gradient-to-r from-pink-300 via-purple-300 to-indigo-300 bg-clip-text text-transparent relative">
                  {post.title}
                  <span className="absolute -inset-1 rounded-lg bg-gradient-to-r from-pink-300/10 via-purple-300/10 to-indigo-300/10 blur-lg -z-10"></span>
                </h1>
              </div>

              <div className="flex flex-wrap items-center gap-x-6 gap-y-3 text-sm text-muted-foreground">
                <div className="flex items-center gap-1">
                  <User className="h-4 w-4" />
                  <span>{post.author}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Calendar className="h-4 w-4" />
                  <span>Published: {post.date}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Clock className="h-4 w-4" />
                  <span>{post.readTime}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Eye className="h-4 w-4" />
                  <span>{post.views} views</span>
                </div>
              </div>

              <div className="flex flex-wrap gap-2 mt-4">
                {post.tags.map((tag, index) => (
                  <Link href={`/tags/${tag}`} key={index}>
                    <Badge
                      variant="secondary"
                      className="text-xs hover:bg-primary/10 transition-colors border border-primary/20 bg-background/80 backdrop-blur-sm"
                    >
                      #{tag}
                    </Badge>
                  </Link>
                ))}
              </div>
            </div>

            {/* AI-Generated Summary */}
            <Card className="p-4 mb-6 border border-primary/20 bg-zinc-900/90">
              <ArticleSummary articleId={post.id} title={post.title} content={post.content} />
            </Card>

            <div className="relative">
              <Separator className="my-8" />

              {/* Decorative element */}
              <div className="absolute left-0 top-0 h-8 w-1 bg-gradient-to-b from-pink-300 via-purple-300 to-indigo-300 rounded-full transform -translate-y-4"></div>
            </div>

            <div
              dangerouslySetInnerHTML={{ __html: post.content }}
              className="space-y-6 text-muted-foreground relative reading:text-foreground reading:leading-relaxed"
            />

            <div className="relative">
              <Separator className="my-8" />

              {/* Decorative element */}
              <div className="absolute right-0 bottom-0 h-8 w-1 bg-gradient-to-b from-indigo-300 via-purple-300 to-pink-300 rounded-full transform translate-y-4"></div>
            </div>

            {/* Post Reactions */}
            <div className="flex flex-wrap justify-between items-center">
              <PostReactions
                postId={post.id}
                initialLikes={post.likes}
                initialStandingOvations={post.standingOvations}
                initialComments={post.comments}
                size="md"
                showLabels={true}
                showShare={true}
                onCommentClick={scrollToComments}
              />
              <div className="text-sm text-muted-foreground font-mono">
                <span className="text-primary/70">Last updated:</span> {post.lastUpdated}
              </div>
            </div>

            {/* Comments Section */}
            <div ref={commentSectionRef}>
              <CommentSection postId={post.id} />
            </div>

            {/* Auth prompt for non-logged in users */}
            {showAuthPrompt && (
              <div className="mt-8 p-6 border border-primary/30 rounded-lg bg-zinc-900/90 backdrop-blur-sm space-y-4">
                <h3 className="text-xl font-bold">Join the conversation</h3>
                <p className="text-muted-foreground">
                  Sign in to like, comment, and interact with this post and other content on Unaxed.
                </p>
                <div className="flex gap-4">
                  <Button asChild>
                    <Link href="/auth/login">Sign In</Link>
                  </Button>
                  <Button variant="outline" asChild>
                    <Link href="/auth/signup">Create Account</Link>
                  </Button>
                </div>
              </div>
            )}
          </article>

          {/* AI-powered Content Recommendations */}
          <div className="mt-16">
            <ContentRecommendations currentPostId={post.id} />
          </div>
        </div>
      </main>
      <SiteFooter />
    </div>
  )
}

