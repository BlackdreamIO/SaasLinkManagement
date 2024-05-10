'use client'

import { useState } from "react";
import { SectionHeaderProps } from "@/types/types";
import { Text, Divider, HStack, Box } from "@chakra-ui/react";

import { 
    DropdownMenu, DropdownMenuContent, DropdownMenuItem, 
    DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu";

import {
    Dialog, DialogContent, DialogDescription,
    DialogFooter, DialogHeader, DialogTitle, 
} from "@/components/ui/dialog";

import {
    ContextMenu, ContextMenuContent,
    ContextMenuItem, ContextMenuTrigger 
} from "@/components/ui/context-menu";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

import { IoPencil } from "react-icons/io5";
import { IoIosAdd } from "react-icons/io";
import { MdOutlineArrowDropDown } from "react-icons/md";
import { BsThreeDotsVertical } from "react-icons/bs";

export default function SectionHeader(props : SectionHeaderProps) 
{
    const { 
        sectionTitle, 
        handleEditSectionTitle, 
        handleToggleMinimize, 
        handleOnSectionDelete,
        handleOnAddLink
    } = props;

    const [newSectionName, setNewSectionName] = useState('');
    const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
    const [isSectionEditMode, setIsSectionEditMode] = useState(false);

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
    
    const handleAddLink = () => {
        handleOnAddLink?.();
    }

    const DropdownMenuItemStyle = `text-neutral-500 dark:hover:text-neutral-300 dark:hover:bg-transparent transition-none max-sm:text-xs`;
    const ContextMenuItemStyle = `text-neutral-500 dark:hover:text-neutral-300 dark:bg-transparent`;

    return (
        <ContextMenu>
            <ContextMenuTrigger className="w-full">
                <HStack justify={'space-between'} px={20} className="group py-5 max-xl:py-3 shadow-xl">
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
                                <Text className="text-lg font-bold font-sans text-left truncate max-xl:text-base max-sm:text-xs">{sectionTitle}</Text>
                                <Button variant={'ghost'} className="hidden group-hover:block group-focus:block cursor-pointer" onClick={() => setIsSectionEditMode(true)}>
                                    <IoPencil />
                                </Button>
                            </HStack> 
                        )
                    }
                    <HStack className="space-x-2 items-center max-sm:space-x-0 ml-3">
                        <Button className="!bg-transparent p-0 cursor-default" variant={'ghost'} onClick={() => handleToggleMinimize?.()} >
                            <MdOutlineArrowDropDown 
                                size={'2rem'} 
                                className="text-neutral-500 dark:hover:text-white hover:text-black max-sm:w-7" 
                            />
                        </Button>

                        <Button 
                            className="dark:bg-transparent bg-transparent p-0 cursor-pointer dark:hover:bg-neutral-800 rounded-xl" 
                            variant={'ghost'}
                            onClick={() => handleAddLink()}>
                            <IoIosAdd 
                                size={'2rem'}
                                className="text-neutral-500 dark:hover:text-white hover:text-black max-sm:w-5" 
                            />
                        </Button>
                        
                        <DropdownMenu>
                            <DropdownMenuTrigger> 
                                <BsThreeDotsVertical size={'1rem'} className="text-neutral-500 dark:hover:text-white hover:text-black max-sm:w-5 max-sm:text-sn" />
                            </DropdownMenuTrigger>
                            <DropdownMenuContent className="dark:bg-theme-bgPrimary min-w-[250px] mr-10 flex flex-col space-y-2 transition-none rounded-2xl">
                                <DropdownMenuLabel className="font-bold text-xl">Settings</DropdownMenuLabel>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem className={DropdownMenuItemStyle} onClick={() => setIsSectionEditMode(true)}>
                                    Edit Section Title
                                </DropdownMenuItem>
                                <DropdownMenuItem className={DropdownMenuItemStyle} onClick={() => handleToggleMinimize?.()}>
                                    Collapse/Expand Section
                                </DropdownMenuItem>
                                <DropdownMenuItem className={DropdownMenuItemStyle}>
                                    Add New Link
                                </DropdownMenuItem>
                                <DropdownMenuItem disabled>
                                    Convert To Incognito
                                </DropdownMenuItem>
                                <DropdownMenuItem 
                                    className={`${DropdownMenuItemStyle}text-white dark:hover:text-red-500 hover:text-white dark:!bg-transparent hover:!bg-red-300`}
                                    onClick={() => setOpenDeleteDialog(!openDeleteDialog)}>
                                     Delete
                                </DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </HStack>
                </HStack>
            </ContextMenuTrigger>
            <ContextMenuContent className="dark:bg-theme-bgPrimary w-[250px] space-y-3 py-2 rounded-2xl">
                <ContextMenuItem className="dark:text-white font-bold text-xl !bg-transparent" onClick={() => setIsSectionEditMode(true)}> 
                    Setting
                </ContextMenuItem>
                <Divider className="my-2 !bg-neutral-800"/>
                <ContextMenuItem className={ContextMenuItemStyle} onClick={() => setIsSectionEditMode(true)}> 
                    Edit Section Title
                </ContextMenuItem>
                <ContextMenuItem className={ContextMenuItemStyle} onClick={() => handleToggleMinimize?.()}> 
                    Collapse/Expand Section
                </ContextMenuItem>
                <ContextMenuItem 
                    className="text-neutral-500 hover:!text-red-500 !bg-transparent" 
                    onClick={() => setOpenDeleteDialog(!openDeleteDialog)}>
                    Delete
                </ContextMenuItem>
            </ContextMenuContent>
            
            <Dialog open={openDeleteDialog} defaultOpen={false} onOpenChange={() => setOpenDeleteDialog(false)}>
                <DialogContent className="dark:bg-theme-bgPrimary bg-neutral-200 rounded-2xl">
                    <DialogHeader className="space-y-5">
                        <DialogTitle className="text-2xl text-left max-sm:text-xl">Are you absolutely sure?</DialogTitle>
                        <DialogDescription className="text-lg text-left dark:text-neutral-600 max-sm:text-sm">
                            This action cannot be undone. This will permanently delete <span className="text-yellow-500"> {sectionTitle} </span>
                            and remove from our servers.
                        </DialogDescription>
                    </DialogHeader>
                    <DialogFooter className="flex flex-row space-x-5 justify-end mt-5">
                        <Button variant={'outline'} className="w-3/12 max-sm:text-xs" onClick={handleSectionDelete}>Confirm</Button>
                        <Button variant={'outline'} className="w-3/12 max-sm:text-xs" onClick={() => setOpenDeleteDialog(false)}>Cancell</Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        
        </ContextMenu>
    )
}
