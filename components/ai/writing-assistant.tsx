"use client"

import { useState, useEffect } from "react"
import { Sparkles, AlertCircle, Check, X, ChevronDown, ChevronUp, Lightbulb } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

interface WritingAssistantProps {
  content: string
  onChange?: (content: string) => void
}

interface Suggestion {
  id: string
  type: "grammar" | "style" | "clarity" | "enhancement"
  severity: "error" | "warning" | "suggestion"
  text: string
  replacement: string
  startPos: number
  endPos: number
}

interface ContentScore {
  overall: number
  readability: number
  clarity: number
  engagement: number
  grammar: number
}

export function WritingAssistant({ content, onChange }: WritingAssistantProps) {
  const [suggestions, setSuggestions] = useState<Suggestion[]>([])
  const [scores, setScores] = useState<ContentScore>({
    overall: 0,
    readability: 0,
    clarity: 0,
    engagement: 0,
    grammar: 0,
  })
  const [isAnalyzing, setIsAnalyzing] = useState(true)
  const [isExpanded, setIsExpanded] = useState(true)
  const [activeTab, setActiveTab] = useState("suggestions")
  const [improvementIdeas, setImprovementIdeas] = useState<string[]>([])

  // Mock function to analyze content - would be replaced with actual API call
  const analyzeContent = async (text: string) => {
    // TODO: Replace with actual writing analysis API
    // Implementation should:
    // 1. Call a language model API (like OpenAI, Anthropic, or Cohere)
    // 2. Analyze the text for grammar, style, clarity, and engagement
    // 3. Generate specific improvement suggestions with proper text positions
    // 4. Calculate actual readability scores using algorithms like Flesch-Kincaid
    // 5. Provide contextual improvement ideas based on the content type

    // Simulate API call delay
    await new Promise((resolve) => setTimeout(resolve, 2000))

    // Mock suggestions
    const mockSuggestions: Suggestion[] = [
      {
        id: "1",
        type: "grammar",
        severity: "error",
        text: "technologies is changing",
        replacement: "technologies are changing",
        startPos: 120,
        endPos: 142,
      },
      {
        id: "2",
        type: "style",
        severity: "warning",
        text: "very powerful",
        replacement: "powerful",
        startPos: 200,
        endPos: 213,
      },
      {
        id: "3",
        type: "clarity",
        severity: "suggestion",
        text: "This approach creates more usable interfaces",
        replacement: "This approach enhances usability and creates more intuitive interfaces",
        startPos: 300,
        endPos: 340,
      },
    ]

    // Mock scores
    const mockScores: ContentScore = {
      overall: 78,
      readability: 82,
      clarity: 75,
      engagement: 68,
      grammar: 90,
    }

    // Mock improvement ideas
    const mockIdeas = [
      "Consider adding more specific examples to illustrate your main points.",
      "The introduction could be more engaging by starting with a surprising fact or question.",
      "Try breaking up longer paragraphs for better readability.",
      "Add subheadings to organize your content into clear sections.",
      "Consider including a brief conclusion that summarizes your key points.",
    ]

    return {
      suggestions: mockSuggestions,
      scores: mockScores,
      ideas: mockIdeas,
    }
  }

  useEffect(() => {
    // Debounce content analysis
    const timer = setTimeout(() => {
      setIsAnalyzing(true)
      analyzeContent(content).then((result) => {
        setSuggestions(result.suggestions)
        setScores(result.scores)
        setImprovementIdeas(result.ideas)
        setIsAnalyzing(false)
      })
    }, 1000)

    return () => clearTimeout(timer)
  }, [content])

  // Apply suggestion to content
  const applySuggestion = (suggestion: Suggestion) => {
    if (!onChange) return

    // In a real implementation, this would properly replace the text at the correct position
    // For this mock, we'll just log that it would be applied
    console.log(`Applied suggestion: "${suggestion.text}" -> "${suggestion.replacement}"`)

    // Remove the suggestion from the list
    setSuggestions(suggestions.filter((s) => s.id !== suggestion.id))

    // Update scores to simulate improvement
    setScores({
      ...scores,
      overall: Math.min(scores.overall + 2, 100),
      [suggestion.type === "grammar"
        ? "grammar"
        : suggestion.type === "clarity"
          ? "clarity"
          : suggestion.type === "style"
            ? "readability"
            : "engagement"]: Math.min(
        scores[
          suggestion.type === "grammar"
            ? "grammar"
            : suggestion.type === "clarity"
              ? "clarity"
              : suggestion.type === "style"
                ? "readability"
                : "engagement"
        ] + 5,
        100,
      ),
    })
  }

  // Get severity color
  const getSeverityColor = (severity: Suggestion["severity"]) => {
    switch (severity) {
      case "error":
        return "text-red-500 border-red-500/20 bg-red-500/10"
      case "warning":
        return "text-yellow-500 border-yellow-500/20 bg-yellow-500/10"
      case "suggestion":
        return "text-blue-500 border-blue-500/20 bg-blue-500/10"
      default:
        return ""
    }
  }

  // Get score color
  const getScoreColor = (score: number) => {
    if (score >= 90) return "text-green-500"
    if (score >= 75) return "text-blue-500"
    if (score >= 60) return "text-yellow-500"
    return "text-red-500"
  }

  return (
    <Card className="border border-primary/20 overflow-hidden">
      <div
        className="flex items-center justify-between p-3 bg-secondary/10 cursor-pointer"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <div className="flex items-center gap-2">
          <Sparkles className="h-4 w-4 text-primary" />
          <h3 className="text-sm font-medium">AI Writing Assistant</h3>
          {isAnalyzing && <span className="text-xs text-muted-foreground">(Analyzing...)</span>}
        </div>
        <Button variant="ghost" size="icon" className="h-7 w-7">
          {isExpanded ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
        </Button>
      </div>

      {isExpanded && (
        <div className="p-3">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <div className="text-sm font-medium">Overall Score:</div>
              <div className={`text-lg font-bold ${getScoreColor(scores.overall)}`}>{scores.overall}</div>
            </div>
            <div className="flex gap-2">
              <Badge variant="outline" className="text-xs">
                {suggestions.filter((s) => s.severity === "error").length} Errors
              </Badge>
              <Badge variant="outline" className="text-xs">
                {suggestions.filter((s) => s.severity === "warning").length} Warnings
              </Badge>
              <Badge variant="outline" className="text-xs">
                {suggestions.filter((s) => s.severity === "suggestion").length} Suggestions
              </Badge>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-2 mb-4">
            <div className="space-y-1">
              <div className="flex items-center justify-between text-xs">
                <span>Readability</span>
                <span className={getScoreColor(scores.readability)}>{scores.readability}</span>
              </div>
              <Progress value={scores.readability} className="h-1.5" />
            </div>
            <div className="space-y-1">
              <div className="flex items-center justify-between text-xs">
                <span>Clarity</span>
                <span className={getScoreColor(scores.clarity)}>{scores.clarity}</span>
              </div>
              <Progress value={scores.clarity} className="h-1.5" />
            </div>
            <div className="space-y-1">
              <div className="flex items-center justify-between text-xs">
                <span>Engagement</span>
                <span className={getScoreColor(scores.engagement)}>{scores.engagement}</span>
              </div>
              <Progress value={scores.engagement} className="h-1.5" />
            </div>
            <div className="space-y-1">
              <div className="flex items-center justify-between text-xs">
                <span>Grammar</span>
                <span className={getScoreColor(scores.grammar)}>{scores.grammar}</span>
              </div>
              <Progress value={scores.grammar} className="h-1.5" />
            </div>
          </div>

          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="suggestions">Suggestions</TabsTrigger>
              <TabsTrigger value="ideas">Improvement Ideas</TabsTrigger>
            </TabsList>

            <TabsContent value="suggestions" className="mt-4 space-y-3">
              {isAnalyzing ? (
                <div className="text-center py-4 text-sm text-muted-foreground">Analyzing your content...</div>
              ) : suggestions.length > 0 ? (
                suggestions.map((suggestion) => (
                  <div key={suggestion.id} className="border border-border rounded-md p-3 text-sm">
                    <div className="flex items-start justify-between mb-2">
                      <div className="flex items-center gap-2">
                        {suggestion.severity === "error" ? (
                          <AlertCircle className="h-4 w-4 text-red-500" />
                        ) : suggestion.severity === "warning" ? (
                          <AlertCircle className="h-4 w-4 text-yellow-500" />
                        ) : (
                          <Lightbulb className="h-4 w-4 text-blue-500" />
                        )}
                        <span className="font-medium capitalize">{suggestion.type}</span>
                      </div>
                      <Badge variant="outline" className={`text-xs ${getSeverityColor(suggestion.severity)}`}>
                        {suggestion.severity}
                      </Badge>
                    </div>

                    <div className="mb-2">
                      <div className="text-muted-foreground line-through mb-1">"{suggestion.text}"</div>
                      <div className="text-green-500">"{suggestion.replacement}"</div>
                    </div>

                    <div className="flex justify-end gap-2">
                      <Button
                        variant="ghost"
                        size="sm"
                        className="h-7 px-2 text-xs"
                        onClick={() => setSuggestions(suggestions.filter((s) => s.id !== suggestion.id))}
                      >
                        <X className="h-3.5 w-3.5 mr-1" />
                        Ignore
                      </Button>
                      <Button
                        variant="default"
                        size="sm"
                        className="h-7 px-2 text-xs"
                        onClick={() => applySuggestion(suggestion)}
                      >
                        <Check className="h-3.5 w-3.5 mr-1" />
                        Apply
                      </Button>
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-center py-4 text-sm text-muted-foreground">
                  No suggestions found. Your content looks good!
                </div>
              )}
            </TabsContent>

            <TabsContent value="ideas" className="mt-4">
              <div className="space-y-3">
                {improvementIdeas.map((idea, index) => (
                  <div key={index} className="flex gap-2 text-sm">
                    <Lightbulb className="h-4 w-4 text-primary flex-shrink-0 mt-0.5" />
                    <p>{idea}</p>
                  </div>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      )}
    </Card>
  )
}

