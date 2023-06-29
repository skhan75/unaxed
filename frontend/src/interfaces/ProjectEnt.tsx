import { DocumentData } from "firebase/firestore";

interface ProjectEnt {
    id: string;
    data: DocumentData;
}

export type { ProjectEnt };