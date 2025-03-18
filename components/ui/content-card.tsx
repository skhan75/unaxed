import type React from "react"
import { cn } from "@/lib/utils"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"

interface ContentCardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode
  className?: string
  footerContent?: React.ReactNode
  headerContent?: React.ReactNode
}

export function ContentCard({ children, className, footerContent, headerContent, ...props }: ContentCardProps) {
  return (
    <Card
      className={cn(
        "overflow-hidden border-primary/10 hover:border-primary/30 transition-all hover:shadow-md hover:shadow-primary/5 bg-card",
        className,
      )}
      {...props}
    >
      {headerContent && <CardHeader className="p-4">{headerContent}</CardHeader>}
      <CardContent className={cn("p-0", !headerContent && "pt-0")}>{children}</CardContent>
      {footerContent && (
        <CardFooter className="border-t border-primary/10 bg-muted/20 px-6 py-3">{footerContent}</CardFooter>
      )}
    </Card>
  )
}

