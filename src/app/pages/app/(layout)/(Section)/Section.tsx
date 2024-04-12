'use client'

import { useState } from "react";
import { motion, useMotionValue, Reorder } from "framer-motion";
import { useToast } from "@/components/ui/use-toast";

import { Box, Divider, Flex } from "@chakra-ui/react";

import LinkComponent from "./LinkComponent";
import SectionHeader from "./SectionHeader";
import { SectionItemProps } from "@/types/types";
import LinkCreator from "./LinkCreator";
import { LinkItemScheme } from "@/scheme/LinkSection";
import { SectionScheme } from "@/scheme/SectionScheme";
import { Button } from "@/components/ui/button";

type SectionProps = {
    sectionTitle : string;
    sectionItems : SectionItemProps[];
}

function GenerateRandomID () {
    var array = new Uint32Array(1);
    window.crypto.getRandomValues(array);
    return array.toString();
}

export default function Section(props : SectionProps)
{
    const { sectionTitle, sectionItems } = props;

    const [url, setUrl] = useState('https://console.cloud.google.com/iam-admin/iam?project=new-game-cord');
    
    const [sectionName, setSectionName] = useState('Heading Text');
    const [minimizeSection, setMinimizeSection] = useState(false);
    const [showEditSection, setShowEditSection] = useState(true);

    const [enableDragListener, setEnableDragListener] = useState(true);

    const y = useMotionValue(0);
    const { toast } = useToast();

    const handleEditSectionName = (newStr : string) => { 
    if(newStr.length > 2) {
            setSectionName(newStr);
            setShowEditSection(false);
        }
    }

    const handleCreateLink = (linkData : LinkItemScheme) => {
        toast({
            title: `Created ${linkData.title}`,
            description: `Url ${linkData.link}`,
        })
    }

    const getDocuments = async () => {
        await fetch('http://localhost:3000/api/createSection', {
            method : 'GET',
            cache : "no-cache",
            next : {
                revalidate : 0
            }
        })
        .then((response : any) => console.log(response))
        .catch((error : any) => console.log(error))        
    }

    const handleLinkDelete = async (id : string) => {
        await fetch(`http://localhost:3000/api/delete/${242}`, {
            method : 'DELETE',
            cache : 'no-cache',
            next : {
                revalidate : 0
            }
        }).then((response : any) => console.log(response))
        .catch((error : any) => console.log(error))
    }

    const variants = {
        open: { height: 'auto' },
        closed: { height: 0 }
    };

    const dummyData : LinkItemScheme[] = [
        {
            id : GenerateRandomID(),
            link : 'http://localhost:3000/api/delete/${242}',
            created_at : new Date(),
            title : 'title matter For This'
        },
        {
            id : GenerateRandomID(),
            link : 'http://localhost:3000/api/delete/${242}',
            created_at : new Date(),
            title : 'title matter For This'
        },
        {
            id : GenerateRandomID(),
            link : 'http://localhost:3000/api/delete/${242}',
            created_at : new Date(),
            title : 'title matter For This'
        },
        {
            id : GenerateRandomID(),
            link : 'http://localhost:3000/api/delete/${242}',
            created_at : new Date(),
            title : 'title matter For This'
        }
    ]

    return (
        <Reorder.Item value={sectionTitle} id={sectionTitle} style={{ y }} dragListener={enableDragListener} className="w-full flex flex-col items-center justify-center">
            <Box 
                tabIndex={1} 
                className='w-full rounded-xl dark:bg-neutral-950 bg-neutral-100 border border-neutral-800'>

                <SectionHeader 
                    sectionTitle={sectionTitle}
                    editSectionName={showEditSection}
                    isMovementLocked
                    handleEditSectionClose={() => setShowEditSection(false)}
                    handleEditSectionTitle={(newTitle) => handleEditSectionName(newTitle)}
                    handleToggleMinimize={() => setMinimizeSection(!minimizeSection)}
                    handleLockMovement={() => {}}
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
                        h={'auto'} 
                        onMouseEnter={() => setEnableDragListener(false)}
                        onPointerEnter={() => setEnableDragListener(false)}
                        onMouseLeave={() => setEnableDragListener(true)}
                        onPointerLeave={() => setEnableDragListener(false)}>
                        
                        {
                            dummyData.map((linkItem : LinkItemScheme, index : Number) => (
                                <LinkComponent 
                                    id={linkItem.id}
                                    title={linkItem.title}
                                    link={linkItem.link}
                                    created_at={linkItem.created_at}
                                    onLinkTitleEdit={() => {}}
                                    onLinkUrlEdit={() => {}}
                                    onLinkDelete={() => {}}
                                    key={linkItem.id}
                                />
                            ))
                        }
                    </Flex>
                    <LinkCreator
                        onLinkCreate={(linkData) => handleCreateLink(linkData)} 
                    />
                </motion.div>
                
                <Button onClick={() => getDocuments()}>
                    
                </Button>

            </Box>
        </Reorder.Item>
    )
}
