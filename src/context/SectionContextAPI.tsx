'use client'

import { createContext, useContext, useState, Dispatch, SetStateAction, ReactNode, useEffect, useOptimistic, startTransition } from 'react';
import useLocalStorage from '@/hook/useLocalStorage';
import { SectionScheme } from '@/scheme/SectionScheme';
import { createSection, getSections, updateSection } from '@/app/actions/section';

interface SectionContextData {
    contextSections: SectionScheme[];
    setContextSections: Dispatch<SetStateAction<SectionScheme[]>>;
    
    optimisticSections? : SectionScheme[];
    updateOptimisticSections? : (action: SectionScheme) => void;
}

export interface SectionContextType extends SectionContextData {
    CreateSection: (section: SectionScheme) => Promise<void>;
    GetSections: () => Promise<SectionScheme[]>;
    UpdateSection : ({currentSectionID, updatedSection} : { currentSectionID : string, updatedSection : SectionScheme }) => Promise<SectionScheme[]>;
    DeleteSections: (id: string) => Promise<void>;
}

type SectionContextProviderProps = {
    children : ReactNode;
}

const SectionContext = createContext<SectionContextType | undefined>(undefined);

export const useSectionContext = () => useContext(SectionContext);

export const SectionContextProvider = ({children} : SectionContextProviderProps) => {

    const [contextSections, setContextSections] = useState<SectionScheme[]>([]);
    const [localStorageSections, setLocalStorageSections] = useLocalStorage<SectionScheme[]>('sectionsCache', []);

    const [optimisticSections, updateOptimisticSections] = useOptimistic<SectionScheme[], SectionScheme>(
        contextSections || [],
        (currentState, updatedSection) => {
            return [...currentState, updatedSection];
        }
    );

    const CreateSection = async (section : SectionScheme) => {
        const newSection = {...section};

        startTransition(() => {
            updateOptimisticSections(newSection);
            console.log({optimisticSections : optimisticSections, contextSections : contextSections});
        })

        try 
        {
            const response : any = await createSection(section);
            if(response) {
                await GetSections(true);
            }
        } 
        catch (error) {
            console.error(error);
        }
    };

    const GetSections = async (revalidateFetch? : boolean) => {
        if(localStorageSections.length > 0 && !revalidateFetch) {
            return localStorageSections;
        }
        else
        {
            try 
            {
                const response = await getSections();
                if(response) {
                    setContextSections(response);
                    setLocalStorageSections(response);
                }
                return [];
            } 
            catch (error) { return []; }
        }
    };

    const UpdateSection = async ({currentSectionID, updatedSection} : { currentSectionID : string, updatedSection : SectionScheme }) => {
        try 
        {
            const data = { currentSectionID, updatedSection };
            const response = await updateSection(data);
            
            if(response) {
                await GetSections(true);
            }
            
            return [];
        } 
        catch (error) { return []; }
    };
    
    const DeleteSections = async (id:string) => {
        setContextSections(prevSections => {
            const updatedSections = prevSections.filter((section) => section.id !== id);
            return updatedSections;
        });
    }

    // Sync contextSections with localStorageSections on component mount
    // Empty dependency array ensures this effect runs only once on mount
    useEffect(() => {
        if (localStorageSections.length > 0) {
            setContextSections(localStorageSections);
        }
    }, []);

    // Sync localStorageSections with contextSections whenever it changes
    useEffect(() => {
        setLocalStorageSections(contextSections);
    }, [contextSections]);

    
    const contextValue: SectionContextType = {
        CreateSection,
        GetSections,
        DeleteSections,
        UpdateSection,

        contextSections,
        setContextSections
    };

    return (
        <SectionContext.Provider value={contextValue}>
            {children}
        </SectionContext.Provider>
    )
}



/*

const CreateSection = async (section : SectionScheme) => {
        if(section.id.length > 3) {
            setContextSections(prev => [...prev, section]);
            setLocalStorageSections(contextSections);
        }
        else {
            alert('Please Enter Section Name With Least 3 Character Long');
        }
        console.log('Creating new section in db... ');
    }

    const UpdateSection = async (updatedSection: SectionScheme) => {
        setContextSections(prevSections => {
            const updatedSections = prevSections.map(section => {
                if (section.id === updatedSection.id) {
                    return {
                        ...section,
                        data: updatedSection.data,
                        created_at: updatedSection.created_at
                    };
                }
                return section; // Return unchanged section if not updated
            });
            return updatedSections;
        });
        setLocalStorageSections(contextSections);
        return contextSections;
    };

    const DeleteSections = async (id:string) => {
        setContextSections(prevSections => {
            const updatedSections = prevSections.filter((section) => section.id !== id);
            return updatedSections;
        });
        setLocalStorageSections(contextSections);
    }

*/