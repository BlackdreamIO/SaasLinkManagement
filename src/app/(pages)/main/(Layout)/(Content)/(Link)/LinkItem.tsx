'use client'

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import useGetTheme from "@/hook/useGetCurrentTheme";
import { LinkProps } from "@/types/types";

import { 
    DropdownMenu, DropdownMenuContent, DropdownMenuItem, 
    DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu";

import {
    ContextMenu, ContextMenuContent, ContextMenuItem, ContextMenuTrigger, 
} from "@/components/ui/context-menu";

import { Box, Flex, HStack, Text } from "@chakra-ui/react";
import { BsThreeDotsVertical } from "react-icons/bs";
import { Input } from "@/components/ui/input";

export const LinkItem = (props : LinkProps) => {
    const { id, title, url, created_at, handleTitleEdit, handleUrlEdit, handleDelete } = props;

    const [currentTitle, setCurrentTitle] = useState(title);
    const [newCurrentTitle, setNewCurrentTitle] = useState('');
    const [currentUrl, setCurrentUrl] = useState(url);
    const [newUrl, setNewUrl] = useState(url);

    const [editTitle, setEditTitle] = useState(false);
    const [editUrl, setEditUrl] = useState(false);

    const [contextMenuOpen, setContextMenuOpen] = useState(false);
    const [hoverDelete, setHoverDelete] = useState(false);
    const [borderColor, setBorderColor] = useState('transparent');

    const editUrlRef = useRef<any>(null);

    const currentTheme = useGetTheme();
    const isDarkMode = currentTheme == 'dark';
    
    const DropdownMenuItemStyle = `text-neutral-500 hover:!text-neutral-300 !bg-transparent transition-none`;

    const handleToggleEditTitle = () => {
        setEditTitle(!editTitle);
        if(editTitle) {
            setBorderColor(isDarkMode ? 'white' : 'black');
            editUrlRef?.current?.focus();
        }
        setBorderColor('transparent');
    }

    const handleApplyTitle = (event? : any) => {
        if(event?.key == 'Enter') {
            setCurrentTitle(newCurrentTitle);
            handleTitleEdit?.(newCurrentTitle);
            setEditTitle(false);
        }
        else if(!editTitle && event?.key == 'Esc') {
            setEditTitle(false);
        }
    }

    const handleToggleEditUrl = () => {
        setEditUrl(!editUrl);
    }

    const handleApplyUrl = (event? : any) => {
        if(event?.key == 'Enter') {
            setCurrentUrl(newUrl);
            handleTitleEdit?.(newCurrentTitle);
            setEditUrl(false);
        }
        else if(!editUrl && event?.key == 'Escape') {
            setEditUrl(false);
        }
    }

    const handleLinkDelete = () => {
        setBorderColor('transparent');
        setHoverDelete(false);
    }

    useEffect(() => {
        if(editTitle || editUrl) {
            setBorderColor(isDarkMode ? 'skyblue' : 'red');
        }
        else if(!editTitle || !editUrl) {
            setBorderColor('transparent');
        }
        if(contextMenuOpen) {
            if(hoverDelete) {
                setBorderColor('#ff2934');
            }
            else {
                setBorderColor('gray');
            }
        }
        else if(!contextMenuOpen) {
            setBorderColor('transparent');
        }
    }, [editTitle, editUrl, hoverDelete, contextMenuOpen])
    

    return (
        <ContextMenu onOpenChange={setContextMenuOpen}>
            <ContextMenuTrigger>
                <Box className="w-full rounded-2xl px-4 py-2 dark:bg-black bg-neutral-100 transition-all duration-100" style={{ border : `1px solid ${borderColor}` }}>
                    <Flex direction={'column'} className="space-y-3">
                        <HStack justify={'space-between'}>
                            {
                                editTitle ? (
                                    <Box className="flex flex-row items-center space-x-4 w-11/12" tabIndex={1} onBlur={() => {
                                        if(editTitle) {
                                            setEditTitle(false);
                                        }
                                    }}>
                                        <Input 
                                            className="!border-none w-8/12 p-0 h-auto !ring-0 text-base placeholder:text-neutral-400 max-sm:w-auto"
                                            placeholder={currentTitle}
                                            onBlur={() => handleToggleEditTitle()}
                                            onChange={(e) => setNewCurrentTitle(e.target.value)}
                                            onKeyDown={handleApplyTitle}
                                            ref={editUrlRef}
                                        />
                                        <Text className="text-xs px-3 py-1 dark:text-neutral-300 text-neutral-300 dark:bg-neutral-900 bg-neutral-900 rounded-full max-md:hidden">Save {'(Enter)'}</Text>
                                        <Text className="text-xs px-3 py-1 dark:text-neutral-300 text-neutral-300 dark:bg-neutral-900 bg-neutral-900 rounded-full max-md:hidden">Cancell {'(Esc)'}</Text>
                                    </Box>
                                ) 
                                : 
                                (
                                    <Link href={'#'} className="truncate mr-5 cursor-default max-xl:text-sm max-sm:text-xs">{currentTitle}</Link>
                                )
                            }
                            <Text className="dark:text-neutral-700 text-sm max-sm:text-xs max-sm:text-center">{created_at.toDateString()}</Text>
                        </HStack>
                        <HStack justify={'space-between'}>
                            {
                                editUrl ? (
                                    <Box className="flex flex-row items-center space-x-4 w-11/12">
                                        <Input 
                                            className="!border-none w-8/12 truncate p-0 h-auto !ring-0 text-base placeholder:text-neutral-400"
                                            placeholder={currentUrl}
                                            onBlur={() => handleToggleEditUrl()}
                                            onChange={(e) => setNewUrl(e.target.value)}
                                            onKeyDown={handleApplyUrl}
                                        />
                                        <Text className="text-xs px-3 py-1 dark:text-neutral-300 dark:bg-neutral-900 rounded-full max-md:hidden">Save {'(Enter)'}</Text>
                                        <Text className="text-xs px-3 py-1 dark:text-neutral-300 dark:bg-neutral-900 rounded-full max-md:hidden">Cancell {'(Esc)'}</Text>
                                    </Box>
                                ) 
                                : 
                                (
                                    <Link href={'#'} className="text-blue-500 truncate mr-10 max-xl:text-sm max-sm:text-xs">{currentUrl}</Link>
                                )
                            }
                            <DropdownMenu onOpenChange={setContextMenuOpen}>
                                <DropdownMenuTrigger>
                                    <BsThreeDotsVertical />
                                </DropdownMenuTrigger>
                                <DropdownMenuContent className="dark:bg-theme-bgPrimary min-w-[250px] mr-5 mt-5 flex flex-col space-y-2 transition-none rounded-2xl">
                                    <DropdownMenuLabel className="text-lg">Options</DropdownMenuLabel>
                                    <DropdownMenuSeparator/>
                                    <DropdownMenuItem onClick={() => handleToggleEditTitle()} className={DropdownMenuItemStyle}>Edit Title</DropdownMenuItem>
                                    <DropdownMenuItem onClick={() => handleToggleEditUrl()} className={DropdownMenuItemStyle}>Edit Url</DropdownMenuItem>
                                    <DropdownMenuItem 
                                        className='text-neutral-500 hover:!text-red-500 !bg-transparent transition-none'
                                        onPointerEnter={() => setHoverDelete(true)}
                                        onPointerLeave={() => setHoverDelete(false)}>
                                        Delete
                                    </DropdownMenuItem>
                                </DropdownMenuContent>
                            </DropdownMenu>
                        </HStack>
                    </Flex>
                </Box>
            </ContextMenuTrigger>
            <ContextMenuContent className="dark:bg-theme-bgPrimary dark:border-neutral-800 border-2 border-neutral-400 bg-neutral-100 dark:shadow-md shadow-none w-[250px] space-y-3 py-2 rounded-2xl">
                <ContextMenuItem onClick={() => handleToggleEditTitle()} className={DropdownMenuItemStyle}>Edit Title</ContextMenuItem>
                <ContextMenuItem onClick={() => handleToggleEditUrl()} className={DropdownMenuItemStyle}>Edit Url</ContextMenuItem>
                <ContextMenuItem 
                    className='text-neutral-500 hover:!text-red-500 !bg-transparent transition-none'
                    onClick={() => handleLinkDelete()}
                    onPointerEnter={() => setHoverDelete(true)}
                    onPointerLeave={() => setHoverDelete(false)}>
                        Delete
                </ContextMenuItem>
            </ContextMenuContent>
        </ContextMenu>
    )
}
