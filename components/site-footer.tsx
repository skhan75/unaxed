import Link from "next/link"
import { Github, Twitter } from "lucide-react"

export function SiteFooter() {
  return (
    <footer className="border-t py-6 md:py-0">
      <div className="container px-4 sm:px-6 lg:px-8 flex flex-col items-center justify-between gap-4 md:h-16 md:flex-row">
        <p className="text-center text-sm leading-loose text-muted-foreground md:text-left">
          &copy; {new Date().getFullYear()} UNAXED_ All rights reserved.
        </p>
        <div className="flex items-center gap-4">
          <Link
            href="https://twitter.com"
            target="_blank"
            rel="noreferrer"
            className="text-muted-foreground hover:text-foreground"
          >
            <Twitter className="h-4 w-4" />
            <span className="sr-only">Twitter</span>
          </Link>
          <Link
            href="https://github.com"
            target="_blank"
            rel="noreferrer"
            className="text-muted-foreground hover:text-foreground"
          >
            <Github className="h-4 w-4" />
            <span className="sr-only">GitHub</span>
          </Link>
        </div>
      </div>
    </footer>
  )
}

