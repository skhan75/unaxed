"use client"
import { Lock } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"

interface PaywallProps {
  authorName: string
  postTitle: string
  onSubscribe: () => void
  onLogin: () => void
}

export function Paywall({ authorName, postTitle, onSubscribe, onLogin }: PaywallProps) {
  return (
    <div className="relative my-8">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent to-background blur-sm"></div>
      <Card className="relative z-10 mx-auto max-w-2xl border-primary/30">
        <CardHeader className="text-center">
          <div className="mx-auto mb-2 flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
            <Lock className="h-6 w-6 text-primary" />
          </div>
          <CardTitle className="text-xl">Subscriber-only content</CardTitle>
          <CardDescription>This post is only available to {authorName}'s subscribers</CardDescription>
        </CardHeader>
        <CardContent className="text-center">
          <p className="mb-4">
            Subscribe to {authorName}'s newsletter to read "{postTitle}" and get access to all subscriber-only content.
          </p>
          <div className="mx-auto max-w-sm space-y-4">
            <Button className="w-full" onClick={onSubscribe}>
              Subscribe now
            </Button>
            <div className="flex items-center gap-2">
              <Separator className="flex-1" />
              <span className="text-xs text-muted-foreground">or</span>
              <Separator className="flex-1" />
            </div>
            <Button variant="outline" className="w-full" onClick={onLogin}>
              Log in
            </Button>
          </div>
        </CardContent>
        <CardFooter className="justify-center text-center text-sm text-muted-foreground">
          <p>By subscribing, you'll also receive regular updates and exclusive content directly in your inbox.</p>
        </CardFooter>
      </Card>
    </div>
  )
}

