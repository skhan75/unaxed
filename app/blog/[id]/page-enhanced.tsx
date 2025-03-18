import type { Metadata } from "next"
import Link from "next/link"
import { CalendarIcon, Clock, Tag } from "lucide-react"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { ArticleSummary } from "@/components/ai/article-summary"
import { ContentRecommendations } from "@/components/ai/content-recommendations"
import { CommentSection } from "@/components/comment-section"
import { PostActions } from "@/components/post-actions"
import { SubscribeForm } from "@/components/newsletter/subscribe-form"
import { Paywall } from "@/components/paywall"

interface BlogPostPageProps {
  params: {
    id: string
  }
}

export function generateMetadata({ params }: BlogPostPageProps): Metadata {
  // In a real app, fetch the post data based on the ID
  const post = {
    title: "Understanding Modern JavaScript: From ES6 to Today",
    excerpt: "A comprehensive guide to the evolution of JavaScript and its modern features.",
  }

  return {
    title: post.title,
    description: post.excerpt,
  }
}

export default function BlogPostPage({ params }: BlogPostPageProps) {
  // In a real app, fetch the post data based on the ID
  const post = {
    id: params.id,
    title: "Understanding Modern JavaScript: From ES6 to Today",
    content: `
      <h2>Introduction</h2>
      <p>JavaScript has evolved significantly since its creation in 1995. With the release of ECMAScript 2015 (ES6), the language underwent a major transformation, introducing features that have become essential for modern web development.</p>
      
      <h2>Key ES6 Features</h2>
      <p>ES6 introduced several features that transformed how we write JavaScript:</p>
      <ul>
        <li>Arrow Functions</li>
        <li>Classes</li>
        <li>Template Literals</li>
        <li>Destructuring</li>
        <li>Promises</li>
        <li>Modules</li>
      </ul>
      
      <h2>Beyond ES6</h2>
      <p>Subsequent releases have continued to enhance JavaScript with features like async/await, optional chaining, and nullish coalescing.</p>
      
      <h2>The Modern JavaScript Ecosystem</h2>
      <p>Today's JavaScript ecosystem is rich with tools and frameworks that leverage these modern features, making web development more efficient and powerful than ever before.</p>
    `,
    publishedAt: "2023-03-15T12:00:00Z",
    readingTime: "8 min read",
    author: {
      id: "author-1",
      name: "Alex Johnson",
      avatar: "/placeholder.svg?height=40&width=40",
      bio: "Senior JavaScript Developer and Technical Writer",
    },
    publication: {
      id: "technology",
      name: "Technology Insights",
    },
    tags: ["JavaScript", "Web Development", "Programming"],
    isSubscriberOnly: true,
    isUserSubscribed: false,
  }

  const formattedDate = new Date(post.publishedAt).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  })

  return (
    <div className="container mx-auto py-8">
      <div className="mx-auto max-w-4xl">
        <div className="mb-8">
          {post.publication && (
            <Link href={`/publications/${post.publication.id}`}>
              <Badge variant="outline" className="mb-4">
                {post.publication.name}
              </Badge>
            </Link>
          )}

          <h1 className="mb-4 text-4xl font-bold tracking-tight">{post.title}</h1>

          <div className="mb-6 flex flex-wrap items-center gap-x-6 gap-y-3">
            <div className="flex items-center gap-2">
              <Avatar className="h-10 w-10">
                <AvatarImage src={post.author.avatar} alt={post.author.name} />
                <AvatarFallback>{post.author.name.charAt(0)}</AvatarFallback>
              </Avatar>
              <div>
                <Link href={`/profile/${post.author.id}`} className="font-medium hover:underline">
                  {post.author.name}
                </Link>
                <div className="text-sm text-muted-foreground">{post.author.bio}</div>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-muted-foreground">
              <div className="flex items-center gap-1">
                <CalendarIcon className="h-4 w-4" />
                <span>{formattedDate}</span>
              </div>
              <div className="flex items-center gap-1">
                <Clock className="h-4 w-4" />
                <span>{post.readingTime}</span>
              </div>
            </div>
          </div>

          <div className="flex flex-wrap gap-2">
            {post.tags.map((tag) => (
              <Link key={tag} href={`/tags/${tag.toLowerCase()}`}>
                <Badge variant="secondary" className="gap-1">
                  <Tag className="h-3 w-3" />
                  {tag}
                </Badge>
              </Link>
            ))}
          </div>
        </div>

        {/* Post content */}
        <div className="prose prose-lg dark:prose-invert mx-auto max-w-none">
          {post.isSubscriberOnly && !post.isUserSubscribed ? (
            <>
              <div dangerouslySetInnerHTML={{ __html: post.content.split("<h2>")[0] }} />
              <Paywall
                authorName={post.author.name}
                postTitle={post.title}
                onSubscribe={() => console.log("Subscribe clicked")}
                onLogin={() => console.log("Login clicked")}
              />
            </>
          ) : (
            <div dangerouslySetInnerHTML={{ __html: post.content }} />
          )}
        </div>

        {/* Post actions */}
        <div className="my-8">
          <PostActions postId={post.id} initialLikes={42} initialComments={12} initialBookmarked={false} />
        </div>

        <Separator className="my-8" />

        {/* Author and subscribe section */}
        <div className="my-8 grid gap-8 md:grid-cols-3">
          <div className="md:col-span-2">
            <h3 className="mb-4 text-xl font-semibold">About the author</h3>
            <div className="flex items-start gap-4">
              <Avatar className="h-16 w-16">
                <AvatarImage src={post.author.avatar} alt={post.author.name} />
                <AvatarFallback>{post.author.name.charAt(0)}</AvatarFallback>
              </Avatar>
              <div>
                <Link href={`/profile/${post.author.id}`} className="font-medium hover:underline">
                  {post.author.name}
                </Link>
                <p className="mt-1 text-muted-foreground">{post.author.bio}</p>
                <div className="mt-4 flex gap-2">
                  <Button variant="outline" size="sm" asChild>
                    <Link href={`/profile/${post.author.id}`}>View Profile</Link>
                  </Button>
                  <Button size="sm">Follow</Button>
                </div>
              </div>
            </div>
          </div>

          <div>
            <SubscribeForm authorId={post.author.id} authorName={post.author.name} />
          </div>
        </div>

        <Separator className="my-8" />

        {/* Comments section */}
        <CommentSection postId={Number.parseInt(post.id)} />

        <div className="mt-12 grid gap-8 md:grid-cols-2">
          <ArticleSummary content={post.content} />
          <ContentRecommendations tags={post.tags} />
        </div>
      </div>
    </div>
  )
}

