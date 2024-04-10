'use client'

import { useState } from "react";
import { motion, useMotionValue, Reorder, useDragControls } from "framer-motion";

import { Box, Text, Divider, HStack, Flex } from "@chakra-ui/react";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

import { 
    DropdownMenu, 
    DropdownMenuContent, 
    DropdownMenuItem, 
    DropdownMenuLabel, 
    DropdownMenuSeparator, 
    DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu";

import {
    ContextMenu,
    ContextMenuContent,
    ContextMenuItem,
    ContextMenuTrigger,
} from "@/components/ui/context-menu";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

import { IoPencil } from "react-icons/io5";
import { MdOutlineArrowDropDown } from "react-icons/md";
import { RiGridFill } from "react-icons/ri";
import { BsThreeDotsVertical } from "react-icons/bs";

import LinkComponent from "./LinkComponent";
import { SectionHeaderProps } from "@/types/types";

export default function SectionHeader(props : SectionHeaderProps) 
{
    const { sectionTitle, handleEditSectionTitle, handleEditSectionClose, handleToggleMinimize } = props;

    const [editSectionName, setEditSectionName] = useState(false);
    const [newSectionName, setNewSectionName] = useState('Heading Text');

    return (
        <ContextMenu>
            <ContextMenuTrigger>
                <HStack justify={'space-between'} p={5} className="group">
                    {
                        editSectionName ? (
                            <HStack>
                                <Input placeholder={sectionTitle} onChange={(e) => setNewSectionName(e.target.value)} className="bg-transparent h-12" />
                                <Button variant={'default'} onClick={() => handleEditSectionTitle?.(newSectionName)}> Edit </Button>
                                <Button variant={'outline'} onClick={() => handleEditSectionClose?.()}> Cancell </Button>
                            </HStack>
                        )
                        : 
                        (
                            <HStack className="space-x-3 items-center">
                                <Text className="text-xl text-left truncate">{sectionTitle}</Text>
                                <IoPencil
                                    className="hidden group-hover:block group-focus:block cursor-pointer" 
                                    tabIndex={1}
                                    onClick={() => handleToggleMinimize?.()}
                                />
                            </HStack> 
                        )
                    }
                    <HStack className="space-x-3 items-center">
                        <MdOutlineArrowDropDown onClick={() => handleToggleMinimize?.()} size={'2rem'} />
                        <TooltipProvider>
                            <Tooltip>
                                <TooltipTrigger>
                                    <RiGridFill size={'1rem'} className="cursor-pointer text-neutral-500" />
                                </TooltipTrigger>
                                <TooltipContent className="dark:bg-black dark:text-neutral-500"> Move </TooltipContent>
                            </Tooltip>
                        </TooltipProvider>
                        <DropdownMenu>
                            <DropdownMenuTrigger> <BsThreeDotsVertical size={'1rem'} /> </DropdownMenuTrigger>
                            <DropdownMenuContent className="min-w-[250px] mr-2 flex flex-col space-y-2">
                                <DropdownMenuLabel>Settings</DropdownMenuLabel>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem>
                                    Edit Section Title
                                </DropdownMenuItem>
                                <DropdownMenuItem>
                                    Lock Movement
                                </DropdownMenuItem>
                                <DropdownMenuItem>
                                    Collapse Section
                                </DropdownMenuItem>
                                <DropdownMenuItem disabled>
                                    Convert To Incognito
                                </DropdownMenuItem>
                                <DropdownMenuItem 
                                    className="text-red-500 hover:!text-white hover:!bg-red-500" >
                                        Delete
                                </DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </HStack>
                </HStack>
            </ContextMenuTrigger>
            <ContextMenuContent className="w-[250px]">
                <ContextMenuItem>Edit Section Title</ContextMenuItem>
                <ContextMenuItem>Lock Movement</ContextMenuItem>
                <ContextMenuItem>Collapse Section</ContextMenuItem>
                <ContextMenuItem className="text-red-500 hover:!text-white hover:!bg-red-500">Delete</ContextMenuItem>
            </ContextMenuContent>
         </ContextMenu>
    )
}
