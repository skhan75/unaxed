"use client"

import { useState } from "react"
import { Code } from "lucide-react"

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Textarea } from "@/components/ui/textarea"

interface MarkdownEditorProps {
  value: string
  onChange: (value: string) => void
}

export function MarkdownEditor({ value, onChange }: MarkdownEditorProps) {
  const [activeTab, setActiveTab] = useState<"write" | "preview">("write")

  // Simple Markdown to HTML conversion for preview
  // In a real app, you'd use a proper Markdown parser like marked or remark
  const renderMarkdown = (markdown: string) => {
    let html = markdown
      .replace(/^### (.*$)/gim, "<h3>$1</h3>")
      .replace(/^## (.*$)/gim, "<h2>$1</h2>")
      .replace(/^# (.*$)/gim, "<h1>$1</h1>")
      .replace(/\*\*(.*)\*\*/gim, "<strong>$1</strong>")
      .replace(/\*(.*)\*/gim, "<em>$1</em>")
      .replace(/!\[(.*?)\]$$(.*?)$$/gim, "<img alt='$1' src='$2' />")
      .replace(/\[(.*?)\]$$(.*?)$$/gim, "<a href='$2'>$1</a>")
      .replace(/\n/gim, "<br />")

    // Handle code blocks
    html = html.replace(/```([\s\S]*?)```/g, "<pre><code>$1</code></pre>")

    // Handle inline code
    html = html.replace(/`([^`]+)`/g, "<code>$1</code>")

    return html
  }

  return (
    <div className="border rounded-md border-primary/20 bg-background/80 backdrop-blur-sm overflow-hidden">
      <Tabs defaultValue="write" onValueChange={(v) => setActiveTab(v as "write" | "preview")}>
        <div className="flex items-center justify-between px-4 py-2 border-b border-primary/20">
          <TabsList className="grid w-[200px] grid-cols-2">
            <TabsTrigger value="write">Write</TabsTrigger>
            <TabsTrigger value="preview">Preview</TabsTrigger>
          </TabsList>
          <div className="text-xs text-muted-foreground font-mono">
            {activeTab === "write" ? "MARKDOWN" : "RENDERED"}
          </div>
        </div>

        <TabsContent value="write" className="p-0 m-0">
          <Textarea
            value={value}
            onChange={(e) => onChange(e.target.value)}
            placeholder="Write your content in Markdown..."
            className="min-h-[400px] border-0 rounded-none resize-none focus-visible:ring-0 focus-visible:ring-offset-0 font-mono text-sm"
          />
        </TabsContent>

        <TabsContent value="preview" className="p-0 m-0">
          <div
            className="min-h-[400px] p-4 prose prose-invert max-w-none"
            dangerouslySetInnerHTML={{ __html: renderMarkdown(value) }}
          />
        </TabsContent>
      </Tabs>

      <div className="px-4 py-2 border-t border-primary/20 bg-muted/20 text-xs text-muted-foreground flex items-center gap-2">
        <Code className="h-3 w-3" />
        <span>Supports GitHub Flavored Markdown</span>
      </div>
    </div>
  )
}

