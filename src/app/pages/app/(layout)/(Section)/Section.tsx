'use client'

import { useState, useEffect } from "react";
import { motion, useMotionValue, Reorder, useDragControls } from "framer-motion";

import { Box, Text, Divider, HStack, Flex } from "@chakra-ui/react";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

import { IoPencil } from "react-icons/io5";
import { MdOutlineArrowDropDown } from "react-icons/md";
import { SlCursorMove } from "react-icons/sl";

import LinkComponent from "./LinkComponent";
import { useRaisedShadow } from "@/hook/useRaisedShadow";

export default function Section({ sectionTitle } : { sectionTitle : string })
{
    const [url, setUrl] = useState('https://console.cloud.google.com/iam-admin/iam?project=new-game-cord');
    
    const [editSectionName, setEditSectionName] = useState(false);
    const [sectionName, setSectionName] = useState('Heading Text');
    const [newSectionName, setNewSectionName] = useState('Heading Text');
    const [minimizeSection, setMinimizeSection] = useState(false);

    const [isDragging, setIsDragging] = useState(false);
    const [pointerInside, setPointerInside] = useState(false);

    const y = useMotionValue(0);
    const borderStyle = useRaisedShadow(y);
    const dragControls = useDragControls();

    const handleDragStart = (event : any) => {
        dragControls.start(event);
        setIsDragging(true);
    }

    const handleDragEnd = () => {
        //setIsDragging(false);
    }

    useEffect(() => {
        console.log(borderStyle);
        
    }, [borderStyle])
    

    const handleEditSectionName = () => { 
        if(newSectionName.length > 2) {
            setSectionName(newSectionName);
            setEditSectionName(false);
        }
    }

    const handleEditSectionClose = () => setEditSectionName(false);

    const variants = {
        open: { height: 'auto' },
        closed: { height: 0 }
    };

    return (
        <Reorder.Item value={sectionTitle} id={sectionTitle} style={{ borderStyle, y }} dragListener={false} dragControls={dragControls}>
            <Box 
                tabIndex={1} 
                className={`w-[95%] m-auto rounded-xl bg-neutral-950 border ${isDragging ? '!border-blue-400' : 'border-neutral-700'}`}
                onMouseEnter={() => setPointerInside(true)}
                onMouseLeave={() => setPointerInside(false)}>
                <HStack justify={'space-between'} p={5} className="group">
                    {
                        editSectionName ? (
                            <HStack>
                                <Input placeholder={sectionName} onChange={(e) => setNewSectionName(e.target.value)} className="bg-transparent h-12" />
                                <Button variant={'default'} onClick={handleEditSectionName}>Edit</Button>
                                <Button variant={'outline'} onClick={handleEditSectionClose}>Cancell</Button>
                            </HStack>
                        )
                        : 
                        (
                            <HStack className="space-x-3 items-center">
                                <Text className="text-xl text-left truncate">{sectionName}</Text>
                                <IoPencil
                                    className="hidden group-hover:block group-focus:block cursor-pointer" 
                                    tabIndex={1}
                                    onClick={() => setMinimizeSection(!minimizeSection)}
                                />
                            </HStack> 
                        )
                    }
                    <HStack className="space-x-3 items-center">
                        <MdOutlineArrowDropDown onClick={() => setMinimizeSection(!minimizeSection)} size={'2rem'} />
                        <TooltipProvider>
                            <Tooltip>
                                <TooltipTrigger>
                                    <SlCursorMove onPointerDown={(e) => handleDragStart(e)} onDragStart={(e) => handleDragStart(e)} onPointerUp={() => handleDragEnd()} size={'1rem'} className="cursor-pointer" />
                                </TooltipTrigger>
                                <TooltipContent className="dark:bg-black dark:text-neutral-500"> 'Move' </TooltipContent>
                            </Tooltip>
                        </TooltipProvider>
                    </HStack>
                </HStack>

                <Divider style={{marginTop : minimizeSection ? 2 : 0, marginBottom : minimizeSection ? 2 : 0}} className="!bg-neutral-500" />

                <motion.div 
                    variants={variants}
                    initial="closed"
                    animate={minimizeSection ? 'open' : 'closed'}
                    style={{ padding : 5, gap : 2 }} 
                    transition={{ duration: 0.1, ease: 'easeInOut' }}
                    className="overflow-hidden"
                >
                    <Flex flexDir={'column'} wrap={'nowrap'} gap={2} p={5} h={'auto'}>
                        <LinkComponent 
                            title="sample title of the url something else title of the url something else title of the url something else title of the url something else title of the url something else title of the url something else"
                            url={url}
                            onTitleEdit={() => {}}
                            onLinkEdit={() => {}}
                            onLinkDelete={() => {}} 
                        />
                        <LinkComponent 
                            title="sample title of "
                            url={'https://console.cloud.google.com/iam-admin/iam?project=new-game-cord '}
                            onTitleEdit={() => {}}
                            onLinkEdit={() => {}}
                            onLinkDelete={() => {}} 
                        />
                        <LinkComponent 
                            title="sample title of the url something else"
                            url={url}
                            onTitleEdit={() => {}}
                            onLinkEdit={() => {}}
                            onLinkDelete={() => {}} 
                        />
                        <LinkComponent 
                            title="sample title of the url something else "
                            url={url}
                            onTitleEdit={() => {}}
                            onLinkEdit={() => {}}
                            onLinkDelete={() => {}} 
                        />
                        <LinkComponent 
                            title="sample title of the url something else"
                            url={url}
                            onTitleEdit={() => {}}
                            onLinkEdit={() => {}}
                            onLinkDelete={() => {}} 
                        />
                    </Flex>
                </motion.div>
                
            </Box>
        </Reorder.Item>
    )
}
