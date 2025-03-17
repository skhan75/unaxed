"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Sparkles, Plus, X, RefreshCw } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Skeleton } from "@/components/ui/skeleton"

interface AutoTaggerProps {
  content: string
  existingTags?: string[]
  onTagsChange?: (tags: string[]) => void
  maxTags?: number
}

interface TagSuggestion {
  tag: string
  confidence: number
}

export function AutoTagger({ content, existingTags = [], onTagsChange, maxTags = 10 }: AutoTaggerProps) {
  const [tags, setTags] = useState<string[]>(existingTags)
  const [suggestions, setSuggestions] = useState<TagSuggestion[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [isRegenerating, setIsRegenerating] = useState(false)
  const [customTag, setCustomTag] = useState("")

  // Mock function to generate tag suggestions
  const generateTagSuggestions = async (text: string, currentTags: string[]) => {
    // TODO: Replace with actual auto-tagging API
    // Implementation should:
    // 1. Use a classification model or LLM to extract relevant keywords and topics
    // 2. Calculate actual confidence scores based on term frequency and relevance
    // 3. Consider industry-standard taxonomies for consistent tagging
    // 4. Filter out already selected tags and sort by relevance
    // 5. Potentially integrate with a knowledge graph for related tag suggestions

    // Simulate API call delay
    await new Promise((resolve) => setTimeout(resolve, 1200))

    // Mock tag suggestions based on content
    const allPossibleTags: TagSuggestion[] = [
      { tag: "webdev", confidence: 0.95 },
      { tag: "frontend", confidence: 0.92 },
      { tag: "javascript", confidence: 0.89 },
      { tag: "react", confidence: 0.87 },
      { tag: "ai", confidence: 0.85 },
      { tag: "wasm", confidence: 0.82 },
      { tag: "edge-computing", confidence: 0.78 },
      { tag: "performance", confidence: 0.76 },
      { tag: "future", confidence: 0.75 },
      { tag: "programming", confidence: 0.72 },
      { tag: "technology", confidence: 0.7 },
      { tag: "web", confidence: 0.68 },
    ]

    // Filter out tags that are already selected
    return allPossibleTags
      .filter((suggestion) => !currentTags.includes(suggestion.tag))
      .sort((a, b) => b.confidence - a.confidence)
  }

  useEffect(() => {
    if (!content) {
      setSuggestions([])
      setIsLoading(false)
      return
    }

    generateTagSuggestions(content, tags).then((result) => {
      setSuggestions(result)
      setIsLoading(false)
    })
  }, [content, tags])

  const handleAddTag = (tag: string) => {
    if (tags.includes(tag) || tags.length >= maxTags) return

    const newTags = [...tags, tag]
    setTags(newTags)

    if (onTagsChange) {
      onTagsChange(newTags)
    }

    // Remove from suggestions
    setSuggestions(suggestions.filter((s) => s.tag !== tag))
  }

  const handleRemoveTag = (tag: string) => {
    const newTags = tags.filter((t) => t !== tag)
    setTags(newTags)

    if (onTagsChange) {
      onTagsChange(newTags)
    }

    // Regenerate suggestions
    setIsLoading(true)
    generateTagSuggestions(content, newTags).then((result) => {
      setSuggestions(result)
      setIsLoading(false)
    })
  }

  const handleAddCustomTag = () => {
    if (!customTag.trim() || tags.includes(customTag.trim()) || tags.length >= maxTags) {
      setCustomTag("")
      return
    }

    const formattedTag = customTag.trim().toLowerCase().replace(/\s+/g, "-")
    const newTags = [...tags, formattedTag]
    setTags(newTags)

    if (onTagsChange) {
      onTagsChange(newTags)
    }

    setCustomTag("")
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      e.preventDefault()
      handleAddCustomTag()
    }
  }

  const handleRegenerate = async () => {
    setIsRegenerating(true)

    // Simulate regeneration
    const newSuggestions = await generateTagSuggestions(content, tags)
    setSuggestions(newSuggestions)
    setIsRegenerating(false)
  }

  // Get confidence color
  const getConfidenceColor = (confidence: number) => {
    if (confidence >= 0.9) return "text-green-500"
    if (confidence >= 0.8) return "text-blue-500"
    if (confidence >= 0.7) return "text-yellow-500"
    return "text-muted-foreground"
  }

  return (
    <Card className="border border-primary/20">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-base font-medium flex items-center gap-2">
          <Sparkles className="h-4 w-4 text-primary" />
          AI Tag Suggestions
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
        <div className="space-y-4">
          {/* Current tags */}
          <div>
            <div className="text-sm font-medium mb-2">
              Current Tags ({tags.length}/{maxTags})
            </div>
            <div className="flex flex-wrap gap-2">
              {tags.length > 0 ? (
                tags.map((tag) => (
                  <Badge
                    key={tag}
                    variant="secondary"
                    className="flex items-center gap-1 pl-2 pr-1 py-1 border border-primary/20"
                  >
                    #{tag}
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-4 w-4 rounded-full hover:bg-primary/20"
                      onClick={() => handleRemoveTag(tag)}
                    >
                      <X className="h-2.5 w-2.5" />
                      <span className="sr-only">Remove tag</span>
                    </Button>
                  </Badge>
                ))
              ) : (
                <div className="text-sm text-muted-foreground">No tags added yet</div>
              )}
            </div>
          </div>

          {/* Add custom tag */}
          <div>
            <div className="text-sm font-medium mb-2">Add Custom Tag</div>
            <div className="flex gap-2">
              <Input
                value={customTag}
                onChange={(e) => setCustomTag(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Enter custom tag"
                className="border-primary/20"
                disabled={tags.length >= maxTags}
              />
              <Button
                variant="outline"
                className="gap-1 border-primary/20 hover:bg-green-100 hover:text-green-700"
                onClick={handleAddCustomTag}
                disabled={!customTag.trim() || tags.length >= maxTags}
              >
                <Plus className="h-4 w-4" />
                Add
              </Button>
            </div>
          </div>

          {/* Suggested tags */}
          <div>
            <div className="text-sm font-medium mb-2">Suggested Tags</div>
            {isLoading || isRegenerating ? (
              <div className="flex flex-wrap gap-2">
                {Array.from({ length: 6 }).map((_, i) => (
                  <Skeleton key={i} className="h-7 w-20 rounded-full" />
                ))}
              </div>
            ) : suggestions.length > 0 ? (
              <div className="flex flex-wrap gap-2">
                {suggestions.slice(0, 10).map((suggestion) => (
                  <Badge
                    key={suggestion.tag}
                    variant="outline"
                    className="flex items-center gap-2 pl-2 pr-1 py-1 cursor-pointer hover:bg-primary/10 transition-colors border-primary/20"
                    onClick={() => handleAddTag(suggestion.tag)}
                  >
                    #{suggestion.tag}
                    <span className={`text-xs ${getConfidenceColor(suggestion.confidence)}`}>
                      {Math.round(suggestion.confidence * 100)}%
                    </span>
                    <Button variant="ghost" size="icon" className="h-5 w-5 rounded-full hover:bg-primary/20">
                      <Plus className="h-3 w-3" />
                      <span className="sr-only">Add tag</span>
                    </Button>
                  </Badge>
                ))}
              </div>
            ) : (
              <div className="text-sm text-muted-foreground">
                {content ? "No additional tag suggestions available" : "Add content to get tag suggestions"}
              </div>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

