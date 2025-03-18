"use client"

import { useState, useRef, useEffect } from "react"
import Link from "next/link"
import { ChevronLeft, ChevronRight } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Carousel } from "@/components/ui/carousel"
import { FilledContentCard } from "@/components/ui/filled-content-card"
import { getFeaturedPosts } from "@/lib/data/mock-data"

export function FeaturedStories() {
  // Get featured posts from our centralized mock data
  const featuredPosts = getFeaturedPosts()

  // Carousel state and refs
  const [currentIndex, setCurrentIndex] = useState(0)
  const maxIndex = Math.max(0, featuredPosts.length - 3) // Show 3 cards at a time on desktop
  const carouselRef = useRef<HTMLDivElement>(null)

  // Handle navigation
  const handlePrev = () => {
    setCurrentIndex((prev) => Math.max(0, prev - 1))
  }

  const handleNext = () => {
    setCurrentIndex((prev) => Math.min(maxIndex, prev + 1))
  }

  // Update carousel position when index changes
  useEffect(() => {
    if (carouselRef.current) {
      const scrollAmount = currentIndex * (320 + 16) // card width + gap
      carouselRef.current.scrollTo({
        left: scrollAmount,
        behavior: "smooth",
      })
    }
  }, [currentIndex])

  if (featuredPosts.length === 0) {
    return null
  }

  return (
    <section className="py-8 relative z-10 border-b border-border/40">
      <div className="container px-4 sm:px-6 lg:px-8 max-w-screen-2xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold">Featured Stories</h2>
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="icon"
              className="h-8 w-8 rounded-full"
              onClick={handlePrev}
              disabled={currentIndex === 0}
            >
              <ChevronLeft className="h-4 w-4" />
              <span className="sr-only">Previous</span>
            </Button>
            <Button
              variant="outline"
              size="icon"
              className="h-8 w-8 rounded-full"
              onClick={handleNext}
              disabled={currentIndex >= maxIndex}
            >
              <ChevronRight className="h-4 w-4" />
              <span className="sr-only">Next</span>
            </Button>
          </div>
        </div>

        <Carousel ref={carouselRef}>
          {featuredPosts.map((post) => (
            <div key={post.id} className="carousel-item">
              <Link href={`/blog/${post.id}`} className="block h-full">
                <FilledContentCard
                  title={post.title}
                  description={post.excerpt}
                  imageSrc={post.image}
                  author={post.author}
                  date={post.date}
                  size="medium"
                />
              </Link>
            </div>
          ))}
        </Carousel>
      </div>
    </section>
  )
}

