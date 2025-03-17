"use client"

import type React from "react"

import { useState } from "react"
import { Bold, Italic, Link, List, ListOrdered, Quote, Code, Heading1, Heading2, Heading3 } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { Textarea } from "@/components/ui/textarea"

interface WysiwygEditorProps {
  value: string
  onChange: (value: string) => void
}

export function WysiwygEditor({ value, onChange }: WysiwygEditorProps) {
  const [selectionStart, setSelectionStart] = useState(0)
  const [selectionEnd, setSelectionEnd] = useState(0)

  const handleSelect = (e: React.SyntheticEvent<HTMLTextAreaElement>) => {
    const target = e.target as HTMLTextAreaElement
    setSelectionStart(target.selectionStart)
    setSelectionEnd(target.selectionEnd)
  }

  const insertFormat = (before: string, after = "") => {
    const newValue =
      value.substring(0, selectionStart) +
      before +
      value.substring(selectionStart, selectionEnd) +
      after +
      value.substring(selectionEnd)

    onChange(newValue)
  }

  const formatHandlers = {
    bold: () => insertFormat("**", "**"),
    italic: () => insertFormat("*", "*"),
    link: () => insertFormat("[", "](url)"),
    bulletList: () => insertFormat("\n- "),
    orderedList: () => insertFormat("\n1. "),
    quote: () => insertFormat("\n> "),
    code: () => insertFormat("`", "`"),
    codeBlock: () => insertFormat("\n```\n", "\n```"),
    h1: () => insertFormat("\n# "),
    h2: () => insertFormat("\n## "),
    h3: () => insertFormat("\n### "),
  }

  return (
    <div className="border rounded-md border-primary/20 bg-background/80 backdrop-blur-sm overflow-hidden">
      <div className="p-2 border-b border-primary/20 bg-muted/20 flex flex-wrap gap-1">
        <Button variant="ghost" size="icon" className="h-8 w-8" onClick={formatHandlers.bold} title="Bold">
          <Bold className="h-4 w-4" />
        </Button>
        <Button variant="ghost" size="icon" className="h-8 w-8" onClick={formatHandlers.italic} title="Italic">
          <Italic className="h-4 w-4" />
        </Button>
        <Button variant="ghost" size="icon" className="h-8 w-8" onClick={formatHandlers.link} title="Link">
          <Link className="h-4 w-4" />
        </Button>

        <Separator orientation="vertical" className="mx-1 h-8" />

        <Button variant="ghost" size="icon" className="h-8 w-8" onClick={formatHandlers.h1} title="Heading 1">
          <Heading1 className="h-4 w-4" />
        </Button>
        <Button variant="ghost" size="icon" className="h-8 w-8" onClick={formatHandlers.h2} title="Heading 2">
          <Heading2 className="h-4 w-4" />
        </Button>
        <Button variant="ghost" size="icon" className="h-8 w-8" onClick={formatHandlers.h3} title="Heading 3">
          <Heading3 className="h-4 w-4" />
        </Button>

        <Separator orientation="vertical" className="mx-1 h-8" />

        <Button variant="ghost" size="icon" className="h-8 w-8" onClick={formatHandlers.bulletList} title="Bullet List">
          <List className="h-4 w-4" />
        </Button>
        <Button
          variant="ghost"
          size="icon"
          className="h-8 w-8"
          onClick={formatHandlers.orderedList}
          title="Numbered List"
        >
          <ListOrdered className="h-4 w-4" />
        </Button>
        <Button variant="ghost" size="icon" className="h-8 w-8" onClick={formatHandlers.quote} title="Quote">
          <Quote className="h-4 w-4" />
        </Button>

        <Separator orientation="vertical" className="mx-1 h-8" />

        <Button variant="ghost" size="icon" className="h-8 w-8" onClick={formatHandlers.code} title="Inline Code">
          <Code className="h-4 w-4" />
        </Button>
        <Button variant="ghost" size="sm" className="h-8" onClick={formatHandlers.codeBlock} title="Code Block">
          Code Block
        </Button>
      </div>

      <Textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onSelect={handleSelect}
        placeholder="Write your content..."
        className="min-h-[400px] border-0 rounded-none resize-none focus-visible:ring-0 focus-visible:ring-offset-0"
      />

      <div className="px-4 py-2 border-t border-primary/20 bg-muted/20 text-xs text-muted-foreground">
        <span>Tip: You can use Markdown syntax directly in the editor</span>
      </div>
    </div>
  )
}

