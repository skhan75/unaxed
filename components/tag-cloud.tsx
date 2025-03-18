"use client"

import { useState } from "react"
import Link from "next/link"
import { Badge } from "@/components/ui/badge"

interface TagCloudProps {
  tags: string[]
  counts: Record<string, number>
}

export function TagCloud({ tags, counts }: TagCloudProps) {
  const [hoveredTag, setHoveredTag] = useState<string | null>(null)

  // Sort tags by count (descending)
  const sortedTags = [...tags].sort((a, b) => counts[b] - counts[a])

  // Function to determine font size based on count
  const getFontSize = (tag: string) => {
    const count = counts[tag]
    const max = Math.max(...Object.values(counts))
    const min = Math.min(...Object.values(counts))
    const range = max - min || 1
    const normalized = (count - min) / range

    // Size between 0.7rem and 1.2rem
    return 0.7 + normalized * 0.5
  }

  return (
    <div className="flex flex-wrap gap-2">
      {sortedTags.map((tag) => (
        <Link href={`/tags/${tag}`} key={tag}>
          <Badge
            className={`transition-all duration-300 dark:bg-white dark:text-black dark:border-zinc-200 dark:hover:bg-zinc-100 bg-zinc-100 text-zinc-900 border border-zinc-200 hover:bg-zinc-200`}
            style={{
              fontSize: `${getFontSize(tag)}rem`,
              transform: hoveredTag === tag ? "scale(1.05)" : "scale(1)",
            }}
            onMouseEnter={() => setHoveredTag(tag)}
            onMouseLeave={() => setHoveredTag(null)}
          >
            #{tag} <span className="ml-1 text-xs opacity-70">{counts[tag]}</span>
          </Badge>
        </Link>
      ))}
    </div>
  )
}

