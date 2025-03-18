import Link from "next/link"
import { TrendingUp } from "lucide-react"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

interface TrendingPost {
  id: string
  title: string
  excerpt: string
  author: {
    name: string
    id: string
  }
  publication?: {
    name: string
    id: string
  }
  likes: number
  comments: number
}

interface TrendingPostsProps {
  posts: TrendingPost[]
}

export function TrendingPosts({ posts }: TrendingPostsProps) {
  return (
    <Card>
      <CardHeader className="pb-3">
        <div className="flex items-center gap-2">
          <TrendingUp className="h-5 w-5 text-primary" />
          <CardTitle>Trending on the Platform</CardTitle>
        </div>
        <CardDescription>Popular posts from the community</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {posts.map((post, index) => (
            <Link key={post.id} href={`/blog/${post.id}`} className="group">
              <div className="flex items-start gap-3">
                <div className="text-2xl font-bold text-muted-foreground/30">0{index + 1}</div>
                <div className="space-y-1">
                  <div className="line-clamp-2 font-medium group-hover:text-primary group-hover:underline">
                    {post.title}
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <Link href={`/profile/${post.author.id}`} className="text-muted-foreground hover:text-foreground">
                      {post.author.name}
                    </Link>
                    {post.publication && (
                      <>
                        <span className="text-muted-foreground">in</span>
                        <Link
                          href={`/publications/${post.publication.id}`}
                          className="text-muted-foreground hover:text-foreground"
                        >
                          {post.publication.name}
                        </Link>
                      </>
                    )}
                  </div>
                  <div className="flex items-center gap-2 text-xs text-muted-foreground">
                    <span>{post.likes} likes</span>
                    <span>•</span>
                    <span>{post.comments} comments</span>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}

