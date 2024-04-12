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
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
  } from "@/components/ui/dialog"

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

import { IoLockOpenOutline, IoLockClosedOutline } from "react-icons/io5";
import { AiOutlineCaretUp, AiOutlineCaretDown  } from "react-icons/ai";
import { FiEdit2 } from "react-icons/fi";
import { RiDeleteBin7Line } from "react-icons/ri";
import { BsIncognito } from "react-icons/bs";

import { SectionProps } from "@/types/types";

export default function SectionHeader(props : SectionProps) 
{
    const { 
        sectionTitle, 
        isMovementLocked, 
        handleEditSectionTitle, 
        handleEditSectionClose, 
        handleToggleMinimize, 
        handleLockMovement 
    } = props;

    const [newSectionName, setNewSectionName] = useState('Heading Text');
    const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
    const [isSectionEditMode, setIsSectionEditMode] = useState(false);

    const handleEditModeClose = () => {
        handleEditSectionClose?.()
        setIsSectionEditMode(false);
    }

    const handleApplyEdit = () => {
        handleEditSectionTitle?.(newSectionName);
        setIsSectionEditMode(false);
    }

    return (
        <ContextMenu>
            <ContextMenuTrigger>
                <HStack justify={'space-between'} p={5} className="group">
                    {
                        isSectionEditMode ? (
                            <HStack>
                                <Input placeholder={sectionTitle} onChange={(e) => setNewSectionName(e.target.value)} className="bg-transparent h-12" />
                                <Button variant={'default'} onClick={handleApplyEdit}> Edit </Button>
                                <Button variant={'outline'} onClick={handleEditModeClose}> Cancell </Button>
                            </HStack>
                        )
                        : 
                        (
                            <HStack className="space-x-3 items-center">
                                <Text className="text-xl text-left truncate">{sectionTitle}</Text>
                                <IoPencil
                                    className="hidden group-hover:block group-focus:block cursor-pointer" 
                                    tabIndex={1}
                                    onClick={() => setIsSectionEditMode(true)}
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
                                <DropdownMenuItem onClick={() => setIsSectionEditMode(true)}>
                                    <FiEdit2 className="mr-3" /> Edit Section Title
                                </DropdownMenuItem>
                                <DropdownMenuItem onClick={() => handleLockMovement?.()}>
                                    {
                                        isMovementLocked ? ( <> <IoLockOpenOutline className="mr-3" /> UnLock Movement </> ) 
                                                        : ( <>< IoLockClosedOutline className="mr-3" /> Lock Movement</> )
                                    }
                                </DropdownMenuItem>
                                <DropdownMenuItem onClick={() => handleToggleMinimize?.()}>
                                    <AiOutlineCaretDown className="mr-3" /> Collapse/Expand Section
                                </DropdownMenuItem>
                                <DropdownMenuItem>
                                    Add New Link
                                </DropdownMenuItem>
                                <DropdownMenuItem disabled>
                                    <BsIncognito className="mr-3" /> Convert To Incognito
                                </DropdownMenuItem>
                                <DropdownMenuItem 
                                    className="text-red-500 hover:!text-white hover:!bg-red-500"
                                    onClick={() => setOpenDeleteDialog(!openDeleteDialog)}>
                                    <RiDeleteBin7Line className="mr-3" />  Delete
                                </DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </HStack>
                </HStack>
            </ContextMenuTrigger>
            <ContextMenuContent className="w-[250px] space-y-3 py-2">
                <ContextMenuItem onClick={() => setIsSectionEditMode(true)}> <FiEdit2 className="mr-3" /> Edit Section Title</ContextMenuItem>
                <ContextMenuItem onClick={() => handleLockMovement?.()}> <IoLockOpenOutline className="mr-3" /> Lock Movement</ContextMenuItem>
                <ContextMenuItem onClick={() => handleToggleMinimize?.()}> <AiOutlineCaretDown className="mr-3" /> Collapse/Expand Section</ContextMenuItem>
                <ContextMenuItem 
                    className="text-red-500 hover:!text-white hover:!bg-red-500" 
                    onClick={() => setOpenDeleteDialog(!openDeleteDialog)}>
                    <RiDeleteBin7Line className="mr-3" />  Delete
                </ContextMenuItem>
            </ContextMenuContent>
            <Dialog open={openDeleteDialog} defaultOpen={false} onOpenChange={() => setOpenDeleteDialog(false)}>
                <DialogContent className="dark:bg-black bg-neutral-200">
                    <DialogHeader>
                        <DialogTitle className="text-2xl text-left">Are you absolutely sure?</DialogTitle>
                        <DialogDescription className="text-lg text-left">
                            This action cannot be undone. This will permanently delete <span className="text-yellow-500"> {sectionTitle} </span>
                            and remove from our servers.
                        </DialogDescription>
                    </DialogHeader>
                    <DialogFooter className="flex flex-row space-x-5 justify-end">
                        <Button variant={'outline'} className="w-3/12">Confirm</Button>
                        <Button variant={'outline'} className="w-3/12" onClick={() => setOpenDeleteDialog(false)}>Cancell</Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
         </ContextMenu>
    )
}
