import { UserAvatar } from "@/components/user-avatar"

interface FilledContentCardProps {
  title: string
  description?: string
  imageSrc: string
  author: {
    name: string
    avatar: string
  }
  date: string
  size?: "small" | "medium" | "large"
}

export function FilledContentCard({
  title,
  description,
  imageSrc,
  author,
  date,
  size = "medium",
}: FilledContentCardProps) {
  // Size classes
  const sizeClasses = {
    small: "h-48 w-64",
    medium: "h-64 w-80",
    large: "h-80 w-96",
  }

  return (
    <div className={`relative overflow-hidden rounded-lg ${sizeClasses[size]} group`}>
      {/* Background image */}
      <img
        src={imageSrc || "/placeholder.svg"}
        alt={title}
        className="absolute inset-0 w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
      />

      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/60 to-black/20 group-hover:from-black/95 group-hover:via-black/70 transition-colors duration-300"></div>

      {/* Content */}
      <div className="absolute inset-0 p-4 flex flex-col justify-end">
        <h3 className="text-white font-bold text-lg mb-2 line-clamp-2 group-hover:text-primary transition-colors">
          {title}
        </h3>
        {description && (
          <p className="text-white/80 text-sm mb-3 line-clamp-2 group-hover:text-white transition-colors">
            {description}
          </p>
        )}
        <div className="flex items-center gap-2">
          <UserAvatar user={{ name: author.name, avatar: author.avatar }} className="h-6 w-6 border border-white/20" />
          <div className="text-xs text-white/70">
            <span className="font-medium text-white">{author.name}</span>
            <span className="mx-1">•</span>
            <span>{date}</span>
          </div>
        </div>
      </div>
    </div>
  )
}

