'use client';

import { Box, Flex } from "@chakra-ui/react";

import LeftNavigation from "./LeftNavigation/LeftNavigation";
import LinkSide from "./LinkSide/LinkSide";
import useTheme from "@/hook/useTheme";

export default function AppLayout() 
{
    const [theme, setTheme] = useTheme({ theme : 'system' });   

    return (
        <Flex dir="row" gap={5}>
            <LeftNavigation />
            <LinkSide />
        </Flex>
    )
}
