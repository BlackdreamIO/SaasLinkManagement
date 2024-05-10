'use client';

import useTheme from "@/hook/useTheme";

import { Flex } from "@chakra-ui/react";

import AppNavbar from "./(Navbar)/AppNavbar";
import SectionContainer from "./(Content)/(Section)/SectionContainer";
import { SectionContextProvider } from "@/context/SectionContextAPI";

export default function AppLayout() 
{
    const [] = useTheme({ theme : 'system' });   

    return (
        <Flex onContextMenu={(e) => e.preventDefault()} direction={'column'} gap={5}>
            <SectionContextProvider>
                <AppNavbar />
                <SectionContainer />
            </SectionContextProvider>
        </Flex>
    )
}
