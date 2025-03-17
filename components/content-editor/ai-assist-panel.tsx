"use client"

import { useState, useEffect } from "react"
import {
  Sparkles,
  RefreshCw,
  CheckCircle,
  XCircle,
  MessageSquare,
  Lightbulb,
  Search,
  Wand2,
  Moon,
  Zap,
} from "lucide-react"

import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Textarea } from "@/components/ui/textarea"
import { Progress } from "@/components/ui/progress"
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert"
import { Separator } from "@/components/ui/separator"
import { Badge } from "@/components/ui/badge"
import { useToast } from "@/hooks/use-toast"

interface ContentScores {
  overall: number
  readability: number
  engagement: number
  seo: number
  grammar: number
}

interface AiAssistPanelProps {
  content: string
  onApplySuggestion: (text: string) => void
  onGenerateCompletion: (prompt: string, insertion: "replace" | "append") => void
}

export function AiAssistPanel({ content, onApplySuggestion, onGenerateCompletion }: AiAssistPanelProps) {
  const { toast } = useToast()
  const [activeTab, setActiveTab] = useState("suggestions")
  const [contentScores, setContentScores] = useState<ContentScores>({
    overall: 0,
    readability: 0,
    engagement: 0,
    seo: 0,
    grammar: 0,
  })
  const [suggestions, setSuggestions] = useState<
    {
      id: string
      type: "grammar" | "style" | "content" | "seo"
      text: string
      replacement: string
      snippet: string
      severity: "error" | "warning" | "suggestion"
    }[]
  >([])
  const [isAnalyzing, setIsAnalyzing] = useState(true)
  const [promptInput, setPromptInput] = useState("")
  const [generating, setGenerating] = useState(false)

  // AI chat history
  const [chatHistory, setChatHistory] = useState<
    {
      role: "user" | "assistant"
      content: string
    }[]
  >([
    {
      role: "assistant",
      content: "Hello! I'm your AI writing assistant. How can I help with your content today?",
    },
  ])
  const [chatInput, setChatInput] = useState("")
  const [isChatting, setIsChatting] = useState(false)

  // Mock content analysis on initial load and content changes
  useEffect(() => {
    if (!content || content.length < 50) {
      setIsAnalyzing(false)
      setContentScores({
        overall: 0,
        readability: 0,
        engagement: 0,
        seo: 0,
        grammar: 0,
      })
      setSuggestions([])
      return
    }

    setIsAnalyzing(true)

    // Simulate API delay
    const timer = setTimeout(() => {
      analyzeMockContent()
    }, 1500)

    return () => clearTimeout(timer)
  }, [content])

  // Mock analyze function - in real implementation this would call an AI analysis API
  const analyzeMockContent = () => {
    // Generate mock scores
    const mockScores: ContentScores = {
      overall: Math.floor(65 + Math.random() * 20),
      readability: Math.floor(60 + Math.random() * 30),
      engagement: Math.floor(50 + Math.random() * 40),
      seo: Math.floor(55 + Math.random() * 35),
      grammar: Math.floor(70 + Math.random() * 25),
    }

    setContentScores(mockScores)

    // Generate mock suggestions
    const mockSuggestions = [
      {
        id: "1",
        type: "grammar" as const,
        text: "Consider revising this sentence for clarity",
        replacement: "This sentence could be clearer if restructured.",
        snippet: "The is sentence structure awkward and might confuse readers.",
        severity: "warning" as const,
      },
      {
        id: "2",
        type: "style" as const,
        text: "Try using more engaging language here",
        replacement: "Captivate your readers with more vibrant descriptions.",
        snippet: "This section feels a bit dry and could use more descriptive language.",
        severity: "suggestion" as const,
      },
      {
        id: "3",
        type: "content" as const,
        text: "This paragraph could use more supporting evidence",
        replacement: "Consider adding statistics or examples to strengthen your argument.",
        snippet: "Your claim here would be more persuasive with specific examples.",
        severity: "suggestion" as const,
      },
      {
        id: "4",
        type: "seo" as const,
        text: "Add more relevant keywords to improve SEO",
        replacement: "Incorporate industry-specific terms to improve search visibility.",
        snippet: "This section could rank higher with strategic keyword placement.",
        severity: "suggestion" as const,
      },
    ]

    setSuggestions(mockSuggestions)
    setIsAnalyzing(false)
  }

  // Handle AI chat interactions
  const handleSendChat = () => {
    if (!chatInput.trim()) return

    // Add user message to chat
    const newHistory = [...chatHistory, { role: "user", content: chatInput }]

    setChatHistory(newHistory)
    setIsChatting(true)
    setChatInput("")

    // Simulate AI thinking and responding
    setTimeout(() => {
      // Mock AI responses based on user input
      let aiResponse = "I'm not sure I understand your request. Could you clarify?"

      if (chatInput.toLowerCase().includes("improve")) {
        aiResponse =
          "To improve your content, consider adding more vivid descriptions and concrete examples. Try varying your sentence structure to maintain reader engagement."
      } else if (chatInput.toLowerCase().includes("help") || chatInput.toLowerCase().includes("stuck")) {
        aiResponse =
          "Writer's block happens to everyone! Try exploring a different angle, or step back and outline the key points you want to make. Sometimes a short break can also help refresh your creativity."
      } else if (chatInput.toLowerCase().includes("conclusion") || chatInput.toLowerCase().includes("ending")) {
        aiResponse =
          "For a strong conclusion, revisit your main points, emphasize the significance of your topic, and leave readers with a memorable final thought or call to action."
      } else if (chatInput.toLowerCase().includes("introduction") || chatInput.toLowerCase().includes("start")) {
        aiResponse =
          "Grab your reader's attention with a compelling hook - a fascinating fact, a provocative question, or a relevant anecdote. Then briefly introduce your topic and its importance."
      } else if (chatInput.toLowerCase().includes("keyword") || chatInput.toLowerCase().includes("seo")) {
        aiResponse =
          "For better SEO, naturally incorporate relevant keywords into your headings, introduction, and throughout your content. But remember - always prioritize readability and value for your human readers!"
      }

      setChatHistory([...newHistory, { role: "assistant", content: aiResponse }])
      setIsChatting(false)
    }, 1500)
  }

  // Handle prompt-based generation
  const handleGenerate = (insertion: "replace" | "append") => {
    if (!promptInput.trim()) return

    setGenerating(true)

    // Simulate generation delay
    setTimeout(() => {
      onGenerateCompletion(promptInput, insertion)
      setPromptInput("")
      setGenerating(false)

      toast({
        title: "Content generated",
        description: insertion === "replace" ? "Content has been replaced" : "Content has been added to your document",
      })
    }, 2000)
  }

  // Format score color based on value
  const getScoreColor = (score: number) => {
    if (score >= 80) return "text-green-500"
    if (score >= 60) return "text-yellow-500"
    if (score >= 40) return "text-orange-500"
    return "text-red-500"
  }

  return (
    <div className="h-full flex flex-col border border-primary/20 rounded-lg overflow-hidden">
      {/* Header */}
      <div className="bg-card/80 backdrop-blur-sm border-b border-primary/20 py-2 px-4 flex items-center justify-between">
        <div className="flex items-center gap-1.5">
          <Sparkles className="h-4 w-4 text-primary" />
          <h3 className="text-sm font-medium">AI Writing Assistant</h3>
        </div>

        <Button
          variant="outline"
          size="sm"
          onClick={analyzeMockContent}
          disabled={isAnalyzing || content.length < 50}
          className="h-7 text-xs gap-1 border-primary/20"
        >
          <RefreshCw className={`h-3.5 w-3.5 ${isAnalyzing ? "animate-spin" : ""}`} />
          {isAnalyzing ? "Analyzing..." : "Refresh"}
        </Button>
      </div>

      {/* Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="flex-1 flex flex-col">
        <TabsList className="p-0 bg-transparent border-b rounded-none">
          <TabsTrigger
            value="suggestions"
            className="flex-1 rounded-none data-[state=active]:bg-transparent data-[state=active]:border-b-2 data-[state=active]:border-primary"
          >
            Suggestions
          </TabsTrigger>
          <TabsTrigger
            value="analysis"
            className="flex-1 rounded-none data-[state=active]:bg-transparent data-[state=active]:border-b-2 data-[state=active]:border-primary"
          >
            Analysis
          </TabsTrigger>
          <TabsTrigger
            value="generate"
            className="flex-1 rounded-none data-[state=active]:bg-transparent data-[state=active]:border-b-2 data-[state=active]:border-primary"
          >
            Generate
          </TabsTrigger>
          <TabsTrigger
            value="chat"
            className="flex-1 rounded-none data-[state=active]:bg-transparent data-[state=active]:border-b-2 data-[state=active]:border-primary"
          >
            Chat
          </TabsTrigger>
        </TabsList>

        {/* Suggestions tab */}
        <TabsContent value="suggestions" className="flex-1 p-0 m-0 overflow-auto">
          {!content || content.length < 50 ? (
            <div className="p-4 text-center text-muted-foreground">
              <Lightbulb className="h-8 w-8 mx-auto mb-2 opacity-30" />
              <p>Start writing to get AI-powered suggestions</p>
              <p className="text-xs mt-1">At least 50 characters needed</p>
            </div>
          ) : isAnalyzing ? (
            <div className="p-4 text-center">
              <RefreshCw className="h-8 w-8 mx-auto mb-2 animate-spin text-primary/70" />
              <p className="text-muted-foreground">Analyzing your content...</p>
            </div>
          ) : suggestions.length === 0 ? (
            <div className="p-4 text-center text-muted-foreground">
              <CheckCircle className="h-8 w-8 mx-auto mb-2 text-green-500/70" />
              <p>No suggestions at this time!</p>
              <p className="text-xs mt-1">Your content looks great</p>
            </div>
          ) : (
            <div className="p-2 space-y-2">
              {suggestions.map((suggestion) => (
                <div key={suggestion.id} className="border border-primary/10 rounded-md p-3 bg-card/30 space-y-2">
                  <div className="flex items-center justify-between">
                    <Badge
                      variant="outline"
                      className={
                        suggestion.severity === "error"
                          ? "border-red-500/30 text-red-500 bg-red-500/10"
                          : suggestion.severity === "warning"
                            ? "border-yellow-500/30 text-yellow-500 bg-yellow-500/10"
                            : "border-blue-500/30 text-blue-500 bg-blue-500/10"
                      }
                    >
                      {suggestion.type.charAt(0).toUpperCase() + suggestion.type.slice(1)}
                    </Badge>

                    <div className="flex items-center gap-1">
                      <Button
                        variant="ghost"
                        size="sm"
                        className="h-7 w-7 p-0 text-muted-foreground hover:text-destructive hover:bg-destructive/10"
                        onClick={() => setSuggestions(suggestions.filter((s) => s.id !== suggestion.id))}
                      >
                        <XCircle className="h-4 w-4" />
                        <span className="sr-only">Dismiss</span>
                      </Button>
                    </div>
                  </div>

                  <p className="text-sm">{suggestion.text}</p>

                  <div className="bg-background/40 p-2 rounded-sm text-xs border border-primary/5 text-muted-foreground">
                    {suggestion.snippet}
                  </div>

                  <div className="pt-1">
                    <Button
                      size="sm"
                      className="w-full h-7 text-xs"
                      onClick={() => {
                        onApplySuggestion(suggestion.replacement)
                        setSuggestions(suggestions.filter((s) => s.id !== suggestion.id))
                        toast({
                          title: "Suggestion applied",
                          description: "The AI suggestion has been applied to your content.",
                        })
                      }}
                    >
                      Apply Suggestion
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </TabsContent>

        {/* Analysis tab */}
        <TabsContent value="analysis" className="p-4 m-0 flex-1 overflow-auto">
          {!content || content.length < 50 ? (
            <div className="text-center text-muted-foreground">
              <Search className="h-8 w-8 mx-auto mb-2 opacity-30" />
              <p>Start writing to see content analysis</p>
              <p className="text-xs mt-1">At least 50 characters needed</p>
            </div>
          ) : isAnalyzing ? (
            <div className="text-center">
              <RefreshCw className="h-8 w-8 mx-auto mb-2 animate-spin text-primary/70" />
              <p className="text-muted-foreground">Analyzing your content...</p>
            </div>
          ) : (
            <div className="space-y-6">
              {/* Overall score */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-medium">Overall Content Score</h3>
                  <span className={`text-2xl font-bold ${getScoreColor(contentScores.overall)}`}>
                    {contentScores.overall}
                  </span>
                </div>
                <Progress value={contentScores.overall} className="h-2" />
              </div>

              <Separator />

              {/* Individual scores */}
              <div className="space-y-4">
                <div className="space-y-1">
                  <div className="flex items-center justify-between text-sm">
                    <div className="flex items-center gap-1.5">
                      <Moon className="h-4 w-4 text-blue-400" />
                      <span>Readability</span>
                    </div>
                    <span className={`font-medium ${getScoreColor(contentScores.readability)}`}>
                      {contentScores.readability}
                    </span>
                  </div>
                  <Progress value={contentScores.readability} className="h-1.5" />
                  <p className="text-xs text-muted-foreground">How easy your content is to read and understand</p>
                </div>

                <div className="space-y-1">
                  <div className="flex items-center justify-between text-sm">
                    <div className="flex items-center gap-1.5">
                      <Zap className="h-4 w-4 text-yellow-400" />
                      <span>Engagement</span>
                    </div>
                    <span className={`font-medium ${getScoreColor(contentScores.engagement)}`}>
                      {contentScores.engagement}
                    </span>
                  </div>
                  <Progress value={contentScores.engagement} className="h-1.5" />
                  <p className="text-xs text-muted-foreground">How captivating and interesting your content is</p>
                </div>

                <div className="space-y-1">
                  <div className="flex items-center justify-between text-sm">
                    <div className="flex items-center gap-1.5">
                      <Search className="h-4 w-4 text-green-400" />
                      <span>SEO Optimization</span>
                    </div>
                    <span className={`font-medium ${getScoreColor(contentScores.seo)}`}>{contentScores.seo}</span>
                  </div>
                  <Progress value={contentScores.seo} className="h-1.5" />
                  <p className="text-xs text-muted-foreground">How well optimized your content is for search engines</p>
                </div>

                <div className="space-y-1">
                  <div className="flex items-center justify-between text-sm">
                    <div className="flex items-center gap-1.5">
                      <CheckCircle className="h-4 w-4 text-purple-400" />
                      <span>Grammar & Style</span>
                    </div>
                    <span className={`font-medium ${getScoreColor(contentScores.grammar)}`}>
                      {contentScores.grammar}
                    </span>
                  </div>
                  <Progress value={contentScores.grammar} className="h-1.5" />
                  <p className="text-xs text-muted-foreground">Technical quality of your writing</p>
                </div>
              </div>

              {/* Analysis insights */}
              <Alert className="bg-card border-primary/20">
                <Lightbulb className="h-4 w-4 text-primary" />
                <AlertTitle>Content Insights</AlertTitle>
                <AlertDescription className="text-xs text-muted-foreground">
                  Your content is well-structured but could benefit from more engaging language. Consider adding more
                  examples and data points to strengthen your arguments. The introduction effectively hooks the reader,
                  but your conclusion could be stronger.
                </AlertDescription>
              </Alert>
            </div>
          )}
        </TabsContent>

        {/* Generate tab */}
        <TabsContent value="generate" className="p-4 m-0 flex-1 overflow-auto space-y-4">
          <div className="space-y-2">
            <h3 className="text-sm font-medium">AI-Powered Content Generation</h3>
            <p className="text-xs text-muted-foreground">
              Describe what you'd like the AI to write, and it will generate content based on your prompt.
            </p>

            <Textarea
              placeholder="e.g., 'Write a conclusion paragraph summarizing the benefits of cloud computing'"
              className="min-h-[100px] resize-none border-primary/20 bg-card/30"
              value={promptInput}
              onChange={(e) => setPromptInput(e.target.value)}
            />

            <div className="flex gap-2 justify-end">
              <Button
                variant="outline"
                size="sm"
                onClick={() => handleGenerate("append")}
                disabled={!promptInput.trim() || generating}
                className="text-xs gap-1"
              >
                <Wand2 className="h-3.5 w-3.5" />
                {generating ? "Generating..." : "Append to Content"}
              </Button>
              <Button
                variant="default"
                size="sm"
                onClick={() => handleGenerate("replace")}
                disabled={!promptInput.trim() || generating}
                className="text-xs gap-1"
              >
                <Wand2 className="h-3.5 w-3.5" />
                {generating ? "Generating..." : "Replace Selection"}
              </Button>
            </div>
          </div>

          <Separator />

          <div className="space-y-2">
            <h3 className="text-sm font-medium">Quick Prompts</h3>
            <div className="grid grid-cols-2 gap-2">
              <Button
                variant="outline"
                size="sm"
                className="text-xs justify-start h-auto py-2 border-primary/20"
                onClick={() => {
                  setPromptInput("Write an engaging introduction paragraph about this topic")
                }}
              >
                Introduction Paragraph
              </Button>
              <Button
                variant="outline"
                size="sm"
                className="text-xs justify-start h-auto py-2 border-primary/20"
                onClick={() => {
                  setPromptInput("Create a strong conclusion that summarizes the key points")
                }}
              >
                Conclusion
              </Button>
              <Button
                variant="outline"
                size="sm"
                className="text-xs justify-start h-auto py-2 border-primary/20"
                onClick={() => {
                  setPromptInput("Rewrite this paragraph to be more engaging and concise")
                }}
              >
                Rewrite for Clarity
              </Button>
              <Button
                variant="outline"
                size="sm"
                className="text-xs justify-start h-auto py-2 border-primary/20"
                onClick={() => {
                  setPromptInput("Generate 3-5 key points about this topic")
                }}
              >
                Key Points
              </Button>
              <Button
                variant="outline"
                size="sm"
                className="text-xs justify-start h-auto py-2 border-primary/20"
                onClick={() => {
                  setPromptInput("Create a list of compelling statistics or facts about this topic")
                }}
              >
                Statistics & Facts
              </Button>
              <Button
                variant="outline"
                size="sm"
                className="text-xs justify-start h-auto py-2 border-primary/20"
                onClick={() => {
                  setPromptInput("Generate SEO-friendly subheadings for this content")
                }}
              >
                SEO Subheadings
              </Button>
            </div>
          </div>
        </TabsContent>

        {/* Chat tab */}
        <TabsContent value="chat" className="p-0 m-0 flex-1 flex flex-col">
          <div className="flex-1 overflow-auto p-4 space-y-4">
            {chatHistory.map((message, i) => (
              <div key={i} className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}>
                <div
                  className={`max-w-[80%] p-3 rounded-lg ${
                    message.role === "user" ? "bg-primary/20 text-primary-foreground" : "bg-muted text-foreground"
                  }`}
                >
                  <p className="text-sm">{message.content}</p>
                </div>
              </div>
            ))}

            {isChatting && (
              <div className="flex justify-start">
                <div className="max-w-[80%] p-3 rounded-lg bg-muted text-foreground">
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 rounded-full bg-primary animate-pulse"></div>
                    <div className="w-2 h-2 rounded-full bg-primary animate-pulse delay-150"></div>
                    <div className="w-2 h-2 rounded-full bg-primary animate-pulse delay-300"></div>
                  </div>
                </div>
              </div>
            )}
          </div>

          <div className="p-4 border-t border-primary/20">
            <div className="flex gap-2">
              <Textarea
                value={chatInput}
                onChange={(e) => setChatInput(e.target.value)}
                placeholder="Ask for writing help or suggestions..."
                className="min-h-[60px] resize-none border-primary/20 bg-card/30"
                onKeyDown={(e) => {
                  if (e.key === "Enter" && !e.shiftKey) {
                    e.preventDefault()
                    handleSendChat()
                  }
                }}
              />
              <Button className="shrink-0" onClick={handleSendChat} disabled={!chatInput.trim() || isChatting}>
                {isChatting ? <RefreshCw className="h-4 w-4 animate-spin" /> : <MessageSquare className="h-4 w-4" />}
              </Button>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}

