"use client"

import type React from "react"

import { useState, useEffect, useRef } from "react"
import { Search, Sparkles, X, Loader2 } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

interface PublicationSearchResult {
  id: string
  name: string
  description: string
  category: string
  relevance: number
  highlights?: string[]
}

export function PublicationsSearch() {
  const [query, setQuery] = useState("")
  const [isSearching, setIsSearching] = useState(false)
  const [showResults, setShowResults] = useState(false)
  const [results, setResults] = useState<PublicationSearchResult[]>([])
  const [suggestions, setSuggestions] = useState<string[]>([])
  const [typeAheadSuggestions, setTypeAheadSuggestions] = useState<string[]>([])
  const [showTypeAhead, setShowTypeAhead] = useState(false)
  const searchRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  // Mock search suggestions
  const mockSuggestions = [
    "technology publications",
    "finance newsletters",
    "art and design publications",
    "science journals",
    "health and wellness blogs",
    "travel publications with photography",
    "cryptocurrency analysis",
    "AI research publications",
    "sustainable living blogs",
    "productivity publications",
    "creative writing communities",
    "data science publications",
    "mindfulness and meditation",
    "software development blogs",
    "investment strategy newsletters",
  ]

  // Mock type-ahead suggestions based on current input
  const getTypeAheadSuggestions = (input: string) => {
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
    setIsSearching(true)

    // Simulate API call delay
    await new Promise((resolve) => setTimeout(resolve, 1000))

    // Mock search results
    const mockResults: PublicationSearchResult[] = [
      {
        id: "tech-insights",
        name: "Technology Insights",
        description: "The latest in tech, programming, and digital innovation",
        category: "Technology",
        relevance: 0.95,
        highlights: ["technology", "digital", "innovation"],
      },
      {
        id: "tech-daily",
        name: "Tech Daily",
        description: "Daily updates on the tech industry and product launches",
        category: "Technology",
        relevance: 0.89,
        highlights: ["technology", "tech", "daily updates"],
      },
      {
        id: "dev-chronicles",
        name: "Developer Chronicles",
        description: "Stories and tutorials from the developer community",
        category: "Programming",
        relevance: 0.82,
        highlights: ["developer", "programming", "tutorials"],
      },
      {
        id: "ai-frontier",
        name: "AI Frontier",
        description: "Exploring the cutting edge of artificial intelligence",
        category: "AI",
        relevance: 0.78,
        highlights: ["AI", "artificial intelligence", "technology"],
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

  return (
    <div className="relative w-full max-w-2xl mx-auto" ref={searchRef}>
      <form onSubmit={handleSearch} className="relative">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            ref={inputRef}
            placeholder="Search publications or ask a question..."
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

                  <a href={`/publications/${result.id}`} className="block group">
                    <h4 className="text-base font-medium group-hover:text-primary transition-colors">{result.name}</h4>
                  </a>

                  <p className="text-sm text-muted-foreground mt-1">{result.description}</p>

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

