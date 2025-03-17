"use client"

import { useState } from "react"
import { ChevronDown, GanttChart, Save, PenTool, Sparkles, X } from "lucide-react"

import { Button } from "@/components/ui/button"
import { AdvancedEditor } from "@/components/content-editor/advanced-editor"
import { MetadataEditor, type PostMetadata } from "@/components/content-editor/metadata-editor"
import { AiAssistPanel } from "@/components/content-editor/ai-assist-panel"
import { Separator } from "@/components/ui/separator"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Drawer, DrawerContent, DrawerTrigger } from "@/components/ui/drawer"
import { toast } from "@/hooks/use-toast"

interface ContentEditorProps {
  initialContent?: string
  onSave?: (content: string, metadata: PostMetadata) => Promise<void>
  onPublish?: (content: string, metadata: PostMetadata) => Promise<void>
}

export function ContentEditor({ initialContent = "", onSave, onPublish }: ContentEditorProps) {
  const [content, setContent] = useState(initialContent)
  const [metadata, setMetadata] = useState<PostMetadata>({
    title: "",
    excerpt: "",
    tags: [],
    category: "Technology",
    language: "en",
    publishDate: new Date().toISOString().split("T")[0],
    isPublished: false,
    visibility: "public",
    isPremium: false,
    allowComments: true,
  })
  const [isSaving, setIsSaving] = useState(false)
  const [isPublishing, setIsPublishing] = useState(false)
  const [showAiPanel, setShowAiPanel] = useState(true)
  const [activeTab, setActiveTab] = useState("content")

  // Handle content changes
  const handleContentChange = (newContent: string) => {
    setContent(newContent)
  }

  // Handle metadata changes
  const handleMetadataChange = (newMetadata: PostMetadata) => {
    setMetadata(newMetadata)
  }

  // Handle save
  const handleSave = async () => {
    if (!onSave) return

    setIsSaving(true)

    try {
      await onSave(content, metadata)
      toast({
        title: "Content saved",
        description: "Your content has been saved successfully.",
      })
    } catch (error) {
      toast({
        title: "Failed to save content",
        description: "There was an error saving your content. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsSaving(false)
    }
  }

  // Handle publish
  const handlePublish = async () => {
    if (!onPublish) return

    setIsPublishing(true)

    try {
      await onPublish(content, metadata)
      toast({
        title: "Content published",
        description: "Your content has been published successfully.",
      })
    } catch (error) {
      toast({
        title: "Failed to publish content",
        description: "There was an error publishing your content. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsPublishing(false)
    }
  }

  // Apply AI suggestion
  const handleApplySuggestion = (replacement: string) => {
    // In a real implementation, this would target the specific part of the content to replace
    // For demo purposes, we're just appending the suggestion
    setContent(`${content}\n\n${replacement}`)
  }

  // Handle AI completions from prompt
  const handleGenerateCompletion = (prompt: string, insertion: "replace" | "append") => {
    // In a real implementation, this would call an AI API to generate content
    // For demo purposes, we're just adding a placeholder

    const generatedText = `[Generated from prompt: "${prompt}"]`

    if (insertion === "append") {
      setContent(`${content}\n\n${generatedText}`)
    } else {
      // For "replace", in a real implementation we would replace a selection
      // Here we just append as a demonstration
      setContent(`${content}\n\n${generatedText}`)
    }
  }

  return (
    <div className="flex flex-col h-full md:flex-row md:gap-6">
      {/* Main content area */}
      <div className="flex-1 flex flex-col">
        {/* Desktop layout */}
        <div className="hidden md:flex md:flex-col md:h-full">
          <div className="mb-4 flex items-center justify-between">
            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-[400px]">
              <TabsList>
                <TabsTrigger value="content" className="flex items-center gap-1.5">
                  <PenTool className="h-4 w-4" />
                  <span>Editor</span>
                </TabsTrigger>
                <TabsTrigger value="metadata" className="flex items-center gap-1.5">
                  <GanttChart className="h-4 w-4" />
                  <span>Metadata</span>
                </TabsTrigger>
              </TabsList>
            </Tabs>

            <div className="flex items-center gap-2">
              <Button
                variant={showAiPanel ? "default" : "outline"}
                size="sm"
                className={`gap-1.5 ${showAiPanel ? "bg-primary/20 text-primary hover:bg-primary/30" : "border-primary/20"}`}
                onClick={() => setShowAiPanel(!showAiPanel)}
              >
                <Sparkles className="h-4 w-4" />
                <span>AI Assistant</span>
                {showAiPanel ? <X className="h-3.5 w-3.5 ml-1" /> : <ChevronDown className="h-3.5 w-3.5 ml-1" />}
              </Button>

              <Separator orientation="vertical" className="h-6" />

              <Button variant="outline" onClick={handleSave} disabled={isSaving} className="border-primary/20">
                {isSaving ? "Saving..." : "Save Draft"}
              </Button>

              <Button onClick={handlePublish} disabled={isPublishing}>
                <Save className="h-4 w-4 mr-2" />
                {isPublishing ? "Publishing..." : "Publish"}
              </Button>
            </div>
          </div>

          <div className="flex-1 flex overflow-hidden">
            <Tabs value={activeTab} className="flex-1 h-full">
              <TabsContent
                value="content"
                className="flex-1 h-full m-0 data-[state=active]:flex data-[state=active]:flex-col"
              >
                <div className="flex-1 flex">
                  <div className={`flex-1 ${showAiPanel ? "mr-4" : ""}`}>
                    <AdvancedEditor
                      initialContent={content}
                      onChange={handleContentChange}
                      onImageUpload={async (file) => {
                        // Mock image upload - would integrate with a real image service
                        return URL.createObjectURL(file)
                      }}
                    />
                  </div>

                  {showAiPanel && (
                    <div className="w-[350px]">
                      <AiAssistPanel
                        content={content}
                        onApplySuggestion={handleApplySuggestion}
                        onGenerateCompletion={handleGenerateCompletion}
                      />
                    </div>
                  )}
                </div>
              </TabsContent>

              <TabsContent
                value="metadata"
                className="m-0 flex-1 max-w-full overflow-y-auto data-[state=active]:flex data-[state=active]:flex-col"
              >
                <div className="p-4 bg-card/30 border border-primary/10 rounded-lg">
                  <MetadataEditor
                    metadata={metadata}
                    onChange={handleMetadataChange}
                    onGenerateReadTime={async () => {
                      // Calculate estimated read time based on content length
                      const words = content.split(/\s+/).length
                      const minutes = Math.ceil(words / 200) // Assuming 200 words per minute
                      return `${minutes} min read`
                    }}
                    onKeywordSuggestions={async () => {
                      // Mock keyword generation
                      return ["webdev", "technology", "coding", "tutorial", "nextjs"]
                    }}
                  />
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </div>

        {/* Mobile layout */}
        <div className="md:hidden flex flex-col h-full">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="flex-1">
            <TabsList className="grid grid-cols-2">
              <TabsTrigger value="content" className="flex items-center justify-center gap-1.5">
                <PenTool className="h-4 w-4" />
                <span>Editor</span>
              </TabsTrigger>
              <TabsTrigger value="metadata" className="flex items-center justify-center gap-1.5">
                <GanttChart className="h-4 w-4" />
                <span>Metadata</span>
              </TabsTrigger>
            </TabsList>

            <TabsContent value="content" className="m-0 flex-1 data-[state=active]:flex data-[state=active]:flex-col">
              <div className="flex-1">
                <AdvancedEditor
                  initialContent={content}
                  onChange={handleContentChange}
                  onImageUpload={async (file) => {
                    // Mock image upload - would integrate with a real image service
                    return URL.createObjectURL(file)
                  }}
                />
              </div>

              <div className="mt-4 flex items-center justify-between">
                <Drawer>
                  <DrawerTrigger asChild>
                    <Button variant="outline" size="sm" className="gap-1.5 border-primary/20">
                      <Sparkles className="h-4 w-4" />
                      <span>AI Assistant</span>
                    </Button>
                  </DrawerTrigger>
                  <DrawerContent className="h-[80vh]">
                    <div className="h-full px-4 pb-8 pt-4">
                      <AiAssistPanel
                        content={content}
                        onApplySuggestion={handleApplySuggestion}
                        onGenerateCompletion={handleGenerateCompletion}
                      />
                    </div>
                  </DrawerContent>
                </Drawer>

                <div className="flex items-center gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={handleSave}
                    disabled={isSaving}
                    className="border-primary/20"
                  >
                    {isSaving ? "Saving..." : "Save"}
                  </Button>

                  <Button size="sm" onClick={handlePublish} disabled={isPublishing}>
                    {isPublishing ? "Publishing..." : "Publish"}
                  </Button>
                </div>
              </div>
            </TabsContent>

            <TabsContent
              value="metadata"
              className="m-0 p-4 flex-1 data-[state=active]:flex data-[state=active]:flex-col"
            >
              <div className="bg-card/30 border border-primary/10 rounded-lg p-4">
                <MetadataEditor
                  metadata={metadata}
                  onChange={handleMetadataChange}
                  onGenerateReadTime={async () => {
                    // Calculate estimated read time based on content length
                    const words = content.split(/\s+/).length
                    const minutes = Math.ceil(words / 200) // Assuming 200 words per minute
                    return `${minutes} min read`
                  }}
                  onKeywordSuggestions={async () => {
                    // Mock keyword generation
                    return ["webdev", "technology", "coding", "tutorial", "nextjs"]
                  }}
                />
              </div>

              <div className="mt-6 flex justify-end gap-2">
                <Button variant="outline" onClick={handleSave} disabled={isSaving} className="border-primary/20">
                  {isSaving ? "Saving..." : "Save Draft"}
                </Button>

                <Button onClick={handlePublish} disabled={isPublishing}>
                  <Save className="h-4 w-4 mr-2" />
                  {isPublishing ? "Publishing..." : "Publish"}
                </Button>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  )
}

