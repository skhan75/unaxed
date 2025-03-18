"use client"

import { useState } from "react"
import { UserPlus, UserCheck } from "lucide-react"

import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

interface FollowButtonProps {
  userId: number | string
  initialFollowing?: boolean
  variant?: "default" | "compact"
  className?: string
}

export function FollowButton({ userId, initialFollowing = false, variant = "default", className }: FollowButtonProps) {
  const [isFollowing, setIsFollowing] = useState(initialFollowing)
  const [isLoading, setIsLoading] = useState(false)

  const handleFollow = async () => {
    setIsLoading(true)

    // Simulate API call - in a real app, this would call an API
    setTimeout(() => {
      setIsFollowing(!isFollowing)
      setIsLoading(false)
    }, 500)
  }

  if (variant === "compact") {
    return (
      <button
        className={cn(
          "inline-flex items-center justify-center text-xs font-medium transition-colors",
          "focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring",
          isFollowing
            ? "text-primary hover:bg-primary/10"
            : "text-muted-foreground hover:text-foreground hover:bg-accent",
          className,
        )}
        onClick={handleFollow}
        disabled={isLoading}
      >
        {isFollowing ? "Following" : "Follow"}
      </button>
    )
  }

  return (
    <Button
      variant={isFollowing ? "outline" : "default"}
      className={cn("gap-2", isFollowing ? "border-primary/20 bg-background/80" : "", className)}
      onClick={handleFollow}
      disabled={isLoading}
    >
      {isFollowing ? (
        <>
          <UserCheck className="h-4 w-4" />
          Following
        </>
      ) : (
        <>
          <UserPlus className="h-4 w-4" />
          Follow
        </>
      )}
    </Button>
  )
}

