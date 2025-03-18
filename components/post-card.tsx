"use client"

import type React from "react"

import Link from "next/link"
import { Eye, Heart, MessageSquare, Share2, BookmarkIcon } from "lucide-react"
import { useState } from "react"

import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { UserAvatar } from "@/components/user-avatar"
import { useToast } from "@/hooks/use-toast"

interface PostCardProps {
  post: {
    id: number
    title: string
    excerpt?: string
    date: string
    readTime: string
    author: {
      name: string
      username: string
      avatar: string
    }
    category?: string
    views: number
    likes: number
    comments: number
    bookmarked?: boolean
    tags?: string[]
    image?: string
    isSubscriberOnly?: boolean
  }
  variant?: "default" | "compact"
}

export function PostCard({ post, variant = "default" }: PostCardProps) {
  const [isBookmarked, setIsBookmarked] = useState(post.bookmarked || false)
  const { toast } = useToast()

  const handleBookmark = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()

    setIsBookmarked(!isBookmarked)
    toast({
      title: isBookmarked ? "Removed from bookmarks" : "Added to bookmarks",
      description: isBookmarked
        ? "The post has been removed from your bookmarks."
        : "The post has been added to your bookmarks.",
    })
  }

  const handleShare = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()

    // In a real implementation, this would use the Web Share API if available
    // or copy the link to the clipboard
    navigator.clipboard.writeText(`https://yourblog.com/blog/${post.id}`)
    toast({
      title: "Link copied",
      description: "The post link has been copied to your clipboard.",
    })
  }

  if (variant === "compact") {
    return (
      <Card className="overflow-hidden border-primary/10 hover:border-primary/30 transition-colors">
        <Link href={`/blog/${post.id}`} className="block h-full">
          <div className="flex h-full">
            {post.image && (
              <div className="w-24 h-24 flex-shrink-0">
                <img src={post.image || "/placeholder.svg"} alt={post.title} className="w-full h-full object-cover" />
              </div>
            )}
            <div className="flex flex-col justify-between flex-1 p-4">
              <div>
                <h3 className="font-medium line-clamp-2">{post.title}</h3>
                <div className="flex items-center gap-2 mt-1 text-xs text-muted-foreground">
                  <span>{post.author.name}</span>
                  <span>•</span>
                  <span>{post.readTime}</span>
                </div>
              </div>
              <div className="flex items-center justify-between mt-2">
                <div className="flex items-center gap-3 text-xs text-muted-foreground">
                  <div className="flex items-center gap-1">
                    <Heart className="h-3 w-3" />
                    <span>{post.likes}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <MessageSquare className="h-3 w-3" />
                    <span>{post.comments}</span>
                  </div>
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  className={`h-7 w-7 ${isBookmarked ? "text-primary" : ""}`}
                  onClick={handleBookmark}
                >
                  <BookmarkIcon className={`h-3.5 w-3.5 ${isBookmarked ? "fill-current" : ""}`} />
                  <span className="sr-only">Bookmark</span>
                </Button>
              </div>
            </div>
          </div>
        </Link>
      </Card>
    )
  }

  return (
    <Card className="overflow-hidden border-primary/10 hover:border-primary/30 transition-all hover:shadow-md hover:shadow-primary/5 group">
      <Link href={`/blog/${post.id}`} className="block">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <div className="flex items-center gap-2">
            <UserAvatar
              user={{
                name: post.author.name,
                avatar: post.author.avatar,
              }}
              className="h-6 w-6"
            />
            <div className="text-sm font-medium">{post.author.name}</div>
          </div>
          <div className="flex items-center gap-2">
            {post.isSubscriberOnly && (
              <Badge
                variant="secondary"
                className="dark:bg-white dark:text-black dark:border-zinc-200 dark:hover:bg-zinc-100 bg-zinc-100 text-zinc-900 border border-zinc-200 hover:bg-zinc-200 text-xs"
              >
                Subscriber Only
              </Badge>
            )}
            <div className="text-sm text-muted-foreground">{post.date}</div>
          </div>
        </CardHeader>

        {post.image && (
          <div className="px-6">
            <div className="rounded-md overflow-hidden mb-3">
              <img
                src={post.image || "/placeholder.svg"}
                alt={post.title}
                className="w-full h-48 object-cover transition-transform group-hover:scale-105 duration-300"
              />
            </div>
          </div>
        )}

        <CardContent className="pb-3">
          <h3 className="text-xl font-bold leading-tight tracking-tight group-hover:text-primary/90 transition-colors">
            {post.title}
          </h3>
          {post.excerpt && <p className="mt-2 text-muted-foreground">{post.excerpt}</p>}
          {post.tags && post.tags.length > 0 && (
            <div className="flex flex-wrap gap-1 mt-3">
              {post.tags.map((tag) => (
                <Link href={`/tags/${tag}`} key={tag} onClick={(e) => e.stopPropagation()}>
                  <Badge className="dark:bg-white dark:text-black dark:border-zinc-200 dark:hover:bg-zinc-100 bg-zinc-100 text-zinc-900 border border-zinc-200 hover:bg-zinc-200 text-xs">
                    #{tag}
                  </Badge>
                </Link>
              ))}
            </div>
          )}
        </CardContent>
      </Link>
      <CardFooter className="border-t bg-muted/20 px-6 py-3">
        <div className="flex items-center justify-between w-full text-xs text-muted-foreground">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-1">
              <Eye className="h-3.5 w-3.5" />
              <span>{post.views}</span>
            </div>
            <div className="flex items-center gap-1">
              <Heart className="h-3.5 w-3.5" />
              <span>{post.likes}</span>
            </div>
            <div className="flex items-center gap-1">
              <MessageSquare className="h-3.5 w-3.5" />
              <span>{post.comments}</span>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="icon"
              className={`h-8 w-8 ${isBookmarked ? "text-primary" : ""}`}
              onClick={handleBookmark}
            >
              <BookmarkIcon className={`h-3.5 w-3.5 ${isBookmarked ? "fill-current" : ""}`} />
              <span className="sr-only">Bookmark</span>
            </Button>
            <Button variant="ghost" size="icon" className="h-8 w-8" onClick={handleShare}>
              <Share2 className="h-3.5 w-3.5" />
              <span className="sr-only">Share</span>
            </Button>
          </div>
        </div>
      </CardFooter>
    </Card>
  )
}

