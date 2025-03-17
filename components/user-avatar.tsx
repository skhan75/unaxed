import { User } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

// Define a common User type that can be shared across components
export interface UserInfo {
  id?: number
  name?: string
  username?: string
  avatar?: string
}

interface UserAvatarProps {
  user: UserInfo
  className?: string
}

export function UserAvatar({ user, className }: UserAvatarProps) {
  // Use a realistic default avatar if none is provided
  const avatarUrl =
    user.avatar || "https://images.unsplash.com/photo-1568602471122-7832951cc4c5?q=80&w=250&auto=format&fit=crop"

  return (
    <Avatar className={className}>
      <AvatarImage src={avatarUrl} alt={user.name || user.username || "User"} className="object-cover" />
      <AvatarFallback>{user.name ? getInitials(user.name) : <User className="h-4 w-4" />}</AvatarFallback>
    </Avatar>
  )
}

function getInitials(name: string): string {
  return name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .substring(0, 2)
}

