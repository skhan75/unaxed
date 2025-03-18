"use client"

import { useState } from "react"
import { Send } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { ContentEditor } from "@/components/content-editor"
import { MetadataEditor } from "@/components/content-editor/metadata-editor"
import { AIAssistPanel } from "@/components/content-editor/ai-assist-panel"
import { PublicationSelector } from "@/components/content-editor/publication-selector"
import { VisibilitySelector } from "@/components/content-editor/visibility-selector"

export default function CreatePostPage() {
  const [title, setTitle] = useState("")
  const [content, setContent] = useState("")
  const [excerpt, setExcerpt] = useState("")
  const [tags, setTags] = useState<string[]>([])
  const [publication, setPublication] = useState("personal")
  const [visibility, setVisibility] = useState("public")
  const [isSaving, setIsSaving] = useState(false)
  const [isPublishing, setIsPublishing] = useState(false)

  const handleSaveDraft = () => {
    setIsSaving(true)
    // Simulate API call
    setTimeout(() => {
      setIsSaving(false)
      console.log("Draft saved:", { title, excerpt, content, tags, publication, visibility })
    }, 1000)
  }

  const handlePublish = () => {
    setIsPublishing(true)
    // Simulate API call
    setTimeout(() => {
      setIsPublishing(false)
      console.log("Published:", { title, excerpt, content, tags, publication, visibility })
    }, 1000)
  }

  return (
    <div className="container mx-auto py-8">
      <div className="mb-8">
        <h1 className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-600">
          Create New Post
        </h1>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Post Details</CardTitle>
              <CardDescription>Enter the basic information about your post</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <label htmlFor="title" className="text-sm font-medium">
                  Title
                </label>
                <Input
                  id="title"
                  placeholder="Enter post title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <label htmlFor="excerpt" className="text-sm font-medium">
                  Excerpt
                </label>
                <Textarea
                  id="excerpt"
                  placeholder="Brief description of your post"
                  value={excerpt}
                  onChange={(e) => setExcerpt(e.target.value)}
                  className="resize-none"
                  rows={3}
                />
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Publication</label>
                  <PublicationSelector onSelect={setPublication} defaultValue={publication} />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Visibility</label>
                  <VisibilitySelector onSelect={setVisibility} defaultValue={visibility} />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Content</CardTitle>
              <CardDescription>Write your post content</CardDescription>
            </CardHeader>
            <CardContent>
              <ContentEditor
                content={content}
                onChange={setContent}
                onImageUpload={async (file) => {
                  // Simulate image upload
                  return new Promise((resolve) => {
                    setTimeout(() => {
                      resolve(`/placeholder.svg?height=400&width=600&text=${file.name}`)
                    }, 1500)
                  })
                }}
              />
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button variant="outline" onClick={handleSaveDraft} disabled={isSaving}>
                {isSaving ? "Saving..." : "Save Draft"}
              </Button>
              <Button onClick={handlePublish} disabled={isPublishing} className="gap-2">
                <Send className="h-4 w-4" />
                {isPublishing ? "Publishing..." : "Publish"}
              </Button>
            </CardFooter>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Metadata</CardTitle>
              <CardDescription>Add tags and additional metadata to your post</CardDescription>
            </CardHeader>
            <CardContent>
              <MetadataEditor tags={tags} onTagsChange={setTags} />
            </CardContent>
          </Card>
        </div>

        <div className="lg:col-span-1">
          <div className="sticky top-20">
            <AIAssistPanel content={content} title={title} tags={tags} />
          </div>
        </div>
      </div>
    </div>
  )
}

