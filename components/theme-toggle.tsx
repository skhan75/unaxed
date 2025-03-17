"use client"

import { useEffect, useState } from "react"
import { Book, Circle, Moon, Sun } from "lucide-react"
import { useTheme } from "next-themes"

import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

export function ThemeToggle() {
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  // Avoid hydration mismatch by only rendering after mount
  useEffect(() => {
    setMounted(true)
  }, [])

  // Get the icon based on current theme
  const getThemeIcon = () => {
    if (!mounted) return <Moon className="h-[1.2rem] w-[1.2rem]" />

    switch (theme) {
      case "dark":
        return <Moon className="h-[1.2rem] w-[1.2rem]" />
      case "light":
        return <Sun className="h-[1.2rem] w-[1.2rem]" />
      case "reading":
        return <Book className="h-[1.2rem] w-[1.2rem]" />
      default:
        return <Moon className="h-[1.2rem] w-[1.2rem]" />
    }
  }

  if (!mounted) {
    return (
      <Button variant="ghost" size="icon" className="h-9 w-9 rounded-full">
        <Moon className="h-[1.2rem] w-[1.2rem]" />
        <span className="sr-only">Toggle theme</span>
      </Button>
    )
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" className="h-9 w-9 rounded-full">
          {getThemeIcon()}
          <span className="sr-only">Toggle theme</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-40 bg-black/95 border-zinc-800">
        <DropdownMenuItem
          onClick={() => setTheme("light")}
          className="flex items-center justify-between cursor-pointer py-2 px-3 text-white hover:bg-zinc-800"
        >
          <div className="flex items-center gap-2">
            <Sun className="h-4 w-4" />
            <span>Light</span>
          </div>
          {theme === "light" && <div className="h-2 w-2 rounded-full bg-purple-500" />}
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() => setTheme("dark")}
          className="flex items-center justify-between cursor-pointer py-2 px-3 text-white hover:bg-zinc-800"
        >
          <div className="flex items-center gap-2">
            <Moon className="h-4 w-4" />
            <span>Dark</span>
          </div>
          {theme === "dark" && <div className="h-2 w-2 rounded-full bg-purple-500" />}
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() => setTheme("reading")}
          className="flex items-center justify-between cursor-pointer py-2 px-3 text-white hover:bg-zinc-800"
        >
          <div className="flex items-center gap-2">
            <Book className="h-4 w-4" />
            <span>Reading Mode</span>
          </div>
          {theme === "reading" && <div className="h-2 w-2 rounded-full bg-purple-500" />}
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() => setTheme("system")}
          className="flex items-center justify-between cursor-pointer py-2 px-3 text-white hover:bg-zinc-800"
        >
          <div className="flex items-center gap-2">
            <Circle className="h-4 w-4" />
            <span>System</span>
          </div>
          {theme === "system" && <div className="h-2 w-2 rounded-full bg-purple-500" />}
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

