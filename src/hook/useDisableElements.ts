import { useEffect, useState } from 'react';

export default function useDisableElements(perameter:any, timeMS=2000) 
{
    const [showElement, setShowElements] = useState(true);
    const [interrupted, setInterrupted] = useState(false);

    useEffect(() => {
        
        const currentTimeout = setTimeout(() => {
            setShowElements(false);
        }, timeMS);
        
        setInterrupted(true);
        
        return () => clearTimeout(currentTimeout);
    }, [perameter])

    useEffect(() => {
        setShowElements(true);
    }, [perameter]);
 
    
    return [showElement, setShowElements];
}
