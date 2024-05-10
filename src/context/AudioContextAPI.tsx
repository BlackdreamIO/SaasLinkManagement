import { createContext, useContext, useState, Dispatch, SetStateAction, ReactNode } from 'react';

export type AudioContextType = {
    soundOnSectionCreate : boolean,
    soundOnLinkCreate : boolean,
    soundOnStartup : boolean,
    inAppNotificatiom : boolean,
    externalNotification : boolean,
}

interface ExtendedIAudioContext {
    audioContext : AudioContextType;
    setAudioContext : Dispatch<SetStateAction<AudioContextType>>;
}

const audioContextDefaultState = {
    audioContext : {
        soundOnLinkCreate : true,
        soundOnSectionCreate : true,
        soundOnStartup : true,
        inAppNotificatiom : true,
        externalNotification : true,
    },
    setAudioContext : (audioContext : AudioContextType) => {},
} as ExtendedIAudioContext;

const AudioContext = createContext<ExtendedIAudioContext>(audioContextDefaultState);

export const useAudioContext = () => useContext(AudioContext);

type AudioContextProviderProps = {
    children : ReactNode;
}

export const AudioContextProvider = ({children} : AudioContextProviderProps) => {
    
    const [audioContext, setAudioContext] = useState<AudioContextType>({
        soundOnLinkCreate : true,
        soundOnSectionCreate : true,
        soundOnStartup : true,
        inAppNotificatiom : true,
        externalNotification : true,
    });

    return (
        <AudioContext.Provider value={{audioContext, setAudioContext}}>
            {children}
        </AudioContext.Provider>
    )
}