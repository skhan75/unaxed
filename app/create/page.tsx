"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Code, Image, Save, Sparkles, BarChart, Lightbulb, MessageSquare, Edit } from "lucide-react"

import { Button } from "@/components/ui/button"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Separator } from "@/components/ui/separator"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { MarkdownEditor } from "@/components/markdown-editor"
import { WysiwygEditor } from "@/components/wysiwyg-editor"
import { EmbedPicker } from "@/components/embed-picker"
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
  const [contentScore, setContentScore] = useState(0)
  const [readabilityScore, setReadabilityScore] = useState(0)
  const [seoScore, setSeoScore] = useState(0)
  const [engagementScore, setEngagementScore] = useState(0)

  // Header and footer states
  const [headerContent, setHeaderContent] = useState("")
  const [footerContent, setFooterContent] = useState("")
  const [headerImage, setHeaderImage] = useState("")
  const [showHeaderEditor, setShowHeaderEditor] = useState(false)
  const [showFooterEditor, setShowFooterEditor] = useState(false)

  // Mock AI analysis when content changes
  useEffect(() => {
    const currentContent = editorMode === "markdown" ? markdownContent : wysiwygContent
    if (currentContent.length > 50) {
      // Simulate AI analysis with random scores
      setContentScore(Math.floor(60 + Math.random() * 30))
      setReadabilityScore(Math.floor(50 + Math.random() * 40))
      setSeoScore(Math.floor(55 + Math.random() * 35))
      setEngagementScore(Math.floor(45 + Math.random() * 45))
    }
  }, [markdownContent, wysiwygContent, editorMode])

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

  const handleHeaderImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      // In a real app, you would upload this to a server
      // For demo purposes, we'll use a local URL
      const imageUrl = URL.createObjectURL(file)
      setHeaderImage(imageUrl)
    }
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

  // Get score color based on value
  const getScoreColor = (score: number) => {
    if (score >= 80) return "text-green-500"
    if (score >= 60) return "text-yellow-500"
    if (score >= 40) return "text-orange-500"
    return "text-red-500"
  }

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <SiteHeader />
      <main className="flex-1 relative py-6">
        <div className="container px-4 md:px-6 lg:px-8 max-w-screen-2xl mx-auto">
          {/* Grid background for retro-futuristic feel */}
          <div className="absolute inset-0 grid grid-cols-[repeat(40,1fr)] grid-rows-[repeat(40,1fr)] gap-px opacity-[0.02] pointer-events-none z-0">
            {Array.from({ length: 1600 }).map((_, i) => (
              <div key={i} className="bg-primary/40"></div>
            ))}
          </div>

          {/* Scanline effect */}
          <div className="absolute inset-0 bg-[linear-gradient(to_bottom,transparent_50%,rgba(0,0,0,0.02)_50%)] bg-[length:100%_4px] pointer-events-none z-0"></div>

          <div className="relative z-10">
            <div className="inline-block mb-6">
              <h1 className="text-3xl font-bold leading-tight tracking-tighter md:text-4xl lg:text-5xl bg-gradient-to-r from-pink-300 via-purple-300 to-indigo-300 bg-clip-text text-transparent relative">
                Create New Post
                <span className="absolute -inset-1 rounded-lg bg-gradient-to-r from-pink-300/10 via-purple-300/10 to-indigo-300/10 blur-lg -z-10"></span>
              </h1>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-[1fr_350px] gap-8">
              <div className="space-y-6">
                {/* Header/Footer Editor Button */}
                <div className="flex justify-end">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setShowHeaderEditor(true)}
                    className="border-primary/20 bg-background/80 backdrop-blur-sm mr-2"
                  >
                    <Edit className="h-4 w-4 mr-2" />
                    Edit Header
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setShowFooterEditor(true)}
                    className="border-primary/20 bg-background/80 backdrop-blur-sm"
                  >
                    <Edit className="h-4 w-4 mr-2" />
                    Edit Footer
                  </Button>
                </div>

                {/* Header Preview (if set) */}
                {(headerImage || headerContent) && (
                  <Card className="border-primary/20 bg-background/80 backdrop-blur-sm overflow-hidden">
                    {headerImage && (
                      <div className="w-full h-[220px] bg-muted relative">
                        <img
                          src={headerImage || "/placeholder.svg"}
                          alt="Post header"
                          className="w-full h-full object-cover"
                        />
                        <Button
                          variant="outline"
                          size="sm"
                          className="absolute top-2 right-2 bg-background/80 backdrop-blur-sm"
                          onClick={() => setShowHeaderEditor(true)}
                        >
                          <Edit className="h-4 w-4 mr-2" />
                          Edit
                        </Button>
                      </div>
                    )}
                    {headerContent && (
                      <div
                        className="p-4 prose prose-sm max-w-none"
                        dangerouslySetInnerHTML={{ __html: headerContent }}
                      />
                    )}
                  </Card>
                )}

                <Card className="border-primary/20 bg-background/80 backdrop-blur-sm">
                  <CardHeader className="pb-3">
                    <CardTitle>Post Details</CardTitle>
                    <CardDescription>Enter the basic information about your post</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
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
                  </CardContent>
                </Card>

                <Card className="border-primary/20 bg-background/80 backdrop-blur-sm">
                  <CardHeader className="pb-3">
                    <div className="flex justify-between items-center">
                      <div>
                        <CardTitle>Content</CardTitle>
                        <CardDescription>Write your post content</CardDescription>
                      </div>
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
                  </CardHeader>
                  <CardContent>
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
                        <div className="bg-background/40 backdrop-blur-sm rounded-lg p-1">
                          <MarkdownEditor value={markdownContent} onChange={setMarkdownContent} />
                        </div>
                      </TabsContent>
                      <TabsContent value="wysiwyg">
                        <div className="bg-background/40 backdrop-blur-sm rounded-lg p-1">
                          <WysiwygEditor value={wysiwygContent} onChange={setWysiwygContent} />
                        </div>
                      </TabsContent>
                    </Tabs>
                  </CardContent>
                  <CardFooter className="flex justify-end gap-4 pt-6 border-t border-primary/10">
                    <Button variant="outline" className="border-primary/20 bg-background/80 backdrop-blur-sm">
                      Save Draft
                    </Button>
                    <Button className="gap-2">
                      <Save className="h-4 w-4" />
                      Publish
                    </Button>
                  </CardFooter>
                </Card>

                {/* Footer Preview (if set) */}
                {footerContent && (
                  <Card className="border-primary/20 bg-background/80 backdrop-blur-sm">
                    <CardHeader className="pb-2 flex flex-row items-center justify-between">
                      <CardTitle className="text-sm">Post Footer</CardTitle>
                      <Button variant="ghost" size="sm" onClick={() => setShowFooterEditor(true)}>
                        <Edit className="h-4 w-4" />
                      </Button>
                    </CardHeader>
                    <CardContent>
                      <div className="prose prose-sm max-w-none" dangerouslySetInnerHTML={{ __html: footerContent }} />
                    </CardContent>
                  </Card>
                )}
              </div>

              {/* AI Tools Sidebar */}
              <div className="space-y-6">
                <Card className="border-primary/20 bg-background/80 backdrop-blur-sm sticky top-6">
                  <CardHeader className="pb-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Sparkles className="h-5 w-5 text-primary" />
                        <CardTitle>AI Writing Tools</CardTitle>
                      </div>
                      <Button variant="ghost" size="sm" onClick={() => setShowAITools(!showAITools)}>
                        {showAITools ? "Hide" : "Show"}
                      </Button>
                    </div>
                    <CardDescription>AI-powered assistance for your content</CardDescription>
                  </CardHeader>

                  {showAITools && (
                    <CardContent className="space-y-6">
                      {/* Content Quality Score */}
                      <div className="space-y-4">
                        <h3 className="text-sm font-medium flex items-center gap-2">
                          <BarChart className="h-4 w-4 text-primary" />
                          Content Quality Score
                        </h3>
                        <div className="space-y-1">
                          <div className="flex justify-between items-center">
                            <span className="text-sm">Overall</span>
                            <span className={`font-medium ${getScoreColor(contentScore)}`}>{contentScore}</span>
                          </div>
                          <Progress value={contentScore} className="h-2" />
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                          <div className="space-y-1">
                            <div className="flex justify-between items-center">
                              <span className="text-xs">Readability</span>
                              <span className={`text-xs font-medium ${getScoreColor(readabilityScore)}`}>
                                {readabilityScore}
                              </span>
                            </div>
                            <Progress value={readabilityScore} className="h-1.5" />
                          </div>

                          <div className="space-y-1">
                            <div className="flex justify-between items-center">
                              <span className="text-xs">SEO</span>
                              <span className={`text-xs font-medium ${getScoreColor(seoScore)}`}>{seoScore}</span>
                            </div>
                            <Progress value={seoScore} className="h-1.5" />
                          </div>

                          <div className="space-y-1">
                            <div className="flex justify-between items-center">
                              <span className="text-xs">Engagement</span>
                              <span className={`text-xs font-medium ${getScoreColor(engagementScore)}`}>
                                {engagementScore}
                              </span>
                            </div>
                            <Progress value={engagementScore} className="h-1.5" />
                          </div>

                          <div className="space-y-1">
                            <div className="flex justify-between items-center">
                              <span className="text-xs">Estimated Read</span>
                              <span className="text-xs font-medium">
                                {Math.max(1, Math.ceil(currentContent.split(/\s+/).length / 200))} min
                              </span>
                            </div>
                            <Progress
                              value={Math.min(100, currentContent.split(/\s+/).length / 10)}
                              className="h-1.5"
                            />
                          </div>
                        </div>
                      </div>

                      <Separator className="bg-primary/10" />

                      {/* AI Suggestions */}
                      <div className="space-y-3">
                        <h3 className="text-sm font-medium flex items-center gap-2">
                          <Lightbulb className="h-4 w-4 text-primary" />
                          AI Suggestions
                        </h3>

                        {currentContent.length < 50 ? (
                          <div className="text-sm text-muted-foreground text-center py-2">
                            Start writing to get AI-powered suggestions
                          </div>
                        ) : (
                          <div className="space-y-2">
                            <div className="bg-primary/5 border border-primary/10 rounded-md p-3">
                              <p className="text-sm">
                                Consider adding more descriptive language to your introduction to engage readers.
                              </p>
                              <Button size="sm" variant="outline" className="w-full mt-2 h-7 text-xs">
                                Apply
                              </Button>
                            </div>
                            <div className="bg-primary/5 border border-primary/10 rounded-md p-3">
                              <p className="text-sm">
                                Your content could benefit from more specific examples to support your points.
                              </p>
                              <Button size="sm" variant="outline" className="w-full mt-2 h-7 text-xs">
                                Apply
                              </Button>
                            </div>
                          </div>
                        )}
                      </div>

                      <Separator className="bg-primary/10" />

                      {/* AI Chat Assistant */}
                      <div className="space-y-3">
                        <h3 className="text-sm font-medium flex items-center gap-2">
                          <MessageSquare className="h-4 w-4 text-primary" />
                          AI Writing Assistant
                        </h3>
                        <div className="bg-primary/5 border border-primary/10 rounded-md p-3 h-[120px] overflow-y-auto">
                          <div className="text-xs text-primary/70 mb-2">AI Assistant</div>
                          <p className="text-sm">
                            How can I help with your writing today? Ask me for ideas, feedback, or help with specific
                            sections.
                          </p>
                        </div>
                        <div className="flex gap-2">
                          <Input placeholder="Ask the AI assistant..." className="text-sm h-8 border-primary/20" />
                          <Button size="sm" className="h-8 px-3">
                            Send
                          </Button>
                        </div>
                      </div>

                      <Separator className="bg-primary/10" />

                      <HeadlineGenerator content={currentContent} onSelectHeadline={handleHeadlineSelect} />

                      <Separator className="bg-primary/10" />

                      <AutoTagger content={currentContent} existingTags={tags} onTagsChange={handleTagsChange} />
                    </CardContent>
                  )}
                </Card>
              </div>
            </div>

            {showEmbedPicker && <EmbedPicker onClose={() => setShowEmbedPicker(false)} onEmbed={insertEmbed} />}

            {/* Header Editor Dialog */}
            <Dialog open={showHeaderEditor} onOpenChange={setShowHeaderEditor}>
              <DialogContent className="sm:max-w-[600px]">
                <DialogHeader>
                  <DialogTitle>Edit Post Header</DialogTitle>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <div className="space-y-2">
                    <Label htmlFor="header-image">Header Image</Label>
                    <div className="flex items-center gap-2">
                      <Input
                        id="header-image"
                        type="file"
                        accept="image/*"
                        onChange={handleHeaderImageUpload}
                        className="flex-1"
                      />
                      <Button variant="outline" size="sm" onClick={() => setHeaderImage("")} disabled={!headerImage}>
                        Clear
                      </Button>
                    </div>
                    <p className="text-xs text-muted-foreground">Recommended size: 1100px × 220px</p>

                    {headerImage && (
                      <div className="mt-2 relative w-full h-[120px] bg-muted rounded-md overflow-hidden">
                        <img
                          src={headerImage || "/placeholder.svg"}
                          alt="Header preview"
                          className="w-full h-full object-cover"
                        />
                      </div>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="header-content">Header Content (HTML supported)</Label>
                    <Textarea
                      id="header-content"
                      value={headerContent}
                      onChange={(e) => setHeaderContent(e.target.value)}
                      placeholder="Add custom HTML content for your post header"
                      className="min-h-[100px]"
                    />
                  </div>
                </div>
                <DialogFooter>
                  <Button variant="outline" onClick={() => setShowHeaderEditor(false)}>
                    Cancel
                  </Button>
                  <Button onClick={() => setShowHeaderEditor(false)}>Save Header</Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>

            {/* Footer Editor Dialog */}
            <Dialog open={showFooterEditor} onOpenChange={setShowFooterEditor}>
              <DialogContent className="sm:max-w-[600px]">
                <DialogHeader>
                  <DialogTitle>Edit Post Footer</DialogTitle>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <div className="space-y-2">
                    <Label htmlFor="footer-content">Footer Content (HTML supported)</Label>
                    <Textarea
                      id="footer-content"
                      value={footerContent}
                      onChange={(e) => setFooterContent(e.target.value)}
                      placeholder="Add custom HTML content for your post footer"
                      className="min-h-[150px]"
                    />
                    <p className="text-xs text-muted-foreground">
                      You can add subscription prompts, author bio, or other information that should appear at the end
                      of your post.
                    </p>
                  </div>

                  <div className="bg-muted/30 p-3 rounded-md">
                    <h4 className="text-sm font-medium mb-2">Example Footer Templates</h4>
                    <div className="space-y-2">
                      <Button
                        variant="outline"
                        size="sm"
                        className="w-full justify-start text-xs h-auto py-1.5 px-2"
                        onClick={() =>
                          setFooterContent(
                            '<p>If you enjoyed this post, consider <a href="#">subscribing to my newsletter</a> for more content like this.</p>',
                          )
                        }
                      >
                        Newsletter Subscription
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        className="w-full justify-start text-xs h-auto py-1.5 px-2"
                        onClick={() =>
                          setFooterContent(
                            '<div style="display: flex; align-items: center; gap: 12px;"><img src="/placeholder.svg?height=50&width=50" style="border-radius: 50%;" /><div><p><strong>About the Author</strong></p><p>Writer, developer, and tech enthusiast sharing insights on web development and design.</p></div></div>',
                          )
                        }
                      >
                        Author Bio
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        className="w-full justify-start text-xs h-auto py-1.5 px-2"
                        onClick={() =>
                          setFooterContent(
                            '<div style="background-color: rgba(var(--primary), 0.1); padding: 16px; border-radius: 8px;"><p><strong>Support My Work</strong></p><p>If you found this article helpful, you can <a href="#">buy me a coffee</a> to support more content like this.</p></div>',
                          )
                        }
                      >
                        Support Prompt
                      </Button>
                    </div>
                  </div>
                </div>
                <DialogFooter>
                  <Button variant="outline" onClick={() => setShowFooterEditor(false)}>
                    Cancel
                  </Button>
                  <Button onClick={() => setShowFooterEditor(false)}>Save Footer</Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>
        </div>
      </main>
      <SiteFooter />
    </div>
  )
}

