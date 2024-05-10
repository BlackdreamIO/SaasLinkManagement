'use client'

import { useState, useEffect, useOptimistic, useRef } from "react";
import { motion } from "framer-motion";
import { SectionItemProps } from "@/types/types";
import { LinkItemScheme } from "@/scheme/LinkSection";

import { ErrorBoundary } from "next/dist/client/components/error-boundary";
import { Box, VStack } from "@chakra-ui/react";

import SectionHeader from "./SectionHeader";
import Error from "./error";

import { SectionScheme } from "@/scheme/SectionScheme";
import { LinkCreateDialog } from "../(Link)/LinkCreateDialog";
import { SectionLinks } from "./SectionLinks";

const variants = {
    open: { height: 'auto' },
    closed: { height: 0 }
};

export const SectionItem = (props : SectionItemProps) => {
    const { id, linkItems, onSectionTitleEdit, onSectionDelete} = props;
    
    useEffect(() => {
        setCurrentLinkItems(linkItems);
    }, [linkItems]);

    const [currentSectionInfo, setCurrentSectionInfo] = useState<SectionScheme>({ id : id, data : linkItems });
    const [currentLinkItems, setCurrentLinkItems] = useState<LinkItemScheme[]>([]);

    const [isMinimized, setIsMinimized] = useState(false);
    const [displayHiddenElements, setDisplayHiddenElements] = useState(true);
    const [openLinkCreateDialog, setOpenLinkCreateDialog] = useState(false);

    const handleSectionRename = (title : string) => {
        setCurrentSectionInfo((prev) => ({ ...prev, id : title }));
        console.log('section item ', {...currentSectionInfo, id : title});
        
        onSectionTitleEdit?.({...currentSectionInfo, id : title});
    }
    
    const handleSectionDelete = (id : string) => {
        onSectionDelete?.(id);
    }

    const handleLinkCreate = (linkData : LinkItemScheme) => {
        setCurrentLinkItems(prevItems => [...prevItems, linkData]);
        setOpenLinkCreateDialog(false);
    }

    useEffect(() => {
        const handleDisplayHiddenElements = () => {
            const timeoutId = setTimeout(() => {
                setDisplayHiddenElements(false);
            }, 1000);
    
            return () => {
                clearTimeout(timeoutId);
                setDisplayHiddenElements(true);
            }
        }
        if(isMinimized) {
            setDisplayHiddenElements(true);
        }
        else if(!isMinimized && displayHiddenElements) {
            handleDisplayHiddenElements();
        }
    }, [isMinimized, displayHiddenElements]);

    return (
        <Box className="relative w-full rounded-2xl dark:bg-theme-bgTartiary bg-theme-bgPrimaryLight">
            <Box className="">
                <SectionHeader 
                    sectionTitle={currentSectionInfo.id}
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

                <motion.div
                    variants={variants}
                    initial="closed"
                    animate={isMinimized ? 'open' : 'closed'}
                    className="transition-all duration-200 w-full overflow-hidden h-0 min-h-[0px] rounded-lg"
                    transition={{ duration: 0, ease: 'easeInOut' }}>
                    {
                        displayHiddenElements && (
                            <ErrorBoundary errorComponent={Error}>
                                <SectionLinks Links={currentLinkItems} />
                            </ErrorBoundary>
                        )
                    }
                </motion.div>
            </VStack>
            
            <LinkCreateDialog
                openDialog={openLinkCreateDialog}
                onLinkCreate={handleLinkCreate}
                onDialogClose={() => setOpenLinkCreateDialog(false)}
            />
        </Box>
    )
}
