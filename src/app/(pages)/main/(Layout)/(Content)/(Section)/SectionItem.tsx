'use client'

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { SectionItemProps } from "@/types/types";
import { LinkItemScheme } from "@/scheme/LinkSection";

import { ErrorBoundary } from "next/dist/client/components/error-boundary";
import { Box, Container, VStack } from "@chakra-ui/react";

import SectionHeader from "./SectionHeader";
import Error from "./error";

import { SectionScheme } from "@/scheme/SectionScheme";
import { LinkCreateDialog } from "../(Link)/LinkCreateDialog";
import { SectionLinks } from "./SectionLinks";
import { useLinkContext } from "@/context/LinkContextAPI";

const variants = {
    open: { height: 'auto' },
    closed: { height: 0 }
};

export const SectionItem = (props : SectionItemProps) => {
    const { section, hightlightBody, onSectionTitleEdit, onSectionDelete } = props;

    const [currentSectionInfo, setCurrentSectionInfo] = useState<SectionScheme>({ id : section.id, data : section.data });

    const [isMinimized, setIsMinimized] = useState(false);
    const [displayHiddenElements, setDisplayHiddenElements] = useState(true);
    const [openLinkCreateDialog, setOpenLinkCreateDialog] = useState(false);

    const  { CreateLink } = useLinkContext()!;

    const handleSectionRename = (title : string) => {
        setCurrentSectionInfo((prev) => ({ ...prev, id : title }));        
        onSectionTitleEdit?.({...currentSectionInfo, id : title});
    }
    
    const handleSectionDelete = (id : string) => {
        onSectionDelete?.(id);
    }

    const handleLinkCreate = async (linkData : LinkItemScheme) => {
        setOpenLinkCreateDialog(false);
        await CreateLink(currentSectionInfo, linkData);
    }

    useEffect(() => {
        if(displayHiddenElements && !isMinimized) 
        {
            const timeoutId = setTimeout(() => { setDisplayHiddenElements(false); }, 1000);
            return () => clearTimeout(timeoutId);
        }
        if(isMinimized) {
            setDisplayHiddenElements(true);
        }
    }, [isMinimized, displayHiddenElements]);

    useEffect(() => {
        setCurrentSectionInfo({ id : section.id, data : section.data });
    }, [section])
    

    return (
        <Box className={`relative w-full rounded-2xl dark:bg-theme-bgTartiary bg-theme-bgPrimaryLight`}>
            <Box className={` ${hightlightBody ? 'border-2 border-lime-400' : 'border-2 border-transparent'} transition-all duration-300} rounded-2xl`}>
                <SectionHeader 
                    sectionTitle={currentSectionInfo.id}
                    sectionLinksLength={currentSectionInfo.data?.length}
                    handleToggleMinimize={() => setIsMinimized(!isMinimized)}
                    handleEditSectionTitle={handleSectionRename}
                    handleOnSectionDelete={handleSectionDelete}
                    handleOnAddLink={() => setOpenLinkCreateDialog(true)}
                />
            </Box>
            <VStack as={motion.div} direction={'column'} className="relative w-full p-0">
                {
                    isMinimized && (
                        <Box className="absolute dark:shadow-[0px_27px_20px_5px_rgba(0,0,0,0.8)] shadow-[0px_27px_20px_5px_rgba(0,0,0,0.2)] p-4 w-full top-[-32px] pointer-events-none"></Box>
                    )
                }

                <Container className={`ransition-all duration-200 w-full overflow-hidden h-0 min-h-[0px] rounded-lg ${ isMinimized ? 'h-auto' : 'h-0' }`}>
                    {
                        displayHiddenElements && (
                            <ErrorBoundary errorComponent={Error}>
                                <SectionLinks Links={currentSectionInfo.data ?? []} parentSection={currentSectionInfo} />
                            </ErrorBoundary>
                        )
                    }
                </Container>
            </VStack>
            
            <LinkCreateDialog
                openDialog={openLinkCreateDialog}
                onLinkCreate={handleLinkCreate}
                onDialogClose={() => setOpenLinkCreateDialog(false)}
            />
        </Box>
    )
}
