"use client"

import { cn } from "@/lib/utils"
import { useEffect, useState } from "react"

export interface ProfileAvatarProps {
  src?: string | null
  alt?: string
  size?: "xs" | "sm" | "md" | "lg" | "xl"
  className?: string
}

export function ProfileAvatar({ src, alt = "Profile", size = "md", className }: ProfileAvatarProps) {
  const [imgSrc, setImgSrc] = useState<string>("/placeholder.svg?height=100&width=100")
  const [imgLoaded, setImgLoaded] = useState(false)

  // Define sizes for different size options
  const sizeClasses = {
    xs: "h-6 w-6",
    sm: "h-8 w-8",
    md: "h-10 w-10",
    lg: "h-16 w-16",
    xl: "h-24 w-24",
  }

  // Default avatar if no src is provided
  const defaultAvatar = "/placeholder.svg?height=100&width=100"

  useEffect(() => {
    // Only set the image source if it's valid
    if (src && typeof src === "string" && src.trim() !== "") {
      setImgSrc(src)
    } else {
      setImgSrc(defaultAvatar)
    }
  }, [src])

  return (
    <div className={cn("relative rounded-full overflow-hidden bg-muted flex-shrink-0", sizeClasses[size], className)}>
      <div className="absolute inset-0 flex items-center justify-center">
        <img
          src={imgSrc || "/placeholder.svg"}
          alt={alt}
          className="w-full h-full object-cover"
          onLoad={() => setImgLoaded(true)}
          onError={() => {
            console.log("Avatar image failed to load, using default")
            setImgSrc(defaultAvatar)
          }}
        />
      </div>
    </div>
  )
}

