import { LinkItemScheme } from "@/scheme/LinkSection";
import { SectionScheme } from "@/scheme/SectionScheme";

export type SectionItemProps = {
    section : SectionScheme,
    hightlightBody? : boolean;
    onSectionTitleEdit : (updatedSection : SectionScheme) => void;
    onSectionDelete : (id : string) => void;
}

export type SectionHeaderProps = {
    sectionTitle : string;
    sectionLinksLength : number;
    handleEditSectionTitle : (newStr : string) => void;
    handleToggleMinimize : () => void;
    handleOnSectionDelete : (id : string) => void;
    handleOnAddLink : () => void;
}

export type LinkProps = {
    id : string;
    title : string;
    url : string;
    created_at : Date;
    section : SectionScheme;
    handleTitleEdit : (newTitle : string) => void;
    handleUrlEdit : (newUrl : string) => void;
    handleDelete : (id : string) => void;
}
