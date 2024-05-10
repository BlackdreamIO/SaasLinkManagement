"use client"

import { useEffect, useState } from 'react';
import { useSectionContext } from '@/context/SectionContextAPI';

import { Box, Flex } from "@chakra-ui/react";
import { SectionItem } from "./SectionItem";
import { SectionScheme } from '@/scheme/SectionScheme';

export default function SectionContainer() 
{
    const { contextSections, GetSections, UpdateSection, DeleteSections } = useSectionContext()!; // ! non-null assertion
    const [sections, setSections] = useState<SectionScheme[]>(contextSections);

    const handleSectionUpdate = async (currentSectionID : string, updatedSection : SectionScheme) => {
        await UpdateSection({
            currentSectionID : currentSectionID,
            updatedSection : { 
                id : updatedSection.id,
                data : updatedSection.data
            }
        });
    }

    const handleSectionDelete = async (id : string) => {
        await DeleteSections(id);
    }
    
    const fetchSections = async() => {
        const response = await GetSections();
        setSections(response);
    }

    useEffect(() => {
        fetchSections();
    }, [])

    useEffect(() => {
        setSections(contextSections);
    }, [contextSections])
    
    

    return (
        <Box>
            <Flex direction={'column'} className="space-y-5 mt-10 p-4 px-10 max-sm:px-2">
                {
                    sections.map((section : SectionScheme, index) => (
                        <SectionItem
                            linkItems={section.data}
                            key={section.id}
                            onSectionTitleEdit={(updatedSection) => handleSectionUpdate(section.id, updatedSection)}
                            onSectionDelete={handleSectionDelete}
                            id={section.id}
                            url=''
                        />
                    ))
                }
            </Flex>
        </Box>
    )
}
