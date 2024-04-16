
export type SectionItemProps = {
    url : string;
    title : string;
    onTitleEdit : (newTitle : string) => void;
    onLinkEdit : (newUrl : string) => void;
    onLinkDelete : () => void;
}

export type SectionHeaderProps = {
    sectionTitle : string;
    isMovementLocked : boolean;
    handleEditSectionTitle : (newStr : string) => void;
    handleToggleMinimize : () => void;
    handleLockMovement : () => void;
    handleOnSectionDelete : (id : string) => void;
}