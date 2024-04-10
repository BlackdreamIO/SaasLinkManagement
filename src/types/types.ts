
export type LinkComponentProps = {
    url : string;
    title : string;
    onTitleEdit : (newTitle : string) => void;
    onLinkEdit : (newUrl : string) => void;
    onLinkDelete : () => void;
}

export type SectionHeaderProps = {
    sectionTitle : string;
    editSectionName : boolean;
    handleEditSectionTitle : (newStr : string) => void;
    handleEditSectionClose : () => void;
    handleToggleMinimize : () => void;
}