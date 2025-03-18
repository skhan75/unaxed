import Link from "next/link"
import { Clock } from "lucide-react"

import { Button } from "@/components/ui/button"

interface PublicationCardProps {
  id: string
  name: string
  description: string
  image: string
  postCount: number
  followerCount: number
  tags: string[]
  readTime?: string
}

export function PublicationCard({
  id,
  name,
  description,
  image,
  postCount,
  followerCount,
  tags,
  readTime = "4m read",
}: PublicationCardProps) {
  return (
    <Link
      href={`/publications/${id}`}
      className="group block relative rounded-xl overflow-hidden aspect-[3/4] transition-all hover:shadow-xl"
    >
      {/* Background Image */}
      <div className="absolute inset-0 w-full h-full">
        <img
          src={image || "/placeholder.svg"}
          alt={name}
          className="h-full w-full object-cover transition-transform group-hover:scale-105"
        />

        {/* Enhanced gradient overlay for text readability - stronger at bottom */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/70 to-transparent" />

        {/* Subtle blur effect at the bottom */}
        <div className="absolute bottom-0 left-0 right-0 h-1/3 backdrop-blur-[2px] bg-transparent pointer-events-none" />
      </div>

      {/* Content - positioned at the very bottom */}
      <div className="absolute inset-x-0 bottom-0 p-5 flex flex-col justify-end text-white">
        <div className="text-sm font-medium opacity-90 mb-1">{name}</div>
        <h3 className="text-xl font-bold leading-tight mb-4 group-hover:underline decoration-1 underline-offset-2">
          {description}
        </h3>

        {/* Footer */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1 text-sm opacity-90">
            <Clock className="h-3.5 w-3.5" />
            <span>{readTime}</span>
          </div>

          <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full bg-white/10 hover:bg-white/20 text-white">
            <span className="sr-only">More options</span>
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path
                d="M3 8C3 8.55228 2.55228 9 2 9C1.44772 9 1 8.55228 1 8C1 7.44772 1.44772 7 2 7C2.55228 7 3 7.44772 3 8Z"
                fill="currentColor"
              />
              <path
                d="M9 8C9 8.55228 8.55228 9 8 9C7.44772 9 7 8.55228 7 8C7 7.44772 7.44772 7 8 7C8.55228 7 9 7.44772 9 8Z"
                fill="currentColor"
              />
              <path
                d="M15 8C15 8.55228 14.5523 9 14 9C13.4477 9 13 8.55228 13 8C13 7.44772 13.4477 7 14 7C14.5523 7 15 7.44772 15 8Z"
                fill="currentColor"
              />
            </svg>
          </Button>
        </div>
      </div>

      {/* Close button in top right */}
      <Button
        variant="ghost"
        size="icon"
        className="absolute top-2 right-2 h-8 w-8 rounded-full bg-black/20 hover:bg-black/30 text-white"
      >
        <span className="sr-only">Close</span>
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M12.5 3.5L3.5 12.5M3.5 3.5L12.5 12.5"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </Button>
    </Link>
  )
}

