import { DocumentData } from "firebase/firestore";

interface UserEnt {
    id: string;
    data: DocumentData;
}

export type { UserEnt };