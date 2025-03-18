"use client"

import { useState } from "react"
import { Globe, Lock } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Badge } from "@/components/ui/badge"

interface VisibilitySelectorProps {
  onSelect: (value: string) => void
  defaultValue?: string
}

export function VisibilitySelector({ onSelect, defaultValue = "public" }: VisibilitySelectorProps) {
  const [visibility, setVisibility] = useState(defaultValue)

  const handleSelect = (value: string) => {
    setVisibility(value)
    onSelect(value)
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" className="w-full justify-between">
          <div className="flex items-center gap-2">
            {visibility === "public" ? (
              <>
                <Globe className="h-4 w-4" />
                <span>Public</span>
              </>
            ) : (
              <>
                <Lock className="h-4 w-4" />
                <span>Subscribers only</span>
                <Badge variant="secondary" className="ml-2">
                  Premium
                </Badge>
              </>
            )}
          </div>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-[240px]">
        <DropdownMenuRadioGroup value={visibility} onValueChange={handleSelect}>
          <DropdownMenuRadioItem value="public" className="gap-2">
            <Globe className="h-4 w-4" />
            <div className="flex flex-col">
              <span>Public</span>
              <span className="text-xs font-normal text-muted-foreground">Anyone can view this post</span>
            </div>
          </DropdownMenuRadioItem>
          <DropdownMenuRadioItem value="subscribers" className="gap-2">
            <Lock className="h-4 w-4" />
            <div className="flex flex-col">
              <span>Subscribers only</span>
              <span className="text-xs font-normal text-muted-foreground">Only paid subscribers can view</span>
            </div>
          </DropdownMenuRadioItem>
        </DropdownMenuRadioGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

