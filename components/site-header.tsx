"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Menu, Sun, Moon, Book, PenLine } from "lucide-react"
import { useState, useEffect, useCallback } from "react"

import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { UserAccountNav } from "@/components/user-account-nav"
import { UserAvatar, type UserInfo } from "@/components/user-avatar"
import { ThemeSelector } from "@/components/theme-selector"
import { useTheme } from "next-themes"

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
  const { currentUser, isLoaded, logout } = useAuth()
  const { setTheme, theme } = useTheme()

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
            <Link href="/create" className="mr-2">
              <div className="group relative flex items-center justify-center">
                <div className="absolute inset-0 rounded-full bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 opacity-80 blur-sm transition-all duration-300 group-hover:opacity-100 group-hover:blur-md dark:from-pink-600 dark:via-purple-600 dark:to-indigo-600 reading:from-amber-600 reading:via-orange-500 reading:to-yellow-600"></div>
                <div className="relative flex h-9 items-center justify-center rounded-full bg-background px-4 shadow-sm">
                  <PenLine className="h-4 w-4 mr-1.5 text-foreground transition-transform duration-200 group-hover:rotate-12" />
                  <span className="text-sm font-medium text-foreground">Write</span>
                </div>
              </div>
            </Link>
          )}

          {/* Theme Selector - Always visible for all users */}
          <ThemeSelector />

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
                    <div className="border-t border-border my-4"></div>
                    <Link
                      href="/publications"
                      className="flex items-center py-2 text-sm font-medium transition-colors hover:text-primary text-muted-foreground"
                    >
                      Publications
                    </Link>
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
                      href="/publications"
                      className="flex items-center py-2 text-sm font-medium transition-colors hover:text-primary text-muted-foreground"
                    >
                      Publications
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
                  <div className="flex flex-col gap-2">
                    <div className="grid grid-cols-3 gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setTheme("light")}
                        className="flex items-center justify-center"
                      >
                        <Sun className="h-4 w-4 mr-2" />
                        Light
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setTheme("dark")}
                        className="flex items-center justify-center"
                      >
                        <Moon className="h-4 w-4 mr-2" />
                        Dark
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setTheme("reading")}
                        className="flex items-center justify-center"
                      >
                        <Book className="h-4 w-4 mr-2" />
                        Read
                      </Button>
                    </div>
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

