import Link from "next/link"
import { Eye, Heart, MessageSquare, Share2, User } from "lucide-react"
// Add these imports at the top with the other imports
import { Facebook, Instagram, Twitter, Github, Youtube, Linkedin, Globe, Mail } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { UserAvatar } from "@/components/user-avatar"
import { FollowButton } from "@/components/follow-button"
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"

export default function ProfilePage({ params }: { params: { username: string } }) {
  const { username } = params

  // Sample user data - in a real app, this would come from a database
  const user = {
    id: 1,
    username: username,
    name: "Alex Johnson",
    bio: "Web Developer & Designer sharing thoughts on technology, design, and life.",
    avatar: "https://images.unsplash.com/photo-1568602471122-7832951cc4c5?q=80&w=250&auto=format&fit=crop",
    followers: 156,
    following: 89,
    joinedDate: "January 2025",
    skills: ["React", "Next.js", "UI/UX", "Photography"],
    social: {
      twitter: "alexjohnson",
      github: "alexjohnson",
      instagram: "alexjohnson.dev",
      facebook: "https://facebook.com/alexjohnson",
      youtube: "https://youtube.com/@alexjohnson",
      linkedin: "https://linkedin.com/in/alexjohnson",
      website: "https://alexjohnson.dev",
      email: "alex@alexjohnson.dev",
    },
  }

  // Update the posts data structure to include images
  // Find the posts array and add image properties

  // Sample posts data
  const posts = [
    {
      id: 1,
      title: "The Future of Web Development",
      excerpt: "Exploring the latest trends and technologies shaping the future of web development.",
      date: "Mar 15, 2025",
      readTime: "5 min read",
      author: {
        name: "Alex Johnson",
        avatar: "https://images.unsplash.com/photo-1568602471122-7832951cc4c5?q=80&w=250&auto=format&fit=crop",
      },
      views: 1243,
      likes: 87,
      comments: 23,
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
        name: "Alex Johnson",
        avatar: "https://images.unsplash.com/photo-1568602471122-7832951cc4c5?q=80&w=250&auto=format&fit=crop",
      },
      views: 982,
      likes: 64,
      comments: 18,
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
        name: "Alex Johnson",
        avatar: "https://images.unsplash.com/photo-1568602471122-7832951cc4c5?q=80&w=250&auto=format&fit=crop",
      },
      views: 756,
      likes: 52,
      comments: 14,
      tags: ["photography", "digital", "composition", "editing"],
      image: "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?q=80&w=1200&auto=format&fit=crop",
    },
  ]

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <SiteHeader />
      <main className="flex-1 container py-12 relative">
        {/* Grid background for retro-futuristic feel */}
        <div className="absolute inset-0 grid grid-cols-[repeat(40,1fr)] grid-rows-[repeat(40,1fr)] gap-px opacity-[0.02] pointer-events-none z-0">
          {Array.from({ length: 1600 }).map((_, i) => (
            <div key={i} className="bg-primary/40"></div>
          ))}
        </div>

        {/* Scanline effect */}
        <div className="absolute inset-0 bg-[linear-gradient(to_bottom,transparent_50%,rgba(0,0,0,0.02)_50%)] bg-[length:100%_4px] pointer-events-none z-0"></div>

        {/* Cover image */}
        <div className="relative z-10 mb-8 -mt-6 rounded-lg overflow-hidden h-48 md:h-64">
          <img
            src="https://images.unsplash.com/photo-1550745165-9bc0b252726f?q=80&w=2000&auto=format&fit=crop"
            alt="Profile cover"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent"></div>
        </div>

        <div className="relative z-10">
          <div className="grid gap-8 md:grid-cols-[1fr_2fr]">
            {/* Also update the profile sidebar card */}

            {/* Profile Sidebar */}
            <div className="space-y-6">
              {/* Update the profile sidebar card */}
              <Card className="p-6">
                <div className="flex flex-col items-center text-center space-y-4">
                  <UserAvatar
                    user={{
                      name: user.name,
                      avatar: user.avatar,
                    }}
                    className="h-24 w-24 border-2 border-primary/50 glow-sm"
                  />

                  <div className="space-y-1">
                    <h1 className="text-2xl font-bold">{user.name}</h1>
                    <p className="text-sm text-muted-foreground">@{user.username}</p>
                  </div>

                  <p className="text-sm text-muted-foreground">{user.bio}</p>

                  <div className="flex gap-4 text-sm">
                    <div>
                      <span className="font-bold">{user.followers}</span>{" "}
                      <span className="text-muted-foreground">Followers</span>
                    </div>
                    <div>
                      <span className="font-bold">{user.following}</span>{" "}
                      <span className="text-muted-foreground">Following</span>
                    </div>
                  </div>

                  <FollowButton userId={user.id} />
                </div>

                <div className="mt-6 pt-6 border-t border-primary/10">
                  <div className="space-y-4">
                    <div className="flex items-center gap-2 text-sm">
                      <User className="h-4 w-4 text-muted-foreground" />
                      <span>Joined {user.joinedDate}</span>
                    </div>

                    {user.social.website && (
                      <div className="flex items-center gap-2 text-sm">
                        <Globe className="h-4 w-4 text-muted-foreground" />
                        <Link
                          href={user.social.website}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-primary hover:text-primary/80 transition-colors"
                        >
                          {user.social.website.replace(/^https?:\/\//, "")}
                        </Link>
                      </div>
                    )}

                    {/* Add Social Media Links Section */}
                    <div className="mt-4 pt-4 border-t border-primary/10">
                      <h3 className="text-sm font-medium mb-3">Connect with {user.name}</h3>
                      <div className="flex flex-wrap gap-3">
                        {user.social.twitter && (
                          <Link
                            href={`https://twitter.com/${user.social.twitter}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="bg-primary/10 hover:bg-primary/20 text-primary p-2 rounded-full transition-colors"
                            title={`Twitter: @${user.social.twitter}`}
                          >
                            <Twitter className="h-5 w-5" />
                            <span className="sr-only">Twitter</span>
                          </Link>
                        )}
                        {user.social.github && (
                          <Link
                            href={`https://github.com/${user.social.github}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="bg-primary/10 hover:bg-primary/20 text-primary p-2 rounded-full transition-colors"
                            title={`GitHub: ${user.social.github}`}
                          >
                            <Github className="h-5 w-5" />
                            <span className="sr-only">GitHub</span>
                          </Link>
                        )}
                        {user.social.instagram && (
                          <Link
                            href={`https://instagram.com/${user.social.instagram}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="bg-primary/10 hover:bg-primary/20 text-primary p-2 rounded-full transition-colors"
                            title={`Instagram: @${user.social.instagram}`}
                          >
                            <Instagram className="h-5 w-5" />
                            <span className="sr-only">Instagram</span>
                          </Link>
                        )}
                        {user.social.facebook && (
                          <Link
                            href={user.social.facebook}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="bg-primary/10 hover:bg-primary/20 text-primary p-2 rounded-full transition-colors"
                            title="Facebook"
                          >
                            <Facebook className="h-5 w-5" />
                            <span className="sr-only">Facebook</span>
                          </Link>
                        )}
                        {user.social.youtube && (
                          <Link
                            href={user.social.youtube}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="bg-primary/10 hover:bg-primary/20 text-primary p-2 rounded-full transition-colors"
                            title="YouTube"
                          >
                            <Youtube className="h-5 w-5" />
                            <span className="sr-only">YouTube</span>
                          </Link>
                        )}
                        {user.social.linkedin && (
                          <Link
                            href={user.social.linkedin}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="bg-primary/10 hover:bg-primary/20 text-primary p-2 rounded-full transition-colors"
                            title="LinkedIn"
                          >
                            <Linkedin className="h-5 w-5" />
                            <span className="sr-only">LinkedIn</span>
                          </Link>
                        )}
                        {user.social.email && (
                          <Link
                            href={`mailto:${user.social.email}`}
                            className="bg-primary/10 hover:bg-primary/20 text-primary p-2 rounded-full transition-colors"
                            title={user.social.email}
                          >
                            <Mail className="h-5 w-5" />
                            <span className="sr-only">Email</span>
                          </Link>
                        )}
                      </div>
                    </div>

                    <div className="flex flex-wrap gap-2">
                      {user.skills.map((skill) => (
                        <Badge
                          key={skill}
                          variant="secondary"
                          className="border border-primary/20 bg-background/80 backdrop-blur-sm"
                        >
                          {skill}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>
              </Card>

              {/* Add a "People you might know" section to the sidebar */}
              <Card className="p-6">
                <h3 className="text-sm font-medium mb-4">People you might know</h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <Avatar>
                        <AvatarImage src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=250&auto=format&fit=crop" />
                        <AvatarFallback>SC</AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="text-sm font-medium">Sarah Chen</p>
                        <p className="text-xs text-muted-foreground">UX Designer</p>
                      </div>
                    </div>
                    <Button variant="outline" size="sm" className="h-8 text-xs">
                      Follow
                    </Button>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <Avatar>
                        <AvatarImage src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=250&auto=format&fit=crop" />
                        <AvatarFallback>JM</AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="text-sm font-medium">James Miller</p>
                        <p className="text-xs text-muted-foreground">Frontend Developer</p>
                      </div>
                    </div>
                    <Button variant="outline" size="sm" className="h-8 text-xs">
                      Follow
                    </Button>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <Avatar>
                        <AvatarImage src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=250&auto=format&fit=crop" />
                        <AvatarFallback>EL</AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="text-sm font-medium">Emily Lee</p>
                        <p className="text-xs text-muted-foreground">Product Designer</p>
                      </div>
                    </div>
                    <Button variant="outline" size="sm" className="h-8 text-xs">
                      Follow
                    </Button>
                  </div>
                </div>
              </Card>

              {/* Update the terminal-inspired section */}
              <Card className="p-6 font-mono">
                <div className="flex items-center gap-2 mb-3 text-muted-foreground">
                  <div className="h-3 w-3 rounded-full bg-red-500"></div>
                  <div className="h-3 w-3 rounded-full bg-yellow-500"></div>
                  <div className="h-3 w-3 rounded-full bg-green-500"></div>
                  <div className="text-xs ml-2">terminal</div>
                </div>
                <div className="space-y-2 text-sm">
                  <p className="text-muted-foreground">
                    $ <span className="text-foreground">user --info {user.username}</span>
                  </p>
                  <p className="text-green-400">● Active writer since {user.joinedDate}</p>
                  <p className="text-muted-foreground">
                    $ <span className="text-foreground">user --stats</span>
                  </p>
                  <p className="text-blue-400">
                    Posts: {posts.length} | Followers: {user.followers}
                  </p>
                  <p className="text-muted-foreground">
                    $ <span className="text-foreground">user --latest</span>
                  </p>
                  <p className="text-pink-400">"{posts[0].title}"</p>
                  <p className="text-muted-foreground">
                    $ <span className="text-foreground">_</span>
                  </p>
                </div>
              </Card>
            </div>

            {/* Content Area */}
            <div className="space-y-6">
              <Tabs defaultValue="posts" className="w-full">
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="posts">Posts</TabsTrigger>
                  <TabsTrigger value="about">About</TabsTrigger>
                </TabsList>

                {/* Now update the post cards to include images
                Find the TabsContent with value="posts" and update the Card components */}

                <TabsContent value="posts" className="space-y-6 mt-6">
                  {posts.map((post) => (
                    <Card
                      key={post.id}
                      className="overflow-hidden border border-muted/50 transition-all hover:shadow-md hover:shadow-primary/5 group"
                    >
                      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <div className="flex items-center gap-2">
                          <UserAvatar
                            user={{
                              name: user.name,
                              avatar: user.avatar,
                            }}
                            className="h-6 w-6"
                          />
                          <div className="text-sm font-medium">{post.author.name}</div>
                        </div>
                        <div className="text-sm text-muted-foreground">{post.date}</div>
                      </CardHeader>

                      {post.image && (
                        <div className="px-6">
                          <div className="rounded-md overflow-hidden mb-3">
                            <img
                              src={post.image || "/placeholder.svg"}
                              alt={post.title}
                              className="w-full h-48 object-cover transition-transform group-hover:scale-105 duration-300"
                            />
                          </div>
                        </div>
                      )}

                      <CardContent className="pb-3">
                        <Link href={`/blog/${post.id}`}>
                          <h3 className="text-xl font-bold leading-tight tracking-tight group-hover:text-primary/90 transition-colors">
                            {post.title}
                          </h3>
                        </Link>
                        <p className="mt-2 text-muted-foreground">{post.excerpt}</p>
                        <div className="flex flex-wrap gap-1 mt-3">
                          {post.tags.map((tag) => (
                            <Link href={`/tags/${tag}`} key={tag}>
                              <Badge variant="outline" className="text-xs hover:bg-primary/10 transition-colors">
                                #{tag}
                              </Badge>
                            </Link>
                          ))}
                        </div>
                      </CardContent>
                      <CardFooter className="border-t bg-muted/20 px-6 py-3">
                        <div className="flex items-center justify-between w-full text-xs text-muted-foreground">
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
                          <div className="flex items-center gap-1">
                            <Button variant="ghost" size="icon" className="h-8 w-8">
                              <Share2 className="h-3.5 w-3.5" />
                              <span className="sr-only">Share</span>
                            </Button>
                          </div>
                        </div>
                      </CardFooter>
                    </Card>
                  ))}

                  <Button variant="outline" className="w-full">
                    View all posts
                  </Button>
                </TabsContent>

                <TabsContent value="about" className="mt-6">
                  <Card>
                    <CardContent className="pt-6">
                      <div className="space-y-6">
                        <div>
                          <h3 className="text-lg font-semibold mb-2">About {user.name}</h3>
                          <p className="text-muted-foreground">
                            I'm a passionate web developer and designer with over 5 years of experience creating
                            beautiful, functional digital experiences. My journey in tech began when I built my first
                            website at 15, and I've been hooked ever since.
                          </p>
                          <p className="text-muted-foreground mt-4">
                            I specialize in modern frontend technologies like React, Next.js, and Tailwind CSS, with a
                            focus on creating accessible, performant, and visually appealing interfaces. When I'm not
                            coding, you can find me exploring photography, reading sci-fi novels, or hiking in the
                            mountains.
                          </p>
                          <p className="text-muted-foreground mt-4">
                            Through this blog, I share my thoughts on technology, design trends, and occasional life
                            reflections. I believe in the power of knowledge sharing and hope my content helps fellow
                            developers and designers on their own journeys.
                          </p>
                        </div>

                        <div>
                          <h3 className="text-lg font-semibold mb-2">Connect With Me</h3>
                          <div className="flex flex-wrap gap-4">
                            <Button variant="outline" size="sm" asChild className="gap-2">
                              <Link
                                href={`https://twitter.com/${user.social.twitter}`}
                                target="_blank"
                                rel="noopener noreferrer"
                              >
                                Twitter
                              </Link>
                            </Button>
                            <Button variant="outline" size="sm" asChild className="gap-2">
                              <Link
                                href={`https://github.com/${user.social.github}`}
                                target="_blank"
                                rel="noopener noreferrer"
                              >
                                GitHub
                              </Link>
                            </Button>
                            <Button variant="outline" size="sm" asChild className="gap-2">
                              <Link href={user.social.website} target="_blank" rel="noopener noreferrer">
                                Website
                              </Link>
                            </Button>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
              </Tabs>
            </div>
          </div>
        </div>
      </main>
      <SiteFooter />
    </div>
  )
}

