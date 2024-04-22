'use client'

import { useState, useEffect, useCallback, memo, useMemo } from 'react';
import { serverTimestamp } from 'firebase/firestore';
import { motion, Reorder } from "framer-motion";
import { SectionScheme } from '@/scheme/SectionScheme';
import { toast } from '@/components/ui/use-toast';
import { cn } from '@/lib/utils';

import AppNavbarFilter from './(TopArea)/AppNavbarFilter';

import { Box, Button, Text } from '@chakra-ui/react';
import { GoPlus } from "react-icons/go";
import { FetchGET, FetchPOST, FetchDELETE } from '@/hook/useFetch';

import { Section } from './(Segment)/Section';
import GenerateCryptoUUID from '@/globalFunction/GenerateCryptoUUID';

export default function AppLayout() {
    
    const [items, setItems] = useState<string[]>([]);
    const [sections, setSections] = useState<SectionScheme[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    const fetchSections = async () => {
        
        setIsLoading(true);
        const response : any = await FetchGET({ url : '/api/section/get' });
        
        if(response) {
            setSections(response.documents);
            setItems(response.documents.map((doc : any) => doc.id));
            setIsLoading(false);
        }
        else {
            setIsLoading(false);
            console.log('failed to fetch sections ', response);   
        }
    }
    
    const createSection = async () => {
        
        const newSectionData = {
            sectionId : `New Section ${GenerateCryptoUUID({bufferSize : 1, length : 1, mode : 'unitArray'})}`,
            data : [],
            created_at : serverTimestamp(),
        }

        const response : any = await FetchPOST({ url : '/api/section/create', body : newSectionData , useJsonStringify : true });
        
        if(response.ok) {
            fetchSections();
        }
        else {
            alert('Failed To Fetch Sections 405');
            fetchSections();
            console.log(response);
        }
    }

    const deleteSection = async (id : string) => {        
        
        const response : any = await FetchDELETE({ url : '/api/section/delete', body : { sectionId : id }, useJsonStringify : true });
        
        if(response.ok) {
            fetchSections();
            toast({
                title: `Deleted Section ${id}`,
                className: cn('dark:bg-neutral-900 border-2 border-blue-500'),
            });
            console.log(response);
        }
        else {
            alert('Failed To Delete Sections 405');
            fetchSections();
            toast({
                title: `${response.statusText}`,
                className: cn('dark:bg-neutral-900 border-2 border-yellow-500'),
            })
            console.log(response);
        }
    }

    const handleRefreshSection = () => {
        fetchSections();
    }

    useEffect(() => {
        setItems(sections.map(section => section.id));
    }, [sections])

    useEffect(() => {
        fetchSections();
    }, [])

    // Update the order of sections based on the new order of items
    const handleItemReorder = useCallback((newOrder: string[]) => {
        const newSections : any = newOrder.map(id => sections.find(section => section.id === id));
        setSections(newSections);
    }, [sections])

    const MemoizedSectionItem = useMemo(() => {
        return memo(Section, (prevProps, nextProps) => {
            return  prevProps.linkItems === nextProps.linkItems && 
                    prevProps.sectionTitle === nextProps.sectionTitle && 
                    prevProps.recorderItemValue === nextProps.recorderItemValue;
        })
    }, [])

    const RecorderAnimateVarient = {
        "visible" : {
            opacity : 1
        },
        "hidden" : {
            opacity : 0.5
        }
    }

    return (
        <div className='w-full space-y-5'>
            <AppNavbarFilter />

            <Reorder.Group 
                axis="y" 
                onReorder={handleItemReorder} 
                values={items} 
                className='w-[96%] m-auto min-h-screen max-h-auto flex flex-col items-center justify-start space-y-5'
                variants={RecorderAnimateVarient}
                animate={isLoading ? "hidden" : "visible"}
                initial={"hidden"}
                transition={{staggerChildren : 0.1}}
            >
                {
                    items.map((x, index) => (
                        sections[index]?.data && sections[index]?.id && (
                            <MemoizedSectionItem
                                linkItems={sections[index].data}
                                sectionTitle={sections[index].id}
                                key={x}
                                recorderItemId={x}
                                recorderItemValue={x}
                                onNameChangedEvent={handleRefreshSection}
                                onDeleteEvent={deleteSection}
                            />
                        )
                    ))
                }
                <Box 
                    onClick={createSection}
                    className='w-2/12 rounded-xl dark:bg-neutral-900 bg-neutral-100 border border-neutral-800 py-2 
                        flex flex-row items-center justify-center cursor-pointer dark:hover:bg-neutral-800'>
                    <GoPlus size={'2rem'}/>
                    <Text>Add New Section</Text>
                </Box>
            </Reorder.Group>
        </div>
    )
}
