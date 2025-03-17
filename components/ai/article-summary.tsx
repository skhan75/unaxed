"use client"

import { useState, useEffect } from "react"
import { Sparkles, RefreshCw, ThumbsUp, ThumbsDown } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"

interface ArticleSummaryProps {
  articleId: number
  title: string
  content: string
}

export function ArticleSummary({ articleId, title, content }: ArticleSummaryProps) {
  const [summary, setSummary] = useState<string>("")
  const [isLoading, setIsLoading] = useState(true)
  const [isRegenerating, setIsRegenerating] = useState(false)
  const [feedbackGiven, setFeedbackGiven] = useState<"positive" | "negative" | null>(null)

  // Mock function to generate summary - would be replaced with actual API call
  const generateSummary = async () => {
    // TODO: Replace with actual AI API call to generate article summaries
    // Implementation should:
    // 1. Call a backend endpoint that uses an LLM (e.g., OpenAI GPT-4)
    // 2. Pass the article content and request a concise summary
    // 3. Return the generated summary text

    // Simulate API call delay
    await new Promise((resolve) => setTimeout(resolve, 1500))

    // Mock summaries based on article ID
    const mockSummaries: Record<number, string> = {
      1: "Web development is evolving with AI-driven tools, WebAssembly, and edge computing enabling more powerful applications. These technologies are changing how developers build and deploy web applications, offering better performance and user experiences.",
      2: "Minimalism in UI design focuses on simplicity and functionality by emphasizing white space, typography, and purposeful color usage. This approach creates more usable interfaces by removing unnecessary elements and focusing on what truly matters to users.",
      3: "Digital photography combines technical skills with artistic principles. Understanding light, composition techniques, and thoughtful post-processing are essential to creating compelling images that convey emotion and tell stories.",
      // Default summary for other IDs
      0: "This article explores key concepts and provides insights into important developments in the field. The author presents practical applications and future trends that readers should be aware of.",
    }

    return mockSummaries[articleId] || mockSummaries[0]
  }

  useEffect(() => {
    generateSummary().then((result) => {
      setSummary(result)
      setIsLoading(false)
    })
  }, [articleId])

  const handleRegenerate = async () => {
    setIsRegenerating(true)
    setFeedbackGiven(null)

    // Simulate regeneration
    const newSummary = await generateSummary()
    setSummary(newSummary)
    setIsRegenerating(false)
  }

  const handleFeedback = (type: "positive" | "negative") => {
    setFeedbackGiven(type)
    // In a real implementation, this would send feedback to the backend
    console.log(`User gave ${type} feedback for summary of article ${articleId}`)
  }

  return (
    <Card className="p-4 mb-6 border border-primary/20 bg-secondary/10">
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-2">
          <Sparkles className="h-4 w-4 text-primary" />
          <h3 className="text-sm font-medium">AI-Generated Summary</h3>
        </div>
        <div className="flex items-center gap-2">
          {!isLoading && !isRegenerating && (
            <div className="flex items-center gap-1">
              <Button
                variant="ghost"
                size="icon"
                className={`h-7 w-7 rounded-full ${feedbackGiven === "positive" ? "bg-green-500/20 text-green-500" : ""}`}
                onClick={() => handleFeedback("positive")}
                disabled={feedbackGiven !== null}
              >
                <ThumbsUp className="h-3.5 w-3.5" />
                <span className="sr-only">Good summary</span>
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className={`h-7 w-7 rounded-full ${feedbackGiven === "negative" ? "bg-red-500/20 text-red-500" : ""}`}
                onClick={() => handleFeedback("negative")}
                disabled={feedbackGiven !== null}
              >
                <ThumbsDown className="h-3.5 w-3.5" />
                <span className="sr-only">Bad summary</span>
              </Button>
            </div>
          )}
          <Button
            variant="outline"
            size="sm"
            className="h-7 px-2 text-xs gap-1 border-primary/20 hover:bg-blue-100 hover:text-blue-700"
            onClick={handleRegenerate}
            disabled={isLoading || isRegenerating}
          >
            <RefreshCw className={`h-3 w-3 ${isRegenerating ? "animate-spin" : ""}`} />
            {isRegenerating ? "Regenerating..." : "Regenerate"}
          </Button>
        </div>
      </div>

      <div className="text-sm text-muted-foreground">
        {isLoading || isRegenerating ? (
          <div className="space-y-2">
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-[90%]" />
            <Skeleton className="h-4 w-[95%]" />
          </div>
        ) : (
          <p>{summary}</p>
        )}
      </div>

      {feedbackGiven && (
        <div className="mt-2 text-xs text-muted-foreground">
          {feedbackGiven === "positive"
            ? "Thanks for your feedback! We'll use it to improve our summaries."
            : "Thanks for your feedback. We'll work on improving our summaries."}
        </div>
      )}
    </Card>
  )
}

