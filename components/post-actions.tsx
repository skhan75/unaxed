"use client"

import { useState } from "react"
import { BookmarkIcon, Heart, MessageSquare, Share2 } from "lucide-react"

import { Button } from "@/components/ui/button"
import { useToast } from "@/hooks/use-toast"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

interface PostActionsProps {
  postId: string
  initialLikes: number
  initialComments: number
  initialBookmarked: boolean
  onCommentClick?: () => void
}

export function PostActions({
  postId,
  initialLikes = 0,
  initialComments = 0,
  initialBookmarked = false,
  onCommentClick,
}: PostActionsProps) {
  const [likes, setLikes] = useState(initialLikes)
  const [liked, setLiked] = useState(false)
  const [bookmarked, setBookmarked] = useState(initialBookmarked)
  const { toast } = useToast()

  const handleLike = () => {
    if (liked) {
      setLikes(likes - 1)
      setLiked(false)
    } else {
      setLikes(likes + 1)
      setLiked(true)
      toast({
        title: "Post liked",
        description: "Your like has been recorded.",
      })
    }
  }

  const handleBookmark = () => {
    setBookmarked(!bookmarked)
    toast({
      title: bookmarked ? "Removed from bookmarks" : "Added to bookmarks",
      description: bookmarked
        ? "The post has been removed from your bookmarks."
        : "The post has been added to your bookmarks.",
    })
  }

  const handleShare = () => {
    // In a real implementation, this would use the Web Share API if available
    // or copy the link to the clipboard
    navigator.clipboard.writeText(`https://yourblog.com/blog/${postId}`)
    toast({
      title: "Link copied",
      description: "The post link has been copied to your clipboard.",
    })
  }

  return (
    <TooltipProvider>
      <div className="flex items-center gap-1 text-foreground">
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              className={`h-9 w-9 ${liked ? "text-red-500" : ""}`}
              onClick={handleLike}
            >
              <Heart className={`h-5 w-5 ${liked ? "fill-current" : ""}`} />
              <span className="sr-only">Like</span>
            </Button>
          </TooltipTrigger>
          <TooltipContent side="bottom">
            <p>{liked ? "Unlike" : "Like"} this post</p>
          </TooltipContent>
        </Tooltip>
        <span className="text-sm text-muted-foreground">{likes}</span>
      </div>

      <div className="flex items-center gap-1 text-foreground">
        <Tooltip>
          <TooltipTrigger asChild>
            <Button variant="ghost" size="icon" className="h-9 w-9" onClick={onCommentClick}>
              <MessageSquare className="h-5 w-5" />
              <span className="sr-only">Comment</span>
            </Button>
          </TooltipTrigger>
          <TooltipContent side="bottom">
            <p>Comment on this post</p>
          </TooltipContent>
        </Tooltip>
        <span className="text-sm text-muted-foreground">{initialComments}</span>
      </div>

      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            variant="ghost"
            size="icon"
            className={`h-9 w-9 ${bookmarked ? "text-primary" : ""}`}
            onClick={handleBookmark}
          >
            <BookmarkIcon className={`h-5 w-5 ${bookmarked ? "fill-current" : ""}`} />
            <span className="sr-only">Bookmark</span>
          </Button>
        </TooltipTrigger>
        <TooltipContent side="bottom">
          <p>{bookmarked ? "Remove from bookmarks" : "Save to bookmarks"}</p>
        </TooltipContent>
      </Tooltip>

      <Tooltip>
        <TooltipTrigger asChild>
          <Button variant="ghost" size="icon" className="h-9 w-9 ml-auto" onClick={handleShare}>
            <Share2 className="h-5 w-5" />
            <span className="sr-only">Share</span>
          </Button>
        </TooltipTrigger>
        <TooltipContent side="bottom">
          <p>Share this post</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  )
}

