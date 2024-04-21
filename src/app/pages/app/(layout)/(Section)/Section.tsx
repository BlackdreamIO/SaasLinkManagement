'use client'

import { useState, useEffect, memo } from "react";
import { motion, useMotionValue, Reorder } from "framer-motion";
import { useToast } from "@/components/ui/use-toast";

import { Box, Divider, Flex } from "@chakra-ui/react";

import SectionHeader from "./SectionHeader";
import LinkCreator from "./LinkCreator";
import LinkItem from "./LinkItem";

import { LinkItemScheme } from "@/scheme/LinkSection";
import { cn } from "@/lib/utils";
import { FetchGET, FetchPOST, FetchPUT } from "@/hook/useFetch";
import useDisableElements from "@/hook/useDisableElements";

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
    const [links, setLinks] = useState(linkItems);

    const [minimizeSection, setMinimizeSection] = useState(false);
    const [enableDragListener, setEnableDragListener] = useState(true);
    const [previousDragListenerEnable, setPreviousDragListenerEnable] = useState(enableDragListener);
    const [hideElements, setHideElements] = useState(false);

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
        }
        
        setSectionName(newStr);
        setIsLoading(true);

        const response : any = await FetchPUT({ url : 'http://localhost:3000/api/section/update', body : { id : sectionTitle, newID : newStr, data : {} } });

        response.ok ? onNameChangedEvent?.() : console.error('Link call <onNameChangedEvent()>');
        response.ok ? 
            showToastContent({ title : `Changed Name ${sectionTitle}` }) : 
            showToastContent({ title : `Failed To Change Name Of ${sectionTitle}`, descirption : response, className : 'border-red-500' })
        
        setIsLoading(response.ok ? false : isLoading);
        
    }

    const handleOnCreateLink = async (linkData : LinkItemScheme) => {
        if(linkData.link == '' && linkData.title == '') {
            showToastContent({ title : `Input Required`, descirption : `Title and Link must be filled`, className : 'border-yellow-500' });
            return;
        }
        showToastContent({ title : `Creating New Link ${linkData.title}`, descirption : `Url ${linkData.link}` });
        
        const ranUUID = crypto.randomUUID().slice(0, 10);
        const response : any = await FetchPOST({ url : 'http://localhost:3000/api/link/create', body : { id : sectionTitle, linkId : ranUUID, linkName : linkData.title, linkUrl : linkData.link, } });
        
        response.ok ? handleFetchLinks() : console.error('Link call <handleFetchLinks()>');
        if(!response.ok) {
            showToastContent({ title : `Error while creating link ${linkData.title}`, descirption : `code ${response}`, className : 'border-red-500' });
            handleFetchLinks();
        }
    }
    
    const handleFetchLinks = async () => {
        const response : any = await FetchGET({ url : 'http://localhost:3000/api/link/get'});
        response.ok ? setLinks(response.links) : console.error('failed to fetch links');
        if(!response.ok) alert('failed to fetch links please try refreshing the browser');
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
    
    useEffect(() => {
        const timeout = setTimeout(() => {
            if(!minimizeSection) {
                setHideElements(true);
            }
        }, 1000);

        if(minimizeSection) {
            setHideElements(false);
        }
        return () => clearTimeout(timeout);
    }, [minimizeSection])

    
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
                    className="overflow-hidden h-auto min-h-[0px]"
                >
                    <Flex 
                        flexDir={'column'} 
                        wrap={'nowrap'} 
                        gap={2} 
                        p={5}
                        h={'auto'} 
                        className="mb-5">
                        {
                            !hideElements && (
                                Object?.entries(links)?.map(([id, linkItem]) => (
                                    linkItem.title?.length > 1 && linkItem.link?.length > 1 && (
                                        <LinkItem
                                            id={id}
                                            sectionName={sectionName}
                                            onLinkUpdate={handleFetchLinks}
                                            title={linkItem.title}
                                            link={linkItem.link.toString()}
                                            created_at={linkItem.created_at}
                                            key={linkItem.title}
                                        />
                                    )
                                ))
                            )
                        }
                    </Flex>
                    
                    <LinkCreator
                        onLinkCreate={(linkData) => handleOnCreateLink(linkData)} 
                    />
                </motion.div>

            </Box>
        </Reorder.Item>
    )
})
