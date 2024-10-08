interface UserDataInterface {
    firstName: string,
    middleName: string,
    lastName: string,
    country: string,
    city: string,
    postalCode: string,
    bio?: string,
    website?: string,
    email?: string,
    followers?: number,
    following?: number,
    followersList?: string[],
    followingList?: string[],
    stars?: number,
    experience?: {
        yoe?: string,
        current: {
            title: string,
            company: string,
            industry: string,
            location?: string,
        },
        past?: {
            title: string,
            company: string,
            industry: string,
            startYear?: number,
            endYear?: number,
            coreSkills?: string[],
        }[],
    },
    profileImageUrl?: string,
    coverImageUrl?: string,
    socialLinks?: {
        facebook?: string,
        twitter?: string,
        linkedIn?: string,
        instagram?: string,
        github?: string,
        website?: string,
    },
    skills?: string[],
    interests?: string[],
    languages?: string[],
    certifications?: string[],
    education?: {
        school: string,
        degree: string,
        fieldOfStudy: string,
        startYear: number,
        endYear: number,
        grade: string,
        activities: string,
        description: string,
    }[],
    projects?: {
        title: string,
        description: string,
        link: string,
        image: string,
    }[],
}

export type { UserDataInterface };