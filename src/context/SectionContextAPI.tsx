'use client'

import { createContext, useContext, useState, Dispatch, SetStateAction, ReactNode, useEffect } from 'react';
import { FilterSectionScheme, SectionScheme } from '@/scheme/SectionScheme';
import { createSection, deleteSection, getSections, updateSection } from '@/app/actions/section';
import { CheckArrayEquality } from '@/globalFunction/CheckArrayEquality';
import useLocalStorage from '@/hook/useLocalStorage';
import { LinkItemScheme } from '@/scheme/LinkSection';

interface SectionContextData {
    contextSections: SectionScheme[];
    setContextSections: Dispatch<SetStateAction<SectionScheme[]>>;

    filteredContextSections: FilterSectionScheme[];
    setFilteredContextSections: Dispatch<SetStateAction<FilterSectionScheme[]>>;

    enableFilterContextSections : boolean;
    setEnableFilterContextSections: Dispatch<SetStateAction<boolean>>;
}

export interface SectionContextType extends SectionContextData {
    CreateSection: (section: SectionScheme) => Promise<void>;
    GetSections: (revalidateFetch? : boolean) => Promise<SectionScheme[]>;
    UpdateSection : ({currentSection, updatedSection} : { currentSection : SectionScheme, updatedSection : SectionScheme }) => Promise<void>;
    DeleteSections: (id: string) => Promise<any>;
    SaveContextSections : () => void;
    RestoreContextSections : () => void;
}

type SectionContextProviderProps = {
    children : ReactNode;
}

const SectionContext = createContext<SectionContextType | undefined>(undefined);

export const useSectionContext = () => useContext(SectionContext);

export const SectionContextProvider = ({children} : SectionContextProviderProps) => {

    const [contextSections, setContextSections] = useState<SectionScheme[]>([]);
    const [filteredContextSections, setFilteredContextSections] = useState<FilterSectionScheme[]>([]);
    const [originalContextSections, setOriginalContextSections] = useState<SectionScheme[]>([]);

    const [localStorageSections, setLocalStorageSections] = useLocalStorage<SectionScheme[]>('sectionsCache', []);
    const [serverOperationInterrupted, setServerOperationInterrupted] = useLocalStorage<boolean>('operationInterrupted', false);

    {/* the filteredContextSections data will come from the component that does the filtering */}
    const [enableFilterContextSections, setEnableFilterContextSections] = useState<boolean>(false);

    const CreateSection = async (newSection : SectionScheme) => {
        try 
        {
            setServerOperationInterrupted(true);
            setContextSections(prev => [...prev, newSection]);
            const response : any = await createSection(newSection);
            if(response.status == 200) {
                SaveContextSections();
                setServerOperationInterrupted(false);
            }
            else {
                setServerOperationInterrupted(true);
                await GetSections(true);
                setServerOperationInterrupted(false);
            }
        } 
        catch (error : any) {
            //console.log(error);
            throw new Error(error);
        }
    };

    const GetSections = async (revalidateFetch? : boolean) => {
        if(localStorageSections.length > 0 && !revalidateFetch) return localStorageSections;
        try 
        {
            setServerOperationInterrupted(true);
            setLocalStorageSections([]);
            const response : any[] = await getSections();
            setServerOperationInterrupted(false);
            if(response) {
                // this will remove links from a section that doesnt have id title or url type
                const updatedResponse : any[] = response.map((section : SectionScheme) => {
                     if(section.data != undefined) {
                        return {
                            ...section,
                            data : Object.values(section.data).filter((link) => link.id != undefined)
                        }
                     }
                })
                setContextSections(updatedResponse);
                setOriginalContextSections(response);
            }
            return response;
        } 
        catch (error : any) { 
            throw new Error(error);
        }
    };

    const UpdateSection = async ({currentSection, updatedSection} : { currentSection : SectionScheme, updatedSection : SectionScheme }) => {
        try 
        {
            setServerOperationInterrupted(true);

            setContextSections(prevContextSections => {
                const sectionIndex = prevContextSections.findIndex(section => section.id === currentSection.id);
                if (sectionIndex !== -1) {
                    const newContextSections = [...prevContextSections];
                    newContextSections[sectionIndex] = updatedSection;
                    return newContextSections;
                }
                else {
                    //console.error('Section not found');
                    return prevContextSections;
                }
            });
                
            const response = await updateSection(currentSection.id, updatedSection);            

            if(response.status == 200) {
                //console.log(response.message);
                setOriginalContextSections(contextSections);
                setServerOperationInterrupted(false);
            }
            else {
                setContextSections(originalContextSections);
                await GetSections(true);
                setServerOperationInterrupted(false);
                //console.error('ERR : ', response.message);
            }
        } 
        catch (error : any) {  
            RestoreContextSections();
            setServerOperationInterrupted(false);
        }
    };
    
    const DeleteSections = async (id:string) => {
        if(id.length < 3) return;
        setServerOperationInterrupted(true);
        if(enableFilterContextSections) {
            setFilteredContextSections(prevSections => prevSections.filter((section) => section.id !== id));
        }
        setContextSections(prevSections => prevSections.filter((section) => section.id !== id));
        try 
        {
            const currentTimeout = setTimeout(async () => {
                const response = await deleteSection(id);
                if(response.status == 200) {
                    SaveContextSections();
                    setServerOperationInterrupted(false);
                }
                else {
                    console.error('something went wrong while deleting the section please try again');
                    RestoreContextSections();
                    setServerOperationInterrupted(false);
                }
            }, 500);

            return () => clearTimeout(currentTimeout);
        } 
        catch (error : any) {
            RestoreContextSections();
            throw new Error(error);
        }
    }

    const SaveContextSections = () => {
        setOriginalContextSections(contextSections);
    }
    const RestoreContextSections = () => {
        setContextSections(originalContextSections);
    }

    const handleServerOperationInterrupted = async () => {
        const latestSections = await getSections();
        
        if(latestSections.length < 1) {
            console.warn('serverOperationInterruptEvenet : [data did not fetched]');
            return;
        }
        
        if(CheckArrayEquality(latestSections, localStorageSections)) {
            console.error('serverOperationInterruptEvenet : [latestSections and currentSections are same after refetch]');
        }
        else {
            console.error('serverOperationInterruptEvenet : [data are not similler require full fetch] ');
            console.log("GETTING NEW DATA");
            await GetSections(true);
        }
    }

    useEffect(() => {
        if(localStorageSections.length < 1) {
            GetSections(true);
            return;
        }
        if(serverOperationInterrupted) {
            handleServerOperationInterrupted();
        }
        setContextSections(localStorageSections);
        setOriginalContextSections(localStorageSections);
    }, []);

    useEffect(() => {
        setLocalStorageSections(contextSections);
    }, [contextSections]);
    
    
    const contextValue: SectionContextType = {
        CreateSection,
        GetSections,
        UpdateSection,
        DeleteSections,
        SaveContextSections,
        RestoreContextSections,

        contextSections,
        setContextSections,
        enableFilterContextSections,
        setEnableFilterContextSections,
        filteredContextSections,
        setFilteredContextSections
    };

    return (
        <SectionContext.Provider value={contextValue}>
            {children}
        </SectionContext.Provider>
    )
}