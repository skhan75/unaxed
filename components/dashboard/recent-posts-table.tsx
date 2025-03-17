"use client"

import Link from "next/link"
import { Eye, Heart, MessageSquare, MoreHorizontal, Pencil } from "lucide-react"

import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

interface Post {
  id: number
  title: string
  status: "published" | "draft"
  date: string
  views: number
  likes: number
  comments: number
}

interface RecentPostsTableProps {
  posts: Post[]
}

export function RecentPostsTable({ posts }: RecentPostsTableProps) {
  return (
    <div className="overflow-auto bg-zinc-900/90 rounded-lg p-4">
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b border-muted/30">
            <th className="text-left font-medium p-2 pl-0">Title</th>
            <th className="text-left font-medium p-2">Status</th>
            <th className="text-left font-medium p-2">Date</th>
            <th className="text-left font-medium p-2">Views</th>
            <th className="text-left font-medium p-2">Engagement</th>
            <th className="text-right font-medium p-2 pr-0">Actions</th>
          </tr>
        </thead>
        <tbody>
          {posts.map((post) => (
            <tr key={post.id} className="border-b border-muted/20 hover:bg-muted/10">
              <td className="py-3 pl-0">
                <Link href={`/blog/${post.id}`} className="font-medium hover:text-primary transition-colors">
                  {post.title}
                </Link>
              </td>
              <td className="py-3">
                <Badge
                  variant={post.status === "published" ? "default" : "outline"}
                  className={
                    post.status === "published"
                      ? "bg-green-500/20 text-green-500 hover:bg-green-500/30 border-green-500/20"
                      : "border-muted-foreground/30"
                  }
                >
                  {post.status === "published" ? "Published" : "Draft"}
                </Badge>
              </td>
              <td className="py-3 text-muted-foreground">{post.date}</td>
              <td className="py-3">
                <div className="flex items-center gap-1">
                  <Eye className="h-3.5 w-3.5 text-muted-foreground" />
                  <span>{post.views.toLocaleString()}</span>
                </div>
              </td>
              <td className="py-3">
                <div className="flex items-center gap-3">
                  <div className="flex items-center gap-1">
                    <Heart className="h-3.5 w-3.5 text-muted-foreground" />
                    <span>{post.likes}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <MessageSquare className="h-3.5 w-3.5 text-muted-foreground" />
                    <span>{post.comments}</span>
                  </div>
                </div>
              </td>
              <td className="py-3 text-right">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon" className="h-8 w-8">
                      <MoreHorizontal className="h-4 w-4" />
                      <span className="sr-only">Actions</span>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem asChild>
                      <Link href={`/create?edit=${post.id}`} className="flex items-center">
                        <Pencil className="mr-2 h-4 w-4" />
                        Edit
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <Eye className="mr-2 h-4 w-4" />
                      View
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

