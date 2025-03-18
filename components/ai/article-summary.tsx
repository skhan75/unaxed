"use client"

import { useState, useEffect } from "react"
import { Sparkles } from "lucide-react"

interface ArticleSummaryProps {
  articleId: number
  title: string
  content: string
}

export function ArticleSummary({ articleId, title, content }: ArticleSummaryProps) {
  const [summary, setSummary] = useState<string>("")
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Simulate loading time
    const timer = setTimeout(() => {
      // Generate a summary based on the content
      // In a real app, this would be an API call to an AI service
      const generatedSummary = generateSummary(title, content)
      setSummary(generatedSummary)
      setIsLoading(false)
    }, 1000)

    return () => clearTimeout(timer)
  }, [articleId, title, content])

  if (isLoading) {
    return (
      <div className="animate-pulse space-y-3">
        <div className="h-4 bg-zinc-200 dark:bg-zinc-700 rounded w-3/4"></div>
        <div className="h-4 bg-zinc-200 dark:bg-zinc-700 rounded w-full"></div>
        <div className="h-4 bg-zinc-200 dark:bg-zinc-700 rounded w-5/6"></div>
        <div className="h-4 bg-zinc-200 dark:bg-zinc-700 rounded w-2/3"></div>
      </div>
    )
  }

  return (
    <div className="space-y-3">
      <p className="leading-relaxed">{summary}</p>
      <div className="text-xs text-zinc-500 dark:text-zinc-400 flex items-center gap-1 mt-2">
        <Sparkles className="h-3 w-3" />
        <span>AI-generated summary based on article content</span>
      </div>
    </div>
  )
}

// Mock function to generate a summary
// In a real app, this would be replaced with an API call to an AI service
function generateSummary(title: string, content: string): string {
  // Simple mock implementation
  if (title.includes("Newsletter")) {
    return "Building a successful newsletter in 2025 requires focusing on personalization, valuable content, and consistent delivery. This article explores strategies for growing your subscriber base and maintaining high engagement rates in an increasingly competitive digital landscape."
  }

  if (title.includes("Web Development")) {
    return "The future of web development is being shaped by AI-driven tools, WebAssembly, and edge computing. These technologies are enabling more powerful, accessible, and performant applications while changing how developers approach their craft."
  }

  if (title.includes("UI Design") || content.includes("UI design")) {
    return "Minimalism in UI design focuses on simplicity and functionality by emphasizing white space, typography, and purposeful color usage. This approach creates more usable interfaces by removing unnecessary elements and focusing on what truly matters to users."
  }

  if (title.includes("Photography") || content.includes("photography")) {
    return "Digital photography combines technical skill with artistic vision. Understanding light, composition techniques, and thoughtful post-processing are key elements in creating compelling images that convey emotion and tell stories."
  }

  // Default summary if no specific matches
  return (
    "This article explores key concepts and practical insights on " +
    title.toLowerCase() +
    ". The author provides valuable perspectives backed by experience and research, making it a worthwhile read for anyone interested in this topic."
  )
}

