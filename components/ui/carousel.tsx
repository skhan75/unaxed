"use client"

import * as React from "react"
import { ArrowLeft, ArrowRight } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"

interface CarouselProps {
  children: React.ReactNode
  className?: string
}

export function Carousel({ children, className }: CarouselProps) {
  const scrollContainerRef = React.useRef<HTMLDivElement>(null)

  const scroll = (direction: "left" | "right") => {
    const container = scrollContainerRef.current
    if (!container) return

    const scrollAmount = direction === "left" ? -container.offsetWidth * 0.8 : container.offsetWidth * 0.8

    container.scrollBy({ left: scrollAmount, behavior: "smooth" })
  }

  return (
    <div className={cn("relative group", className)}>
      <div
        ref={scrollContainerRef}
        className="flex overflow-x-auto scrollbar-hide snap-x snap-mandatory gap-4 pb-4"
        style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
      >
        {children}
      </div>

      <Button
        variant="outline"
        size="icon"
        className="absolute left-2 top-1/2 -translate-y-1/2 bg-background/80 backdrop-blur-sm border-primary/20 opacity-0 group-hover:opacity-100 transition-opacity duration-200 z-10 hidden md:flex"
        onClick={() => scroll("left")}
      >
        <ArrowLeft className="h-4 w-4" />
        <span className="sr-only">Scroll left</span>
      </Button>

      <Button
        variant="outline"
        size="icon"
        className="absolute right-2 top-1/2 -translate-y-1/2 bg-background/80 backdrop-blur-sm border-primary/20 opacity-0 group-hover:opacity-100 transition-opacity duration-200 z-10 hidden md:flex"
        onClick={() => scroll("right")}
      >
        <ArrowRight className="h-4 w-4" />
        <span className="sr-only">Scroll right</span>
      </Button>
    </div>
  )
}

export function CarouselContent({ children, className }: { children: React.ReactNode; className?: string }) {
  return <div className={cn("flex-shrink-0 snap-start", className)}>{children}</div>
}

export function CarouselItem({ children, className }: { children: React.ReactNode; className?: string }) {
  return <div className={cn("flex-shrink-0 snap-start", className)}>{children}</div>
}

export const CarouselPrevious = () => null
export const CarouselNext = () => null

