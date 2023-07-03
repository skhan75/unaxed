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
    projectId: string;
    title: string;
    description: string;
    startDate?: {
        day: number;
        month: number;
        year: number;
    } | null;
    endDate?: {
        day: number;
        month: number;
        year: number;
    } | null;
    media?: { mediaId: string, downloadUrl: string }[];
    timeline?: string;
    contributors?: ProjectContributorsEnt[];
    status: string;
}

interface ProjectEnt {
    id: string;
    data: DocumentData;
}

export type { ProjectEnt, ProjectData, ProjectContributorsEnt, ProjectContributorData };