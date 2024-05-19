"use client"

import { useEffect, useState } from 'react';
import { useSectionContext } from '@/context/SectionContextAPI';
import { FilterSectionScheme, SectionScheme } from '@/scheme/SectionScheme';
import { motion  } from 'framer-motion';

import { Box, Flex } from "@chakra-ui/react";
import { SectionItem } from "./SectionItem";

const SectionItemAnimation = {
    initial : {
        opacity : 0,
    },
    fade : (i : number) => ({
        opacity : 1,
        transition : {
            delay : 0.05 * i
        }
    })
}

export default function SectionContainer() 
{
    const { contextSections, UpdateSection, DeleteSections, enableFilterContextSections, filteredContextSections } = useSectionContext()!; // ! non-null assertion
    const [sections, setSections] = useState<SectionScheme[]>([]);

    useEffect(() => {
        const fetchSections = async () => {
            const respone = await fetch('http://localhost:3000/api/section/get', {
                method : 'GET',
                cache : 'no-store',
                next : { revalidate : 0 }
            })

            const jsonResponse = await respone.json();
            console.log(jsonResponse);
        }
        fetchSections();
    }, [])
    

    const handleSectionUpdate = async (currentSection : SectionScheme, updatedSection : SectionScheme) => {
        await UpdateSection({
            currentSection : currentSection,
            updatedSection : updatedSection
        });
    }

    const handleSectionDelete = async (id : string) => {
        await DeleteSections(id);
    }
   
    useEffect(() => {
        enableFilterContextSections ? setSections(filteredContextSections) : setSections(contextSections);
    }, [contextSections, enableFilterContextSections, filteredContextSections])
    
    return (
        <Box>
            <Flex direction={'column'} className="space-y-5 mt-10 p-4 px-10 max-sm:px-2">
                {
                    (sections ?? []).map((section : FilterSectionScheme, index : number) => (
                        <motion.section variants={SectionItemAnimation} initial={"initial"} animate={"fade"} custom={index} key={section.id}>
                            <SectionItem
                                section={section}
                                hightlightBody={section.highlightBody}
                                onSectionTitleEdit={(updatedSection) => handleSectionUpdate(section, updatedSection)}
                                onSectionDelete={handleSectionDelete}
                                key={section.id}
                            />
                        </motion.section>
                    ))
                }
            </Flex>
        </Box>
    )
}
