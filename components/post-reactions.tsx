"use client"

import { useState, useEffect } from "react"
import { Heart, Award, MessageSquare, Share2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { useToast } from "@/hooks/use-toast"
import { useAuth } from "@/components/site-header"

interface PostReactionsProps {
  postId: number
  initialLikes: number
  initialStandingOvations: number
  initialComments: number
  size?: "sm" | "md" | "lg"
  showLabels?: boolean
  showShare?: boolean
  onCommentClick?: () => void
}

export function PostReactions({
  postId,
  initialLikes,
  initialStandingOvations,
  initialComments,
  size = "md",
  showLabels = true,
  showShare = true,
  onCommentClick,
}: PostReactionsProps) {
  const { currentUser } = useAuth()
  const { toast } = useToast()
  const [likes, setLikes] = useState(initialLikes)
  const [standingOvations, setStandingOvations] = useState(initialStandingOvations)
  const [comments, setComments] = useState(initialComments)
  const [hasLiked, setHasLiked] = useState(false)
  const [hasGivenStandingOvation, setHasGivenStandingOvation] = useState(false)
  const [standingOvationCredits, setStandingOvationCredits] = useState(3) // Example: 3 credits per month
  const [isLoading, setIsLoading] = useState(false)

  // Load user reaction state from localStorage
  useEffect(() => {
    if (currentUser) {
      const userReactions = JSON.parse(localStorage.getItem("userReactions") || "{}")
      setHasLiked(!!userReactions[`like-${postId}`])
      setHasGivenStandingOvation(!!userReactions[`ovation-${postId}`])

      // Load standing ovation credits
      const credits = localStorage.getItem("standingOvationCredits")
      if (credits) {
        setStandingOvationCredits(Number.parseInt(credits))
      } else {
        // Initialize credits if not set
        localStorage.setItem("standingOvationCredits", standingOvationCredits.toString())
      }
    }
  }, [currentUser, postId])

  // Handle like action
  const handleLike = () => {
    if (!currentUser) {
      promptLogin()
      return
    }

    setIsLoading(true)

    // Simulate API call
    setTimeout(() => {
      const newHasLiked = !hasLiked
      setHasLiked(newHasLiked)
      setLikes((prev) => (newHasLiked ? prev + 1 : prev - 1))

      // Save to localStorage
      const userReactions = JSON.parse(localStorage.getItem("userReactions") || "{}")
      if (newHasLiked) {
        userReactions[`like-${postId}`] = true
      } else {
        delete userReactions[`like-${postId}`]
      }
      localStorage.setItem("userReactions", JSON.stringify(userReactions))

      setIsLoading(false)
    }, 300)
  }

  // Handle standing ovation action
  const handleStandingOvation = () => {
    if (!currentUser) {
      promptLogin()
      return
    }

    if (hasGivenStandingOvation) {
      toast({
        title: "Already given",
        description: "You've already given a standing ovation to this post.",
        variant: "default",
      })
      return
    }

    if (standingOvationCredits <= 0) {
      toast({
        title: "No credits remaining",
        description: "You've used all your standing ovation credits for this month.",
        variant: "destructive",
      })
      return
    }

    setIsLoading(true)

    // Simulate API call
    setTimeout(() => {
      setHasGivenStandingOvation(true)
      setStandingOvations((prev) => prev + 1)
      setStandingOvationCredits((prev) => prev - 1)

      // Save to localStorage
      const userReactions = JSON.parse(localStorage.getItem("userReactions") || "{}")
      userReactions[`ovation-${postId}`] = true
      localStorage.setItem("userReactions", JSON.stringify(userReactions))
      localStorage.setItem("standingOvationCredits", (standingOvationCredits - 1).toString())

      toast({
        title: "Standing Ovation Given!",
        description: `You have ${standingOvationCredits - 1} credits remaining this month.`,
        variant: "default",
      })

      setIsLoading(false)
    }, 300)
  }

  // Handle comment click
  const handleCommentClick = () => {
    if (!currentUser) {
      promptLogin()
      return
    }

    if (onCommentClick) {
      onCommentClick()
    }
  }

  // Prompt user to login
  const promptLogin = () => {
    const confirmLogin = window.confirm("You need to sign in to interact with posts. Would you like to sign in now?")
    if (confirmLogin) {
      window.location.href = "/auth/login"
    }
  }

  // Determine button sizes based on the size prop
  const getButtonSize = () => {
    switch (size) {
      case "sm":
        return { button: "h-7 px-2", icon: "h-3.5 w-3.5", text: "text-xs" }
      case "lg":
        return { button: "h-10 px-4", icon: "h-5 w-5", text: "text-sm" }
      default:
        return { button: "h-8 px-3", icon: "h-4 w-4", text: "text-xs" }
    }
  }

  // Update the color schemes to use pastel colors
  // Replace the hasLiked button styling
  const buttonSize = getButtonSize()

  return (
    <div className="flex items-center gap-2">
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              variant={hasLiked ? "default" : "outline"}
              size="sm"
              className={`${buttonSize.button} gap-1.5 ${hasLiked ? "bg-pink-500/20 text-pink-500 hover:bg-pink-500/30 border-pink-500/20" : "border-primary/20 bg-background/80 backdrop-blur-sm"}`}
              onClick={handleLike}
              disabled={isLoading}
            >
              <Heart className={`${buttonSize.icon} ${hasLiked ? "fill-current" : ""}`} />
              {showLabels && <span className={buttonSize.text}>{likes}</span>}
              {!showLabels && likes}
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            <p>{hasLiked ? "Unlike" : "Like"}</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>

      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              variant={hasGivenStandingOvation ? "default" : "outline"}
              size="sm"
              className={`${buttonSize.button} gap-1.5 ${hasGivenStandingOvation ? "bg-amber-500/20 text-amber-500 hover:bg-amber-500/30 border-amber-500/20" : "border-primary/20 bg-background/80 backdrop-blur-sm"}`}
              onClick={handleStandingOvation}
              disabled={isLoading || hasGivenStandingOvation || standingOvationCredits <= 0}
            >
              <Award className={`${buttonSize.icon} ${hasGivenStandingOvation ? "fill-current" : ""}`} />
              {showLabels && <span className={buttonSize.text}>{standingOvations}</span>}
              {!showLabels && standingOvations}
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            <p>
              {hasGivenStandingOvation
                ? "Standing Ovation Given"
                : standingOvationCredits > 0
                  ? `Give Standing Ovation (${standingOvationCredits} left)`
                  : "No Standing Ovation Credits Left"}
            </p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>

      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              variant="outline"
              size="sm"
              className={`${buttonSize.button} gap-1.5 border-primary/20 bg-background/80 backdrop-blur-sm`}
              onClick={handleCommentClick}
            >
              <MessageSquare className={buttonSize.icon} />
              {showLabels && <span className={buttonSize.text}>{comments}</span>}
              {!showLabels && comments}
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            <p>Comment</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>

      {showShare && (
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="outline"
                size="sm"
                className={`${buttonSize.button} gap-1.5 border-primary/20 bg-background/80 backdrop-blur-sm ml-auto`}
              >
                <Share2 className={buttonSize.icon} />
                {showLabels && <span className={buttonSize.text}>Share</span>}
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Share</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      )}
    </div>
  )
}

