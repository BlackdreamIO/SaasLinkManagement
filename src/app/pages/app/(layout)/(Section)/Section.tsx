'use client'

import { useState, useEffect, memo } from "react";
import { motion, useMotionValue, Reorder, Variant } from "framer-motion";
import { useToast } from "@/components/ui/use-toast";

import { Box, Divider, Flex } from "@chakra-ui/react";

import SectionHeader from "./SectionHeader";
import LinkCreator from "./LinkCreator";
import LinkItem from "./LinkItem";

import { LinkItemScheme } from "@/scheme/LinkSection";
import { cn } from "@/lib/utils";

type SectionProps = {
    sectionTitle : string;
    linkItems : LinkItemScheme[];
    recorderItemValue? : any,
    recorderItemId? : any,
    onNameChangedEvent : () => void;
    onDeleteEvent : (id : string) => void;
}

export const Section = memo((props : SectionProps) => {
    const { sectionTitle, linkItems, recorderItemValue, recorderItemId, onNameChangedEvent, onDeleteEvent } = props;

    const [sectionName, setSectionName] = useState<string>(sectionTitle);

    const [minimizeSection, setMinimizeSection] = useState(false);
    const [enableDragListener, setEnableDragListener] = useState(true);
    const [previousDragListenerEnable, setPreviousDragListenerEnable] = useState(enableDragListener);

    const [borderEffectColor, setBorderEffectColor] = useState('transparent');
    const [isLoading, setIsLoading] = useState(false);

    const y = useMotionValue(0);
    const { toast } = useToast();

    const handleSectionResize = () => {
        setMinimizeSection(!minimizeSection);
    }
    const handleSectionLock = () => {
        setEnableDragListener(!enableDragListener);
        setPreviousDragListenerEnable(enableDragListener);
    }

    const showToastContent = ({title='', descirption='', className=''}) => {
        const defaultClassName =`dark:bg-neutral-900 border-2 border-blue-500`;
        toast({
            title: title,
            description: descirption,
            className: cn(defaultClassName, className),
        })
    }

    const handleEditSectionName = async (newStr : string) => {
        if(newStr.length < 2) {
            showToastContent({ title : 'Enter New Name !', className : 'border-yellow-500' });
            return;
        };
        setSectionName(newStr);
        setIsLoading(true);
        try
        {
            await fetch('http://localhost:3000/api/createSection', {
                method: 'PUT',
                cache: 'no-cache',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    id : sectionTitle,
                    newID : newStr,
                    data : {}
                }),
            })
            .then(() => {
                onNameChangedEvent?.();
                showToastContent({ title : `Changed Name ${sectionTitle}` });
                setIsLoading(false);
            })
            .catch((error) => {
                showToastContent({ title : `Failed To Change Name Of ${sectionTitle}`, descirption : error, className : 'border-red-500' });
                setIsLoading(false);
            })
        } 
        catch (error) {
            showToastContent({ title : `Failed To Change Name Of ${sectionTitle}`, descirption : String(error), className : 'border-red-500' });
            setIsLoading(false);
        }
        
    }

    const handleCreateLink = async (newLinkData : LinkItemScheme) => {
        setIsLoading(true);
        /*
        try
        {
            await fetch('http://localhost:3000/api/link', {
                method: 'POST',
                cache: 'no-cache',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    id : sectionTitle,
                    data : {
                        newLinkData
                    }
                }),
            })
            .then(() => {
                setIsLoading(false);
            })
            .catch((error) => {
                showToastContent({ title : `Failed To Create Link ${newLinkData.title}`, descirption : error, className : 'border-red-500' });
                setIsLoading(false);
            })
        } 
        catch (error) {
            showToastContent({ title : `Failed To Create Link ${newLinkData.title}`, descirption : String(error), className : 'border-red-500' });
            setIsLoading(false);
        }
        */
        
    }

    const handleOnCreateLink = (linkData : LinkItemScheme) => {
        if(linkData.link != '' && linkData.title != '') {
            showToastContent({ title : `Created ${linkData.title}`, descirption : `Url ${linkData.link}` });
            handleCreateLink(linkData);
        }
        else {
            showToastContent({ title : `input required`, descirption : `title and link must be filled`, className : 'border-yellow-500' });
        }
    }

    useEffect(() => {
        const handleEffectAnimation = () => {
            const newBorderColor = borderEffectColor === 'black' ? 'skyblue' : 'black';
            setBorderEffectColor(newBorderColor);
            
            setTimeout(() => {
                setBorderEffectColor('black')
            }, 2000);
        }
        handleEffectAnimation();
    }, [sectionName])

    const variants = {
        open: { height: 'auto' },
        closed: { height: 0 }
    };

    const SectionAnimationVarient = {
        "loading" : {
            opacity : 0.5
        },
        "idle" : {
            opacity : 1
        }
    }

    

    return (
        <Reorder.Item 
            value={recorderItemValue} 
            id={recorderItemId} 
            dragListener={enableDragListener} 
            style={{ y, pointerEvents : isLoading ? 'none' : 'all' }} 
            className="w-full flex flex-col items-center justify-center"
            variants={SectionAnimationVarient}
            animate={isLoading ? "loading" : "idle"}
            initial="idle"
            >
            <Box 
                style={{border : `1px solid ${borderEffectColor}`}} 
                className={`w-full rounded-2xl dark:bg-[rgb(5,5,5)] bg-neutral-100 transition-all duration-300`}>

                <SectionHeader 
                    sectionTitle={sectionName}
                    isMovementLocked={enableDragListener}
                    handleEditSectionTitle={(newTitle) => handleEditSectionName(newTitle)}
                    handleToggleMinimize={handleSectionResize}
                    handleLockMovement={handleSectionLock}
                    handleOnSectionDelete={(id) => onDeleteEvent?.(id)}
                />

                <Divider 
                    style={{
                        marginTop : minimizeSection ? 2 : 0, 
                        marginBottom : minimizeSection ? 2 : 0, 
                        display : minimizeSection ? 'block' : 'none'}} 
                    className="dark:bg-neutral-800 bg-neutral-400 h-[1px]" 
                />

                <motion.div 
                    variants={variants}
                    initial="closed"
                    animate={minimizeSection ? 'open' : 'closed'}
                    style={{ padding : minimizeSection ? 5 : 0, gap : 2 }} 
                    transition={{ duration: 0.1, ease: 'linear'  }}
                    className="overflow-hidden h-auto"
                >
                    <Flex 
                        flexDir={'column'} 
                        wrap={'nowrap'} 
                        gap={2} 
                        p={5}
                        h={minimizeSection ? 'auto' : '300px'} 
                        className="mb-5"
                        >
                        {
                            minimizeSection && (
                                Object.entries(linkItems).map(([id, linkItem]) => (
                                    linkItem.title?.length > 1 && linkItem.link?.length > 1 && (
                                        <LinkItem
                                            id={id}
                                            sectionName={sectionName}
                                            title={linkItem.title}
                                            link={linkItem.link.toString()}
                                            created_at={linkItem.created_at}
                                            onLinkTitleEdit={() => {}}
                                            onLinkUrlEdit={() => {}}
                                            onLinkDelete={() => {}}
                                            key={linkItem.link}
                                        />
                                    )
                                ))
                            )
                        }
                        {Object.values(linkItems).length < 1 && (
                            <p className="text-center text-neutral-500">Empty</p>
                        )}
                    </Flex>
                    
                    <LinkCreator
                        onLinkCreate={(linkData) => handleOnCreateLink(linkData)} 
                    />
                </motion.div>

            </Box>
        </Reorder.Item>
    )
})
