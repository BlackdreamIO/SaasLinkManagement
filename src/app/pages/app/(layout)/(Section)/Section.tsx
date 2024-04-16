'use client'

import { useState, useEffect, memo } from "react";
import { motion, useMotionValue, Reorder, Variant } from "framer-motion";
import { useToast } from "@/components/ui/use-toast";

import { Box, Divider, Flex } from "@chakra-ui/react";

import LinkComponent from "./LinkComponent";
import SectionHeader from "./SectionHeader";
import LinkCreator from "./LinkCreator";
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

function GenerateRandomID () {
    var array = new Uint32Array(1);
    window.crypto.getRandomValues(array);
    return array.toString();
}

export const Section = memo((props : SectionProps, ...rest) => {
    const { sectionTitle, linkItems, recorderItemValue, recorderItemId, onNameChangedEvent, onDeleteEvent } = props;

    const [sectionName, setSectionName] = useState<string>(sectionTitle);

    const [minimizeSection, setMinimizeSection] = useState(false);
    const [enableDragListener, setEnableDragListener] = useState(true);

    const [borderEffectColor, setBorderEffectColor] = useState('newBorderColor');
    const [isLoading, setIsLoading] = useState(false);

    const y = useMotionValue(0);
    const { toast } = useToast();

    const handleSectionResize = () => {
        setMinimizeSection(!minimizeSection);
        if(enableDragListener) {
            setEnableDragListener(false);
        }
    }

    const handleEditSectionName = async (newStr : string) => { 
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
                toast({
                    title: `Changed Name ${sectionTitle}`,
                    description: ``,
                    className: cn('dark:bg-neutral-900 border-2 border-blue-500'),
                })
                setIsLoading(false);
            })
            .catch((error) => {
                toast({
                    title: `Failed To Change Name Of ${sectionTitle}`,
                    description: `ERR ${error}`,
                    className: cn('dark:bg-neutral-900 border-2 border-red-500'),
                })
                setIsLoading(false);
            })
        } 
        catch (error) {
            toast({
                title: `Failed To Change Name Of ${sectionTitle}`,
                description: `ERR ${error}`,
                className: cn('dark:bg-neutral-900 border-2 border-red-500'),
            })
            setIsLoading(false);
        }
        
    }

    const handleCreateLink = (linkData : LinkItemScheme) => {
        toast({
            title: `Created ${linkData.title}`,
            description: `Url ${linkData.link}`
        })
    }

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

    useEffect(() => {
        const handleEffectAnimation = () => {
            const newBorderColor = borderEffectColor === '#262626' ? 'skyblue' : '#262626';
            setBorderEffectColor(newBorderColor);
            
            setTimeout(() => {
                setBorderEffectColor('#262626')
            }, 2000);
        }
        handleEffectAnimation();
    }, [sectionName])

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
                className={`w-full rounded-xl dark:bg-neutral-950 bg-neutral-100 transition-all duration-300`}>

                <SectionHeader 
                    sectionTitle={sectionName}
                    isMovementLocked={enableDragListener}
                    handleEditSectionTitle={(newTitle) => handleEditSectionName(newTitle)}
                    handleToggleMinimize={handleSectionResize}
                    handleLockMovement={() => setEnableDragListener(!enableDragListener)}
                    handleOnSectionDelete={(id) => onDeleteEvent?.(id)}
                />

                <Divider style={{marginTop : minimizeSection ? 2 : 0, marginBottom : minimizeSection ? 2 : 0}} className="!bg-neutral-500" />

                <motion.div 
                    variants={variants}
                    initial="closed"
                    animate={minimizeSection ? 'open' : 'closed'}
                    style={{ padding : minimizeSection ? 5 : 0, gap : 2 }} 
                    transition={{ duration: 0.1, ease: 'easeIn' }}
                    className="overflow-hidden"
                >
                    <Flex 
                        flexDir={'column'} 
                        wrap={'nowrap'} 
                        gap={2} 
                        p={5}
                        h={'auto'} >
                        {
                            Object.values(linkItems).map((linkItem) => (
                                linkItem.title?.length > 1 && linkItem.link?.length > 1 && (
                                    <LinkComponent 
                                        id={linkItem.id}
                                        title={linkItem.title}
                                        link={linkItem.link.toString()}
                                        created_at={linkItem.created_at}
                                        onLinkTitleEdit={() => {}}
                                        onLinkUrlEdit={() => {}}
                                        onLinkDelete={() => {}}
                                        key={linkItem.id}
                                    />
                                )
                            ))
                        }
                    </Flex>
                    <LinkCreator
                        onLinkCreate={(linkData) => handleCreateLink(linkData)} 
                    />
                </motion.div>

            </Box>
        </Reorder.Item>
    )
})
