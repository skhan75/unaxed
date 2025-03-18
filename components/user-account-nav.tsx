"use client"

import Link from "next/link"
import { useEffect, useRef, useState } from "react"
import { LogOut, Plus, Settings, User, Users } from "lucide-react"
import { Button } from "@/components/ui/button"
import type { UserInfo } from "@/components/user-avatar"
import { useAuth } from "@/components/site-header"
import { ProfileAvatar } from "@/components/profile-avatar"

interface UserAccountNavProps {
  user: UserInfo
}

export function UserAccountNav({ user }: UserAccountNavProps) {
  const { logout } = useAuth()
  const [isOpen, setIsOpen] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)

  const handleSignOut = () => {
    logout()
    window.location.href = "/"
  }

  // Add click outside handler
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }

    // Add event listener when dropdown is open
    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside)
    }

    // Clean up event listener
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [isOpen])

  return (
    <div className="relative" ref={dropdownRef}>
      <Button variant="ghost" className="relative h-10 w-10 rounded-full" onClick={() => setIsOpen(!isOpen)}>
        <ProfileAvatar src={user.avatar} alt={user.name} size="md" />
      </Button>

      {isOpen && (
        <div
          className="absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-popover border border-border z-[9999]"
          style={{ minWidth: "14rem" }}
        >
          <div className="py-1 px-2">
            <div className="px-2 py-1.5 text-sm font-semibold">
              <div className="flex flex-col space-y-1">
                <p className="text-sm font-medium leading-none">{user.name}</p>
                <p className="text-xs leading-none text-muted-foreground">@{user.username}</p>
              </div>
            </div>
            <div className="-mx-1 my-1 h-px bg-muted"></div>

            <Link
              href={`/profile/${user.username}`}
              className="flex items-center gap-2 rounded-sm px-2 py-1.5 text-sm hover:bg-accent hover:text-accent-foreground"
              onClick={() => setIsOpen(false)}
            >
              <User className="h-4 w-4" />
              <span>Profile</span>
            </Link>

            <Link
              href="/dashboard"
              className="flex items-center gap-2 rounded-sm px-2 py-1.5 text-sm hover:bg-accent hover:text-accent-foreground"
              onClick={() => setIsOpen(false)}
            >
              <Users className="h-4 w-4" />
              <span>Dashboard</span>
            </Link>

            <Link
              href="/dashboard/settings"
              className="flex items-center gap-2 rounded-sm px-2 py-1.5 text-sm hover:bg-accent hover:text-accent-foreground"
              onClick={() => setIsOpen(false)}
            >
              <Settings className="h-4 w-4" />
              <span>Settings</span>
            </Link>

            <Link
              href="/create"
              className="flex items-center gap-2 rounded-sm px-2 py-1.5 text-sm hover:bg-accent hover:text-accent-foreground"
              onClick={() => setIsOpen(false)}
            >
              <Plus className="h-4 w-4" />
              <span>New Post</span>
            </Link>

            <div className="-mx-1 my-1 h-px bg-muted"></div>

            <button
              className="flex w-full items-center gap-2 rounded-sm px-2 py-1.5 text-sm hover:bg-accent hover:text-accent-foreground"
              onClick={() => {
                setIsOpen(false)
                handleSignOut()
              }}
            >
              <LogOut className="h-4 w-4" />
              <span>Log out</span>
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

