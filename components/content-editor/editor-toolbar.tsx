"use client"

import {
  Bold,
  Italic,
  Underline,
  Link,
  List,
  ListOrdered,
  Quote,
  Code,
  Heading1,
  Heading2,
  Heading3,
  Image,
  Table,
  AlignLeft,
  AlignCenter,
  AlignRight,
  Type,
  Calendar,
  Clock,
  ChevronDown,
  Layout,
  Columns,
  FileImage,
  FileVideo,
  FileAudio,
  Smile,
  PanelLeft,
  PanelRight,
  Sparkles,
  Braces,
  Paperclip,
} from "lucide-react"

import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { TooltipProvider, Tooltip, TooltipTrigger, TooltipContent } from "@/components/ui/tooltip"

interface EditorToolbarProps {
  onFormatClick: (format: string, value?: any) => void
  onMediaClick: (type: string) => void
  onLayoutClick: (layout: string) => void
  onToggleAI: () => void
  isAIEnabled: boolean
  editorMode: "markdown" | "wysiwyg" | "preview"
  onEditorModeChange: (mode: "markdown" | "wysiwyg" | "preview") => void
}

export function EditorToolbar({
  onFormatClick,
  onMediaClick,
  onLayoutClick,
  onToggleAI,
  isAIEnabled,
  editorMode,
  onEditorModeChange,
}: EditorToolbarProps) {
  return (
    <TooltipProvider delayDuration={300}>
      <div className="border border-border rounded-t-lg bg-card/50 backdrop-blur-sm px-2 py-1 flex flex-wrap items-center gap-1 sticky top-16 z-10">
        <div className="flex-1 flex flex-wrap items-center gap-1">
          {/* Text Formatting Section */}
          <Tooltip>
            <TooltipTrigger asChild>
              <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => onFormatClick("bold")}>
                <Bold className="h-4 w-4" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Bold (Ctrl+B)</p>
            </TooltipContent>
          </Tooltip>

          <Tooltip>
            <TooltipTrigger asChild>
              <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => onFormatClick("italic")}>
                <Italic className="h-4 w-4" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Italic (Ctrl+I)</p>
            </TooltipContent>
          </Tooltip>

          <Tooltip>
            <TooltipTrigger asChild>
              <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => onFormatClick("underline")}>
                <Underline className="h-4 w-4" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Underline (Ctrl+U)</p>
            </TooltipContent>
          </Tooltip>

          <Separator orientation="vertical" className="mx-1 h-6" />

          {/* Headings Dropdown */}
          <DropdownMenu>
            <Tooltip>
              <TooltipTrigger asChild>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="sm" className="h-8 gap-1">
                    <Type className="h-4 w-4" />
                    <span className="sr-only md:not-sr-only md:inline text-xs">Heading</span>
                    <ChevronDown className="h-3.5 w-3.5 opacity-70" />
                  </Button>
                </DropdownMenuTrigger>
              </TooltipTrigger>
              <TooltipContent>
                <p>Headings</p>
              </TooltipContent>
            </Tooltip>
            <DropdownMenuContent className="w-56">
              <DropdownMenuLabel>Text Style</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuGroup>
                <DropdownMenuItem onClick={() => onFormatClick("heading", 1)}>
                  <Heading1 className="mr-2 h-4 w-4" />
                  <span>Heading 1</span>
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => onFormatClick("heading", 2)}>
                  <Heading2 className="mr-2 h-4 w-4" />
                  <span>Heading 2</span>
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => onFormatClick("heading", 3)}>
                  <Heading3 className="mr-2 h-4 w-4" />
                  <span>Heading 3</span>
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => onFormatClick("paragraph")}>
                  <Type className="mr-2 h-4 w-4" />
                  <span>Normal text</span>
                </DropdownMenuItem>
              </DropdownMenuGroup>
            </DropdownMenuContent>
          </DropdownMenu>

          <Separator orientation="vertical" className="mx-1 h-6" />

          {/* Lists */}
          <Tooltip>
            <TooltipTrigger asChild>
              <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => onFormatClick("bulletList")}>
                <List className="h-4 w-4" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Bullet List</p>
            </TooltipContent>
          </Tooltip>

          <Tooltip>
            <TooltipTrigger asChild>
              <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => onFormatClick("orderedList")}>
                <ListOrdered className="h-4 w-4" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Numbered List</p>
            </TooltipContent>
          </Tooltip>

          <Separator orientation="vertical" className="mx-1 h-6" />

          {/* Block elements */}
          <Tooltip>
            <TooltipTrigger asChild>
              <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => onFormatClick("quote")}>
                <Quote className="h-4 w-4" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Blockquote</p>
            </TooltipContent>
          </Tooltip>

          <Tooltip>
            <TooltipTrigger asChild>
              <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => onFormatClick("code")}>
                <Code className="h-4 w-4" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Code Block</p>
            </TooltipContent>
          </Tooltip>

          <Separator orientation="vertical" className="mx-1 h-6" />

          {/* Text alignment */}
          <Tooltip>
            <TooltipTrigger asChild>
              <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => onFormatClick("align", "left")}>
                <AlignLeft className="h-4 w-4" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Align Left</p>
            </TooltipContent>
          </Tooltip>

          <Tooltip>
            <TooltipTrigger asChild>
              <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => onFormatClick("align", "center")}>
                <AlignCenter className="h-4 w-4" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Align Center</p>
            </TooltipContent>
          </Tooltip>

          <Tooltip>
            <TooltipTrigger asChild>
              <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => onFormatClick("align", "right")}>
                <AlignRight className="h-4 w-4" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Align Right</p>
            </TooltipContent>
          </Tooltip>

          <Separator orientation="vertical" className="mx-1 h-6 hidden md:block" />

          {/* Media Section - Desktop*/}
          <div className="hidden md:flex items-center gap-1">
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => onMediaClick("image")}>
                  <Image className="h-4 w-4" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Insert Image</p>
              </TooltipContent>
            </Tooltip>

            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => onMediaClick("table")}>
                  <Table className="h-4 w-4" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Insert Table</p>
              </TooltipContent>
            </Tooltip>

            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => onMediaClick("link")}>
                  <Link className="h-4 w-4" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Insert Link</p>
              </TooltipContent>
            </Tooltip>
          </div>

          {/* Media Section - Mobile dropdown */}
          <div className="md:hidden">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="sm" className="h-8 gap-1">
                  <Paperclip className="h-4 w-4" />
                  <span className="sr-only md:not-sr-only md:inline text-xs">Insert</span>
                  <ChevronDown className="h-3.5 w-3.5 opacity-70" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuLabel>Insert Content</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => onMediaClick("image")}>
                  <FileImage className="mr-2 h-4 w-4" />
                  <span>Image</span>
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => onMediaClick("video")}>
                  <FileVideo className="mr-2 h-4 w-4" />
                  <span>Video</span>
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => onMediaClick("audio")}>
                  <FileAudio className="mr-2 h-4 w-4" />
                  <span>Audio</span>
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => onMediaClick("emoji")}>
                  <Smile className="mr-2 h-4 w-4" />
                  <span>Emoji</span>
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => onMediaClick("table")}>
                  <Table className="mr-2 h-4 w-4" />
                  <span>Table</span>
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => onMediaClick("code")}>
                  <Braces className="mr-2 h-4 w-4" />
                  <span>Code Block</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

          <Separator orientation="vertical" className="mx-1 h-6 hidden md:block" />

          {/* Layouts Section - Desktop */}
          <div className="hidden md:flex items-center gap-1">
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => onLayoutClick("full")}>
                  <Layout className="h-4 w-4" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Full Width</p>
              </TooltipContent>
            </Tooltip>

            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => onLayoutClick("columns")}>
                  <Columns className="h-4 w-4" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Two Columns</p>
              </TooltipContent>
            </Tooltip>

            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => onLayoutClick("leftSidebar")}>
                  <PanelLeft className="h-4 w-4" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Left Sidebar</p>
              </TooltipContent>
            </Tooltip>

            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => onLayoutClick("rightSidebar")}>
                  <PanelRight className="h-4 w-4" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Right Sidebar</p>
              </TooltipContent>
            </Tooltip>
          </div>

          {/* Time & Date Metadata */}
          <div className="hidden md:flex items-center gap-1">
            <Separator orientation="vertical" className="mx-1 h-6" />

            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => onFormatClick("datetime")}>
                  <Calendar className="h-4 w-4" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Add Date</p>
              </TooltipContent>
            </Tooltip>

            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => onFormatClick("readtime")}>
                  <Clock className="h-4 w-4" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Add Reading Time</p>
              </TooltipContent>
            </Tooltip>
          </div>
        </div>

        {/* AI Assistant Toggle */}
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              variant={isAIEnabled ? "default" : "outline"}
              size="sm"
              className={`gap-1 ${isAIEnabled ? "bg-primary/20 text-primary hover:bg-primary/30" : "border-primary/20 bg-background/80"}`}
              onClick={onToggleAI}
            >
              <Sparkles className="h-3.5 w-3.5" />
              <span className="hidden md:inline">AI Assistant</span>
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            <p>{isAIEnabled ? "Disable" : "Enable"} AI Assistant</p>
          </TooltipContent>
        </Tooltip>

        {/* Editor Mode Selector */}
        <Tabs value={editorMode} onValueChange={(val) => onEditorModeChange(val as any)} className="hidden md:flex">
          <TabsList className="h-8 p-0.5">
            <TabsTrigger value="markdown" className="h-7 px-2 text-xs">
              Markdown
            </TabsTrigger>
            <TabsTrigger value="wysiwyg" className="h-7 px-2 text-xs">
              WYSIWYG
            </TabsTrigger>
            <TabsTrigger value="preview" className="h-7 px-2 text-xs">
              Preview
            </TabsTrigger>
          </TabsList>
        </Tabs>
      </div>
    </TooltipProvider>
  )
}

