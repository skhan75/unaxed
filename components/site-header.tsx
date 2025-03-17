"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Menu, Plus, Moon, Sun, Book } from "lucide-react"
import { useTheme } from "next-themes"
import { useState, useEffect, useCallback } from "react"

import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { UserAccountNav } from "@/components/user-account-nav"
import { UserAvatar, type UserInfo } from "@/components/user-avatar"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

// Mock current user - in a real app, this would come from an auth context
// Export a function to get the current user state that can be toggled
const mockUser: UserInfo = {
  id: 1,
  username: "alexjohnson",
  name: "Alex Johnson",
  email: "alex@example.com",
  avatar: "https://images.unsplash.com/photo-1568602471122-7832951cc4c5?q=80&w=250&auto=format&fit=crop",
  role: "author",
  verified: true,
}

// Create a simple client-side auth state management
export const useAuth = () => {
  const [currentUser, setCurrentUser] = useState<typeof mockUser | null>(null)
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    // In a real app, this would check for auth tokens/cookies
    // For our mock implementation, we'll check localStorage
    const isLoggedIn = localStorage.getItem("isLoggedIn") === "true"
    setCurrentUser(isLoggedIn ? mockUser : null)
    setIsLoaded(true)
  }, [])

  const login = () => {
    localStorage.setItem("isLoggedIn", "true")
    setCurrentUser(mockUser)
  }

  const logout = () => {
    localStorage.setItem("isLoggedIn", "false")
    setCurrentUser(null)
  }

  return { currentUser, isLoaded, login, logout }
}

export function SiteHeader() {
  const pathname = usePathname()
  const { setTheme, theme } = useTheme()
  const { currentUser, isLoaded, logout } = useAuth()
  const [mounted, setMounted] = useState(false)

  // Avoid hydration mismatch
  useEffect(() => {
    setMounted(true)
  }, [])

  const handleSignOut = useCallback(() => {
    logout()
    window.location.href = "/"
  }, [logout])

  return (
    <header className="sticky top-0 z-40 w-full border-b border-border/40 bg-background/95 backdrop-blur-sm">
      <div className="container flex h-16 items-center justify-between px-4 md:px-6 lg:px-8 max-w-screen-2xl mx-auto">
        {/* Logo Section */}
        <div className="flex items-center">
          <Link href="/" className="flex items-center space-x-2">
            <div className="relative h-8 w-8 flex items-center justify-center bg-black rounded-sm">
              <span className="text-white font-mono text-lg font-bold">&#62;_</span>
            </div>
            <span className="font-bold text-xl bg-gradient-to-r from-pink-300 via-purple-300 to-indigo-300 bg-clip-text text-transparent font-mono">
              UNAXED_
            </span>
          </Link>
        </div>

        {/* Right Section with User Controls */}
        <div className="flex items-center gap-2">
          {/* New Post Button - Only visible when user is logged in */}
          {isLoaded && currentUser && (
            <Button variant="default" size="sm" asChild className="mr-2 bg-white text-black hover:bg-white/90">
              <Link href="/create">
                <Plus className="mr-2 h-4 w-4" />
                New Post
              </Link>
            </Button>
          )}

          {/* Theme Toggle - Always visible for all users */}
          {mounted && (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="h-9 w-9">
                  {theme === "light" ? (
                    <Sun className="h-[1.2rem] w-[1.2rem]" />
                  ) : theme === "dark" ? (
                    <Moon className="h-[1.2rem] w-[1.2rem]" />
                  ) : (
                    <Book className="h-[1.2rem] w-[1.2rem]" />
                  )}
                  <span className="sr-only">Toggle theme</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={() => setTheme("light")} className="cursor-pointer">
                  <Sun className="mr-2 h-4 w-4" />
                  <span>Light</span>
                  {theme === "light" && <span className="ml-auto h-1.5 w-1.5 rounded-full bg-primary"></span>}
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setTheme("dark")} className="cursor-pointer">
                  <Moon className="mr-2 h-4 w-4" />
                  <span>Dark</span>
                  {theme === "dark" && <span className="ml-auto h-1.5 w-1.5 rounded-full bg-primary"></span>}
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setTheme("reading")} className="cursor-pointer">
                  <Book className="mr-2 h-4 w-4" />
                  <span>Reading</span>
                  {theme === "reading" && <span className="ml-auto h-1.5 w-1.5 rounded-full bg-primary"></span>}
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          )}

          {/* User Account Nav - Only visible when user is logged in */}
          {isLoaded && (
            <>
              {currentUser ? (
                <div className="relative z-50">
                  <UserAccountNav user={currentUser} />
                </div>
              ) : (
                <div className="hidden md:flex items-center gap-2">
                  <Button variant="ghost" size="sm" asChild>
                    <Link href="/auth/login">Sign In</Link>
                  </Button>
                  <Button size="sm" asChild>
                    <Link href="/auth/signup">Sign Up</Link>
                  </Button>
                </div>
              )}
            </>
          )}

          {/* Mobile Menu */}
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="md:hidden">
                <Menu className="h-5 w-5" />
                <span className="sr-only">Toggle menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[280px] sm:w-[350px]">
              <div className="flex items-center gap-2 mb-6">
                <Link href="/" className="flex items-center gap-2">
                  <div className="relative h-5 w-5 flex items-center justify-center bg-black rounded-sm">
                    <span className="text-white font-mono text-sm font-bold">&#62;_</span>
                  </div>
                  <span className="font-bold text-lg bg-gradient-to-r from-pink-300 via-purple-300 to-indigo-300 bg-clip-text text-transparent font-mono">
                    UNAXED_
                  </span>
                </Link>
              </div>
              <nav className="flex flex-col gap-4">
                {!currentUser && (
                  <>
                    <div className="border-t border-border my-4"></div>
                    <div className="flex flex-col gap-2">
                      <Button asChild size="sm" variant="default" className="w-full">
                        <Link href="/auth/signup">Sign Up</Link>
                      </Button>
                      <Button asChild size="sm" variant="outline" className="w-full">
                        <Link href="/auth/login">Sign In</Link>
                      </Button>
                    </div>
                  </>
                )}

                {currentUser && (
                  <>
                    <div className="border-t border-border my-4"></div>
                    <div className="flex items-center gap-3 mb-2">
                      <UserAvatar user={currentUser} className="h-8 w-8" />
                      <div className="flex flex-col">
                        <span className="text-sm font-medium">{currentUser.name}</span>
                        <span className="text-xs text-muted-foreground">@{currentUser.username}</span>
                      </div>
                    </div>
                    <Link
                      href="/dashboard"
                      className="flex items-center py-2 text-sm font-medium transition-colors hover:text-primary text-muted-foreground"
                    >
                      Dashboard
                    </Link>
                    <Link
                      href={`/profile/${currentUser.username}`}
                      className="flex items-center py-2 text-sm font-medium transition-colors hover:text-primary text-muted-foreground"
                    >
                      Profile
                    </Link>
                    <Link
                      href="/dashboard/settings"
                      className="flex items-center py-2 text-sm font-medium transition-colors hover:text-primary text-muted-foreground"
                    >
                      Settings
                    </Link>
                    <button
                      onClick={handleSignOut}
                      className="flex items-center py-2 text-sm font-medium transition-colors hover:text-primary text-muted-foreground text-left"
                    >
                      Sign Out
                    </button>
                  </>
                )}

                {/* Theme options in mobile menu */}
                <div className="border-t border-border my-4"></div>
                <div className="flex flex-col gap-2">
                  <span className="text-sm font-medium">Theme</span>
                  <div className="grid grid-cols-3 gap-2">
                    <Button
                      variant={theme === "light" ? "default" : "outline"}
                      size="sm"
                      onClick={() => setTheme("light")}
                      className="flex items-center justify-center"
                    >
                      <Sun className="h-4 w-4 mr-2" />
                      Light
                    </Button>
                    <Button
                      variant={theme === "dark" ? "default" : "outline"}
                      size="sm"
                      onClick={() => setTheme("dark")}
                      className="flex items-center justify-center"
                    >
                      <Moon className="h-4 w-4 mr-2" />
                      Dark
                    </Button>
                    <Button
                      variant={theme === "reading" ? "default" : "outline"}
                      size="sm"
                      onClick={() => setTheme("reading")}
                      className="flex items-center justify-center"
                    >
                      <Book className="h-4 w-4 mr-2" />
                      Read
                    </Button>
                  </div>
                </div>
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  )
}

