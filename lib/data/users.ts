// Centralized user data store
export const users = {
  alexjohnson: {
    id: 1,
    username: "alexjohnson",
    name: "Alex Johnson",
    bio: "Web Developer & Designer sharing thoughts on technology, design, and life.",
    avatar: "https://images.unsplash.com/photo-1568602471122-7832951cc4c5?q=80&w=250&auto=format&fit=crop",
    followers: 156,
    following: 89,
    joinedDate: "January 2025",
    skills: ["React", "Next.js", "UI/UX", "Photography"],
    social: {
      twitter: "alexjohnson",
      github: "alexjohnson",
      instagram: "alexjohnson.dev",
      facebook: "https://facebook.com/alexjohnson",
      youtube: "https://youtube.com/@alexjohnson",
      linkedin: "https://linkedin.com/in/alexjohnson",
      website: "https://alexjohnson.dev",
      email: "alex@alexjohnson.dev",
    },
    newsletterSubscribers: 342,
    newsletterName: "Alex's Insights",
    role: "Web Developer",
  },
  samchen: {
    id: 2,
    username: "samchen",
    name: "Sam Chen",
    bio: "UI/UX Designer passionate about creating beautiful, functional interfaces.",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=250&auto=format&fit=crop",
    followers: 124,
    following: 67,
    joinedDate: "February 2025",
    skills: ["UI Design", "UX Research", "Figma", "Design Systems"],
    social: {
      twitter: "samchen",
      github: "samchen",
      instagram: "samchen.design",
      facebook: "https://facebook.com/samchen",
      youtube: "https://youtube.com/@samchen",
      linkedin: "https://linkedin.com/in/samchen",
      website: "https://samchen.design",
      email: "sam@samchen.design",
    },
    newsletterSubscribers: 287,
    newsletterName: "Design Weekly",
    role: "UX Designer",
  },
  jamiesmith: {
    id: 3,
    username: "jamiesmith",
    name: "Jamie Smith",
    bio: "Photographer and visual storyteller exploring the world one frame at a time.",
    avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=250&auto=format&fit=crop",
    followers: 198,
    following: 112,
    joinedDate: "January 2025",
    skills: ["Photography", "Editing", "Composition", "Lighting"],
    social: {
      twitter: "jamiesmith",
      github: "jamiesmith",
      instagram: "jamiesmith.photo",
      facebook: "https://facebook.com/jamiesmith",
      youtube: "https://youtube.com/@jamiesmith",
      linkedin: "https://linkedin.com/in/jamiesmith",
      website: "https://jamiesmith.dev",
      email: "jamie@jamiesmith.dev",
    },
    newsletterSubscribers: 342,
    newsletterName: "Jamie's Insights",
    role: "Photographer",
  },
  jamesmiller: {
    id: 4,
    username: "jamesmiller",
    name: "James Miller",
    bio: "Frontend developer focused on performance optimization and modern web technologies.",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=250&auto=format&fit=crop",
    followers: 87,
    following: 54,
    joinedDate: "March 2025",
    skills: ["JavaScript", "Performance", "React", "Next.js"],
    social: {
      twitter: "jamesmiller",
      github: "jamesmiller",
      instagram: "jamesmiller.dev",
      facebook: "https://facebook.com/jamesmiller",
      youtube: "https://youtube.com/@jamesmiller",
      linkedin: "https://linkedin.com/in/jamesmiller",
      website: "https://jamesmiller.dev",
      email: "james@jamesmiller.dev",
    },
    newsletterSubscribers: 156,
    newsletterName: "Performance Matters",
    role: "Frontend Developer",
  },
}

export type User = (typeof users)[keyof typeof users]

export function getUserByUsername(username: string): User | undefined {
  return users[username as keyof typeof users]
}

export function getDefaultUser(): User {
  return users.alexjohnson
}

