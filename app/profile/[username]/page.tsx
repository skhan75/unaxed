"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Eye, Heart, MessageSquare, Share2, User, Mail, BookmarkIcon, Globe } from "lucide-react"
import { Facebook, Instagram, Twitter, Github, Youtube, Linkedin } from "lucide-react"
import { useEffect, useState } from "react"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { UserAvatar } from "@/components/user-avatar"
import { Input } from "@/components/ui/input"
import { useAuth } from "@/components/site-header"
import { getUserByUsername, getDefaultUser } from "@/lib/data/users"

export default function ProfilePage({ params }: { params: { username: string } }) {
  const { username } = params
  const pathname = usePathname()
  const { currentUser } = useAuth()
  const [isOwnProfile, setIsOwnProfile] = useState(false)
  const [activeTab, setActiveTab] = useState("posts")

  // Get user data from our centralized store
  const userData = getUserByUsername(username) || {
    ...getDefaultUser(),
    username,
    name: `${username.charAt(0).toUpperCase()}${username.slice(1)}`,
    avatar: `https://api.dicebear.com/7.x/personas/svg?seed=${username}&backgroundColor=b6e3f4`,
  }

  // Check if this is the current user's profile
  useEffect(() => {
    if (currentUser) {
      setIsOwnProfile(currentUser.username === username)
    }
  }, [currentUser, username])

  // Sample posts data
  const posts = [
    {
      id: 1,
      title: "The Future of Web Development",
      excerpt: "Exploring the latest trends and technologies shaping the future of web development.",
      date: "Mar 15, 2025",
      readTime: "5 min read",
      author: {
        name: userData.name,
        username: userData.username,
        avatar: userData.avatar,
      },
      views: 1243,
      likes: 87,
      comments: 23,
      bookmarked: false,
      tags: ["webdev", "future", "ai", "wasm"],
      image: "https://images.unsplash.com/photo-1571171637578-41bc2dd41cd2?q=80&w=1200&auto=format&fit=crop",
    },
    {
      id: 2,
      title: "Minimalism in UI Design",
      excerpt: "How embracing minimalism can create more effective and beautiful user interfaces.",
      date: "Mar 10, 2025",
      readTime: "4 min read",
      author: {
        name: userData.name,
        username: userData.username,
        avatar: userData.avatar,
      },
      views: 982,
      likes: 64,
      comments: 18,
      bookmarked: true,
      tags: ["design", "minimalism", "ui", "ux"],
      image: "https://images.unsplash.com/photo-1545235617-9465d2a55698?q=80&w=1200&auto=format&fit=crop",
    },
    {
      id: 3,
      title: "The Art of Digital Photography",
      excerpt: "Tips and techniques for capturing stunning digital photographs in any environment.",
      date: "Mar 5, 2025",
      readTime: "6 min read",
      author: {
        name: userData.name,
        username: userData.username,
        avatar: userData.avatar,
      },
      views: 756,
      likes: 52,
      comments: 14,
      bookmarked: false,
      tags: ["photography", "digital", "composition", "editing"],
      image: "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?q=80&w=1200&auto=format&fit=crop",
    },
  ]

  return (
    <div className="flex min-h-screen flex-col bg-black text-white">
      <SiteHeader />

      <main className="container py-8 px-4 mx-auto max-w-6xl">
        <div className="grid gap-6 md:grid-cols-[320px_1fr]">
          {/* Profile Card - Left Column */}
          <div className="space-y-6">
            {/* Main Profile Card */}
            <Card className="overflow-hidden border border-zinc-800 bg-black rounded-xl">
              <div className="relative h-24 bg-zinc-900">
                <div className="absolute -bottom-12 left-1/2 -translate-x-1/2">
                  <div className="p-1 rounded-full bg-zinc-800">
                    <UserAvatar
                      user={{
                        name: userData.name,
                        avatar: userData.avatar,
                      }}
                      className="h-24 w-24 border-2 border-black"
                    />
                  </div>
                </div>
              </div>

              <CardContent className="pt-16 pb-6 text-center">
                <h1 className="text-2xl font-bold">{userData.name}</h1>
                <p className="text-zinc-400">@{userData.username}</p>

                <p className="mt-3 text-sm text-zinc-300 max-w-xs mx-auto">{userData.bio}</p>

                <div className="flex justify-center gap-6 mt-4">
                  <div className="text-center">
                    <p className="text-lg font-bold">{userData.followers}</p>
                    <p className="text-xs text-zinc-400">Followers</p>
                  </div>
                  <div className="text-center">
                    <p className="text-lg font-bold">{userData.following}</p>
                    <p className="text-xs text-zinc-400">Following</p>
                  </div>
                </div>

                {!isOwnProfile && (
                  <Button className="mt-4 w-full bg-white text-black hover:bg-zinc-100 border-0">Follow</Button>
                )}

                {/* Newsletter subscription */}
                {!isOwnProfile && (
                  <div className="mt-6 pt-6 border-t border-zinc-800">
                    <div className="flex items-center gap-2 justify-center mb-3">
                      <Mail className="h-4 w-4 text-zinc-400" />
                      <h3 className="text-sm font-medium">{userData.newsletterName}</h3>
                    </div>
                    <p className="text-xs text-zinc-400 mb-3">Join {userData.newsletterSubscribers} subscribers</p>
                    <div className="flex gap-2">
                      <Input placeholder="Your email address" className="h-9 bg-zinc-900 border-zinc-800 text-sm" />
                      <Button size="sm" className="h-9 bg-white text-black hover:bg-zinc-100 border-0">
                        Subscribe
                      </Button>
                    </div>
                  </div>
                )}

                {/* User info and social links */}
                <div className="mt-6 pt-6 border-t border-zinc-800 space-y-4">
                  <div className="flex items-center justify-center gap-2 text-sm text-zinc-400">
                    <User className="h-3 w-3" />
                    <span>Joined {userData.joinedDate}</span>
                  </div>

                  {userData.social.website && (
                    <div className="flex items-center justify-center gap-2 text-sm">
                      <Globe className="h-3 w-3 text-zinc-400" />
                      <Link
                        href={userData.social.website}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-zinc-400 hover:text-white transition-colors"
                      >
                        {userData.social.website.replace(/^https?:\/\//, "")}
                      </Link>
                    </div>
                  )}
                </div>

                {/* Social media links */}
                <div className="mt-6 flex flex-wrap justify-center gap-3">
                  {userData.social.twitter && (
                    <Link
                      href={`https://twitter.com/${userData.social.twitter}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="bg-zinc-900 hover:bg-zinc-800 p-2 rounded-full transition-colors"
                    >
                      <Twitter className="h-4 w-4" />
                    </Link>
                  )}
                  {userData.social.github && (
                    <Link
                      href={`https://github.com/${userData.social.github}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="bg-zinc-900 hover:bg-zinc-800 p-2 rounded-full transition-colors"
                    >
                      <Github className="h-4 w-4" />
                    </Link>
                  )}
                  {userData.social.instagram && (
                    <Link
                      href={`https://instagram.com/${userData.social.instagram}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="bg-zinc-900 hover:bg-zinc-800 p-2 rounded-full transition-colors"
                    >
                      <Instagram className="h-4 w-4" />
                    </Link>
                  )}
                  {userData.social.facebook && (
                    <Link
                      href={userData.social.facebook}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="bg-zinc-900 hover:bg-zinc-800 p-2 rounded-full transition-colors"
                    >
                      <Facebook className="h-4 w-4" />
                    </Link>
                  )}
                  {userData.social.youtube && (
                    <Link
                      href={userData.social.youtube}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="bg-zinc-900 hover:bg-zinc-800 p-2 rounded-full transition-colors"
                    >
                      <Youtube className="h-4 w-4" />
                    </Link>
                  )}
                  {userData.social.linkedin && (
                    <Link
                      href={userData.social.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="bg-zinc-900 hover:bg-zinc-800 p-2 rounded-full transition-colors"
                    >
                      <Linkedin className="h-4 w-4" />
                    </Link>
                  )}
                </div>

                {/* Skills */}
                <div className="mt-6 flex flex-wrap justify-center gap-2">
                  {userData.skills.map((skill) => (
                    <Badge key={skill} variant="outline" className="bg-white text-black border-0 hover:bg-zinc-100">
                      {skill}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Content Area - Right Column */}
          <div className="space-y-6">
            <Tabs defaultValue="posts" className="w-full" onValueChange={setActiveTab}>
              <TabsList className="w-full grid grid-cols-2 bg-black border border-zinc-800 rounded-xl p-1">
                <TabsTrigger
                  value="posts"
                  className={`${activeTab === "posts" ? "bg-white text-black" : "text-zinc-400"} rounded-lg transition-all duration-300`}
                >
                  Posts
                </TabsTrigger>
                <TabsTrigger
                  value="about"
                  className={`${activeTab === "about" ? "bg-white text-black" : "text-zinc-400"} rounded-lg transition-all duration-300`}
                >
                  About
                </TabsTrigger>
              </TabsList>

              <TabsContent value="posts" className="space-y-6 mt-6">
                {posts.map((post) => (
                  <Card
                    key={post.id}
                    className="overflow-hidden border border-zinc-800 bg-black rounded-xl hover:border-zinc-700 transition-all duration-300"
                  >
                    <div className="p-6">
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center gap-2">
                          <UserAvatar
                            user={{
                              name: userData.name,
                              avatar: userData.avatar,
                            }}
                            className="h-6 w-6"
                          />
                          <span className="text-sm">{post.author.name}</span>
                        </div>
                        <span className="text-xs text-zinc-400">{post.date}</span>
                      </div>

                      {post.image && (
                        <div className="rounded-lg overflow-hidden mb-4">
                          <img
                            src={post.image || "/placeholder.svg"}
                            alt={post.title}
                            className="w-full h-48 object-cover transition-transform hover:scale-105 duration-300"
                          />
                        </div>
                      )}

                      <Link href={`/blog/${post.id}`}>
                        <h3 className="text-xl font-bold mb-2 hover:text-zinc-300 transition-colors cursor-pointer">
                          {post.title}
                        </h3>
                      </Link>
                      <p className="text-zinc-400 text-sm mb-4">{post.excerpt}</p>

                      <div className="flex flex-wrap gap-2 mb-4">
                        {post.tags.map((tag) => (
                          <Badge key={tag} className="bg-white text-black hover:bg-zinc-100 border-0 text-xs">
                            <Link href={`/tags/${tag}`} className="inline-block">
                              #{tag}
                            </Link>
                          </Badge>
                        ))}
                      </div>

                      <div className="flex items-center justify-between text-xs text-zinc-400">
                        <div className="flex items-center gap-4">
                          <div className="flex items-center gap-1">
                            <Eye className="h-3.5 w-3.5" />
                            <span>{post.views}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <Heart className="h-3.5 w-3.5" />
                            <span>{post.likes}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <MessageSquare className="h-3.5 w-3.5" />
                            <span>{post.comments}</span>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <Button
                            variant="ghost"
                            size="icon"
                            className={`h-8 w-8 ${post.bookmarked ? "text-zinc-300" : ""}`}
                          >
                            <BookmarkIcon className={`h-3.5 w-3.5 ${post.bookmarked ? "fill-current" : ""}`} />
                          </Button>
                          <Button variant="ghost" size="icon" className="h-8 w-8">
                            <Share2 className="h-3.5 w-3.5" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  </Card>
                ))}

                <Button variant="outline" className="w-full bg-white text-black hover:bg-zinc-100 border-0">
                  View all posts
                </Button>
              </TabsContent>

              <TabsContent value="about" className="mt-6">
                <Card className="border border-zinc-800 bg-black rounded-xl">
                  <CardContent className="p-6">
                    <div className="space-y-6">
                      <div>
                        <h3 className="text-lg font-semibold mb-4 text-white">About {userData.name}</h3>
                        <p className="text-zinc-300 mb-4">
                          I'm a passionate {userData.role.toLowerCase()} with over 5 years of experience creating
                          beautiful, functional digital experiences. My journey in tech began when I built my first
                          website at 15, and I've been hooked ever since.
                        </p>
                        <p className="text-zinc-300 mb-4">
                          I specialize in modern technologies and techniques, with a focus on creating accessible,
                          performant, and visually appealing work. When I'm not working, you can find me exploring
                          photography, reading sci-fi novels, or hiking in the mountains.
                        </p>
                        <p className="text-zinc-300">
                          Through this blog, I share my thoughts on technology, design trends, and occasional life
                          reflections. I believe in the power of knowledge sharing and hope my content helps fellow
                          professionals on their own journeys.
                        </p>
                      </div>

                      <div>
                        <h3 className="text-lg font-semibold mb-4 text-white">Connect With Me</h3>
                        <div className="flex flex-wrap gap-3">
                          {userData.social.twitter && (
                            <Button
                              variant="outline"
                              size="sm"
                              asChild
                              className="gap-2 bg-white text-black hover:bg-zinc-100 border-0"
                            >
                              <Link
                                href={`https://twitter.com/${userData.social.twitter}`}
                                target="_blank"
                                rel="noopener noreferrer"
                              >
                                <Twitter className="h-4 w-4 mr-1" />
                                Twitter
                              </Link>
                            </Button>
                          )}
                          {userData.social.github && (
                            <Button
                              variant="outline"
                              size="sm"
                              asChild
                              className="gap-2 bg-white text-black hover:bg-zinc-100 border-0"
                            >
                              <Link
                                href={`https://github.com/${userData.social.github}`}
                                target="_blank"
                                rel="noopener noreferrer"
                              >
                                <Github className="h-4 w-4 mr-1" />
                                GitHub
                              </Link>
                            </Button>
                          )}
                          {userData.social.website && (
                            <Button
                              variant="outline"
                              size="sm"
                              asChild
                              className="gap-2 bg-white text-black hover:bg-zinc-100 border-0"
                            >
                              <Link href={userData.social.website} target="_blank" rel="noopener noreferrer">
                                <Globe className="h-4 w-4 mr-1" />
                                Website
                              </Link>
                            </Button>
                          )}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </main>
      <SiteFooter />
    </div>
  )
}

