"use client"

import type React from "react"

import { useState, useEffect } from "react"
import Link from "next/link"
import { useRouter, useSearchParams } from "next/navigation"
import { ArrowLeft, Axe, Eye, EyeOff, Github } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { SiteHeader, useAuth } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"

export default function SignupPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const redirectPath = searchParams.get("redirect") || "/" // Changed from "/dashboard" to "/"
  const { currentUser, isLoaded, login } = useAuth()

  useEffect(() => {
    // If user is already logged in, redirect to home page or specified redirect path
    if (isLoaded && currentUser) {
      router.push(redirectPath)
    }
  }, [isLoaded, currentUser, router, redirectPath])

  const [name, setName] = useState("")
  const [username, setUsername] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    // Simulate signup - in a real app, this would call an authentication API
    setTimeout(() => {
      setIsLoading(false)
      // Log the user in
      login()
      // Redirect to home page or specified redirect path after successful signup
      router.push(redirectPath)
    }, 1000)
  }

  // If still checking auth status, show loading
  if (!isLoaded) {
    return (
      <div className="flex min-h-screen flex-col bg-background">
        <SiteHeader />
        <main className="flex-1 container max-w-md py-12 flex items-center justify-center">
          <p>Loading...</p>
        </main>
        <SiteFooter />
      </div>
    )
  }

  // If already logged in, this will redirect, but we'll return null to avoid flash
  if (currentUser) {
    return null
  }

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <SiteHeader />
      <main className="flex-1 container max-w-md py-12 relative">
        {/* Grid background for retro-futuristic feel */}
        <div className="absolute inset-0 grid grid-cols-[repeat(40,1fr)] grid-rows-[repeat(40,1fr)] gap-px opacity-[0.02] pointer-events-none z-0">
          {Array.from({ length: 1600 }).map((_, i) => (
            <div key={i} className="bg-primary/40"></div>
          ))}
        </div>

        {/* Scanline effect */}
        <div className="absolute inset-0 bg-[linear-gradient(to_bottom,transparent_50%,rgba(0,0,0,0.02)_50%)] bg-[length:100%_4px] pointer-events-none z-0"></div>

        <div className="relative z-10">
          <Button variant="ghost" size="sm" asChild className="mb-6 group">
            <Link href="/">
              <ArrowLeft className="mr-2 h-4 w-4 group-hover:-translate-x-1 transition-transform" />
              Back to Home
            </Link>
          </Button>

          <div className="space-y-6">
            <div className="flex flex-col items-center text-center space-y-2">
              <div className="relative p-2">
                <Axe className="h-10 w-10 text-primary rotate-45" />
                <span className="absolute inset-0 rounded-full bg-primary/20 blur-md opacity-60"></span>
              </div>

              <div className="space-y-1">
                <h1 className="text-2xl font-bold">Create an account</h1>
                <p className="text-sm text-muted-foreground">Join Unaxed and start publishing your content</p>
              </div>
            </div>

            <div className="border border-primary/20 rounded-lg p-6 bg-background/60 backdrop-blur-sm">
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Full Name</Label>
                  <Input
                    id="name"
                    placeholder="John Doe"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                    className="border-primary/20 bg-background/80"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="username">Username</Label>
                  <Input
                    id="username"
                    placeholder="johndoe"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                    className="border-primary/20 bg-background/80"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="name@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="border-primary/20 bg-background/80"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="password">Password</Label>
                  <div className="relative">
                    <Input
                      id="password"
                      type={showPassword ? "text" : "password"}
                      placeholder="••••••••"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                      className="border-primary/20 bg-background/80 pr-10"
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      className="absolute right-0 top-0 h-full px-3 py-2 text-muted-foreground"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                      <span className="sr-only">{showPassword ? "Hide password" : "Show password"}</span>
                    </Button>
                  </div>
                </div>

                <Button type="submit" className="w-full" disabled={isLoading}>
                  {isLoading ? "Creating account..." : "Create account"}
                </Button>
              </form>

              <div className="mt-4 text-center text-sm">
                <span className="text-muted-foreground">Already have an account? </span>
                <Link href="/auth/login" className="text-primary hover:text-primary/80 transition-colors font-medium">
                  Sign in
                </Link>
              </div>

              <div className="relative my-6">
                <Separator />
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="bg-background px-2 text-xs text-muted-foreground">OR CONTINUE WITH</span>
                </div>
              </div>

              <Button variant="outline" className="w-full gap-2 border-primary/20 bg-background/80">
                <Github className="h-4 w-4" />
                GitHub
              </Button>
            </div>

            <div className="text-center text-xs text-muted-foreground">
              By creating an account, you agree to our{" "}
              <Link href="/terms" className="underline underline-offset-2 hover:text-primary">
                Terms of Service
              </Link>{" "}
              and{" "}
              <Link href="/privacy" className="underline underline-offset-2 hover:text-primary">
                Privacy Policy
              </Link>
              .
            </div>
          </div>
        </div>
      </main>
      <SiteFooter />
    </div>
  )
}

