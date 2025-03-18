"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Brain, Eye, Calendar, ArrowRight } from "lucide-react"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Skeleton } from "@/components/ui/skeleton"

interface RecommendedPost {
  id: number
  title: string
  excerpt: string
  date: string
  views: number
  category: string
  relevanceScore: number
  tags: string[]
}

interface ContentRecommendationsProps {
  currentPostId?: number
  userInterests?: string[]
  limit?: number
  showRelevanceScore?: boolean
}

export function ContentRecommendations({
  currentPostId,
  userInterests = ["webdev", "design", "ai"],
  limit = 3,
  showRelevanceScore = true,
}: ContentRecommendationsProps) {
  const [recommendations, setRecommendations] = useState<RecommendedPost[]>([])
  const [isLoading, setIsLoading] = useState(true)

  // Mock function to fetch recommendations - would be replaced with actual API call
  const fetchRecommendations = async () => {
    // TODO: Replace with actual AI recommendation system
    // Implementation should:
    // 1. Use a vector database (like Pinecone, Weaviate, or Supabase Vector)
    // 2. Create embeddings for the current post and find similar content
    // 3. Consider user interests and reading history for personalization
    // 4. Return relevant posts with actual similarity scores

    // Simulate API call delay
    await new Promise((resolve) => setTimeout(resolve, 1200))

    // Mock recommendations data
    const mockRecommendations: RecommendedPost[] = [
      {
        id: 1,
        title: "The Future of Web Development",
        excerpt: "Exploring the latest trends and technologies shaping the future of web development.",
        date: "Mar 15, 2025",
        views: 1243,
        category: "Technology",
        relevanceScore: 0.92,
        tags: ["webdev", "future", "ai", "wasm"],
      },
      {
        id: 2,
        title: "Minimalism in UI Design",
        excerpt: "How embracing minimalism can create more effective and beautiful user interfaces.",
        date: "Mar 10, 2025",
        views: 982,
        category: "Design",
        relevanceScore: 0.87,
        tags: ["design", "minimalism", "ui", "ux"],
      },
      {
        id: 3,
        title: "The Art of Digital Photography",
        excerpt: "Tips and techniques for capturing stunning digital photographs in any environment.",
        date: "Mar 5, 2025",
        views: 756,
        category: "Photography",
        relevanceScore: 0.75,
        tags: ["photography", "digital", "composition"],
      },
      {
        id: 4,
        title: "Building Accessible Web Applications",
        excerpt: "Essential practices for creating inclusive web experiences for all users.",
        date: "Feb 28, 2025",
        views: 2341,
        category: "Development",
        relevanceScore: 0.89,
        tags: ["accessibility", "webdev", "inclusion"],
      },
      {
        id: 5,
        title: "The Psychology of Color in Design",
        excerpt: "How color choices influence user perception and behavior in digital interfaces.",
        date: "Feb 20, 2025",
        views: 1987,
        category: "Design",
        relevanceScore: 0.82,
        tags: ["design", "psychology", "color"],
      },
    ]

    // Filter out current post if provided
    let filtered = currentPostId ? mockRecommendations.filter((post) => post.id !== currentPostId) : mockRecommendations

    // Sort by relevance score
    filtered = filtered.sort((a, b) => b.relevanceScore - a.relevanceScore)

    // Limit results
    return filtered.slice(0, limit)
  }

  useEffect(() => {
    fetchRecommendations().then((result) => {
      setRecommendations(result)
      setIsLoading(false)
    })
  }, [currentPostId, limit])

  // Function to get color based on relevance score
  const getRelevanceColor = (score: number) => {
    if (score >= 0.9) return "text-green-500 bg-green-500/10 border-green-500/20"
    if (score >= 0.8) return "text-blue-500 bg-blue-500/10 border-blue-500/20"
    if (score >= 0.7) return "text-yellow-500 bg-yellow-500/10 border-yellow-500/20"
    return "text-muted-foreground bg-muted/10 border-muted/20"
  }

  return (
    <div className="space-y-4 text-foreground">
      <div className="flex items-center gap-2 mb-2">
        <Brain className="h-5 w-5 text-primary" />
        <h2 className="text-xl font-bold font-mono">AI_RECOMMENDATIONS</h2>
      </div>

      {isLoading ? (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: limit }).map((_, i) => (
            <Card key={i} className="border border-primary/20 bg-card/5">
              <CardContent className="p-4">
                <div className="space-y-3">
                  <Skeleton className="h-5 w-[80%]" />
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-[90%]" />
                  <div className="flex gap-2 mt-2">
                    <Skeleton className="h-6 w-16 rounded-full" />
                    <Skeleton className="h-6 w-16 rounded-full" />
                  </div>
                </div>
              </CardContent>
              <CardFooter className="border-t border-primary/10 bg-muted/10 px-4 py-3">
                <Skeleton className="h-4 w-[60%]" />
              </CardFooter>
            </Card>
          ))}
        </div>
      ) : (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {recommendations.map((post) => (
            <Card
              key={post.id}
              className="border border-primary/20 bg-card rounded-lg overflow-hidden transition-all hover:shadow-md hover:shadow-primary/5 group"
            >
              <CardContent className="p-4">
                <div className="flex items-center justify-between mb-2">
                  <Badge variant="outline" className="text-xs">
                    {post.category}
                  </Badge>
                  {showRelevanceScore && (
                    <Badge variant="outline" className={`text-xs ${getRelevanceColor(post.relevanceScore)}`}>
                      {Math.round(post.relevanceScore * 100)}% match
                    </Badge>
                  )}
                </div>

                <Link href={`/blog/${post.id}`}>
                  <h3 className="font-medium mb-2 group-hover:text-primary transition-colors line-clamp-2">
                    {post.title}
                  </h3>
                </Link>

                <p className="text-sm text-muted-foreground line-clamp-2 mb-3">{post.excerpt}</p>

                <div className="flex flex-wrap gap-1">
                  {post.tags.slice(0, 3).map((tag) => (
                    <Link href={`/tags/${tag}`} key={tag}>
                      <Badge variant="secondary" className="text-xs">
                        #{tag}
                      </Badge>
                    </Link>
                  ))}
                </div>
              </CardContent>

              <CardFooter className="border-t border-primary/10 bg-muted/10 px-4 py-2">
                <div className="flex items-center justify-between w-full text-xs text-muted-foreground">
                  <div className="flex items-center gap-4">
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
              </CardFooter>
            </Card>
          ))}
        </div>
      )}

      <div className="flex justify-center mt-4">
        <Button variant="outline" className="gap-1 border-primary/20 hover:bg-blue-100 hover:text-blue-700">
          View more recommendations
          <ArrowRight className="h-3.5 w-3.5" />
        </Button>
      </div>
    </div>
  )
}

