import type { ReactNode } from "react"

interface DashboardShellProps {
  children: ReactNode
}

export function DashboardShell({ children }: DashboardShellProps) {
  return (
    <main className="flex-1 container py-12 relative">
      {/* Grid background for retro-futuristic feel */}
      <div className="absolute inset-0 grid grid-cols-[repeat(40,1fr)] grid-rows-[repeat(40,1fr)] gap-px opacity-[0.02] pointer-events-none z-0">
        {Array.from({ length: 1600 }).map((_, i) => (
          <div key={i} className="bg-primary/40"></div>
        ))}
      </div>

      {/* Scanline effect */}
      <div className="absolute inset-0 bg-[linear-gradient(to_bottom,transparent_50%,rgba(0,0,0,0.02)_50%)] bg-[length:100%_4px] pointer-events-none z-0"></div>

      <div className="relative z-10 space-y-6">{children}</div>
    </main>
  )
}

