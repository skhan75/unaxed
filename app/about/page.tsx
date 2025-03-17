import Link from "next/link"
import { Mail, Twitter, Axe, Shield, TrendingUp, Sparkles, Pen, Users, Building, Zap } from "lucide-react"

import { Button } from "@/components/ui/button"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function About() {
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <SiteHeader />
      <main className="flex-1 relative">
        {/* Grid background for retro-futuristic feel */}
        <div className="absolute inset-0 grid grid-cols-[repeat(40,1fr)] grid-rows-[repeat(40,1fr)] gap-px opacity-[0.02] pointer-events-none z-0">
          {Array.from({ length: 1600 }).map((_, i) => (
            <div key={i} className="bg-primary/40"></div>
          ))}
        </div>

        {/* Scanline effect */}
        <div className="absolute inset-0 bg-[linear-gradient(to_bottom,transparent_50%,rgba(0,0,0,0.02)_50%)] bg-[length:100%_4px] pointer-events-none z-0"></div>

        {/* Hero Section */}
        <section className="relative z-10 py-20 md:py-32 flex flex-col items-center justify-center text-center">
          <div className="container max-w-4xl space-y-6">
            <div className="inline-block mx-auto">
              <div className="flex items-center justify-center mb-6">
                <Axe className="h-12 w-12 text-primary rotate-45" />
              </div>
              <h1 className="text-4xl md:text-5xl font-bold leading-tight tracking-tighter bg-gradient-to-r from-pink-300 via-purple-300 to-indigo-300 bg-clip-text text-transparent">
                About Unaxed
              </h1>
            </div>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              A next-generation blogging platform designed to empower creators through greater freedom, creative
              incentives, and transparent monetization opportunities.
            </p>
          </div>
        </section>

        {/* Mission Section */}
        <section className="relative z-10 py-16 bg-secondary/20">
          <div className="container max-w-4xl">
            <div className="space-y-8">
              <div className="space-y-4">
                <h2 className="text-3xl font-bold">Our Mission</h2>
                <div className="h-1 w-20 bg-gradient-to-r from-pink-300 via-purple-300 to-indigo-300 rounded-full"></div>
                <p className="text-lg text-muted-foreground">
                  Unaxed was developed as an answer to the limitations faced by writers on traditional blogging sites
                  like Medium and Substack. We prioritize openness, rewarding individual voices, and offering AI-powered
                  tools that enrich content creation and enhance user experiences.
                </p>
                <p className="text-lg text-muted-foreground">
                  By merging cutting-edge AI tools with creator-centric design, Unaxed aims to redefine digital
                  publishing, fostering a vibrant, equitable, and creative space for both individual writers and
                  enterprises.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="relative z-10 py-16">
          <div className="container max-w-6xl">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">What Makes Unaxed Different</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                We've built Unaxed with a focus on empowering creators while providing the tools they need to succeed.
              </p>
            </div>

            <Tabs defaultValue="creators" className="w-full">
              <TabsList className="grid w-full grid-cols-3 mb-8">
                <TabsTrigger value="creators">For Creators</TabsTrigger>
                <TabsTrigger value="readers">For Readers</TabsTrigger>
                <TabsTrigger value="enterprises">For Enterprises</TabsTrigger>
              </TabsList>

              <TabsContent value="creators" className="space-y-6">
                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                  <Card>
                    <CardHeader className="pb-2">
                      <Shield className="h-6 w-6 text-primary mb-2" />
                      <CardTitle>Complete Ownership</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-muted-foreground">
                        Unlike other platforms, creators maintain full ownership of their content and intellectual
                        property. Your work remains yours.
                      </p>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader className="pb-2">
                      <TrendingUp className="h-6 w-6 text-primary mb-2" />
                      <CardTitle>Fair Monetization</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-muted-foreground">
                        Our transparent revenue model ensures creators receive fair compensation for their work, with
                        multiple monetization options.
                      </p>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader className="pb-2">
                      <Sparkles className="h-6 w-6 text-primary mb-2" />
                      <CardTitle>AI-Enhanced Creation</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-muted-foreground">
                        Leverage cutting-edge AI tools to enhance your writing, generate ideas, and optimize your
                        content for better engagement.
                      </p>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader className="pb-2">
                      <Pen className="h-6 w-6 text-primary mb-2" />
                      <CardTitle>Creative Freedom</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-muted-foreground">
                        Express yourself without algorithmic constraints. Our platform promotes authentic voices and
                        diverse perspectives.
                      </p>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader className="pb-2">
                      <Users className="h-6 w-6 text-primary mb-2" />
                      <CardTitle>Community Building</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-muted-foreground">
                        Develop meaningful connections with your audience through advanced engagement tools and
                        community features.
                      </p>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader className="pb-2">
                      <Zap className="h-6 w-6 text-primary mb-2" />
                      <CardTitle>Powerful Analytics</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-muted-foreground">
                        Gain deep insights into your audience and content performance with comprehensive analytics
                        tools.
                      </p>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>

              <TabsContent value="readers" className="space-y-6">
                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                  <Card>
                    <CardHeader className="pb-2">
                      <Shield className="h-6 w-6 text-primary mb-2" />
                      <CardTitle>Quality Content</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-muted-foreground">
                        Discover authentic, high-quality content from diverse voices without algorithmic manipulation.
                      </p>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader className="pb-2">
                      <Sparkles className="h-6 w-6 text-primary mb-2" />
                      <CardTitle>Personalized Experience</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-muted-foreground">
                        AI-powered recommendations that actually understand your interests and help you discover new
                        content you'll love.
                      </p>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader className="pb-2">
                      <Users className="h-6 w-6 text-primary mb-2" />
                      <CardTitle>Direct Creator Connection</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-muted-foreground">
                        Engage directly with creators you admire through comments, discussions, and community features.
                      </p>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>

              <TabsContent value="enterprises" className="space-y-6">
                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                  <Card>
                    <CardHeader className="pb-2">
                      <Building className="h-6 w-6 text-primary mb-2" />
                      <CardTitle>Enterprise Solutions</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-muted-foreground">
                        Tailored features for larger publishers like tech blogs from companies such as Netflix or
                        Facebook.
                      </p>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader className="pb-2">
                      <Users className="h-6 w-6 text-primary mb-2" />
                      <CardTitle>Team Collaboration</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-muted-foreground">
                        Advanced tools for team-based content creation, editing, and publishing workflows.
                      </p>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader className="pb-2">
                      <Shield className="h-6 w-6 text-primary mb-2" />
                      <CardTitle>Brand Control</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-muted-foreground">
                        Maintain consistent brand identity with customizable design elements and publishing controls.
                      </p>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </section>

        {/* Story Section */}
        <section className="relative z-10 py-16 bg-secondary/20">
          <div className="container max-w-4xl">
            <div className="space-y-8">
              <div className="space-y-4">
                <h2 className="text-3xl font-bold">Our Story</h2>
                <div className="h-1 w-20 bg-gradient-to-r from-pink-300 via-purple-300 to-indigo-300 rounded-full"></div>
                <p className="text-lg text-muted-foreground">
                  Unaxed was born from a simple observation: existing publishing platforms were not truly serving
                  creators. We saw talented writers struggling with opaque algorithms, unfair compensation models, and
                  limited creative freedom.
                </p>
                <p className="text-lg text-muted-foreground">
                  Our founding team—composed of writers, developers, and AI specialists—set out to build something
                  different. We envisioned a platform where creators could thrive without sacrificing ownership or
                  authenticity.
                </p>
                <p className="text-lg text-muted-foreground">
                  Today, Unaxed stands as a testament to that vision—a platform where technology serves creativity, not
                  the other way around. We're committed to continuous innovation while staying true to our core mission
                  of empowering creators.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Join Us Section */}
        <section className="relative z-10 py-20">
          <div className="container max-w-4xl text-center">
            <h2 className="text-3xl font-bold mb-6">Join the Unaxed Community</h2>
            <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
              Whether you're a writer looking for a better platform, a reader seeking authentic content, or an
              enterprise needing publishing solutions, Unaxed is built for you.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Button asChild size="lg">
                <Link href="/auth/signup">Start Writing</Link>
              </Button>
              <Button variant="outline" size="lg">
                <Link href="/auth/login">Sign In</Link>
              </Button>
            </div>
          </div>
        </section>

        {/* Team Section */}
        <section className="relative z-10 py-16 bg-secondary/20">
          <div className="container max-w-4xl">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">Our Team</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Unaxed is built by a passionate team of writers, developers, and AI specialists dedicated to empowering
                creators.
              </p>
            </div>

            <div className="grid gap-8 md:grid-cols-3">
              <div className="text-center">
                <div className="w-24 h-24 rounded-full bg-primary/20 mx-auto mb-4 flex items-center justify-center">
                  <span className="text-2xl font-bold">AJ</span>
                </div>
                <h3 className="text-xl font-bold">Alex Johnson</h3>
                <p className="text-muted-foreground">Co-Founder & CEO</p>
              </div>

              <div className="text-center">
                <div className="w-24 h-24 rounded-full bg-primary/20 mx-auto mb-4 flex items-center justify-center">
                  <span className="text-2xl font-bold">SC</span>
                </div>
                <h3 className="text-xl font-bold">Sam Chen</h3>
                <p className="text-muted-foreground">Co-Founder & CTO</p>
              </div>

              <div className="text-center">
                <div className="w-24 h-24 rounded-full bg-primary/20 mx-auto mb-4 flex items-center justify-center">
                  <span className="text-2xl font-bold">JS</span>
                </div>
                <h3 className="text-xl font-bold">Jamie Smith</h3>
                <p className="text-muted-foreground">Head of Content</p>
              </div>
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section className="relative z-10 py-16">
          <div className="container max-w-4xl text-center">
            <h2 className="text-3xl font-bold mb-6">Get in Touch</h2>
            <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
              Have questions or feedback? We'd love to hear from you.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Button variant="outline" size="lg" className="gap-2">
                <Mail className="h-4 w-4" />
                contact@unaxed.com
              </Button>
              <Button variant="outline" size="lg" className="gap-2">
                <Twitter className="h-4 w-4" />
                @unaxed
              </Button>
            </div>
          </div>
        </section>
      </main>
      <SiteFooter />
    </div>
  )
}

