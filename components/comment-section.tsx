"use client"

import { useState, useEffect, useRef } from "react"
import { Send, Edit, Trash2, X, Check } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Separator } from "@/components/ui/separator"
import { useAuth } from "@/components/site-header"
import { useToast } from "@/hooks/use-toast"
import { formatDistanceToNow } from "date-fns"

interface Comment {
  id: number
  postId: number
  userId: number
  userName: string
  userAvatar?: string
  content: string
  createdAt: string
  likes: number
}

interface CommentSectionProps {
  postId: number
  compact?: boolean
  maxComments?: number
  showViewAll?: boolean
}

export function CommentSection({ postId, compact = false, maxComments = 3, showViewAll = true }: CommentSectionProps) {
  const { currentUser } = useAuth()
  const { toast } = useToast()
  const [comments, setComments] = useState<Comment[]>([])
  const [newComment, setNewComment] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [editingCommentId, setEditingCommentId] = useState<number | null>(null)
  const [editContent, setEditContent] = useState("")
  const commentInputRef = useRef<HTMLTextAreaElement>(null)
  const [showAllComments, setShowAllComments] = useState(false)

  // Load comments from localStorage
  useEffect(() => {
    const storedComments = JSON.parse(localStorage.getItem("postComments") || "{}")
    const postComments = storedComments[postId] || []
    setComments(postComments)
  }, [postId])

  // Save comments to localStorage
  const saveComments = (updatedComments: Comment[]) => {
    const storedComments = JSON.parse(localStorage.getItem("postComments") || "{}")
    storedComments[postId] = updatedComments
    localStorage.setItem("postComments", JSON.stringify(storedComments))
    setComments(updatedComments)
  }

  // Handle comment submission
  const handleSubmitComment = () => {
    if (!currentUser) {
      promptLogin()
      return
    }

    if (!newComment.trim()) return

    setIsSubmitting(true)

    // Simulate API call
    setTimeout(() => {
      const newCommentObj: Comment = {
        id: Date.now(),
        postId,
        userId: currentUser.id,
        userName: currentUser.name,
        userAvatar: currentUser.avatar,
        content: newComment.trim(),
        createdAt: new Date().toISOString(),
        likes: 0,
      }

      const updatedComments = [...comments, newCommentObj]
      saveComments(updatedComments)
      setNewComment("")
      setIsSubmitting(false)

      toast({
        title: "Comment added",
        description: "Your comment has been added successfully.",
      })
    }, 500)
  }

  // Handle comment edit
  const handleEditComment = (comment: Comment) => {
    if (currentUser?.id !== comment.userId) return
    setEditingCommentId(comment.id)
    setEditContent(comment.content)
  }

  // Save edited comment
  const saveEditedComment = () => {
    if (!editContent.trim()) return

    const updatedComments = comments.map((comment) =>
      comment.id === editingCommentId ? { ...comment, content: editContent.trim() } : comment,
    )

    saveComments(updatedComments)
    setEditingCommentId(null)
    setEditContent("")

    toast({
      title: "Comment updated",
      description: "Your comment has been updated successfully.",
    })
  }

  // Cancel editing
  const cancelEditing = () => {
    setEditingCommentId(null)
    setEditContent("")
  }

  // Delete comment
  const handleDeleteComment = (commentId: number) => {
    if (confirm("Are you sure you want to delete this comment?")) {
      const updatedComments = comments.filter((comment) => comment.id !== commentId)
      saveComments(updatedComments)

      toast({
        title: "Comment deleted",
        description: "Your comment has been deleted successfully.",
      })
    }
  }

  // Prompt user to login
  const promptLogin = () => {
    const confirmLogin = window.confirm("You need to sign in to comment. Would you like to sign in now?")
    if (confirmLogin) {
      window.location.href = "/auth/login"
    }
  }

  // Focus the comment input
  const focusCommentInput = () => {
    if (commentInputRef.current) {
      commentInputRef.current.focus()
    }
  }

  // Display comments based on compact mode and maxComments
  const displayedComments = showAllComments ? comments : comments.slice(-Math.min(maxComments, comments.length))

  return (
    <div className={`space-y-4 ${compact ? "mt-2" : "mt-6"} comment-section`}>
      {!compact && <Separator />}

      {!compact && (
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold">Comments ({comments.length})</h3>
        </div>
      )}

      {/* Comment input */}
      {currentUser && (
        <div className="flex gap-3">
          <Avatar className="h-8 w-8 flex-shrink-0">
            <AvatarImage src={currentUser.avatar} alt={currentUser.name} />
            <AvatarFallback>{currentUser.name.charAt(0)}</AvatarFallback>
          </Avatar>
          <div className="flex-1 space-y-2">
            <Textarea
              ref={commentInputRef}
              placeholder="Add a comment..."
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              className="min-h-[80px] border-primary/20 bg-background/80 backdrop-blur-sm resize-none reading:text-foreground reading:border-border"
            />
            <div className="flex justify-end">
              <Button
                onClick={handleSubmitComment}
                disabled={isSubmitting || !newComment.trim()}
                size="sm"
                className="gap-1.5 reading:bg-button-background reading:text-button-foreground reading:hover:bg-button-hover"
              >
                <Send className="h-3.5 w-3.5" />
                {isSubmitting ? "Posting..." : "Post Comment"}
              </Button>
            </div>
          </div>
        </div>
      )}

      {!currentUser && !compact && (
        <div className="text-center p-4 border border-primary/20 rounded-md bg-background/80 backdrop-blur-sm reading:text-foreground reading:border-border">
          <p className="text-muted-foreground mb-2 reading:text-muted-foreground">Sign in to join the conversation</p>
          <Button
            variant="default"
            size="sm"
            onClick={promptLogin}
            className="reading:bg-button-background reading:text-button-foreground reading:hover:bg-button-hover"
          >
            Sign In to Comment
          </Button>
        </div>
      )}

      {/* Comments list */}
      {displayedComments.length > 0 ? (
        <div className={`space-y-4 ${compact ? "max-h-[300px] overflow-y-auto" : ""}`}>
          {displayedComments.map((comment) => (
            <div key={comment.id} className="flex gap-3">
              <Avatar className="h-8 w-8 flex-shrink-0">
                <AvatarImage src={comment.userAvatar} alt={comment.userName} />
                <AvatarFallback>{comment.userName.charAt(0)}</AvatarFallback>
              </Avatar>
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="font-medium text-sm">{comment.userName}</span>
                    <span className="text-xs text-muted-foreground reading:text-muted-foreground">
                      {formatDistanceToNow(new Date(comment.createdAt), { addSuffix: true })}
                    </span>
                  </div>

                  {currentUser?.id === comment.userId && (
                    <div className="flex items-center gap-1">
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-6 w-6 reading:text-foreground"
                        onClick={() => handleEditComment(comment)}
                      >
                        <Edit className="h-3.5 w-3.5" />
                        <span className="sr-only">Edit</span>
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-6 w-6 text-destructive reading:text-destructive"
                        onClick={() => handleDeleteComment(comment.id)}
                      >
                        <Trash2 className="h-3.5 w-3.5" />
                        <span className="sr-only">Delete</span>
                      </Button>
                    </div>
                  )}
                </div>

                {editingCommentId === comment.id ? (
                  <div className="mt-1 space-y-2">
                    <Textarea
                      value={editContent}
                      onChange={(e) => setEditContent(e.target.value)}
                      className="min-h-[60px] border-primary/20 bg-background/80 backdrop-blur-sm resize-none reading:text-foreground reading:border-border"
                    />
                    <div className="flex justify-end gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={cancelEditing}
                        className="h-7 px-2 gap-1 reading:text-foreground reading:border-border"
                      >
                        <X className="h-3.5 w-3.5" />
                        Cancel
                      </Button>
                      <Button
                        size="sm"
                        onClick={saveEditedComment}
                        className="h-7 px-2 gap-1 reading:bg-button-background reading:text-button-foreground reading:hover:bg-button-hover"
                      >
                        <Check className="h-3.5 w-3.5" />
                        Save
                      </Button>
                    </div>
                  </div>
                ) : (
                  <p className="text-sm mt-1 reading:text-foreground">{comment.content}</p>
                )}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-4 text-muted-foreground reading:text-muted-foreground">
          <p>No comments yet. Be the first to comment!</p>
        </div>
      )}

      {/* View all comments button */}
      {showViewAll && comments.length > maxComments && !showAllComments && (
        <Button
          variant="outline"
          size="sm"
          className="w-full border-primary/20 reading:text-foreground reading:border-border"
          onClick={() => setShowAllComments(true)}
        >
          View all {comments.length} comments
        </Button>
      )}

      {showViewAll && showAllComments && comments.length > maxComments && (
        <Button
          variant="outline"
          size="sm"
          className="w-full border-primary/20 reading:text-foreground reading:border-border"
          onClick={() => setShowAllComments(false)}
        >
          Show fewer comments
        </Button>
      )}
    </div>
  )
}

