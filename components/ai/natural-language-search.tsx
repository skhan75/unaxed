"use client"

import type React from "react"

import { useState, useEffect, useRef } from "react"
import { Search, Sparkles, X, Loader2 } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

interface SearchResult {
  id: number
  title: string
  excerpt: string
  category: string
  relevance: number
  highlights?: string[]
}

// Update the search component to ensure the AI-powered search text doesn't overlap
export function NaturalLanguageSearch() {
  const [query, setQuery] = useState("")
  const [isSearching, setIsSearching] = useState(false)
  const [showResults, setShowResults] = useState(false)
  const [results, setResults] = useState<SearchResult[]>([])
  const [suggestions, setSuggestions] = useState<string[]>([])
  const [typeAheadSuggestions, setTypeAheadSuggestions] = useState<string[]>([])
  const [showTypeAhead, setShowTypeAhead] = useState(false)
  const searchRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  // Mock search suggestions
  const mockSuggestions = [
    "articles about productivity",
    "best posts on web development",
    "design trends for 2025",
    "AI in content creation",
    "accessibility guidelines",
    "minimalist UI examples",
    "react hooks tutorial",
    "javascript best practices",
    "css grid layouts",
    "tailwind vs bootstrap",
    "nextjs app router",
    "typescript tips",
    "web performance optimization",
    "responsive design techniques",
    "color theory basics",
    "ux research methods",
    "frontend frameworks comparison",
    "serverless architecture",
    "api design principles",
    "mobile-first development",
  ]

  // Mock type-ahead suggestions based on current input
  const getTypeAheadSuggestions = (input: string) => {
    // TODO: Replace with actual type-ahead API call
    // Implementation should:
    // 1. Call a backend endpoint that provides real-time type-ahead suggestions
    // 2. Use prefix matching, fuzzy search, or semantic matching
    // 3. Consider popular searches and trending topics
    // 4. Return personalized suggestions based on user history

    if (!input.trim()) return []

    const lowercaseInput = input.toLowerCase()
    return mockSuggestions
      .filter(
        (suggestion) =>
          suggestion.toLowerCase().startsWith(lowercaseInput) ||
          suggestion.toLowerCase().includes(` ${lowercaseInput}`),
      )
      .slice(0, 5)
  }

  // Mock search function - would be replaced with actual API call
  const performSearch = async (searchQuery: string) => {
    // TODO: Replace with actual natural language search implementation
    // Implementation should:
    // 1. Use a vector database for semantic search
    // 2. Convert the query to embeddings using a model like OpenAI's text-embedding-ada-002
    // 3. Find semantically similar content based on cosine similarity
    // 4. Return actual relevance scores and highlighted text fragments
    // 5. Consider implementing faceted search for filtering by category, author, etc.

    setIsSearching(true)

    // Simulate API call delay
    await new Promise((resolve) => setTimeout(resolve, 1000))

    // Mock search results
    const mockResults: SearchResult[] = [
      {
        id: 1,
        title: "The Future of Web Development",
        excerpt: "Exploring the latest trends and technologies shaping the future of web development.",
        category: "Technology",
        relevance: 0.95,
        highlights: ["future", "web development", "technologies", "trends"],
      },
      {
        id: 4,
        title: "Building Accessible Web Applications",
        excerpt: "Essential practices for creating inclusive web experiences for all users.",
        category: "Development",
        relevance: 0.87,
        highlights: ["web", "applications", "accessible", "inclusive"],
      },
      {
        id: 6,
        title: "Getting Started with React Hooks",
        excerpt: "A beginner's guide to understanding and implementing React Hooks effectively.",
        category: "Development",
        relevance: 0.82,
        highlights: ["React", "web development", "hooks", "implementing"],
      },
      {
        id: 7,
        title: "Optimizing Website Performance",
        excerpt: "Techniques to improve loading times and overall performance of your web applications.",
        category: "Performance",
        relevance: 0.78,
        highlights: ["web applications", "performance", "optimizing", "techniques"],
      },
    ]

    setResults(mockResults)
    setIsSearching(false)
    setShowResults(true)
  }

  // Handle search submission
  const handleSearch = (e?: React.FormEvent) => {
    if (e) e.preventDefault()
    if (!query.trim()) return

    setShowTypeAhead(false)
    performSearch(query)
  }

  // Handle suggestion click
  const handleSuggestionClick = (suggestion: string) => {
    setQuery(suggestion)
    setShowTypeAhead(false)
    performSearch(suggestion)
  }

  // Handle type-ahead suggestion click
  const handleTypeAheadClick = (suggestion: string) => {
    setQuery(suggestion)
    setShowTypeAhead(false)
    performSearch(suggestion)
  }

  // Handle clicks outside the search component
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setShowResults(false)
        setShowTypeAhead(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [])

  // Add type-ahead search functionality
  // Update suggestions based on query
  useEffect(() => {
    if (!query.trim()) {
      setSuggestions([])
      setTypeAheadSuggestions([])
      setShowTypeAhead(false)
      return
    }

    // Filter suggestions based on query
    const filtered = mockSuggestions.filter((suggestion) => suggestion.toLowerCase().includes(query.toLowerCase()))
    setSuggestions(filtered.slice(0, 3))

    // Get type-ahead suggestions with debounce
    const timer = setTimeout(() => {
      const typeAhead = getTypeAheadSuggestions(query)
      setTypeAheadSuggestions(typeAhead)
      setShowTypeAhead(typeAhead.length > 0)
    }, 200)

    return () => clearTimeout(timer)
  }, [query])

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // In a real app, this would trigger a search
    console.log("Searching for:", query)
  }

  return (
    <div className="relative" ref={searchRef}>
      <form onSubmit={handleSearch} className="relative">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            ref={inputRef}
            placeholder="Search articles or ask a question..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="pl-10 pr-10 border-primary/20 bg-background/80 backdrop-blur-sm"
            onFocus={() => {
              if (query.trim()) {
                setShowTypeAhead(typeAheadSuggestions.length > 0)
              }
            }}
          />
          {query && (
            <Button
              type="button"
              variant="ghost"
              size="icon"
              className="absolute right-0 top-0 h-full px-3 py-2 text-muted-foreground"
              onClick={() => {
                setQuery("")
                setShowResults(false)
                setShowTypeAhead(false)
                inputRef.current?.focus()
              }}
            >
              <X className="h-4 w-4" />
              <span className="sr-only">Clear search</span>
            </Button>
          )}
        </div>

        <div className="absolute right-0 top-full mt-2 flex items-center gap-1 text-xs text-muted-foreground">
          <Sparkles className="h-3 w-3 text-primary" />
          <span>AI-powered search</span>
        </div>
      </form>

      {/* Type-ahead suggestions */}
      {showTypeAhead && typeAheadSuggestions.length > 0 && !showResults && (
        <Card className="absolute top-full left-0 right-0 mt-6 p-2 border border-primary/20 bg-background/95 backdrop-blur-sm z-10">
          <ul className="space-y-1">
            {typeAheadSuggestions.map((suggestion, index) => (
              <li key={index}>
                <Button
                  variant="ghost"
                  className="w-full justify-start text-sm h-8 px-2"
                  onClick={() => handleTypeAheadClick(suggestion)}
                >
                  <Search className="mr-2 h-3.5 w-3.5 text-muted-foreground" />
                  {suggestion}
                </Button>
              </li>
            ))}
          </ul>
        </Card>
      )}

      {/* Suggestions dropdown */}
      {suggestions.length > 0 && !showResults && !showTypeAhead && (
        <Card className="absolute top-full left-0 right-0 mt-6 p-2 border border-primary/20 bg-background/95 backdrop-blur-sm z-10">
          <div className="text-xs text-muted-foreground mb-2">Suggestions:</div>
          <ul className="space-y-1">
            {suggestions.map((suggestion, index) => (
              <li key={index}>
                <Button
                  variant="ghost"
                  className="w-full justify-start text-sm h-8 px-2"
                  onClick={() => handleSuggestionClick(suggestion)}
                >
                  <Search className="mr-2 h-3.5 w-3.5 text-muted-foreground" />
                  {suggestion}
                </Button>
              </li>
            ))}
          </ul>
        </Card>
      )}

      {/* Search results */}
      {showResults && (
        <Card className="absolute top-full left-0 right-0 mt-6 p-4 border border-primary/20 bg-background/95 backdrop-blur-sm z-10 max-h-[80vh] overflow-y-auto">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-medium">{isSearching ? "Searching..." : `Results for "${query}"`}</h3>
            <Button variant="ghost" size="icon" className="h-7 w-7" onClick={() => setShowResults(false)}>
              <X className="h-4 w-4" />
              <span className="sr-only">Close</span>
            </Button>
          </div>

          {isSearching ? (
            <div className="flex items-center justify-center py-8">
              <Loader2 className="h-8 w-8 animate-spin text-primary" />
            </div>
          ) : results.length > 0 ? (
            <div className="space-y-4">
              {results.map((result) => (
                <div key={result.id} className="border-b border-border pb-4 last:border-0 last:pb-0">
                  <div className="flex items-center justify-between mb-1">
                    <Badge variant="outline" className="text-xs">
                      {result.category}
                    </Badge>
                    <Badge
                      variant="outline"
                      className={`text-xs ${
                        result.relevance > 0.9
                          ? "bg-green-500/10 text-green-500 border-green-500/20"
                          : result.relevance > 0.8
                            ? "bg-blue-500/10 text-blue-500 border-blue-500/20"
                            : "bg-yellow-500/10 text-yellow-500 border-yellow-500/20"
                      }`}
                    >
                      {Math.round(result.relevance * 100)}% relevant
                    </Badge>
                  </div>

                  <a href={`/blog/${result.id}`} className="block group">
                    <h4 className="text-base font-medium group-hover:text-primary transition-colors">{result.title}</h4>
                  </a>

                  <p className="text-sm text-muted-foreground mt-1">{result.excerpt}</p>

                  {result.highlights && (
                    <div className="flex flex-wrap gap-1 mt-2">
                      {result.highlights.map((highlight, i) => (
                        <Badge key={i} variant="secondary" className="text-xs">
                          {highlight}
                        </Badge>
                      ))}
                    </div>
                  )}
                </div>
              ))}

              <div className="text-center pt-2">
                <Button variant="outline" size="sm" className="border-primary/20">
                  View all results
                </Button>
              </div>
            </div>
          ) : (
            <div className="text-center py-8 text-muted-foreground">
              <p>No results found for "{query}"</p>
              <p className="text-sm mt-1">Try different keywords or browse our categories</p>
            </div>
          )}
        </Card>
      )}
    </div>
  )
}

