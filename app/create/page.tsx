"use client"

import type React from "react"

import { useState, useEffect } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { ArrowLeft, Code, Image, Save } from "lucide-react"

import { Button } from "@/components/ui/button"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { MarkdownEditor } from "@/components/markdown-editor"
import { WysiwygEditor } from "@/components/wysiwyg-editor"
import { EmbedPicker } from "@/components/embed-picker"
import { WritingAssistant } from "@/components/ai/writing-assistant"
import { HeadlineGenerator } from "@/components/ai/headline-generator"
import { AutoTagger } from "@/components/ai/auto-tagger"

export default function CreatePost() {
  const router = useRouter()
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Check if user is logged in
    const loggedIn = localStorage.getItem("isLoggedIn") === "true"
    setIsLoggedIn(loggedIn)
    setIsLoading(false)

    // If not logged in, redirect to login page
    if (!loggedIn) {
      router.push("/auth/login?redirect=/create")
    }
  }, [router])

  const [title, setTitle] = useState("")
  const [excerpt, setExcerpt] = useState("")
  const [tags, setTags] = useState<string[]>([])
  const [tagInput, setTagInput] = useState("")
  const [editorMode, setEditorMode] = useState<"markdown" | "wysiwyg">("markdown")
  const [markdownContent, setMarkdownContent] = useState("")
  const [wysiwygContent, setWysiwygContent] = useState("")
  const [showEmbedPicker, setShowEmbedPicker] = useState(false)
  const [showAITools, setShowAITools] = useState(true)

  const handleAddTag = () => {
    if (tagInput.trim() && !tags.includes(tagInput.trim())) {
      setTags([...tags, tagInput.trim()])
      setTagInput("")
    }
  }

  const handleRemoveTag = (tagToRemove: string) => {
    setTags(tags.filter((tag) => tag !== tagToRemove))
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      e.preventDefault()
      handleAddTag()
    }
  }

  const insertEmbed = (embedCode: string) => {
    if (editorMode === "markdown") {
      setMarkdownContent((prev) => prev + "\n\n" + embedCode + "\n\n")
    } else {
      setWysiwygContent((prev) => prev + embedCode)
    }
    setShowEmbedPicker(false)
  }

  const handleHeadlineSelect = (headline: string) => {
    setTitle(headline)
  }

  const handleTagsChange = (newTags: string[]) => {
    setTags(newTags)
  }

  // Show loading state while checking auth
  if (isLoading) {
    return (
      <div className="flex min-h-screen flex-col bg-background">
        <SiteHeader />
        <main className="flex-1 container max-w-5xl py-12 flex items-center justify-center">
          <p>Loading...</p>
        </main>
        <SiteFooter />
      </div>
    )
  }

  // If not logged in, this will redirect, but we'll return null to avoid flash
  if (!isLoggedIn) {
    return null
  }

  const currentContent = editorMode === "markdown" ? markdownContent : wysiwygContent

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <SiteHeader />
      <main className="flex-1 container max-w-7xl py-12 relative">
        {/* Grid background for retro-futuristic feel */}
        <div className="absolute inset-0 grid grid-cols-[repeat(40,1fr)] grid-rows-[repeat(40,1fr)] gap-px opacity-[0.02] pointer-events-none z-0">
          {Array.from({ length: 1600 }).map((_, i) => (
            <div key={i} className="bg-primary/40"></div>
          ))}
        </div>

        {/* Scanline effect */}
        <div className="absolute inset-0 bg-[linear-gradient(to_bottom,transparent_50%,rgba(0,0,0,0.02)_50%)] bg-[length:100%_4px] pointer-events-none z-0"></div>

        <div className="relative z-10">
          <Button variant="ghost" size="sm" asChild className="mb-6 group">
            <Link href="/">
              <ArrowLeft className="mr-2 h-4 w-4 group-hover:-translate-x-1 transition-transform" />
              Back to Home
            </Link>
          </Button>

          <div className="grid grid-cols-1 lg:grid-cols-[1fr_350px] gap-8">
            <div className="space-y-8">
              <div className="inline-block">
                <h1 className="text-3xl font-bold leading-tight tracking-tighter md:text-4xl lg:text-5xl bg-gradient-to-r from-pink-300 via-purple-300 to-indigo-300 bg-clip-text text-transparent relative">
                  Create New Post
                  <span className="absolute -inset-1 rounded-lg bg-gradient-to-r from-pink-300/10 via-purple-300/10 to-indigo-300/10 blur-lg -z-10"></span>
                </h1>
              </div>

              <div className="grid gap-6">
                <div className="space-y-2">
                  <Label htmlFor="title" className="text-base">
                    Title
                  </Label>
                  <Input
                    id="title"
                    placeholder="Enter post title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="border-primary/20 bg-background/80 backdrop-blur-sm"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="excerpt" className="text-base">
                    Excerpt
                  </Label>
                  <Textarea
                    id="excerpt"
                    placeholder="Brief description of your post"
                    value={excerpt}
                    onChange={(e) => setExcerpt(e.target.value)}
                    className="border-primary/20 bg-background/80 backdrop-blur-sm resize-none h-20"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="tags" className="text-base">
                    Tags
                  </Label>
                  <div className="flex gap-2">
                    <Input
                      id="tags"
                      placeholder="Add tags"
                      value={tagInput}
                      onChange={(e) => setTagInput(e.target.value)}
                      onKeyDown={handleKeyDown}
                      className="border-primary/20 bg-background/80 backdrop-blur-sm"
                    />
                    <Button
                      type="button"
                      onClick={handleAddTag}
                      variant="outline"
                      className="border-primary/20 bg-background/80 backdrop-blur-sm"
                    >
                      Add
                    </Button>
                  </div>
                  {tags.length > 0 && (
                    <div className="flex flex-wrap gap-2 mt-2">
                      {tags.map((tag) => (
                        <Badge
                          key={tag}
                          variant="secondary"
                          className="flex items-center gap-1 border border-primary/20 bg-background/80 backdrop-blur-sm"
                        >
                          #{tag}
                          <button
                            onClick={() => handleRemoveTag(tag)}
                            className="ml-1 text-muted-foreground hover:text-foreground"
                          >
                            ×
                          </button>
                        </Badge>
                      ))}
                    </div>
                  )}
                </div>

                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <Label className="text-base">Content</Label>
                    <div className="flex gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setShowEmbedPicker(true)}
                        className="border-primary/20 bg-background/80 backdrop-blur-sm"
                      >
                        <Code className="h-4 w-4 mr-2" />
                        Add Embed
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        className="border-primary/20 bg-background/80 backdrop-blur-sm"
                      >
                        <Image className="h-4 w-4 mr-2" />
                        Add Image
                      </Button>
                    </div>
                  </div>

                  <Tabs
                    defaultValue="markdown"
                    className="w-full"
                    onValueChange={(v) => setEditorMode(v as "markdown" | "wysiwyg")}
                  >
                    <TabsList className="grid w-full grid-cols-2 mb-4">
                      <TabsTrigger value="markdown">Markdown</TabsTrigger>
                      <TabsTrigger value="wysiwyg">WYSIWYG</TabsTrigger>
                    </TabsList>
                    <TabsContent value="markdown" className="space-y-4">
                      <MarkdownEditor value={markdownContent} onChange={setMarkdownContent} />
                    </TabsContent>
                    <TabsContent value="wysiwyg">
                      <WysiwygEditor value={wysiwygContent} onChange={setWysiwygContent} />
                    </TabsContent>
                  </Tabs>
                </div>

                <div className="flex justify-end gap-4">
                  <Button variant="outline" className="border-primary/20 bg-background/80 backdrop-blur-sm">
                    Save Draft
                  </Button>
                  <Button className="gap-2">
                    <Save className="h-4 w-4" />
                    Publish
                  </Button>
                </div>
              </div>
            </div>

            {/* AI Tools Sidebar */}
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-bold">AI Writing Tools</h2>
                <Button variant="ghost" size="sm" onClick={() => setShowAITools(!showAITools)}>
                  {showAITools ? "Hide" : "Show"}
                </Button>
              </div>

              {showAITools && (
                <>
                  <HeadlineGenerator content={currentContent} onSelectHeadline={handleHeadlineSelect} />

                  <WritingAssistant
                    content={currentContent}
                    onChange={editorMode === "markdown" ? setMarkdownContent : setWysiwygContent}
                  />

                  <AutoTagger content={currentContent} existingTags={tags} onTagsChange={handleTagsChange} />
                </>
              )}
            </div>
          </div>

          {showEmbedPicker && <EmbedPicker onClose={() => setShowEmbedPicker(false)} onEmbed={insertEmbed} />}
        </div>
      </main>
      <SiteFooter />
    </div>
  )
}

