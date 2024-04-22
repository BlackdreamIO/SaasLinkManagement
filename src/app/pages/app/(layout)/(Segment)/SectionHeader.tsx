'use client'

import { useState, useEffect } from "react";

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
import { BsThreeDotsVertical } from "react-icons/bs";

import { IoLockOpenOutline, IoLockClosedOutline } from "react-icons/io5";
import { AiOutlineCaretDown  } from "react-icons/ai";
import { FaLock, FaLockOpen } from "react-icons/fa";
import { FiEdit2 } from "react-icons/fi";
import { RiDeleteBin7Line } from "react-icons/ri";
import { BsIncognito } from "react-icons/bs";

import { SectionHeaderProps } from "@/types/types";

export default function SectionHeader(props : SectionHeaderProps) 
{
    const { 
        sectionTitle, 
        isMovementLocked, 
        handleEditSectionTitle, 
        handleToggleMinimize, 
        handleLockMovement,
        handleOnSectionDelete,
    } = props;

    const [newSectionName, setNewSectionName] = useState('');
    const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
    const [isSectionEditMode, setIsSectionEditMode] = useState(false);
    const [movementLockColor, setMovementLockColor] = useState('white');

    const handleEditModeClose = () => {
        setIsSectionEditMode(false);
    }

    const handleApplyEdit = () => {
        handleEditSectionTitle?.(newSectionName);
        setIsSectionEditMode(false);
    }

    const handleSectionDelete = () => {
        handleOnSectionDelete?.(sectionTitle);
        setIsSectionEditMode(false);
    }

    const isDarkMode = document.body.classList.contains('dark');
    
    useEffect(() => {
        const handleEffectAnimation = () => {
            const newBorderColor = movementLockColor === 'black' || movementLockColor === 'white' ? 'yellow' : isDarkMode ? 'gray' : 'black';
            setMovementLockColor(newBorderColor);
            
            setTimeout(() => {
                setMovementLockColor(isDarkMode ? 'gray' : 'black')
            }, 1000);
        }
        handleEffectAnimation();
    }, [movementLockColor, isDarkMode])

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
                            <HStack className="space-x-3 items-center overflow-hidden">
                                <Text className="text-lg font-bold font-sans text-left truncate">{sectionTitle}</Text>
                                <Button variant={'ghost'} className="hidden group-hover:block group-focus:block cursor-pointer" onClick={() => setIsSectionEditMode(true)}>
                                    <IoPencil />
                                </Button>
                            </HStack> 
                        )
                    }
                    <HStack className="space-x-2 items-center">
                        <Button className="!bg-transparent p-0 cursor-default" variant={'ghost'} onClick={() => handleToggleMinimize?.()} >
                            <MdOutlineArrowDropDown 
                                size={'2rem'} 
                                className="text-neutral-500 dark:hover:text-white hover:text-black" 
                            />
                        </Button>

                        <TooltipProvider>
                            <Tooltip>
                                <TooltipTrigger>
                                    {
                                        !isMovementLocked ? 
                                        ( 
                                            <Button className="!bg-transparent cursor-default" variant={'ghost'} onClick={() => handleLockMovement?.()}>
                                                <FaLock 
                                                    color={movementLockColor} 
                                                    className="transition-all duration-300"
                                                /> 
                                            </Button>
                                        )
                                        : 
                                        ( 
                                            <Button className="!bg-transparent cursor-default" variant={'ghost'} onClick={() => handleLockMovement?.()}>
                                                <FaLockOpen 
                                                    color={movementLockColor} 
                                                    className="transition-all duration-300"
                                                /> 
                                            </Button>
                                        )
                                    }
                                </TooltipTrigger>
                                <TooltipContent className="dark:bg-black dark:text-neutral-500"> Lock/Unlock Movement </TooltipContent>
                            </Tooltip>
                        </TooltipProvider>
                        <DropdownMenu>
                            <DropdownMenuTrigger> 
                                <BsThreeDotsVertical size={'1rem'} className="text-neutral-500 dark:hover:text-white hover:text-black" />
                            </DropdownMenuTrigger>
                            <DropdownMenuContent className="bg-black min-w-[250px] mr-10 flex flex-col space-y-2 transition-none rounded-2xl">
                                <DropdownMenuLabel className="font-bold text-xl">Settings</DropdownMenuLabel>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem className="text-neutral-500 hover:!text-neutral-300 !bg-transparent transition-none" onClick={() => setIsSectionEditMode(true)}>
                                    <FiEdit2 className="mr-3" /> Edit Section Title
                                </DropdownMenuItem>
                                <DropdownMenuItem className="text-neutral-500 hover:!text-neutral-300 !bg-transparent transition-none" onClick={() => handleLockMovement?.()}>
                                    {
                                        isMovementLocked ? ( <>< IoLockClosedOutline className="mr-3" /> Lock Movement</> )
                                                        : ( <> <IoLockOpenOutline className="mr-3" /> Unlock Movement </> )
                                    }
                                </DropdownMenuItem>
                                <DropdownMenuItem className="text-neutral-500 hover:!text-neutral-300 !bg-transparent transition-none" onClick={() => handleToggleMinimize?.()}>
                                    <AiOutlineCaretDown className="mr-3" /> Collapse/Expand Section
                                </DropdownMenuItem>
                                <DropdownMenuItem className="text-neutral-500 hover:!text-neutral-300 !bg-transparent transition-none">
                                    Add New Link
                                </DropdownMenuItem>
                                <DropdownMenuItem disabled>
                                    <BsIncognito className="mr-3" /> Convert To Incognito
                                </DropdownMenuItem>
                                <DropdownMenuItem 
                                    className="text-neutral-500 hover:!text-red-500 !bg-transparent transition-none"
                                    onClick={() => setOpenDeleteDialog(!openDeleteDialog)}>
                                    <RiDeleteBin7Line className="mr-3" />  Delete
                                </DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </HStack>
                </HStack>
            </ContextMenuTrigger>
            <ContextMenuContent className="dark:bg-black w-[250px] space-y-3 py-2 rounded-2xl">
                <ContextMenuItem className="!text-white font-bold text-xl !bg-transparent" onClick={() => setIsSectionEditMode(true)}> 
                    Setting
                </ContextMenuItem>
                <Divider className="my-2 !bg-neutral-800"/>
                <ContextMenuItem className="text-neutral-500 hover:!text-neutral-300 !bg-transparent" onClick={() => setIsSectionEditMode(true)}> 
                    <FiEdit2 className="mr-3" /> Edit Section Title
                </ContextMenuItem>
                <ContextMenuItem onClick={() => handleLockMovement?.()} className="text-neutral-500 !bg-transparent">
                {
                    isMovementLocked ? ( <>< IoLockClosedOutline className="mr-3" /> Lock Movement</> )
                                    : ( <> <IoLockOpenOutline className="mr-3" /> Unlock Movement </> )
                }
                </ContextMenuItem>
                <ContextMenuItem className="text-neutral-500 hover:!text-neutral-300 !bg-transparent" onClick={() => handleToggleMinimize?.()}> 
                    <AiOutlineCaretDown className="mr-3" /> Collapse/Expand Section
                </ContextMenuItem>
                <ContextMenuItem 
                    className="text-neutral-500 hover:!text-red-500 !bg-transparent" 
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
                        <Button variant={'outline'} className="w-3/12" onClick={handleSectionDelete}>Confirm</Button>
                        <Button variant={'outline'} className="w-3/12" onClick={() => setOpenDeleteDialog(false)}>Cancell</Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
         </ContextMenu>
    )
}
