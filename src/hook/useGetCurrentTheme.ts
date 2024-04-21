
export default function useGetCurrentTheme()
{
    const currentTheme = document.body.className;
    
    if(currentTheme != undefined) {
        return currentTheme;
    }
}