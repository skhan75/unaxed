"use client"

import { useState, useEffect } from "react"
import { useTheme } from "next-themes"
import { Sun, Moon, Book, Circle } from "lucide-react"
import { Button } from "@/components/ui/button"

export function ThemeSelector() {
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)
  const [isOpen, setIsOpen] = useState(false)

  // Avoid hydration mismatch
  useEffect(() => {
    setMounted(true)
  }, [])

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement
      if (!target.closest("[data-theme-selector]")) {
        setIsOpen(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  // Get the icon based on current theme
  const getThemeIcon = () => {
    if (!mounted) return <Moon className="h-[1.2rem] w-[1.2rem]" />

    switch (theme) {
      case "light":
        return <Sun className="h-[1.2rem] w-[1.2rem]" />
      case "dark":
        return <Moon className="h-[1.2rem] w-[1.2rem]" />
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
    <div className="relative" data-theme-selector>
      <Button
        variant="ghost"
        size="icon"
        className="h-9 w-9 rounded-full"
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Change theme"
        aria-expanded={isOpen}
        aria-haspopup="true"
      >
        {getThemeIcon()}
      </Button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-40 rounded-md bg-black border border-zinc-800 shadow-lg z-50">
          <div className="py-1">
            <button
              onClick={() => {
                setTheme("light")
                setIsOpen(false)
              }}
              className="flex items-center justify-between w-full px-3 py-2 text-sm text-white hover:bg-zinc-800"
            >
              <div className="flex items-center gap-2">
                <Sun className="h-4 w-4" />
                <span>Light</span>
              </div>
              {theme === "light" && <div className="h-2 w-2 rounded-full bg-purple-500" />}
            </button>

            <button
              onClick={() => {
                setTheme("dark")
                setIsOpen(false)
              }}
              className="flex items-center justify-between w-full px-3 py-2 text-sm text-white hover:bg-zinc-800"
            >
              <div className="flex items-center gap-2">
                <Moon className="h-4 w-4" />
                <span>Dark</span>
              </div>
              {theme === "dark" && <div className="h-2 w-2 rounded-full bg-purple-500" />}
            </button>

            <button
              onClick={() => {
                setTheme("reading")
                setIsOpen(false)
              }}
              className="flex items-center justify-between w-full px-3 py-2 text-sm text-white hover:bg-zinc-800"
            >
              <div className="flex items-center gap-2">
                <Book className="h-4 w-4" />
                <span>Reading Mode</span>
              </div>
              {theme === "reading" && <div className="h-2 w-2 rounded-full bg-purple-500" />}
            </button>

            <button
              onClick={() => {
                setTheme("system")
                setIsOpen(false)
              }}
              className="flex items-center justify-between w-full px-3 py-2 text-sm text-white hover:bg-zinc-800"
            >
              <div className="flex items-center gap-2">
                <Circle className="h-4 w-4" />
                <span>System</span>
              </div>
              {theme === "system" && <div className="h-2 w-2 rounded-full bg-purple-500" />}
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

