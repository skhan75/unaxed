import { DocumentData } from "firebase/firestore";
import { UserEnt } from "./UserEnt";


interface ProjectContributorData {
    contributorId: string;
    username: string;
    firstName: string;
    lastName: string;
    profileImageUrl: string;
}

interface ProjectContributorsEnt {
    id: string;
    data: ProjectContributorData;
}

interface ProjectData {
    title: string;
    description: string;
    startDate?: {
        day: number;
        month: number;
        year: number;
    };
    endDate?: {
        day: number;
        month: number;
        year: number;
    };
    media?: [];
    timeline?: string;
    contributors?: ProjectContributorsEnt[];
}

interface ProjectEnt {
    id: string;
    data: DocumentData;
}

export type { ProjectEnt, ProjectData, ProjectContributorsEnt, ProjectContributorData };