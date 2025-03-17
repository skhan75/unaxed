"use client"

import { useEffect, useState } from "react"
import { Book, Moon, Sun } from "lucide-react"
import { useTheme } from "next-themes"

import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

export function ThemeToggle() {
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  // Avoid hydration mismatch by only rendering after mount
  useEffect(() => {
    setMounted(true)
  }, [])

  // Get the icon based on current theme
  const getThemeIcon = () => {
    if (!mounted) return null

    switch (theme) {
      case "dark":
        return <Moon className="h-[1.2rem] w-[1.2rem]" />
      case "light":
        return <Sun className="h-[1.2rem] w-[1.2rem]" />
      case "reading":
        return <Book className="h-[1.2rem] w-[1.2rem]" />
      default:
        return <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
    }
  }

  if (!mounted) {
    return (
      <Button variant="ghost" size="icon" className="h-9 w-9 rounded-md">
        <span className="sr-only">Toggle theme</span>
      </Button>
    )
  }

  return (
    <TooltipProvider>
      <Tooltip>
        <DropdownMenu>
          <TooltipTrigger asChild>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="h-9 w-9 rounded-md relative group"
                aria-label="Toggle theme"
              >
                {getThemeIcon()}
                <span className="sr-only">Toggle theme</span>
                <span className="absolute -inset-1 rounded-md bg-primary/10 opacity-0 group-hover:opacity-100 transition-opacity"></span>
              </Button>
            </DropdownMenuTrigger>
          </TooltipTrigger>
          <TooltipContent side="bottom">
            <p>Change theme</p>
          </TooltipContent>
          <DropdownMenuContent align="end" className="border border-primary/20 bg-background/80 backdrop-blur-sm">
            <DropdownMenuItem onClick={() => setTheme("light")} className="flex items-center gap-2 cursor-pointer">
              <Sun className="h-4 w-4" />
              <span>Light</span>
              {theme === "light" && <span className="ml-auto h-1.5 w-1.5 rounded-full bg-primary"></span>}
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => setTheme("dark")} className="flex items-center gap-2 cursor-pointer">
              <Moon className="h-4 w-4" />
              <span>Dark</span>
              {theme === "dark" && <span className="ml-auto h-1.5 w-1.5 rounded-full bg-primary"></span>}
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => setTheme("reading")} className="flex items-center gap-2 cursor-pointer">
              <Book className="h-4 w-4" />
              <span>Reading Mode</span>
              {theme === "reading" && <span className="ml-auto h-1.5 w-1.5 rounded-full bg-primary"></span>}
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => setTheme("system")} className="flex items-center gap-2 cursor-pointer">
              <span className="flex h-4 w-4 items-center justify-center">
                <span className="h-3 w-3 rounded-full border border-current"></span>
              </span>
              <span>System</span>
              {theme === "system" && <span className="ml-auto h-1.5 w-1.5 rounded-full bg-primary"></span>}
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </Tooltip>
    </TooltipProvider>
  )
}

