import { useState, useEffect } from "react";
import Link from "next/link";
import { FetchPUT, FetchDELETE } from "@/hook/useFetch";

import { Box, Text, HStack, Divider} from "@chakra-ui/react";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import { BsThreeDotsVertical } from "react-icons/bs";
import { IoPencil } from "react-icons/io5";
import { LinkItemScheme } from "@/scheme/LinkSection";
import { RiDeleteBin7Line } from "react-icons/ri";

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
    ContextMenu,
    ContextMenuContent,
    ContextMenuItem,
    ContextMenuTrigger,
} from "@/components/ui/context-menu";

interface SectionItemInterfaceProps extends LinkItemScheme {
    onLinkUpdate : () => void;
    sectionName : string;
}

export default function LinkItem(props : SectionItemInterfaceProps) 
{
    const { title, url, onLinkUpdate, id, sectionName } = props;

    const [editTitle, setEditTitle] = useState(false);
    const [editUrl, setEditUrl] = useState(false);

    const [newTitle, setNewTitle] = useState('');
    const [newUrl, setNewUrl] = useState('');

    const [isLoading, setIsLoading] = useState(false);
    
    const handleFieldEdit = async (feild : 'title' | 'link') => {
        
        if(feild == 'title' ? newTitle.length < 2 : newUrl.length < 2) return;
        feild == 'title' ? setEditTitle(false) : setEditUrl(false);

        setIsLoading(true);

        const updatedData = {
            sectionId : sectionName, 
            linkId : id, 
            fieldToUpdate : feild, 
            newValue : feild == 'title' ? newTitle : newUrl
        }
        const response : any = await FetchPUT({ url : '/api/link/update', body : updatedData });
        
        response.ok ? onLinkUpdate?.() : console.error('Link update rejected/failed');
        setIsLoading(response.ok ? false : isLoading);
    }

    const handleDeleteLinkItem = async () => {
        setIsLoading(true);

        const response : any = await FetchDELETE({ url : '', body : { sectionId : sectionName, linkId : id } });

        response.ok ? onLinkUpdate?.() : console.error('Link update rejected/failed');
        setIsLoading(response.ok ? false : isLoading);

        if(!response.ok) alert('failed to delete link please try again');
    }

    return (
        <ContextMenu>
            <ContextMenuTrigger>
                <Box className={`dark:bg-[rgb(10,10,10)] bg-neutral-100 shadow-md px-5 py-3 w-full rounded-2xl border
                 ${isLoading ? 'border-blue-500' : 'border-transparent hover:border-neutral-800'}
                 ${isLoading ? 'pointer-events-none opacity-50' : 'pointer-events-auto opacity-100'}`}>
                    <HStack className="items-center max-sm:!flex-col space-x-5  justify-center">
                        <Box tabIndex={1} className="max-w-7/12 w-6/12 max-sm:max-w-full max-sm:w-full overflow-hidden group">
                            {
                                editTitle ?
                                (
                                    <HStack>
                                        <Input tabIndex={2} placeholder={title} onChange={(e) => setNewTitle(e.target.value)} className="bg-transparent" />
                                        <Button variant={'default'} onClick={() => handleFieldEdit('title')}>Edit</Button>
                                        <Button variant={'outline'} onClick={() => setEditTitle(false)}>Cancell</Button>
                                    </HStack>
                                )
                                :
                                ( 
                                    <HStack className="space-x-3 items-center">
                                        <Text className="text-sm text-left truncate">{title}</Text>
                                        <Button variant={'ghost'} tabIndex={1} onClick={() => setEditTitle(true)}>
                                            <IoPencil 
                                                className="hidden group-hover:block group-focus:block focus:block cursor-pointer" 
                                            />
                                        </Button>
                                    </HStack> 
                                )
                            }
                        </Box>
                
                        <Box className="w-9/12 flex-grow flex items-center justify-start max-sm:max-w-full max-sm:w-full overflow-hidden group">
                            {
                                editUrl ?
                                (
                                    <HStack>
                                        <Input tabIndex={2} placeholder={link} onChange={(e) => setNewUrl(e.target.value)} className="bg-transparent focus:outline" />
                                        <Button variant={'default'} onClick={() => handleFieldEdit('link')}>Edit</Button>
                                        <Button variant={'outline'} onClick={() => setEditUrl(false)}>Cancell</Button>
                                    </HStack>
                                )
                                :
                                (
                                    <TooltipProvider>
                                        <Tooltip>
                                            <TooltipTrigger>
                                                <HStack className="space-x-3 flex items-center justify-center">
                                                    <Link href={link} target="_blank" className="text-sm text-end truncate italic text-blue-400 hover:text-blue-300 cursor-pointer">
                                                        {link}
                                                    </Link>
                                                </HStack> 
                                            </TooltipTrigger>
                                            <TooltipContent className="dark:bg-black dark:text-neutral-500">
                                              {link}
                                            </TooltipContent>
                                        </Tooltip>
                                    </TooltipProvider>
                                )
                            }
                        </Box>
                
                        <Box className="flex flex-row items-center space-x-5">
                            <DropdownMenu>
                                <DropdownMenuTrigger>
                                    <BsThreeDotsVertical />
                                </DropdownMenuTrigger>
                                <DropdownMenuContent className="bg-black min-w-[250px] mr-2 flex flex-col space-y-2 rounded-2xl">
                                    <DropdownMenuLabel className="text-xl">Settings</DropdownMenuLabel>
                                    <DropdownMenuSeparator />
                                    <DropdownMenuItem className="text-neutral-500 hover:!text-neutral-300 !bg-transparent hover:!bg-neutral-950 transition-none" onClick={() => setEditUrl(true)}>
                                        Edit Url
                                    </DropdownMenuItem>
                                    <DropdownMenuItem className="text-neutral-500 hover:!text-neutral-300 !bg-transparent hover:!bg-neutral-950 transition-none" onClick={() => setEditTitle(true)}>
                                        Edit Title
                                    </DropdownMenuItem>
                                    <DropdownMenuItem disabled>
                                        Scan For Safety
                                    </DropdownMenuItem>
                                    <DropdownMenuItem disabled>
                                        Move To Incognito/Private
                                    </DropdownMenuItem>
                                    <DropdownMenuItem className="text-neutral-500 hover:!text-neutral-300 !bg-transparent hover:!bg-neutral-950 transition-none">
                                        Share
                                    </DropdownMenuItem>
                                    <DropdownMenuItem 
                                        className="text-neutral-500 hover:!text-red-500 !bg-transparent hover:!bg-neutral-950 transition-none"
                                        onClick={handleDeleteLinkItem}>
                                            Delete
                                    </DropdownMenuItem>
                                </DropdownMenuContent>
                            </DropdownMenu>

                            <RiDeleteBin7Line className="text-red-500" size={'1rem'} />
                        </Box>
                    </HStack>
                </Box>
            </ContextMenuTrigger>
            <ContextMenuContent className="dark:bg-black w-[250px] space-y-3 py-2 rounded-2xl">
                <ContextMenuItem className="text-xl !bg-transparent">Settings</ContextMenuItem>
                <Divider className="my-2 !bg-neutral-800"/>
                <ContextMenuItem className="text-neutral-500 hover:!text-neutral-300 !bg-transparent hover:!bg-neutral-950 transition-none" onClick={() => setEditTitle(true)}> 
                    Edit Link Title
                </ContextMenuItem>
                <ContextMenuItem className="text-neutral-500 hover:!text-neutral-300 !bg-transparent hover:!bg-neutral-950 transition-none" onClick={() => setEditUrl(true)}>
                    Edit Link Url
                </ContextMenuItem>
                <ContextMenuItem className="text-neutral-500 hover:!text-neutral-300 !bg-transparent hover:!bg-neutral-950 transition-none">
                    Share
                </ContextMenuItem>
                <ContextMenuItem onClick={handleDeleteLinkItem} className="text-red-500 hover:!text-white hover:!bg-red-500">
                    Delete
                </ContextMenuItem>
            </ContextMenuContent>
        </ContextMenu>
    )
}
