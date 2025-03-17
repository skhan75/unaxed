"use client"

import type React from "react"

import { useState } from "react"
import { Clock, Calendar, Tags, Globe, Eye, Bookmark, PlusCircle, X } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Separator } from "@/components/ui/separator"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { toast } from "@/hooks/use-toast"

export interface PostMetadata {
  title: string
  excerpt: string
  tags: string[]
  category: string
  language: string
  featuredImage?: string
  publishDate: string
  readingTime?: string
  isPublished: boolean
  visibility: "public" | "private" | "unlisted"
  isPremium: boolean
  allowComments: boolean
}

interface MetadataEditorProps {
  metadata: PostMetadata
  onChange: (metadata: PostMetadata) => void
  onGenerateReadTime?: (content: string) => Promise<string>
  onKeywordSuggestions?: (content: string) => Promise<string[]>
}

export function MetadataEditor({ metadata, onChange, onGenerateReadTime, onKeywordSuggestions }: MetadataEditorProps) {
  const [newTag, setNewTag] = useState("")
  const [generatingReadTime, setGeneratingReadTime] = useState(false)
  const [suggestingKeywords, setSuggestingKeywords] = useState(false)
  const [tagSuggestions, setTagSuggestions] = useState<string[]>([])

  // Update metadata
  const updateMetadata = (field: keyof PostMetadata, value: any) => {
    onChange({
      ...metadata,
      [field]: value,
    })
  }

  // Add a tag
  const addTag = (tag: string) => {
    if (!tag.trim()) return

    // Check if tag already exists
    if (metadata.tags.includes(tag.trim())) {
      toast({
        title: "Tag already exists",
        description: `The tag "${tag}" is already added to this post.`,
        variant: "destructive",
      })
      return
    }

    // Add tag
    updateMetadata("tags", [...metadata.tags, tag.trim()])
    setNewTag("")
  }

  // Handle key press for tag input
  const handleTagKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      e.preventDefault()
      addTag(newTag)
    }
  }

  // Remove a tag
  const removeTag = (tag: string) => {
    updateMetadata(
      "tags",
      metadata.tags.filter((t) => t !== tag),
    )
  }

  // Generate reading time
  const handleGenerateReadTime = async () => {
    if (!onGenerateReadTime) return

    setGeneratingReadTime(true)

    try {
      const readingTime = await onGenerateReadTime("")
      updateMetadata("readingTime", readingTime)
    } catch (error) {
      toast({
        title: "Couldn't generate reading time",
        description: "There was an error calculating the reading time.",
        variant: "destructive",
      })
    } finally {
      setGeneratingReadTime(false)
    }
  }

  // Get keyword suggestions
  const handleKeywordSuggestions = async () => {
    if (!onKeywordSuggestions) return

    setSuggestingKeywords(true)

    try {
      const keywords = await onKeywordSuggestions("")
      setTagSuggestions(keywords)
    } catch (error) {
      toast({
        title: "Couldn't generate tag suggestions",
        description: "There was an error generating tag suggestions.",
        variant: "destructive",
      })
    } finally {
      setSuggestingKeywords(false)
    }
  }

  // Add a suggested tag
  const addSuggestedTag = (tag: string) => {
    addTag(tag)
    setTagSuggestions(tagSuggestions.filter((t) => t !== tag))
  }

  return (
    <div className="space-y-6">
      {/* Title and Excerpt */}
      <div className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="title">Title</Label>
          <Input
            id="title"
            placeholder="Your post title"
            value={metadata.title}
            onChange={(e) => updateMetadata("title", e.target.value)}
            className="border-primary/20 bg-background/80 backdrop-blur-sm"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="excerpt">Excerpt</Label>
          <Input
            id="excerpt"
            placeholder="Brief description of your post"
            value={metadata.excerpt}
            onChange={(e) => updateMetadata("excerpt", e.target.value)}
            className="border-primary/20 bg-background/80 backdrop-blur-sm"
          />
        </div>
      </div>

      <Separator />

      {/* Tags */}
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <Label htmlFor="tags" className="flex items-center gap-1">
            <Tags className="h-4 w-4 text-muted-foreground" />
            <span>Tags</span>
          </Label>

          <Button
            variant="ghost"
            size="sm"
            className="h-7 px-2 text-xs gap-1"
            onClick={handleKeywordSuggestions}
            disabled={suggestingKeywords || !onKeywordSuggestions}
          >
            <PlusCircle className="h-3.5 w-3.5" />
            {suggestingKeywords ? "Suggesting..." : "Suggest Tags"}
          </Button>
        </div>

        <div className="flex gap-2">
          <Input
            id="tags"
            placeholder="Add tags"
            value={newTag}
            onChange={(e) => setNewTag(e.target.value)}
            onKeyDown={handleTagKeyDown}
            className="border-primary/20 bg-background/80 backdrop-blur-sm"
          />
          <Button
            variant="outline"
            onClick={() => addTag(newTag)}
            className="border-primary/20 bg-background/80 backdrop-blur-sm"
          >
            Add
          </Button>
        </div>

        {metadata.tags.length > 0 && (
          <div className="flex flex-wrap gap-2 mt-2">
            {metadata.tags.map((tag) => (
              <Badge
                key={tag}
                variant="secondary"
                className="flex items-center gap-1 border border-primary/20 bg-background/80 backdrop-blur-sm"
              >
                #{tag}
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => removeTag(tag)}
                  className="h-4 w-4 p-0 ml-1 hover:bg-destructive/20 hover:text-destructive rounded-full"
                >
                  <X className="h-3 w-3" />
                  <span className="sr-only">Remove tag</span>
                </Button>
              </Badge>
            ))}
          </div>
        )}

        {/* Tag suggestions */}
        {tagSuggestions.length > 0 && (
          <div className="mt-2">
            <p className="text-xs text-muted-foreground mb-1">Suggested tags:</p>
            <div className="flex flex-wrap gap-2">
              {tagSuggestions.map((tag) => (
                <Badge
                  key={tag}
                  variant="outline"
                  className="cursor-pointer hover:bg-primary/10 transition-colors border-primary/20"
                  onClick={() => addSuggestedTag(tag)}
                >
                  + #{tag}
                </Badge>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Category & Language */}
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="category" className="flex items-center gap-1">
            <Bookmark className="h-4 w-4 text-muted-foreground" />
            <span>Category</span>
          </Label>
          <Select value={metadata.category} onValueChange={(value) => updateMetadata("category", value)}>
            <SelectTrigger className="border-primary/20 bg-background/80 backdrop-blur-sm">
              <SelectValue placeholder="Select a category" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Technology">Technology</SelectItem>
              <SelectItem value="Design">Design</SelectItem>
              <SelectItem value="Development">Development</SelectItem>
              <SelectItem value="Business">Business</SelectItem>
              <SelectItem value="Personal">Personal</SelectItem>
              <SelectItem value="News">News</SelectItem>
              <SelectItem value="Tutorial">Tutorial</SelectItem>
              <SelectItem value="Opinion">Opinion</SelectItem>
              <SelectItem value="Other">Other</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="language" className="flex items-center gap-1">
            <Globe className="h-4 w-4 text-muted-foreground" />
            <span>Language</span>
          </Label>
          <Select value={metadata.language} onValueChange={(value) => updateMetadata("language", value)}>
            <SelectTrigger className="border-primary/20 bg-background/80 backdrop-blur-sm">
              <SelectValue placeholder="Select a language" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="en">English</SelectItem>
              <SelectItem value="es">Spanish</SelectItem>
              <SelectItem value="fr">French</SelectItem>
              <SelectItem value="de">German</SelectItem>
              <SelectItem value="pt">Portuguese</SelectItem>
              <SelectItem value="ru">Russian</SelectItem>
              <SelectItem value="zh">Chinese</SelectItem>
              <SelectItem value="ja">Japanese</SelectItem>
              <SelectItem value="ko">Korean</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Date & Reading Time */}
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="publish-date" className="flex items-center gap-1">
            <Calendar className="h-4 w-4 text-muted-foreground" />
            <span>Publish Date</span>
          </Label>
          <Input
            id="publish-date"
            type="date"
            value={metadata.publishDate}
            onChange={(e) => updateMetadata("publishDate", e.target.value)}
            className="border-primary/20 bg-background/80 backdrop-blur-sm"
          />
        </div>

        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <Label htmlFor="reading-time" className="flex items-center gap-1">
              <Clock className="h-4 w-4 text-muted-foreground" />
              <span>Reading Time</span>
            </Label>

            <Button
              variant="ghost"
              size="sm"
              className="h-7 px-2 text-xs gap-1"
              onClick={handleGenerateReadTime}
              disabled={generatingReadTime || !onGenerateReadTime}
            >
              <PlusCircle className="h-3.5 w-3.5" />
              {generatingReadTime ? "Calculating..." : "Calculate"}
            </Button>
          </div>
          <Input
            id="reading-time"
            placeholder="e.g. 5 min read"
            value={metadata.readingTime}
            onChange={(e) => updateMetadata("readingTime", e.target.value)}
            className="border-primary/20 bg-background/80 backdrop-blur-sm"
          />
        </div>
      </div>

      <Separator />

      {/* Publishing Options */}
      <div className="space-y-4">
        <h3 className="text-sm font-medium">Publishing Options</h3>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div className="flex items-center space-x-2">
            <Switch
              id="published"
              checked={metadata.isPublished}
              onCheckedChange={(checked) => updateMetadata("isPublished", checked)}
            />
            <Label htmlFor="published">Publish immediately</Label>
          </div>

          <div className="flex items-center space-x-2">
            <Switch
              id="comments"
              checked={metadata.allowComments}
              onCheckedChange={(checked) => updateMetadata("allowComments", checked)}
            />
            <Label htmlFor="comments">Allow comments</Label>
          </div>

          <div className="flex items-center space-x-2">
            <Switch
              id="premium"
              checked={metadata.isPremium}
              onCheckedChange={(checked) => updateMetadata("isPremium", checked)}
            />
            <Label htmlFor="premium">Premium content</Label>
          </div>
        </div>

        <div className="space-y-2">
          <Label className="flex items-center gap-1">
            <Eye className="h-4 w-4 text-muted-foreground" />
            <span>Visibility</span>
          </Label>
          <RadioGroup
            value={metadata.visibility}
            onValueChange={(value: any) => updateMetadata("visibility", value)}
            className="flex flex-col space-y-1"
          >
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="public" id="public" />
              <Label htmlFor="public" className="cursor-pointer">
                Public
              </Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="unlisted" id="unlisted" />
              <Label htmlFor="unlisted" className="cursor-pointer">
                Unlisted (only accessible via link)
              </Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="private" id="private" />
              <Label htmlFor="private" className="cursor-pointer">
                Private (only you)
              </Label>
            </div>
          </RadioGroup>
        </div>
      </div>
    </div>
  )
}

