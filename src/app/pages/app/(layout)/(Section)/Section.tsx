'use client'

import { useState } from "react";
import { motion, useMotionValue, Reorder } from "framer-motion";

import { Box, Divider, Flex } from "@chakra-ui/react";

import LinkComponent from "./LinkComponent";
import SectionHeader from "./SectionHeader";

export default function Section({ sectionTitle } : { sectionTitle : string })
{
    const [url, setUrl] = useState('https://console.cloud.google.com/iam-admin/iam?project=new-game-cord');
    
    const [editSectionName, setEditSectionName] = useState(false);
    const [sectionName, setSectionName] = useState('Heading Text');
    const [newSectionName, setNewSectionName] = useState('Heading Text');
    const [minimizeSection, setMinimizeSection] = useState(false);

    const [enableDragListener, setEnableDragListener] = useState(true);

    const y = useMotionValue(0);

    const handleEditSectionName = () => { 
        if(newSectionName.length > 2) {
            setSectionName(newSectionName);
            setEditSectionName(false);
        }
    }

    const variants = {
        open: { height: 'auto' },
        closed: { height: 0 }
    };

    return (
        <Reorder.Item value={sectionTitle} id={sectionTitle} style={{ y }} dragListener={enableDragListener} className="w-full flex flex-col items-center justify-center">
            <Box 
                tabIndex={1} 
                className='w-full rounded-xl bg-neutral-950 border border-neutral-700'>

                <SectionHeader 
                    sectionTitle="heading text"
                    editSectionName
                    handleEditSectionClose={() => {}}
                    handleEditSectionTitle={() => {}}
                    handleToggleMinimize={() => setMinimizeSection(!minimizeSection)} 
                />

                <Divider style={{marginTop : minimizeSection ? 2 : 0, marginBottom : minimizeSection ? 2 : 0}} className="!bg-neutral-500" />

                <motion.div 
                    variants={variants}
                    initial="closed"
                    animate={minimizeSection ? 'open' : 'closed'}
                    style={{ padding : 0, gap : 2 }} 
                    transition={{ duration: 0.1, ease: 'easeIn' }}
                    className="overflow-hidden"
                >
                    <Flex 
                        flexDir={'column'} 
                        wrap={'nowrap'} 
                        gap={2} 
                        p={5}
                        h={'auto'} 
                        onMouseEnter={() => setEnableDragListener(false)}
                        onPointerEnter={() => setEnableDragListener(false)}
                        onMouseLeave={() => setEnableDragListener(true)}
                        onPointerLeave={() => setEnableDragListener(false)}>
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
