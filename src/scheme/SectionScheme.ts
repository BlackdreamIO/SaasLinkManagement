import { LinkItemScheme } from "./LinkSection";

export interface SectionScheme {
    id : string;
    data : LinkItemScheme[] | [];
    createdAt? : Date;
}

export interface FilterSectionScheme extends SectionScheme {
    highlightBody? : boolean;
    queryText? : string;
}