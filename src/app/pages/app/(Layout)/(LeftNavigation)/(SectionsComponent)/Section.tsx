import { Box, Text, Flex, HStack } from '@chakra-ui/react'

import {
    ContextMenu,
    ContextMenuContent,
    ContextMenuItem,
    ContextMenuTrigger,
} from "@/components/ui/context-menu";

import { FaInbox } from "react-icons/fa6";
import { Separator } from '@/components/ui/separator';

export default function Section() 
{
    return (
        <ContextMenu>
            <ContextMenuTrigger className='w-full px-4'>
                <Box className='w-full dark:bg-theme-bgPrimary dark:hover:bg-theme-bgSecondary hover:bg-theme-bgSecondary/5 py-3 px-3 rounded-xl'>
                    <Flex direction={'row'} className='space-x-3 items-center justify-start'>
                        <FaInbox/> <Text>Roadmaps </Text>
                    </Flex>
                </Box>
            </ContextMenuTrigger>
            <ContextMenuContent className='w-56'>
                <Text>Setting</Text>
                <Separator/>
                <ContextMenuItem>EDIT</ContextMenuItem>
                <ContextMenuItem>MARK</ContextMenuItem>
                <ContextMenuItem>DELETE</ContextMenuItem>
            </ContextMenuContent>
        </ContextMenu>
    )
}
