"use client"

import type React from "react"

import { useState } from "react"
import { Send } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useToast } from "@/hooks/use-toast"

interface SubscribeFormProps {
  authorId: string
  authorName: string
  compact?: boolean
  className?: string
}

export function SubscribeForm({ authorId, authorName, compact = false, className = "" }: SubscribeFormProps) {
  const [email, setEmail] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const { toast } = useToast()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!email || !email.includes("@")) {
      toast({
        title: "Invalid email",
        description: "Please enter a valid email address.",
        variant: "destructive",
      })
      return
    }

    setIsSubmitting(true)

    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false)
      setEmail("")
      toast({
        title: "Subscribed!",
        description: `You've successfully subscribed to ${authorName}'s newsletter.`,
      })
    }, 1000)
  }

  if (compact) {
    return (
      <form onSubmit={handleSubmit} className={`flex w-full gap-2 ${className}`}>
        <Input
          type="email"
          placeholder="Your email address"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="flex-1"
        />
        <Button type="submit" disabled={isSubmitting} size="sm">
          {isSubmitting ? "Subscribing..." : "Subscribe"}
        </Button>
      </form>
    )
  }

  return (
    <div className={`rounded-lg border bg-card p-6 ${className}`}>
      <div className="mb-4">
        <h3 className="text-lg font-semibold">Subscribe to {authorName}'s newsletter</h3>
        <p className="text-sm text-muted-foreground">Get the latest posts delivered right to your inbox</p>
      </div>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <Input
          type="email"
          placeholder="Your email address"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <Button type="submit" disabled={isSubmitting} className="w-full gap-2">
          <Send className="h-4 w-4" />
          {isSubmitting ? "Subscribing..." : "Subscribe"}
        </Button>
      </form>
    </div>
  )
}

