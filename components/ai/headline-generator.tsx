"use client"

import { useState, useEffect } from "react"
import { Sparkles, RefreshCw, Copy, Check } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"
import { Badge } from "@/components/ui/badge"

interface HeadlineGeneratorProps {
  content: string
  onSelectHeadline?: (headline: string) => void
}

interface HeadlineSuggestion {
  text: string
  score: number
  type: "engaging" | "seo-friendly" | "clickbait" | "professional" | "creative"
}

export function HeadlineGenerator({ content, onSelectHeadline }: HeadlineGeneratorProps) {
  const [headlines, setHeadlines] = useState<HeadlineSuggestion[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [isRegenerating, setIsRegenerating] = useState(false)
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null)
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null)

  // Mock function to generate headlines - would be replaced with actual API call
  const generateHeadlines = async (text: string) => {
    // TODO: Replace with actual headline generation API
    // Implementation should:
    // 1. Call a language model API with specific prompting for headline generation
    // 2. Request multiple headline variations with different styles (engaging, SEO-friendly, etc.)
    // 3. Calculate actual quality scores based on readability, SEO potential, and engagement metrics
    // 4. Consider the content topic and target audience for better relevance

    // Simulate API call delay
    await new Promise((resolve) => setTimeout(resolve, 1800))

    // Mock headlines based on content
    const mockHeadlines: HeadlineSuggestion[] = [
      {
        text: "The Future of Web Development: AI, WebAssembly, and Edge Computing",
        score: 92,
        type: "seo-friendly",
      },
      {
        text: "3 Technologies Revolutionizing How We Build for the Web",
        score: 87,
        type: "engaging",
      },
      {
        text: "Web Development in 2025: What You Need to Know Now",
        score: 85,
        type: "clickbait",
      },
      {
        text: "Emerging Trends in Modern Web Development Practices",
        score: 83,
        type: "professional",
      },
      {
        text: "Beyond JavaScript: The New Frontier of Web Development",
        score: 79,
        type: "creative",
      },
    ]

    return mockHeadlines
  }

  useEffect(() => {
    if (!content) {
      setHeadlines([])
      setIsLoading(false)
      return
    }

    generateHeadlines(content).then((result) => {
      setHeadlines(result)
      setIsLoading(false)
    })
  }, [content])

  const handleRegenerate = async () => {
    setIsRegenerating(true)
    setSelectedIndex(null)

    // Simulate regeneration
    const newHeadlines = await generateHeadlines(content)
    setHeadlines(newHeadlines)
    setIsRegenerating(false)
  }

  const handleCopy = (index: number) => {
    navigator.clipboard.writeText(headlines[index].text)
    setCopiedIndex(index)
    setTimeout(() => setCopiedIndex(null), 2000)
  }

  const handleSelect = (index: number) => {
    setSelectedIndex(index)
    if (onSelectHeadline) {
      onSelectHeadline(headlines[index].text)
    }
  }

  // Get type color
  const getTypeColor = (type: HeadlineSuggestion["type"]) => {
    switch (type) {
      case "engaging":
        return "text-purple-500 border-purple-500/20 bg-purple-500/10"
      case "seo-friendly":
        return "text-green-500 border-green-500/20 bg-green-500/10"
      case "clickbait":
        return "text-orange-500 border-orange-500/20 bg-orange-500/10"
      case "professional":
        return "text-blue-500 border-blue-500/20 bg-blue-500/10"
      case "creative":
        return "text-pink-500 border-pink-500/20 bg-pink-500/10"
      default:
        return ""
    }
  }

  // Get score color
  const getScoreColor = (score: number) => {
    if (score >= 90) return "text-green-500"
    if (score >= 80) return "text-blue-500"
    if (score >= 70) return "text-yellow-500"
    return "text-muted-foreground"
  }

  return (
    <Card className="border border-primary/20">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-base font-medium flex items-center gap-2">
          <Sparkles className="h-4 w-4 text-primary" />
          AI Headline Generator
        </CardTitle>
        <Button
          variant="outline"
          size="sm"
          className="h-8 gap-1 border-primary/20 hover:bg-blue-100 hover:text-blue-700"
          onClick={handleRegenerate}
          disabled={isLoading || isRegenerating}
        >
          <RefreshCw className={`h-3.5 w-3.5 ${isRegenerating ? "animate-spin" : ""}`} />
          {isRegenerating ? "Regenerating..." : "Regenerate"}
        </Button>
      </CardHeader>

      <CardContent>
        {isLoading || isRegenerating ? (
          <div className="space-y-3">
            {Array.from({ length: 5 }).map((_, i) => (
              <div key={i} className="space-y-2">
                <Skeleton className="h-5 w-full" />
                <div className="flex justify-between">
                  <Skeleton className="h-4 w-20" />
                  <Skeleton className="h-4 w-16" />
                </div>
              </div>
            ))}
          </div>
        ) : headlines.length > 0 ? (
          <div className="space-y-3">
            {headlines.map((headline, index) => (
              <div
                key={index}
                className={`border rounded-md p-3 transition-colors ${
                  selectedIndex === index ? "border-primary bg-primary/5" : "border-border hover:border-primary/30"
                }`}
              >
                <p className="font-medium mb-2">{headline.text}</p>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Badge variant="outline" className={`text-xs ${getTypeColor(headline.type)}`}>
                      {headline.type.replace("-", " ")}
                    </Badge>
                    <span className={`text-xs ${getScoreColor(headline.score)}`}>Score: {headline.score}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Button variant="ghost" size="icon" className="h-7 w-7" onClick={() => handleCopy(index)}>
                      {copiedIndex === index ? (
                        <Check className="h-3.5 w-3.5 text-green-500" />
                      ) : (
                        <Copy className="h-3.5 w-3.5" />
                      )}
                      <span className="sr-only">Copy</span>
                    </Button>
                    <Button
                      variant={selectedIndex === index ? "default" : "outline"}
                      size="sm"
                      className="h-7 px-2 text-xs"
                      onClick={() => handleSelect(index)}
                    >
                      {selectedIndex === index ? "Selected" : "Use This"}
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-6 text-muted-foreground">
            <p>Add some content to generate headline suggestions</p>
          </div>
        )}
      </CardContent>
    </Card>
  )
}

