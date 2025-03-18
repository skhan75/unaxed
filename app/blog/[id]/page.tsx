"use client"

import Link from "next/link"
import { Eye, User, BookmarkIcon, Sparkles } from "lucide-react"
import { useState, useRef, useEffect } from "react"

import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { ArticleSummary } from "@/components/ai/article-summary"
import { ContentRecommendations } from "@/components/ai/content-recommendations"
import { CommentSection } from "@/components/comment-section"
import { useAuth } from "@/components/site-header"
import { PostActions } from "@/components/post-actions"
import { SubscribeForm } from "@/components/newsletter/subscribe-form"
import { ProfileAvatar } from "@/components/profile-avatar"
import { FollowButton } from "@/components/follow-button"
import { POSTS, getPostById } from "@/lib/data/mock-data"

export default function BlogPost({ params }: { params: { id: string } }) {
  // Get the post from our centralized mock data
  const post = getPostById(Number(params.id)) || POSTS[0]

  // Debug the avatar URL
  console.log("Author data:", post.author)
  console.log("Author avatar URL:", post.author.avatar)

  // Get related posts - use the first 3 posts that aren't the current post
  const relatedPostsData = POSTS.filter((p) => p.id !== post.id).slice(0, 3)

  const { currentUser } = useAuth()
  const [showAuthPrompt, setShowAuthPrompt] = useState(!currentUser)
  const [isBookmarked, setIsBookmarked] = useState(false)
  const commentSectionRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    setShowAuthPrompt(!currentUser)
  }, [currentUser])

  const scrollToComments = () => {
    if (commentSectionRef.current) {
      commentSectionRef.current.scrollIntoView({ behavior: "smooth" })
    }
  }

  const handleBookmarkToggle = () => {
    setIsBookmarked(!isBookmarked)
  }

  // Convert tags array to string array if it's not already
  const postTags = Array.isArray(post.tags) ? post.tags : []

  return (
    <div className="flex min-h-screen flex-col bg-background relative">
      {/* Full-width background texture */}
      <div className="absolute inset-0 grid grid-cols-[repeat(40,1fr)] grid-rows-[repeat(40,1fr)] gap-px opacity-[0.02] pointer-events-none z-0">
        {Array.from({ length: 1600 }).map((_, i) => (
          <div key={i} className="bg-primary/40"></div>
        ))}
      </div>

      {/* Scanline effect - full width */}
      <div className="absolute inset-0 bg-[linear-gradient(to_bottom,transparent_50%,rgba(0,0,0,0.02)_50%)] bg-[length:100%_4px] pointer-events-none z-0"></div>

      <SiteHeader />
      <main className="flex-1 container py-12 relative z-10">
        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main content area - takes up 2/3 of the width on large screens */}
          <div className="lg:col-span-2">
            <article className="prose prose-invert max-w-none">
              <div className="space-y-4 mb-8">
                {/* Wider cover image that spans the full content width */}
                {post.image && (
                  <div className="rounded-lg overflow-hidden mb-6 w-full aspect-[21/9]">
                    <img
                      src={post.image || "/placeholder.svg"}
                      alt={post.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                )}

                {/* Modified title with theme-appropriate colors instead of gradient */}
                <h1 className="text-3xl font-bold leading-tight tracking-tighter md:text-4xl lg:text-5xl text-zinc-900 dark:text-white">
                  {post.title}
                </h1>

                {/* Author info with vertical metadata and bordered follow button */}
                <div className="flex items-start gap-3 py-3 mb-2">
                  <Link href={`/profile/${post.author.username}`} className="flex-shrink-0">
                    <ProfileAvatar
                      src={post.author.avatar}
                      alt={post.author.name}
                      size="md"
                      className="border border-zinc-200 dark:border-zinc-700"
                    />
                  </Link>

                  <div className="flex flex-col">
                    <div className="flex items-center gap-2">
                      <Link
                        href={`/profile/${post.author.username}`}
                        className="font-medium text-zinc-800 dark:text-zinc-200 hover:text-primary transition-colors"
                      >
                        {post.author.name}
                      </Link>

                      <FollowButton
                        userId={post.author.id}
                        variant="compact"
                        className="border border-zinc-300 dark:border-zinc-700 rounded-full px-3 py-0.5 text-xs"
                      />
                    </div>

                    <div className="text-sm text-zinc-500 dark:text-zinc-400 mt-1">
                      <span>{post.readTime ? `${post.readTime} min read` : "5 min read"}</span>
                      <span className="mx-1">·</span>
                      <span>{post.date}</span>
                    </div>
                  </div>
                </div>

                <div className="flex flex-wrap items-center gap-x-6 gap-y-3 text-sm text-muted-foreground mt-2">
                  <div className="flex items-center gap-1">
                    <Eye className="h-4 w-4" />
                    <span>{post.views} views</span>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    className={`h-8 px-2 flex items-center gap-1 ${isBookmarked ? "text-primary" : ""}`}
                    onClick={handleBookmarkToggle}
                  >
                    <BookmarkIcon className={`h-4 w-4 ${isBookmarked ? "fill-current" : ""}`} />
                    <span>{isBookmarked ? "Saved" : "Save"}</span>
                  </Button>
                </div>
              </div>

              <div className="relative">
                <Separator className="my-8" />
                {/* Decorative element */}
                <div className="absolute left-0 top-0 h-8 w-1 bg-gradient-to-b from-pink-300 via-purple-300 to-indigo-300 rounded-full transform -translate-y-4"></div>
              </div>

              <div
                dangerouslySetInnerHTML={{ __html: post.content || "" }}
                className="space-y-6 text-foreground prose prose-headings:text-foreground prose-p:text-foreground prose-strong:text-foreground prose-em:text-foreground relative reading:text-foreground reading:leading-relaxed"
              />

              <div className="relative">
                <Separator className="my-8" />
                {/* Decorative element */}
                <div className="absolute right-0 bottom-0 h-8 w-1 bg-gradient-to-b from-indigo-300 via-purple-300 to-pink-300 rounded-full transform translate-y-4"></div>
              </div>

              {/* Author info and subscribe section */}
              <div className="mt-8 p-6 border border-zinc-300 rounded-lg bg-zinc-100/50 dark:border-primary/20 dark:bg-background/50 dark:backdrop-blur-sm reading:border-[hsl(var(--border))] reading:bg-[hsl(var(--card))]">
                <div className="flex flex-col md:flex-row gap-6 items-start">
                  <Link href={`/profile/${post.author.username}`} className="flex-shrink-0">
                    <ProfileAvatar
                      src={post.author.avatar}
                      alt={post.author.name}
                      size="lg"
                      className="border-2 border-zinc-300 dark:border-primary/30 reading:border-[hsl(var(--border))]"
                    />
                  </Link>
                  <div className="flex-1 space-y-4">
                    <div>
                      <Link
                        href={`/profile/${post.author.username}`}
                        className="text-lg font-bold text-zinc-800 dark:text-foreground hover:text-primary transition-colors"
                      >
                        {post.author.name}
                      </Link>
                      <p className="text-sm text-zinc-700 dark:text-foreground mt-1">{post.author.bio}</p>
                    </div>

                    <div className="flex flex-wrap gap-3">
                      <Button asChild size="sm" variant="outline" className="gap-2">
                        <Link href={`/profile/${post.author.username}`}>
                          <User className="h-4 w-4" />
                          View Profile
                        </Link>
                      </Button>
                      <SubscribeForm
                        authorId={post.author.id.toString()}
                        authorName={post.author.name}
                        compact={true}
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Post Actions */}
              <div className="flex flex-wrap justify-between items-center mt-8">
                <PostActions
                  postId={post.id.toString()}
                  initialLikes={post.likes}
                  initialComments={post.comments}
                  initialBookmarked={isBookmarked}
                  onCommentClick={scrollToComments}
                />
                <div className="text-sm text-muted-foreground font-mono">
                  <span className="text-primary/70">Last updated:</span> {post.date}
                </div>
              </div>

              {/* Comments Section */}
              <div ref={commentSectionRef}>
                <CommentSection postId={post.id} />
              </div>

              {/* Auth prompt for non-logged in users */}
              {showAuthPrompt && (
                <div className="mt-8 p-6 border border-zinc-300 rounded-lg bg-zinc-100/90 dark:border-primary/30 dark:bg-zinc-900/90 dark:backdrop-blur-sm reading:border-[hsl(var(--border))] reading:bg-[hsl(var(--card))] space-y-4">
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
          </div>

          {/* Right sidebar - takes up 1/3 of the width on large screens */}
          <div className="lg:col-span-1">
            <div className="sticky top-24">
              {/* Redesigned AI Summary Card with black/gray theme instead of purple */}
              <div className="rounded-xl overflow-hidden border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900 shadow-sm">
                <div className="p-4 bg-zinc-100 dark:bg-zinc-800 border-b border-zinc-200 dark:border-zinc-700 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Sparkles className="h-5 w-5 text-zinc-600 dark:text-zinc-300" />
                    <h3 className="font-medium text-zinc-800 dark:text-zinc-100">AI-Generated Summary</h3>
                  </div>
                  <Button variant="ghost" size="sm" className="h-8 w-8 p-0 rounded-full">
                    <Sparkles className="h-4 w-4 text-zinc-600 dark:text-zinc-300" />
                    <span className="sr-only">Regenerate</span>
                  </Button>
                </div>
                <div className="p-5 text-sm text-zinc-700 dark:text-zinc-300 leading-relaxed">
                  <ArticleSummary articleId={post.id} title={post.title} content={post.content || ""} />
                </div>
              </div>

              {/* AI-powered Content Recommendations */}
              <div className="mt-8">
                <ContentRecommendations currentPostId={post.id} />
              </div>
            </div>
          </div>
        </div>
      </main>
      <SiteFooter />
    </div>
  )
}

