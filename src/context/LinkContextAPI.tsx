'use client'

import { createContext, useContext, useState, Dispatch, SetStateAction, ReactNode, useEffect } from 'react';
import { SectionScheme } from '@/scheme/SectionScheme';
import { LinkItemScheme } from '@/scheme/LinkSection';
import { createLink, deleteLink, updateLink } from '@/app/actions/link';
import { useSectionContext } from './SectionContextAPI';
import useLocalStorage from '@/hook/useLocalStorage';

export interface ILinkContext {
    CreateLink : (sectionID : SectionScheme, link : LinkItemScheme) => Promise<void>;
    UpdateLink : (parentSection : SectionScheme, updatedLink1 : LinkItemScheme) => Promise<void>;
    DeleteLink : (parentSection : SectionScheme, link : LinkItemScheme) => Promise<void>;
}

type LinkContextProviderProps = {
    children : ReactNode;
}

const LinkContext = createContext<ILinkContext | undefined>(undefined);

export const useLinkContext = () => useContext(LinkContext);

export const LinkContextProvider = ({children} : LinkContextProviderProps) => {

    const [links, setLinks] = useState<LinkItemScheme[]>([]);

    const { setContextSections, contextSections, RestoreContextSections, SaveContextSections } = useSectionContext()!;
    const [ _, setServerOperationInterrupted ] = useLocalStorage<boolean>('operationInterrupted', false);

    const CreateLink = async(currentSection : SectionScheme, newLink : LinkItemScheme) => {
        try 
        {
            /*
            const sectionIndex = contextSections.findIndex(section => section.id === currentSection.id);
            if (sectionIndex == -1) {
                console.error('parent section was not found');
                return;
            } 
            const updatedData = { id : currentSection.id, data : {...currentSection.data, [newLink.id] : { ...newLink }} }
     
            setContextSections(prevContextSections => {
                const sectionIndex = prevContextSections.findIndex(section => section.id === currentSection.id);
                if (sectionIndex !== -1) {
                    const newContextSections = [...prevContextSections];
                    newContextSections[sectionIndex] = updatedData;
                    return newContextSections;
                }
                else {
                    console.error('Section not found');
                    return prevContextSections;
                }
            });

            setServerOperationInterrupted(true);
            const response = await createLink(currentSection, newLink);

            if(response) 
            {
                setServerOperationInterrupted(false);
                if(response.status == 200) {
                    SaveContextSections();
                    console.log(`status code : ${response.status} | status message : ${response.message}`);
                }
                else {
                    RestoreContextSections();
                    console.error(`status code : ${response.status} | status message : ${response.message}`);
                }
            }
            */
        } 
        catch (error : any) {
            setServerOperationInterrupted(false);
            RestoreContextSections();
            throw new Error(error);
        }
    }
    
    const UpdateLink = async(parentSection : SectionScheme, updatedLink1 : LinkItemScheme) => {
        
    }
    
    const DeleteLink = async(parentSection : SectionScheme, Link : LinkItemScheme) => {
        try 
        {
            /*
            let tempContextSections = [...contextSections];

            const updatedSectionWithLink : SectionScheme[] = tempContextSections.map((section, index) => {
                if (section.id === parentSection.id) 
                {
                    const updatedSectionData = Object.values(tempContextSections[index].data).filter((link) => link.id !== Link.id);
                    return {
                        ...section,
                        data: updatedSectionData,
                    };
                }
                return section;
            });

            setContextSections(updatedSectionWithLink);

            const response = await deleteLink(parentSection, Link);
            response.status == 200 ? SaveContextSections() : RestoreContextSections();
            */
        }
        catch (error : any) 
        {
            RestoreContextSections();
            throw new Error(error);
        }
    }

    useEffect(() => {
        
    }, [contextSections])
    

    const contextValue: ILinkContext = {
        CreateLink,
        UpdateLink,
        DeleteLink
    };

    return (
        <LinkContext.Provider value={contextValue}>
            {children}
        </LinkContext.Provider>
    )
}
