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

  // Function to determine color based on count
  const getColor = (tag: string) => {
    const count = counts[tag]
    const max = Math.max(...Object.values(counts))
    const min = Math.min(...Object.values(counts))
    const range = max - min || 1
    const normalized = (count - min) / range

    // Blend between pink and indigo
    const r = Math.round(255 * (1 - normalized) + 79 * normalized)
    const g = Math.round(105 * (1 - normalized) + 70 * normalized)
    const b = Math.round(180 * (1 - normalized) + 221 * normalized)

    return `rgb(${r}, ${g}, ${b})`
  }

  return (
    <div className="flex flex-wrap gap-2">
      {sortedTags.map((tag) => (
        <Link href={`/tags/${tag}`} key={tag}>
          <Badge
            variant="outline"
            className="hover:bg-primary/10 transition-all duration-300 border-primary/20 bg-background/80 backdrop-blur-sm"
            style={{
              fontSize: `${getFontSize(tag)}rem`,
              color: hoveredTag === tag ? "hsl(var(--primary))" : getColor(tag),
              transform: hoveredTag === tag ? "scale(1.05)" : "scale(1)",
              boxShadow: hoveredTag === tag ? "0 0 8px rgba(var(--primary), 0.3)" : "none",
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

