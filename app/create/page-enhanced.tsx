"use client"

import Link from "next/link"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import { ArrowLeft } from "lucide-react"

import { Button } from "@/components/ui/button"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { ContentEditor } from "@/components/content-editor"
import type { PostMetadata } from "@/components/content-editor/metadata-editor"
import { useToast } from "@/hooks/use-toast"

export default function CreatePostEnhanced() {
  const router = useRouter()
  const { toast } = useToast()
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Check if user is logged in
    const loggedIn = localStorage.getItem("isLoggedIn") === "true"
    setIsLoggedIn(loggedIn)
    setIsLoading(false)

    // If not logged in, redirect to login page
    if (!loggedIn) {
      router.push("/auth/login?redirect=/create")
    }
  }, [router])

  // Mock save handler
  const handleSave = async (content: string, metadata: PostMetadata) => {
    // Simulate API call delay
    await new Promise((resolve) => setTimeout(resolve, 1000))

    // Log what would be saved
    console.log("Saving content:", { content, metadata })

    // Return success
    return true
  }

  // Mock publish handler
  const handlePublish = async (content: string, metadata: PostMetadata) => {
    // Validate content and metadata
    if (!content.trim()) {
      throw new Error("Content cannot be empty")
    }

    if (!metadata.title.trim()) {
      throw new Error("Title cannot be empty")
    }

    // Simulate API call delay
    await new Promise((resolve) => setTimeout(resolve, 1500))

    // Log what would be published
    console.log("Publishing content:", { content, metadata })

    // Redirect to dashboard after successful publish
    setTimeout(() => {
      toast({
        title: "Post published successfully!",
        description: "Your content is now live and visible to readers.",
      })
      router.push("/dashboard")
    }, 500)

    // Return success
    return true
  }

  // Show loading state while checking auth
  if (isLoading) {
    return (
      <div className="flex min-h-screen flex-col bg-background">
        <SiteHeader />
        <main className="flex-1 container max-w-screen-2xl mx-auto px-4 md:px-6 lg:px-8 py-12 flex items-center justify-center">
          <p>Loading...</p>
        </main>
        <SiteFooter />
      </div>
    )
  }

  // If not logged in, this will redirect, but we'll return null to avoid flash
  if (!isLoggedIn) {
    return null
  }

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <SiteHeader />
      <main className="flex-1 relative py-12">
        <div className="container px-4 md:px-6 lg:px-8 max-w-screen-2xl mx-auto">
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

            <div className="inline-block mb-6">
              <h1 className="text-3xl font-bold leading-tight tracking-tighter md:text-4xl lg:text-5xl bg-gradient-to-r from-pink-300 via-purple-300 to-indigo-300 bg-clip-text text-transparent relative">
                Create New Post
                <span className="absolute -inset-1 rounded-lg bg-gradient-to-r from-pink-300/10 via-purple-300/10 to-indigo-300/10 blur-lg -z-10"></span>
              </h1>
            </div>

            <div className="h-[calc(100vh-240px)]">
              <ContentEditor onSave={handleSave} onPublish={handlePublish} />
            </div>
          </div>
        </div>
      </main>
      <SiteFooter />
    </div>
  )
}

