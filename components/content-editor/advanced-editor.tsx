"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { EditorToolbar } from "@/components/content-editor/editor-toolbar"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Sparkles } from "lucide-react"

interface AdvancedEditorProps {
  initialContent?: string
  onChange: (content: string) => void
  onImageUpload?: (file: File) => Promise<string>
}

export function AdvancedEditor({ initialContent = "", onChange, onImageUpload }: AdvancedEditorProps) {
  const [content, setContent] = useState(initialContent)
  const [editorMode, setEditorMode] = useState<"markdown" | "wysiwyg" | "preview">("markdown")
  const [isAIEnabled, setIsAIEnabled] = useState(true)
  const [showImageDialog, setShowImageDialog] = useState(false)
  const [showLinkDialog, setShowLinkDialog] = useState(false)
  const [showTableDialog, setShowTableDialog] = useState(false)
  const [activeAIFeatures, setActiveAIFeatures] = useState<string[]>([])
  const [aiSuggestions, setAiSuggestions] = useState<string[]>([])
  const editorRef = useRef<HTMLTextAreaElement>(null)

  // Media dialog states
  const [imageUrl, setImageUrl] = useState("")
  const [imageAlt, setImageAlt] = useState("")
  const [imageCaption, setImageCaption] = useState("")
  const [linkUrl, setLinkUrl] = useState("")
  const [linkText, setLinkText] = useState("")
  const [tableRows, setTableRows] = useState(3)
  const [tableCols, setTableCols] = useState(3)

  const [uploadedFile, setUploadedFile] = useState<File | null>(null)
  const [uploading, setUploading] = useState(false)
  const [uploadError, setUploadError] = useState("")

  // Handle content changes
  useEffect(() => {
    onChange(content)
  }, [content, onChange])

  // Enable AI analysis when content changes
  useEffect(() => {
    if (isAIEnabled && content.length > 50) {
      analyzeContentWithAI()
    }
  }, [content, isAIEnabled])

  // AI analysis of content
  const analyzeContentWithAI = () => {
    // In a real implementation, this would call an AI service API

    const features: string[] = []
    const suggestions: string[] = []

    // Simple mock analysis
    if (content.length < 100) {
      suggestions.push("Consider adding more detail to your introduction")
      features.push("length_enhancement")
    }

    if (!content.includes("# ") && !content.includes("## ")) {
      suggestions.push("Adding headers would improve readability")
      features.push("structure_enhancement")
    }

    if (content.split(" ").length > 100 && !content.includes("![")) {
      suggestions.push("Consider adding an image to break up your text")
      features.push("visual_enhancement")
    }

    // Check for complex sentences
    const sentences = content.match(/[^.!?]+[.!?]+/g) || []
    const longSentences = sentences.filter((s) => s.split(" ").length > 20).length

    if (longSentences > 2) {
      suggestions.push("Some of your sentences are quite long. Consider breaking them up for better readability")
      features.push("readability_enhancement")
    }

    setActiveAIFeatures(features)
    setAiSuggestions(suggestions)
  }

  // Format handler
  const handleFormatClick = (format: string, value?: any) => {
    if (!editorRef.current) return

    const textarea = editorRef.current
    const start = textarea.selectionStart
    const end = textarea.selectionEnd
    const selectedText = content.substring(start, end)

    let formattedText = ""
    let cursorOffset = 0

    switch (format) {
      case "bold":
        formattedText = `**${selectedText}**`
        cursorOffset = 2
        break
      case "italic":
        formattedText = `*${selectedText}*`
        cursorOffset = 1
        break
      case "underline":
        formattedText = `<u>${selectedText}</u>`
        cursorOffset = 3
        break
      case "heading":
        // Add specified heading level
        const hashmarks = "#".repeat(value)
        formattedText = `${hashmarks} ${selectedText}`
        cursorOffset = value + 1
        break
      case "bulletList":
        formattedText = selectedText
          .split("\n")
          .map((line) => `- ${line}`)
          .join("\n")
        break
      case "orderedList":
        formattedText = selectedText
          .split("\n")
          .map((line, i) => `${i + 1}. ${line}`)
          .join("\n")
        break
      case "quote":
        formattedText = selectedText
          .split("\n")
          .map((line) => `> ${line}`)
          .join("\n")
        break
      case "code":
        formattedText = "```\n" + selectedText + "\n```"
        break
      case "align":
        formattedText = `<div align="${value}">${selectedText}</div>`
        break
      case "datetime":
        const now = new Date()
        formattedText = `${now.toLocaleDateString()}`
        break
      case "readtime":
        // Calculate estimated read time
        const words = content.split(" ").length
        const minutes = Math.ceil(words / 200) // Assuming 200 words per minute
        formattedText = `${minutes} min read`
        break
      default:
        formattedText = selectedText
    }

    // Update content with formatted text
    const newContent = content.substring(0, start) + formattedText + content.substring(end)
    setContent(newContent)

    // Set cursor position
    setTimeout(() => {
      textarea.focus()
      textarea.setSelectionRange(
        start + formattedText.length - cursorOffset,
        start + formattedText.length - cursorOffset,
      )
    }, 0)
  }

  // Media insertion handlers
  const handleMediaClick = (type: string) => {
    switch (type) {
      case "image":
        setShowImageDialog(true)
        break
      case "link":
        setShowLinkDialog(true)
        break
      case "table":
        setShowTableDialog(true)
        break
      // Add more media types as needed
    }
  }

  // Layout handlers
  const handleLayoutClick = (layout: string) => {
    let layoutTemplate = ""

    switch (layout) {
      case "columns":
        layoutTemplate = `
<div class="grid grid-cols-2 gap-4">
  <div>
    <!-- Left column content -->
    Content for left column
  </div>
  <div>
    <!-- Right column content -->
    Content for right column
  </div>
</div>
`
        break
      case "leftSidebar":
        layoutTemplate = `
<div class="grid grid-cols-4 gap-4">
  <div class="col-span-1">
    <!-- Sidebar content -->
    Sidebar content
  </div>
  <div class="col-span-3">
    <!-- Main content -->
    Main content
  </div>
</div>
`
        break
      case "rightSidebar":
        layoutTemplate = `
<div class="grid grid-cols-4 gap-4">
  <div class="col-span-3">
    <!-- Main content -->
    Main content
  </div>
  <div class="col-span-1">
    <!-- Sidebar content -->
    Sidebar content
  </div>
</div>
`
        break
    }

    if (layoutTemplate) {
      const textarea = editorRef.current
      if (textarea) {
        const start = textarea.selectionStart
        const newContent = content.substring(0, start) + layoutTemplate + content.substring(start)
        setContent(newContent)
      }
    }
  }

  // Insert image from dialog
  const insertImage = async () => {
    if (uploadedFile && onImageUpload) {
      setUploading(true)
      setUploadError("")

      try {
        const uploadedUrl = await onImageUpload(uploadedFile)
        const imgMarkdown = `![${imageAlt}](${uploadedUrl})\n${imageCaption ? `<figcaption>${imageCaption}</figcaption>` : ""}`

        const textarea = editorRef.current
        if (textarea) {
          const start = textarea.selectionStart
          const newContent = content.substring(0, start) + imgMarkdown + content.substring(start)
          setContent(newContent)
        }

        setShowImageDialog(false)
        setImageUrl("")
        setImageAlt("")
        setImageCaption("")
        setUploadedFile(null)
      } catch (error) {
        setUploadError("Failed to upload image. Please try again.")
      } finally {
        setUploading(false)
      }
    } else if (imageUrl) {
      const imgMarkdown = `![${imageAlt}](${imageUrl})\n${imageCaption ? `<figcaption>${imageCaption}</figcaption>` : ""}`

      const textarea = editorRef.current
      if (textarea) {
        const start = textarea.selectionStart
        const newContent = content.substring(0, start) + imgMarkdown + content.substring(start)
        setContent(newContent)
      }

      setShowImageDialog(false)
      setImageUrl("")
      setImageAlt("")
      setImageCaption("")
    }
  }

  // Insert link from dialog
  const insertLink = () => {
    if (!linkUrl) return

    const linkMarkdown = `[${linkText || linkUrl}](${linkUrl})`

    const textarea = editorRef.current
    if (textarea) {
      const start = textarea.selectionStart
      const end = textarea.selectionEnd

      // If text is selected, use that as the link text
      if (start !== end) {
        const selectedText = content.substring(start, end)
        const newLinkMarkdown = `[${selectedText}](${linkUrl})`
        const newContent = content.substring(0, start) + newLinkMarkdown + content.substring(end)
        setContent(newContent)
      } else {
        // Otherwise use the provided link text or the URL itself
        const newContent = content.substring(0, start) + linkMarkdown + content.substring(start)
        setContent(newContent)
      }
    }

    setShowLinkDialog(false)
    setLinkUrl("")
    setLinkText("")
  }

  // Insert table from dialog
  const insertTable = () => {
    if (tableRows <= 0 || tableCols <= 0) return

    let tableMarkdown = "\n"

    // Create header row
    tableMarkdown += "|"
    for (let i = 0; i < tableCols; i++) {
      tableMarkdown += ` Header ${i + 1} |`
    }
    tableMarkdown += "\n"

    // Create separator row
    tableMarkdown += "|"
    for (let i = 0; i < tableCols; i++) {
      tableMarkdown += " --- |"
    }
    tableMarkdown += "\n"

    // Create data rows
    for (let row = 0; row < tableRows; row++) {
      tableMarkdown += "|"
      for (let col = 0; col < tableCols; col++) {
        tableMarkdown += ` Cell ${row + 1}-${col + 1} |`
      }
      tableMarkdown += "\n"
    }

    const textarea = editorRef.current
    if (textarea) {
      const start = textarea.selectionStart
      const newContent = content.substring(0, start) + tableMarkdown + content.substring(start)
      setContent(newContent)
    }

    setShowTableDialog(false)
    setTableRows(3)
    setTableCols(3)
  }

  // Handle file upload for images
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      setUploadedFile(file)
      setUploadError("")
    }
  }

  // Apply AI suggestion
  const applyAISuggestion = (suggestion: string) => {
    // In a real implementation, this would use more sophisticated logic
    // to actually implement the suggestion automatically

    // For now, we'll just append the suggestion as a comment
    const commentedSuggestion = `\n\n<!-- AI Suggestion: ${suggestion} -->\n\n`
    setContent(content + commentedSuggestion)
  }

  return (
    <div className="flex flex-col space-y-2 w-full">
      <EditorToolbar
        onFormatClick={handleFormatClick}
        onMediaClick={handleMediaClick}
        onLayoutClick={handleLayoutClick}
        onToggleAI={() => setIsAIEnabled(!isAIEnabled)}
        isAIEnabled={isAIEnabled}
        editorMode={editorMode}
        onEditorModeChange={setEditorMode}
      />

      <div className="relative">
        <Tabs value={editorMode} className="flex-1 w-full">
          <TabsContent value="markdown" className="mt-0 border-t-0">
            <Textarea
              ref={editorRef}
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="Start writing your content in Markdown..."
              className="min-h-[calc(100vh-300px)] resize-none font-mono text-sm rounded-t-none border-t-0 focus-visible:ring-0 focus-visible:ring-offset-0 bg-background/50"
            />
          </TabsContent>

          <TabsContent value="wysiwyg" className="mt-0 border-t-0">
            <div className="wysiwyg-editor min-h-[calc(100vh-300px)] border border-t-0 rounded-b-md p-4 focus:outline-none bg-background/50">
              {/* In a real implementation, this would be a rich text editor component */}
              <p className="text-muted-foreground">WYSIWYG editor would be integrated here</p>
              <Textarea
                value={content}
                onChange={(e) => setContent(e.target.value)}
                placeholder="Start writing..."
                className="min-h-[calc(100vh-350px)] resize-none border-0 focus-visible:ring-0 focus-visible:ring-offset-0 bg-transparent p-0"
              />
            </div>
          </TabsContent>

          <TabsContent value="preview" className="mt-0 border-t-0">
            <div className="preview-container min-h-[calc(100vh-300px)] border border-t-0 rounded-b-md p-4 prose prose-invert max-w-none bg-background/50">
              {/* Simple markdown preview - in a real implementation, this would use a proper Markdown renderer */}
              <div
                dangerouslySetInnerHTML={{
                  __html: content
                    .replace(/^### (.*$)/gim, "<h3>$1</h3>")
                    .replace(/^## (.*$)/gim, "<h2>$1</h2>")
                    .replace(/^# (.*$)/gim, "<h1>$1</h1>")
                    .replace(/\*\*(.*)\*\*/gim, "<strong>$1</strong>")
                    .replace(/\*(.*)\*/gim, "<em>$1</em>")
                    .replace(/!\[(.*?)\]$$(.*?)$$/gim, '<img alt="$1" src="$2" />')
                    .replace(/\[(.*?)\]$$(.*?)$$/gim, '<a href="$2">$1</a>')
                    .replace(/`([^`]+)`/gim, "<code>$1</code>")
                    .replace(/```([\s\S]*?)```/gim, "<pre><code>$1</code></pre>")
                    .replace(/^> (.*$)/gim, "<blockquote>$1</blockquote>")
                    .split("\n")
                    .join("<br />"),
                }}
              />
            </div>
          </TabsContent>
        </Tabs>

        {/* AI Suggestions Panel */}
        {isAIEnabled && aiSuggestions.length > 0 && (
          <div className="absolute right-4 bottom-4 w-72 bg-card border border-primary/30 rounded-lg shadow-lg p-4">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-1 text-primary">
                <Sparkles className="h-4 w-4" />
                <h3 className="text-sm font-medium">AI Suggestions</h3>
              </div>
              <Button variant="ghost" size="sm" className="h-7 w-7 p-0" onClick={() => setAiSuggestions([])}>
                ×
              </Button>
            </div>
            <div className="space-y-2">
              {aiSuggestions.map((suggestion, i) => (
                <div key={i} className="bg-background/50 p-2 rounded text-xs">
                  <p className="mb-1">{suggestion}</p>
                  <Button
                    variant="outline"
                    size="sm"
                    className="h-6 text-xs w-full mt-1"
                    onClick={() => applyAISuggestion(suggestion)}
                  >
                    Apply
                  </Button>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Image Insert Dialog */}
      <Dialog open={showImageDialog} onOpenChange={setShowImageDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Insert Image</DialogTitle>
          </DialogHeader>

          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="image-upload">Upload Image</Label>
              <Input id="image-upload" type="file" accept="image/*" onChange={handleFileChange} />
              {uploadedFile && <p className="text-xs text-muted-foreground">Selected: {uploadedFile.name}</p>}
            </div>

            <div className="grid gap-2">
              <Label htmlFor="image-url">Or paste image URL</Label>
              <Input
                id="image-url"
                placeholder="https://example.com/image.jpg"
                value={imageUrl}
                onChange={(e) => setImageUrl(e.target.value)}
              />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="image-alt">Alt Text (for accessibility)</Label>
              <Input
                id="image-alt"
                placeholder="Description of the image"
                value={imageAlt}
                onChange={(e) => setImageAlt(e.target.value)}
              />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="image-caption">Caption (optional)</Label>
              <Input
                id="image-caption"
                placeholder="Image caption"
                value={imageCaption}
                onChange={(e) => setImageCaption(e.target.value)}
              />
            </div>

            {uploadError && (
              <Alert variant="destructive">
                <AlertDescription>{uploadError}</AlertDescription>
              </Alert>
            )}
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setShowImageDialog(false)}>
              Cancel
            </Button>
            <Button onClick={insertImage} disabled={(!imageUrl && !uploadedFile) || uploading}>
              {uploading ? "Uploading..." : "Insert Image"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Link Insert Dialog */}
      <Dialog open={showLinkDialog} onOpenChange={setShowLinkDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Insert Link</DialogTitle>
          </DialogHeader>

          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="link-url">URL</Label>
              <Input
                id="link-url"
                placeholder="https://example.com"
                value={linkUrl}
                onChange={(e) => setLinkUrl(e.target.value)}
              />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="link-text">Link Text (optional)</Label>
              <Input
                id="link-text"
                placeholder="Click here"
                value={linkText}
                onChange={(e) => setLinkText(e.target.value)}
              />
              <p className="text-xs text-muted-foreground">Leave empty to use the URL or your selected text</p>
            </div>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setShowLinkDialog(false)}>
              Cancel
            </Button>
            <Button onClick={insertLink} disabled={!linkUrl}>
              Insert Link
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Table Insert Dialog */}
      <Dialog open={showTableDialog} onOpenChange={setShowTableDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Insert Table</DialogTitle>
          </DialogHeader>

          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label htmlFor="table-rows">Rows</Label>
                <Input
                  id="table-rows"
                  type="number"
                  min={1}
                  value={tableRows}
                  onChange={(e) => setTableRows(Number.parseInt(e.target.value) || 0)}
                />
              </div>

              <div className="grid gap-2">
                <Label htmlFor="table-cols">Columns</Label>
                <Input
                  id="table-cols"
                  type="number"
                  min={1}
                  value={tableCols}
                  onChange={(e) => setTableCols(Number.parseInt(e.target.value) || 0)}
                />
              </div>
            </div>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setShowTableDialog(false)}>
              Cancel
            </Button>
            <Button onClick={insertTable}>Insert Table</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}

