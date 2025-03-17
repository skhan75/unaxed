"use client"

import Link from "next/link"
import { Eye, Heart, MessageSquare } from "lucide-react"

interface Post {
  id: number
  title: string
  views: number
  likes: number
  comments: number
  readTime?: string
  readCompletionRate?: number
  date: string
}

interface TopPostsTableProps {
  posts: Post[]
  showReadingMetrics?: boolean
}

export function TopPostsTable({ posts, showReadingMetrics = false }: TopPostsTableProps) {
  return (
    <div className="overflow-auto bg-card rounded-lg p-4">
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b border-muted/30">
            <th className="text-left font-medium p-2 pl-0">Title</th>
            <th className="text-left font-medium p-2">Date</th>
            <th className="text-left font-medium p-2">Views</th>
            <th className="text-left font-medium p-2">Likes</th>
            <th className="text-left font-medium p-2">Comments</th>
            {showReadingMetrics && (
              <>
                <th className="text-left font-medium p-2">Read Time</th>
                <th className="text-left font-medium p-2">Completion</th>
              </>
            )}
          </tr>
        </thead>
        <tbody>
          {posts.map((post) => (
            <tr key={post.id} className="border-b border-muted/20 hover:bg-muted/10">
              <td className="py-3 pl-0">
                <Link href={`/blog/${post.id}`} className="font-medium hover:text-primary transition-colors">
                  {post.title}
                </Link>
              </td>
              <td className="py-3 text-muted-foreground">{post.date}</td>
              <td className="py-3">
                <div className="flex items-center gap-1">
                  <Eye className="h-3.5 w-3.5 text-muted-foreground" />
                  <span>{post.views.toLocaleString()}</span>
                </div>
              </td>
              <td className="py-3">
                <div className="flex items-center gap-1">
                  <Heart className="h-3.5 w-3.5 text-muted-foreground" />
                  <span>{post.likes}</span>
                </div>
              </td>
              <td className="py-3">
                <div className="flex items-center gap-1">
                  <MessageSquare className="h-3.5 w-3.5 text-muted-foreground" />
                  <span>{post.comments}</span>
                </div>
              </td>
              {showReadingMetrics && post.readTime && post.readCompletionRate && (
                <>
                  <td className="py-3 text-muted-foreground">{post.readTime}</td>
                  <td className="py-3">
                    <div className="flex items-center gap-2">
                      <div className="w-16 h-2 bg-muted rounded-full overflow-hidden">
                        <div
                          className="h-full bg-primary rounded-full"
                          style={{ width: `${post.readCompletionRate}%` }}
                        ></div>
                      </div>
                      <span className="text-xs">{post.readCompletionRate}%</span>
                    </div>
                  </td>
                </>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

