
export type LinkComponentProps = {
    url : string;
    title : string;
    onTitleEdit : (newTitle : string) => void;
    onLinkEdit : (newUrl : string) => void;
    onLinkDelete : () => void;
}