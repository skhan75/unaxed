"use client"

import { useState } from "react"
import { Check, ChevronsUpDown } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { cn } from "@/lib/utils"

// Mock data for publications
const publications = [
  {
    value: "personal",
    label: "Personal Blog",
    description: "Your personal writing space",
  },
  {
    value: "technology",
    label: "Technology Insights",
    description: "Tech, programming, and digital innovation",
  },
  {
    value: "finance",
    label: "Financial Freedom",
    description: "Personal finance and investing strategies",
  },
  {
    value: "art",
    label: "Creative Canvas",
    description: "Art, design, and creative expression",
  },
  {
    value: "health",
    label: "Wellness Journal",
    description: "Health, fitness, and wellbeing",
  },
]

interface PublicationSelectorProps {
  onSelect: (value: string) => void
  defaultValue?: string
}

export function PublicationSelector({ onSelect, defaultValue = "personal" }: PublicationSelectorProps) {
  const [open, setOpen] = useState(false)
  const [value, setValue] = useState(defaultValue)

  const selectedPublication = publications.find((publication) => publication.value === value)

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button variant="outline" role="combobox" aria-expanded={open} className="w-full justify-between">
          {selectedPublication ? selectedPublication.label : "Select publication..."}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[300px] p-0">
        <Command>
          <CommandInput placeholder="Search publications..." />
          <CommandList>
            <CommandEmpty>No publication found.</CommandEmpty>
            <CommandGroup>
              {publications.map((publication) => (
                <CommandItem
                  key={publication.value}
                  value={publication.value}
                  onSelect={(currentValue) => {
                    setValue(currentValue)
                    onSelect(currentValue)
                    setOpen(false)
                  }}
                >
                  <Check className={cn("mr-2 h-4 w-4", value === publication.value ? "opacity-100" : "opacity-0")} />
                  <div className="flex flex-col">
                    <span>{publication.label}</span>
                    <span className="text-xs text-muted-foreground">{publication.description}</span>
                  </div>
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  )
}

