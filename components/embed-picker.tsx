"use client"

import { useState } from "react"
import { X, Youtube, Twitter, Instagram, Github } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

interface EmbedPickerProps {
  onClose: () => void
  onEmbed: (embedCode: string) => void
}

export function EmbedPicker({ onClose, onEmbed }: EmbedPickerProps) {
  const [youtubeUrl, setYoutubeUrl] = useState("")
  const [tweetUrl, setTweetUrl] = useState("")
  const [instagramUrl, setInstagramUrl] = useState("")
  const [gistUrl, setGistUrl] = useState("")

  const handleYoutubeEmbed = () => {
    if (!youtubeUrl) return

    // Extract video ID from YouTube URL
    const videoId = extractYoutubeId(youtubeUrl)
    if (!videoId) {
      alert("Invalid YouTube URL")
      return
    }

    // Create markdown embed code
    const embedCode = `<iframe width="560" height="315" src="https://www.youtube.com/embed/${videoId}" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>`

    onEmbed(embedCode)
  }

  const handleTweetEmbed = () => {
    if (!tweetUrl) return

    // Create markdown embed code for Twitter
    const embedCode = `<blockquote class="twitter-tweet"><a href="${tweetUrl}"></a></blockquote><script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script>`

    onEmbed(embedCode)
  }

  const handleInstagramEmbed = () => {
    if (!instagramUrl) return

    // Create markdown embed code for Instagram
    const embedCode = `<blockquote class="instagram-media" data-instgrm-permalink="${instagramUrl}"></blockquote><script async src="//www.instagram.com/embed.js"></script>`

    onEmbed(embedCode)
  }

  const handleGistEmbed = () => {
    if (!gistUrl) return

    // Create markdown embed code for GitHub Gist
    const embedCode = `<script src="${gistUrl}.js"></script>`

    onEmbed(embedCode)
  }

  // Helper function to extract YouTube video ID
  const extractYoutubeId = (url: string) => {
    const regExp = /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#&?]*).*/
    const match = url.match(regExp)
    return match && match[7].length === 11 ? match[7] : null
  }

  return (
    <div className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50 flex items-center justify-center">
      <div className="bg-background border border-primary/20 rounded-lg shadow-lg w-full max-w-md p-6 relative">
        <Button variant="ghost" size="icon" className="absolute right-2 top-2" onClick={onClose}>
          <X className="h-4 w-4" />
        </Button>

        <h2 className="text-xl font-bold mb-4">Add Embed</h2>

        <Tabs defaultValue="youtube" className="w-full">
          <TabsList className="grid w-full grid-cols-4 mb-4">
            <TabsTrigger value="youtube" className="flex flex-col items-center gap-1 py-2">
              <Youtube className="h-4 w-4" />
              <span className="text-xs">YouTube</span>
            </TabsTrigger>
            <TabsTrigger value="twitter" className="flex flex-col items-center gap-1 py-2">
              <Twitter className="h-4 w-4" />
              <span className="text-xs">Twitter</span>
            </TabsTrigger>
            <TabsTrigger value="instagram" className="flex flex-col items-center gap-1 py-2">
              <Instagram className="h-4 w-4" />
              <span className="text-xs">Instagram</span>
            </TabsTrigger>
            <TabsTrigger value="gist" className="flex flex-col items-center gap-1 py-2">
              <Github className="h-4 w-4" />
              <span className="text-xs">Gist</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="youtube" className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="youtube-url">YouTube Video URL</Label>
              <Input
                id="youtube-url"
                placeholder="https://www.youtube.com/watch?v=..."
                value={youtubeUrl}
                onChange={(e) => setYoutubeUrl(e.target.value)}
              />
            </div>
            <Button onClick={handleYoutubeEmbed} className="w-full">
              Embed YouTube Video
            </Button>
          </TabsContent>

          <TabsContent value="twitter" className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="tweet-url">Tweet URL</Label>
              <Input
                id="tweet-url"
                placeholder="https://twitter.com/username/status/..."
                value={tweetUrl}
                onChange={(e) => setTweetUrl(e.target.value)}
              />
            </div>
            <Button onClick={handleTweetEmbed} className="w-full">
              Embed Tweet
            </Button>
          </TabsContent>

          <TabsContent value="instagram" className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="instagram-url">Instagram Post URL</Label>
              <Input
                id="instagram-url"
                placeholder="https://www.instagram.com/p/..."
                value={instagramUrl}
                onChange={(e) => setInstagramUrl(e.target.value)}
              />
            </div>
            <Button onClick={handleInstagramEmbed} className="w-full">
              Embed Instagram Post
            </Button>
          </TabsContent>

          <TabsContent value="gist" className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="gist-url">GitHub Gist URL</Label>
              <Input
                id="gist-url"
                placeholder="https://gist.github.com/username/..."
                value={gistUrl}
                onChange={(e) => setGistUrl(e.target.value)}
              />
            </div>
            <Button onClick={handleGistEmbed} className="w-full">
              Embed Gist
            </Button>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}

