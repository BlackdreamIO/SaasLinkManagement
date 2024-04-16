import { LinkItemScheme } from "./LinkSection";
import { serverTimestamp, FieldValue } from "firebase/firestore";

export interface SectionScheme {
    id : string;
    created_at : FieldValue;
    data : LinkItemScheme[] | [];
    previewCreate? : boolean;
}