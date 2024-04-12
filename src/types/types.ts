
export type SectionItemProps = {
    url : string;
    title : string;
    onTitleEdit : (newTitle : string) => void;
    onLinkEdit : (newUrl : string) => void;
    onLinkDelete : () => void;
}

export type SectionProps = {
    sectionTitle : string;
    editSectionName : boolean;
    isMovementLocked : boolean;
    handleEditSectionTitle : (newStr : string) => void;
    handleEditSectionClose : () => void;
    handleToggleMinimize : () => void;
    handleLockMovement : () => void;
}