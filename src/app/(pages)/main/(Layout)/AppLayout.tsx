"use client"

import { SectionContextProvider } from "@/context/SectionContextAPI";
import { FilterContextProvider } from "@/context/FilterContextAPI";

import { Flex, Text } from "@chakra-ui/react";

import AppNavbar from "./(Navbar)/AppNavbar";
import ViewLayout from "./(ViewLayout)/ViewLayout";
import SectionContainer from "./(Content)/(Section)/SectionContainer";
import { LinkContextProvider } from "@/context/LinkContextAPI";

export default function AppLayout() 
{
    return (
        <Flex onContextMenu={(e) => e.preventDefault()} direction={'column'} gap={5} className="!no-scrollbar">
            <SectionContextProvider>
                <LinkContextProvider>
                    <FilterContextProvider>
                        <AppNavbar /> { /* SectionContextProvider */ }
                        <ViewLayout /> { /* FilterContextProvider */ }
                        <SectionContainer /> { /* SectionContextProvider */ }
                    </FilterContextProvider>
                </LinkContextProvider>
            </SectionContextProvider>
        </Flex>
    )
}
