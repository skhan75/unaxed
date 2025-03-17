"use client"

import { useState } from "react"
import { UserPlus, UserCheck } from "lucide-react"

import { Button } from "@/components/ui/button"

interface FollowButtonProps {
  userId: number
  initialFollowing?: boolean
}

export function FollowButton({ userId, initialFollowing = false }: FollowButtonProps) {
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

  return (
    <Button
      variant={isFollowing ? "outline" : "default"}
      className={`w-full gap-2 ${isFollowing ? "border-primary/20 bg-background/80" : ""}`}
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

