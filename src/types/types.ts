import { LinkItemScheme } from "@/scheme/LinkSection";
import { SectionScheme } from "@/scheme/SectionScheme";

export type SectionItemProps = {
    url : string;
    id : string;
    linkItems : LinkItemScheme[];
    onSectionTitleEdit : (updatedSection : SectionScheme) => void;
    onSectionDelete : (id : string) => void;
}

export type SectionHeaderProps = {
    sectionTitle : string;
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
    handleTitleEdit : (newTitle : string) => void;
    handleUrlEdit : (newUrl : string) => void;
    handleDelete : (id : string) => void;
}
